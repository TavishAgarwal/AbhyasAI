// backend/scripts/extractNcertText.js
// Downloads NCERT PDFs and extracts text using pdfjs-dist
// Saves per-chapter JSON to backend/data/chapters/
// Supports resume — skips already-extracted chapters

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const pLimit = require('p-limit');

// Process max 3 chapters concurrently
const limit = pLimit(3);

async function extractText(pdfBuffer) {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(pdfBuffer),
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    let pageText = '';
    let lastY = null;

    content.items.forEach(item => {
      if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
        pageText += '\n';
      }
      pageText += item.str;
      if (item.hasEOL) pageText += '\n';
      lastY = item.transform[5];
    });

    fullText += pageText + '\n\n';
  }

  return cleanExtractedText(fullText);
}

function cleanExtractedText(text) {
  return text
    .replace(/©\s*NCERT[^\n]*/gi, '')
    .replace(/not to be republished/gi, '')
    .replace(/Rationalised\s+\d{4}-\d{2,4}/gi, '')
    .replace(/^\s*\d{1,3}\s*$/gm, '')
    .replace(/([^\n]{10,})\n\1/g, '$1')
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/[ \t]{3,}/g, ' ')
    .trim();
}

function splitIntoSections(text, chapterTitle) {
  const lines = text.split('\n');
  const sections = [];
  let currentSection = { heading: chapterTitle, content: '', type: 'text' };

  const headingPatterns = [
    /^\d+\.\d+\s+[A-Z]/,
    /^[A-Z][A-Z\s]{5,}$/,
  ];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const isHeading = headingPatterns.some(p => p.test(trimmed))
      && trimmed.length < 80
      && trimmed.length > 3;

    if (isHeading && currentSection.content.trim().length > 50) {
      sections.push({
        heading: currentSection.heading,
        content: currentSection.content.trim(),
        type: detectSectionType(currentSection.content)
      });
      currentSection = { heading: trimmed, content: '', type: 'text' };
    } else {
      currentSection.content += line + '\n';
    }
  }

  if (currentSection.content.trim().length > 20) {
    sections.push({
      heading: currentSection.heading,
      content: currentSection.content.trim(),
      type: detectSectionType(currentSection.content)
    });
  }

  if (sections.length === 0) {
    sections.push({
      heading: chapterTitle,
      content: text.trim(),
      type: 'text'
    });
  }

  return sections;
}

function detectSectionType(content) {
  if (/^\d+\./m.test(content) && content.split('\n').length < 20) return 'list';
  if (/step|procedure|process/i.test(content)) return 'procedure';
  if (/define|definition|means that/i.test(content)) return 'definition';
  return 'text';
}

function extractLearningObjectives(text, chapterTitle) {
  const objectives = [];

  const objectivePatterns = [
    /you will (?:learn|be able to|understand)[:\s]+([^.]+\.)/gi,
    /after (?:reading|studying) this chapter[,\s]+([^.]+\.)/gi,
    /by the end of this chapter[,\s]+([^.]+\.)/gi,
  ];

  for (const pattern of objectivePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      objectives.push(match[1].trim());
    }
  }

  if (objectives.length < 3) {
    objectives.push(`Understand the key concepts of ${chapterTitle}`);
    objectives.push(`Identify and explain the main ideas covered in this chapter`);
    objectives.push(`Apply knowledge from this chapter to real-world situations`);
    objectives.push(`Recall important terms and definitions from ${chapterTitle}`);
  }

  return objectives.slice(0, 8);
}

async function downloadAndExtract(book, chapter, outputDir) {
  const subjectSafe = book.subjectDb.replace(/\s+/g, '_');
  const filename = `class${book.class}_${subjectSafe}_${book.bookCode}_ch${String(chapter.num).padStart(2, '0')}.json`;
  const outputPath = path.join(outputDir, filename);

  // Skip if already extracted
  if (fs.existsSync(outputPath)) {
    const existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    if (existing.wordCount > 50) {
      console.log(`  SKIP: ${filename} (already done)`);
      return existing;
    }
  }

  console.log(`  Downloading: Class ${book.class} ${book.subjectDb} [${book.bookCode}] Ch${chapter.num} — ${chapter.title}`);

  try {
    const response = await axios.get(chapter.pdfUrl, {
      responseType: 'arraybuffer',
      timeout: 60000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; educational-tool)',
        'Referer': 'https://ncert.nic.in/'
      }
    });

    // Check if response is actually a PDF
    const contentType = response.headers['content-type'] || '';
    if (!contentType.includes('pdf') && response.data.length < 1000) {
      console.error(`  ✗ Not a PDF: ${chapter.pdfUrl}`);
      return null;
    }

    const text = await extractText(Buffer.from(response.data));
    const sections = splitIntoSections(text, chapter.title);
    const objectives = extractLearningObjectives(text, chapter.title);

    const chapterData = {
      class: book.class,
      subject: book.subjectDb,
      subjectDisplay: book.subjectDisplay,
      bookCode: book.bookCode,
      subSubject: book.subSubject || null,
      chapterNum: chapter.num,
      title: chapter.title,
      language: 'english',
      sections,
      learningObjectives: objectives,
      wordCount: text.split(/\s+/).length,
      pdfUrl: chapter.pdfUrl,
      extractedAt: new Date().toISOString()
    };

    fs.writeFileSync(outputPath, JSON.stringify(chapterData, null, 2));
    console.log(`  ✓ ${filename} (${sections.length} sections, ${chapterData.wordCount} words)`);

    return chapterData;
  } catch (err) {
    console.error(`  ✗ FAILED: Class ${book.class} ${book.subjectDb} Ch${chapter.num} — ${err.message}`);
    return null;
  }
}

async function extractAll() {
  const manifestPath = path.join(__dirname, '../data/ncertManifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('ncertManifest.json not found. Run scrapeNcert.js first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const outputDir = path.join(__dirname, '../data/chapters');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('═══════════════════════════════════════════════════');
  console.log('  AbhyasAI — NCERT PDF Text Extraction');
  console.log('═══════════════════════════════════════════════════\n');

  // Build task list
  const tasks = [];
  for (const book of manifest) {
    if (book.subjectDb === 'Unknown') {
      console.log(`SKIPPING unmapped: Class ${book.class} ${book.subjectDisplay}`);
      continue;
    }
    for (const chapter of book.chapters) {
      tasks.push({ book, chapter });
    }
  }

  console.log(`Total chapters to extract: ${tasks.length}`);
  console.log('Processing with concurrency limit of 3...\n');

  const results = await Promise.all(
    tasks.map(({ book, chapter }) =>
      limit(() => downloadAndExtract(book, chapter, outputDir))
    )
  );

  const successful = results.filter(r => r !== null).length;
  const failed = results.filter(r => r === null).length;

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  EXTRACTION COMPLETE`);
  console.log(`  Successful: ${successful}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Data saved to: ${outputDir}`);
  console.log(`═══════════════════════════════════════════════════`);
}

extractAll().catch(console.error);
