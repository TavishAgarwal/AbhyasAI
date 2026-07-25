// backend/routes/generate.js
// POST /api/generate — main worksheet generation pipeline

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { supabase } = require('../services/supabaseClient');
const promptChain = require('../services/promptChain');
const { generatePdf, generateDocx } = require('../services/documentGen');
const { extractFromPdf } = require('../utils/textExtractor');
const ocrService = require('../services/ocrService');
const cacheService = require('../services/cacheService');
const { validate: isUUID } = require('uuid');

// Input validation (Fix 6 — HIGH)
function validateInput(body) {
  const VALID_SOURCES = ['library', 'upload', 'camera'];
  const VALID_VERSIONS = ['standard', 'dyslexia', 'adhd'];
  const VALID_LANGUAGES = ['english', 'hindi'];

  if (body.source && !VALID_SOURCES.includes(body.source)) {
    return 'Invalid source. Must be library, upload, or camera.';
  }
  if (body.source === 'library' && body.chapterId && !isUUID(body.chapterId)) {
    return 'Invalid chapterId. Must be a valid UUID.';
  }
  if (body.language && !VALID_LANGUAGES.includes(body.language)) {
    return 'Invalid language. Must be english or hindi.';
  }
  return null;
}

// Multer config: 20MB limit, 15 files max
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Allowed: PDF, JPEG, PNG`));
    }
  }
}).array('files', 15);

router.post('/', (req, res) => {
  upload(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ error: uploadErr.message });
    }

    const startTime = Date.now();

    // Input validation (Fix 6)
    const validationResult = validateInput(req.body);
    if (validationResult) {
      return res.status(400).json({ error: validationResult });
    }

    let jobId = uuidv4();

    try {
      const source = req.body.source || 'library';
      const language = req.body.language || 'english';
      let versionsArray = req.body.versions;

      // Parse versions if string
      if (typeof versionsArray === 'string') {
        try { versionsArray = JSON.parse(versionsArray); } catch { versionsArray = [versionsArray]; }
      }
      if (!Array.isArray(versionsArray)) {
        versionsArray = ['standard', 'dyslexia', 'adhd'];
      }

      let chapterText = '';
      let chapterId = req.body.chapterId || null;
      let chapterMeta = {};

      // ---- SOURCE: LIBRARY ----
      if (source === 'library') {
        if (!chapterId) {
          return res.status(400).json({ error: 'chapterId is required for library source' });
        }

        // Check cache
        const { data: ch } = await supabase.from('chapters').select('*').eq('id', chapterId).single();
        if (!ch) return res.status(404).json({ error: 'Chapter not found' });

        chapterMeta = {
          class: ch.class_num,
          subject: ch.subject,
          chapterNum: ch.chapter_num,
          title: ch.chapter_title
        };

        // Build cache key
        const cacheKey = `${chapterId}_${versionsArray.sort().join('_')}_${language}`;
        const cached = cacheService.get(cacheKey);

        // Also check demo cache
        const demoCacheKey = `demo_${ch.class_num}_${ch.subject}_${ch.chapter_num}`;
        const demoCached = cacheService.get(demoCacheKey);

        if (cached) {
          return res.json({
            jobId: 'cached',
            status: 'done',
            generationTimeMs: Date.now() - startTime,
            versions: buildVersionResponse(cached.versions, cached.qualityReport, versionsArray),
            qualityReport: cached.qualityReport,
            chapterMeta,
            fromCache: true
          });
        }

        if (demoCached) {
          return res.json({
            jobId: 'cached',
            status: 'done',
            generationTimeMs: Date.now() - startTime,
            versions: buildVersionResponse(demoCached.versions, demoCached.qualityReport, versionsArray),
            qualityReport: demoCached.qualityReport,
            chapterMeta: demoCached.chapterMeta || chapterMeta,
            fromCache: true
          });
        }

        // Extract text from content_json
        const sections = ch.content_json?.sections || [];
        chapterText = sections.map(s => `${s.heading}\n${s.content}`).join('\n\n').trim();

        // If content_json is empty/insufficient, build a topic-based prompt from metadata
        if (chapterText.length < 100) {
          const objectives = (ch.learning_objectives || []).map((o, i) => `${i + 1}. ${o}`).join('\n');
          const bookTitle = ch.content_json?.bookTitle || ch.subject;
          chapterText = [
            `Subject: ${ch.subject}`,
            `Class: ${ch.class_num}`,
            `Chapter ${ch.chapter_num}: ${ch.chapter_title}`,
            `Book: ${bookTitle}`,
            `Language: ${language}`,
            '',
            `This is a chapter titled "${ch.chapter_title}" from the NCERT ${ch.subject} textbook for Class ${ch.class_num}.`,
            '',
            objectives ? `Learning Objectives:\n${objectives}` : '',
            '',
            `Please generate a comprehensive worksheet for this chapter covering the key concepts, `,
            `vocabulary, comprehension questions, and activities appropriate for Class ${ch.class_num} students.`,
          ].filter(Boolean).join('\n');
        }

      // ---- SOURCE: UPLOAD ----
      } else if (source === 'upload') {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'At least one file is required for upload source' });
        }
        chapterText = await extractFromPdf(req.files[0].buffer);

      // ---- SOURCE: CAMERA ----
      } else if (source === 'camera') {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'At least one image is required for camera source' });
        }
        const ocrResults = await Promise.all(
          req.files.map(f => ocrService.extractTextFromImage(f.buffer))
        );
        chapterText = ocrResults.join('\n\n');
      }

      // Validate text length (Fix 7 — HIGH)
      const MAX_CHARS = 50000; // ~12,500 tokens
      if (chapterText.trim().length < 100) {
        return res.status(400).json({
          error: 'Extracted text is too short (minimum 100 characters). Please provide more content.'
        });
      }
      if (chapterText.length > MAX_CHARS) {
        console.warn(`[${new Date().toISOString()}] Text truncated from ${chapterText.length} to ${MAX_CHARS} chars`);
        chapterText = chapterText.substring(0, MAX_CHARS);
      }

      // Insert job record
      const { data: jobData } = await supabase
        .from('generation_jobs')
        .insert({
          id: jobId,
          chapter_id: chapterId,
          source_type: source,
          versions_requested: versionsArray,
          language,
          status: 'processing'
        })
        .select()
        .single();

      if (jobData) jobId = jobData.id;

      // Run prompt chain
      const result = await promptChain.run({
        chapterText,
        language,
        versionsToGenerate: versionsArray
      });

      // Generate documents and upload for each version in parallel
      const fileUrls = {};
      await Promise.all(versionsArray.map(async (version) => {
        if (!result.versions[version] || result.versions[version].unavailable) return;

        const html = result.versions[version].html;
        const plainText = result.versions[version].content;

        // Generate PDF and DOCX in parallel
        const [pdfBuffer, docxBuffer] = await Promise.all([
          generatePdf(html, version),
          generateDocx(plainText, version, chapterMeta)
        ]);

        // Upload to Supabase Storage
        const pdfPath = `${jobId}_${version}.pdf`;
        const docxPath = `${jobId}_${version}.docx`;

        await Promise.all([
          supabase.storage.from('generated-worksheets').upload(pdfPath, pdfBuffer, {
            contentType: 'application/pdf', upsert: true
          }),
          supabase.storage.from('generated-worksheets').upload(docxPath, docxBuffer, {
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            upsert: true
          })
        ]);

        // Create signed URLs (24hr TTL)
        const [pdfSigned, docxSigned] = await Promise.all([
          supabase.storage.from('generated-worksheets').createSignedUrl(pdfPath, 24 * 60 * 60),
          supabase.storage.from('generated-worksheets').createSignedUrl(docxPath, 24 * 60 * 60)
        ]);

        fileUrls[version] = {
          pdfUrl: pdfSigned.data?.signedUrl || null,
          docxUrl: docxSigned.data?.signedUrl || null
        };
      }));

      // Build response versions
      const responseVersions = {};
      for (const version of versionsArray) {
        const vData = result.versions[version];
        if (!vData || vData.unavailable) {
          responseVersions[version] = { html: null, pdfUrl: null, docxUrl: null, unavailable: true };
          continue;
        }

        const fidelityKey = `${version}_fidelity`;
        const fidelityScore = result.qualityReport?.[fidelityKey] || 0;
        const flaggedSections = (result.qualityReport?.flagged_sections || [])
          .filter(f => f.version === version);

        responseVersions[version] = {
          html: vData.html,
          pdfUrl: fileUrls[version]?.pdfUrl || null,
          docxUrl: fileUrls[version]?.docxUrl || null,
          fidelityScore,
          flagged: fidelityScore < 0.80,
          flaggedSections
        };
      }

      const generationTimeMs = Date.now() - startTime;

      // Update job in DB
      const updateData = {
        status: 'done',
        quality_score: result.qualityReport,
        generation_time_ms: generationTimeMs,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      for (const version of versionsArray) {
        if (fileUrls[version]) {
          updateData[`${version}_file_url`] = fileUrls[version].pdfUrl;
          updateData[`${version}_docx_url`] = fileUrls[version].docxUrl;
        }
      }

      await supabase.from('generation_jobs').update(updateData).eq('id', jobId);

      // Cache library results
      if (source === 'library' && chapterId) {
        const cacheKey = `${chapterId}_${versionsArray.sort().join('_')}_${language}`;
        cacheService.set(cacheKey, { versions: result.versions, qualityReport: result.qualityReport }, 7 * 24 * 60 * 60);
      }

      res.json({
        jobId,
        status: 'done',
        generationTimeMs,
        versions: responseVersions,
        qualityReport: result.qualityReport,
        chapterMeta,
        fromCache: false
      });

    } catch (err) {
      console.error(`[${new Date().toISOString()}] POST /api/generate error:`, err.message);

      // Update job status to failed
      try { await supabase.from('generation_jobs').update({ status: 'failed' }).eq('id', jobId); } catch (_) {}

      res.status(500).json({
        error: 'Generation failed. Please try again.',
        jobId
      });
    }
  });
});

// Helper: build version response from cached data
function buildVersionResponse(versions, qualityReport, requestedVersions) {
  const response = {};
  for (const version of requestedVersions) {
    const vData = versions[version];
    if (!vData || vData.unavailable) {
      response[version] = { html: null, pdfUrl: null, docxUrl: null, unavailable: true };
      continue;
    }
    const fidelityKey = `${version}_fidelity`;
    const fidelityScore = qualityReport?.[fidelityKey] || 0;
    const flaggedSections = (qualityReport?.flagged_sections || []).filter(f => f.version === version);
    response[version] = {
      html: vData.html,
      pdfUrl: null,
      docxUrl: null,
      fidelityScore,
      flagged: fidelityScore < 0.80,
      flaggedSections
    };
  }
  return response;
}

module.exports = router;
