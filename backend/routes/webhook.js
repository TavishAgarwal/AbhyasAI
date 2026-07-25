// backend/routes/webhook.js
// WhatsApp Business Cloud API webhook

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { supabase } = require('../services/supabaseClient');
const { sendText, sendDocument, downloadMediaFromWhatsApp } = require('../services/whatsappService');
const ocrService = require('../services/ocrService');
const promptChain = require('../services/promptChain');
const { generatePdf } = require('../services/documentGen');

// ============================================================
// GET /whatsapp — Meta webhook verification
// ============================================================
router.get('/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

// ============================================================
// POST /whatsapp — Incoming messages
// ============================================================

// Phone-level rate limiting (Fix 8)
const phoneRateLimit = new Map();
const PHONE_LIMIT = 5;
const PHONE_WINDOW_MS = 60 * 1000;

function checkPhoneRateLimit(phoneNumber) {
  const now = Date.now();
  const record = phoneRateLimit.get(phoneNumber) || { count: 0, windowStart: now };

  if (now - record.windowStart > PHONE_WINDOW_MS) {
    record.count = 1;
    record.windowStart = now;
  } else {
    record.count += 1;
  }

  phoneRateLimit.set(phoneNumber, record);

  // Clean up old entries periodically
  if (phoneRateLimit.size > 1000) {
    for (const [phone, rec] of phoneRateLimit.entries()) {
      if (now - rec.windowStart > PHONE_WINDOW_MS) phoneRateLimit.delete(phone);
    }
  }

  return record.count <= PHONE_LIMIT;
}

router.post('/whatsapp', async (req, res) => {
  // Verify webhook signature (Fix 1 — CRITICAL)
  if (process.env.WHATSAPP_APP_SECRET) {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) {
      console.warn(`[${new Date().toISOString()}] Webhook received without signature`);
      return res.sendStatus(401);
    }
    const expectedSig = 'sha256=' + crypto
      .createHmac('sha256', process.env.WHATSAPP_APP_SECRET)
      .update(req.rawBody || JSON.stringify(req.body))
      .digest('hex');
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSig);
    if (sigBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      console.warn(`[${new Date().toISOString()}] Invalid webhook signature`);
      return res.sendStatus(401);
    }
  }

  // Respond 200 after signature check — Meta requires this within 1 second
  res.sendStatus(200);

  try {
    const entry = req.body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message) return;

    const from = message.from;
    const messageType = message.type;

    // Per-phone rate limiting (Fix 8)
    if (!checkPhoneRateLimit(from)) {
      await sendText(from, 'You have sent too many requests. Please wait a minute and try again.');
      return;
    }
    let text = '';
    let imageBuffer = null;

    if (messageType === 'text') {
      text = message.text?.body?.trim() || '';
    } else if (messageType === 'image') {
      const mediaId = message.image?.id;
      if (mediaId) {
        const media = await downloadMediaFromWhatsApp(mediaId);
        imageBuffer = media.buffer;
      }
    } else {
      await sendText(from, 'Please send a text message or a photo of a textbook page.');
      return;
    }

    // Load or create session
    let { data: session } = await supabase
      .from('whatsapp_sessions')
      .select('*')
      .eq('phone_number', from)
      .single();

    if (!session) {
      await supabase.from('whatsapp_sessions').upsert({
        phone_number: from,
        conversation_state: 'greeting',
        last_message_at: new Date().toISOString()
      });
      session = { conversation_state: 'greeting' };
    }

    const lowerText = text.toLowerCase().trim();

    // Check reset commands
    if (['new', 'reset', 'start', 'hi', 'hello', 'namaste'].includes(lowerText)) {
      await updateSession(from, {
        conversation_state: 'awaiting_class',
        class_num: null, subject: null, chapter_num: null,
        version_type: null, uploaded_text: null
      });
      await sendText(from,
        'Welcome to AbhyasAI! \n\n' +
        'I create accessible worksheets for your students.\n\n' +
        'Which class? (1-8)'
      );
      return;
    }

    // Check shortcut: "5 science 2 dyslexia"
    const shortcut = text.match(/^(\d{1,2})\s+(science|mathematics|math|maths|english|hindi|social|evs)\s+(\d+)\s+(standard|dyslexia|dyscalculia|adhd|both)$/i);
    if (shortcut) {
      const classNum = parseInt(shortcut[1]);
      const subject = mapSubject(shortcut[2]);
      const chapterNum = parseInt(shortcut[3]);
      const version = shortcut[4].toLowerCase();

      await updateSession(from, {
        conversation_state: 'processing',
        class_num: classNum, subject, chapter_num: chapterNum, version_type: version
      });
      await handleGeneration(from, classNum, subject, chapterNum, version, null);
      return;
    }

    // Handle image
    if (imageBuffer) {
      await sendText(from, 'Photo received! Reading your textbook page... 📖');
      const extractedText = await ocrService.extractTextFromImage(imageBuffer);
      await updateSession(from, {
        conversation_state: 'awaiting_version',
        uploaded_text: extractedText
      });
      await sendText(from,
        'Text extracted! Which version do you want?\n\n' +
        '1. Standard - Clear structure\n' +
        '2. Dyslexia - Shorter sentences, wider spacing\n' +
        '3. ADHD - Step-by-step, visual boxes\n' +
        '4. Both - Dyslexia + ADHD\n\n' +
        'Reply with the number or name.'
      );
      return;
    }

    // State machine
    const state = session.conversation_state || 'greeting';

    if (state === 'greeting' || state === 'done') {
      await updateSession(from, { conversation_state: 'awaiting_class' });
      await sendText(from,
        'Welcome to AbhyasAI! \n\n' +
        'I create accessible worksheets for your students.\n\n' +
        'Which class? (1-10)'
      );

    } else if (state === 'awaiting_class') {
      const classNum = parseInt(lowerText);
      if (isNaN(classNum) || classNum < 1 || classNum > 10) {
        await sendText(from, 'Please enter a class number from 1 to 10.');
        return;
      }
      await updateSession(from, { class_num: classNum, conversation_state: 'awaiting_subject' });
      const subjects = classNum <= 5
        ? '- Mathematics\n- EVS\n- English\n- Hindi'
        : '- Science\n- Mathematics\n- English\n- Hindi\n- Social Science';
      await sendText(from,
        `Class ${classNum} selected!\n\n` +
        'Which subject?\n' + subjects
      );

    } else if (state === 'awaiting_subject') {
      const subject = mapSubject(lowerText);
      if (!subject) {
        await sendText(from, 'Please choose a valid subject (e.g. Science, Mathematics, English, Hindi, Social Science, EVS)');
        return;
      }
      await updateSession(from, { subject, conversation_state: 'awaiting_chapter' });
      await sendText(from, `${subject} selected!\n\nWhich chapter number?`);

    } else if (state === 'awaiting_chapter') {
      const chapterNum = parseInt(lowerText);
      if (isNaN(chapterNum) || chapterNum < 1) {
        await sendText(from, 'Please enter a valid chapter number (e.g., 1, 2, 3).');
        return;
      }
      await updateSession(from, { chapter_num: chapterNum, conversation_state: 'awaiting_version' });
      await sendText(from,
        `Chapter ${chapterNum} selected!\n\n` +
        'Which version?\n' +
        '1. Standard - Clear structure\n' +
        '2. Dyslexia - Shorter sentences, wider spacing\n' +
        '3. ADHD - Step-by-step, visual boxes\n' +
        '4. Both - Dyslexia + ADHD\n\n' +
        'Reply with the number or name.'
      );

    } else if (state === 'awaiting_version') {
      const version = mapVersion(lowerText);
      if (!version) {
        await sendText(from, 'Please choose: standard, dyslexia, adhd, or both');
        return;
      }

      // Check if this is a camera flow (has uploaded_text)
      const customText = session.uploaded_text || null;
      const classNum = session.class_num;
      const subject = session.subject;
      const chapterNum = session.chapter_num;

      await updateSession(from, {
        version_type: version,
        conversation_state: 'processing'
      });

      if (customText) {
        // Camera flow — use extracted text
        await handleGeneration(from, classNum, subject, chapterNum, version, customText);
      } else {
        await handleGeneration(from, classNum, subject, chapterNum, version, null);
      }
    }

  } catch (err) {
    console.error(`[${new Date().toISOString()}] Webhook error:`, err.message);
  }
});

// ============================================================
// Helpers
// ============================================================
function mapSubject(input) {
  const map = {
    'science': 'Science', 'sci': 'Science',
    'mathematics': 'Mathematics', 'math': 'Mathematics', 'maths': 'Mathematics',
    'english': 'English', 'eng': 'English',
    'hindi': 'Hindi',
    'social': 'Social Science', 'social science': 'Social Science', 'sst': 'Social Science',
    'evs': 'EVS', 'environmental studies': 'EVS', 'environment': 'EVS'
  };
  return map[input.toLowerCase()] || null;
}

function mapVersion(input) {
  const map = {
    '1': 'standard', 'standard': 'standard', 'std': 'standard',
    '2': 'dyslexia', 'dyslexia': 'dyslexia', 'dys': 'dyslexia',
    '3': 'adhd', 'adhd': 'adhd', 'dyscalculia': 'adhd',
    '4': 'both', 'both': 'both', 'all': 'both'
  };
  return map[input.toLowerCase()] || null;
}

async function updateSession(phone, updates) {
  await supabase.from('whatsapp_sessions').upsert({
    phone_number: phone,
    ...updates,
    last_message_at: new Date().toISOString()
  });
}

async function handleGeneration(from, classNum, subject, chapterNum, version, customText) {
  try {
    await sendText(from, 'Creating your worksheet... ~20 seconds ⏳');

    let chapterText = customText;

    if (!chapterText) {
      // Fetch from DB
      const { data: chapter } = await supabase
        .from('chapters')
        .select('*')
        .eq('class_num', classNum)
        .eq('subject', subject)
        .eq('chapter_num', chapterNum)
        .single();

      if (!chapter) {
        await sendText(from,
          `Sorry, I could not find Class ${classNum} ${subject} Chapter ${chapterNum} in our library.\n\n` +
          'You can send a photo of the textbook page instead!\n\n' +
          'Reply "new" to start over.'
        );
        await updateSession(from, { conversation_state: 'done' });
        return;
      }

      const sections = chapter.content_json?.sections || [];
      chapterText = sections.map(s => `${s.heading}\n${s.content}`).join('\n\n');
    }

    // Determine versions
    const versionsArr = version === 'both'
      ? ['dyslexia', 'adhd']
      : [version];

    // Run pipeline
    const result = await promptChain.run({
      chapterText,
      language: 'english',
      versionsToGenerate: versionsArr
    });

    // Generate and send PDF for each version
    for (const v of versionsArr) {
      if (!result.versions[v] || result.versions[v].unavailable) continue;

      const pdfBuffer = await generatePdf(result.versions[v].html, v);

      // Upload to Supabase
      const pdfPath = `wa_${Date.now()}_${v}.pdf`;
      await supabase.storage
        .from('generated-worksheets')
        .upload(pdfPath, pdfBuffer, { contentType: 'application/pdf', upsert: true });

      const { data: signed } = await supabase.storage
        .from('generated-worksheets')
        .createSignedUrl(pdfPath, 24 * 60 * 60);

      const pdfUrl = signed?.signedUrl;
      if (!pdfUrl) continue;

      const filename = `AbhyasAI_Class${classNum}_${subject}_Ch${chapterNum}_${v}.pdf`;

      const captions = {
        dyslexia: 'Shorter sentences · Syllable guides · Wide spacing',
        adhd: 'Step-by-step · Checkboxes · Visual boxes',
        standard: 'Clear structure · Bold key terms · Better headings'
      };

      const caption = `Your worksheet is ready! ✨\n${captions[v] || ''}\n\nReply "new" for another worksheet`;

      await sendDocument(from, pdfUrl, filename, caption);
    }

    await updateSession(from, { conversation_state: 'done' });

  } catch (err) {
    console.error(`[${new Date().toISOString()}] handleGeneration error:`, err.message);
    await sendText(from, 'Something went wrong. Reply "new" to try again.');
    await updateSession(from, {
      conversation_state: 'done',
      class_num: null, subject: null, chapter_num: null, version_type: null, uploaded_text: null
    });
  }
}

module.exports = router;
