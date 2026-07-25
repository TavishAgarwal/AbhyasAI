// backend/scripts/splitScience910.js
// Splits the Class 9-10 "Science" subject into Physics, Chemistry, Biology
//
// The NCERT Science textbook for Classes 9-10 is a single book (iesc1/jesc1)
// but each chapter belongs to a specific branch. This script:
//   1. Downloads each chapter PDF to extract the real title
//   2. Maps each chapter to Physics/Chemistry/Biology using NCERT's official mapping
//   3. Deletes old generic "Science" rows for Classes 9-10
//   4. Upserts properly categorized rows

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ═══════════════════════════════════════════════════════════
// NCERT Class 9 Science — Official chapter-to-branch mapping
// Book code: iesc1
// ═══════════════════════════════════════════════════════════
const CLASS_9_MAPPING = [
  { ch: 1,  branch: 'Chemistry', fallbackTitle: 'Matter in Our Surroundings' },
  { ch: 2,  branch: 'Chemistry', fallbackTitle: 'Is Matter Around Us Pure' },
  { ch: 3,  branch: 'Biology',   fallbackTitle: 'The Fundamental Unit of Life' },  // previously seeded as Ch5
  { ch: 4,  branch: 'Biology',   fallbackTitle: 'Tissues' },
  { ch: 5,  branch: 'Biology',   fallbackTitle: 'Diversity in Living Organisms' },
  { ch: 6,  branch: 'Biology',   fallbackTitle: 'Why Do We Fall Ill' },  // previously seeded as Ch6 but titled wrong
  { ch: 7,  branch: 'Biology',   fallbackTitle: 'Natural Resources' },
  { ch: 8,  branch: 'Physics',   fallbackTitle: 'Motion' },
  { ch: 9,  branch: 'Physics',   fallbackTitle: 'Force and Laws of Motion' },
  { ch: 10, branch: 'Physics',   fallbackTitle: 'Gravitation' },
  { ch: 11, branch: 'Physics',   fallbackTitle: 'Work and Energy' },
  { ch: 12, branch: 'Physics',   fallbackTitle: 'Sound' },
  { ch: 13, branch: 'Biology',   fallbackTitle: 'Improvement in Food Resources' },
];

// ═══════════════════════════════════════════════════════════
// NCERT Class 10 Science — Official chapter-to-branch mapping
// Book code: jesc1
// ═══════════════════════════════════════════════════════════
const CLASS_10_MAPPING = [
  { ch: 1,  branch: 'Chemistry', fallbackTitle: 'Chemical Reactions and Equations' },
  { ch: 2,  branch: 'Chemistry', fallbackTitle: 'Acids, Bases and Salts' },
  { ch: 3,  branch: 'Chemistry', fallbackTitle: 'Metals and Non-metals' },
  { ch: 4,  branch: 'Chemistry', fallbackTitle: 'Carbon and its Compounds' },
  { ch: 5,  branch: 'Chemistry', fallbackTitle: 'Periodic Classification of Elements' },  // previously seeded as Ch5
  { ch: 6,  branch: 'Biology',   fallbackTitle: 'Life Processes' },
  { ch: 7,  branch: 'Biology',   fallbackTitle: 'Control and Coordination' },
  { ch: 8,  branch: 'Biology',   fallbackTitle: 'How do Organisms Reproduce?' },
  { ch: 9,  branch: 'Biology',   fallbackTitle: 'Heredity and Evolution' },
  { ch: 10, branch: 'Physics',   fallbackTitle: 'Light - Reflection and Refraction' },
  { ch: 11, branch: 'Physics',   fallbackTitle: 'Human Eye and Colourful World' },  // previously seeded as Ch11
  { ch: 12, branch: 'Physics',   fallbackTitle: 'Electricity' },
  { ch: 13, branch: 'Physics',   fallbackTitle: 'Magnetic Effects of Electric Current' },
  { ch: 14, branch: 'Biology',   fallbackTitle: 'Our Environment' },
  { ch: 15, branch: 'Biology',   fallbackTitle: 'Management of Natural Resources' },  // previously seeded as Ch15 or removed
  { ch: 16, branch: 'Physics',   fallbackTitle: 'Sustainable Management of Natural Resources' },
];

/**
 * Extract the chapter title from the first page of a PDF using pdfjs-dist
 */
async function extractTitleFromPdf(pdfUrl) {
  try {
    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; educational-tool)',
        'Referer': 'https://ncert.nic.in/'
      }
    });

    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(response.data),
      useSystemFonts: true,
    });

    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const content = await page.getTextContent();

    const items = content.items
      .filter(item => item.str && item.str.trim().length > 0)
      .sort((a, b) => {
        const yDiff = b.transform[5] - a.transform[5];
        if (Math.abs(yDiff) > 5) return yDiff;
        return a.transform[4] - b.transform[4];
      });

    // Build text with spaces between items on same line
    let pageText = '';
    let lastY = null;
    let lastX = 0;
    for (const item of items) {
      if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
        pageText += '\n';
        lastX = 0;
      } else if (lastY !== null && item.transform[4] > lastX + 2) {
        pageText += ' ';
      }
      pageText += item.str;
      lastY = item.transform[5];
      lastX = item.transform[4] + (item.width || item.str.length * 6);
    }

    return extractTitle(pageText);
  } catch (err) {
    return null;
  }
}

function extractTitle(text) {
  const cleaned = text
    .replace(/©\s*NCERT[^\n]*/gi, '')
    .replace(/not to be republished/gi, '')
    .replace(/Rationalised\s+\d{4}-\d{2,4}/gi, '')
    .replace(/Reprint\s+\d{4}[-–]\d{2,4}/gi, '')
    .trim();

  const lines = cleaned.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  function isJunk(s) {
    return /^\d+$/.test(s) || /^chapter/i.test(s) || /ncert/i.test(s) ||
           /copyright/i.test(s) || /rationalised/i.test(s) || /^reprint/i.test(s) ||
           /^class/i.test(s) || s.length < 4 || /^science$/i.test(s) ||
           /^\d{4}[-–]/.test(s) || /^contents?$/i.test(s);
  }

  // Strategy 1: Title before "Chapter N"
  for (let i = 0; i < lines.length; i++) {
    if (/^chapter\s*\d*$/i.test(lines[i])) {
      for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
        const c = lines[j].replace(/^\d+[.)]\s*/, '').trim();
        if (c.length >= 4 && c.length <= 120 && !isJunk(c)) return c;
      }
    }
  }

  // Strategy 2: "Chapter N" with title on same/next line
  for (let i = 0; i < lines.length; i++) {
    if (/^chapter\s+\d+/i.test(lines[i])) {
      const sameLine = lines[i].replace(/^chapter\s+\d+\s*[:\-—–.]*\s*/i, '').trim();
      if (sameLine.length > 3 && !isJunk(sameLine)) return sameLine;
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        if (lines[j].length > 3 && !isJunk(lines[j])) return lines[j].trim();
      }
    }
  }

  // Strategy 3: First non-junk line
  for (const line of lines.slice(0, 15)) {
    const c = line.replace(/^\d+[.)]\s*/, '').trim();
    if (c.length >= 5 && c.length <= 100 && !isJunk(c) &&
        !/mathematics|english|hindi|social/i.test(c)) {
      return c;
    }
  }

  return null;
}

/**
 * Download chapter PDF, extract full text for DB content_json
 */
async function extractFullText(pdfUrl) {
  try {
    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer',
      timeout: 60000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; educational-tool)',
        'Referer': 'https://ncert.nic.in/'
      }
    });

    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(response.data),
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

    // Clean
    fullText = fullText
      .replace(/©\s*NCERT[^\n]*/gi, '')
      .replace(/not to be republished/gi, '')
      .replace(/Rationalised\s+\d{4}-\d{2,4}/gi, '')
      .replace(/\n{4,}/g, '\n\n\n')
      .trim();

    return fullText;
  } catch (err) {
    return null;
  }
}

function makeSections(text, title) {
  const lines = text.split('\n');
  const sections = [{ heading: title, content: text.substring(0, 5000), type: 'text' }];
  return sections;
}

function makeLearningObjectives(title) {
  return [
    `Understand the key concepts of ${title}`,
    `Identify and explain the main ideas covered in this chapter`,
    `Apply knowledge from this chapter to solve problems`,
    `Recall important terms and definitions from ${title}`
  ];
}

async function run() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  Split Science → Physics/Chemistry/Biology (9-10)');
  console.log('═══════════════════════════════════════════════════\n');

  const configs = [
    { classNum: 9, bookCode: 'iesc1', mapping: CLASS_9_MAPPING },
    { classNum: 10, bookCode: 'jesc1', mapping: CLASS_10_MAPPING },
  ];

  for (const { classNum, bookCode, mapping } of configs) {
    console.log(`\n📚 Class ${classNum} Science [${bookCode}]`);
    console.log('─'.repeat(50));

    // Step 1: Delete old generic "Science" rows for this class
    const { error: delErr, count: delCount } = await supabase
      .from('chapters')
      .delete({ count: 'exact' })
      .eq('class_num', classNum)
      .eq('subject', 'Science');

    if (delErr) {
      console.error(`  ✗ Failed to delete old Science rows: ${delErr.message}`);
    } else {
      console.log(`  Deleted ${delCount} old "Science" rows`);
    }

    // Also delete any existing Physics/Chemistry/Biology rows to avoid duplicates
    for (const branch of ['Physics', 'Chemistry', 'Biology']) {
      await supabase
        .from('chapters')
        .delete()
        .eq('class_num', classNum)
        .eq('subject', branch);
    }
    console.log('  Cleared existing Physics/Chemistry/Biology rows\n');

    // Step 2: Process each chapter
    let inserted = 0;
    for (const entry of mapping) {
      const pdfUrl = `https://ncert.nic.in/textbook/pdf/${bookCode}${String(entry.ch).padStart(2, '0')}.pdf`;
      
      process.stdout.write(`  Ch${String(entry.ch).padStart(2)} [${entry.branch.padEnd(9)}]: `);

      // Extract title from PDF
      let title = await extractTitleFromPdf(pdfUrl);
      if (!title || title.length < 3) {
        title = entry.fallbackTitle;
        process.stdout.write(`(fallback) `);
      }

      // Extract full text
      const fullText = await extractFullText(pdfUrl);
      const wordCount = fullText ? fullText.split(/\s+/).length : 0;
      const sections = fullText ? makeSections(fullText, title) : [{ heading: title, content: '', type: 'text' }];
      const objectives = makeLearningObjectives(title);

      // Upsert to DB
      const row = {
        class_num: classNum,
        subject: entry.branch,
        chapter_num: entry.ch,
        chapter_title: title.substring(0, 200),
        language: 'english',
        content_json: {
          sections,
          bookTitle: `Science (${entry.branch})`,
          subSubject: null,
          pdfUrl
        },
        learning_objectives: objectives,
        word_count: wordCount
      };

      const { error } = await supabase
        .from('chapters')
        .upsert(row, {
          onConflict: 'class_num,subject,chapter_num,language',
          ignoreDuplicates: false
        });

      if (error) {
        console.log(`✗ "${title}" — ${error.message}`);
      } else {
        console.log(`✓ "${title}" (${wordCount} words)`);
        inserted++;
      }

      await new Promise(r => setTimeout(r, 500));
    }

    console.log(`\n  ✅ ${inserted}/${mapping.length} chapters inserted for Class ${classNum}`);
  }

  // Final verification
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  VERIFICATION');
  console.log('═══════════════════════════════════════════════════\n');

  for (const cls of [9, 10]) {
    for (const subj of ['Physics', 'Chemistry', 'Biology']) {
      const { data, count } = await supabase
        .from('chapters')
        .select('chapter_num, chapter_title', { count: 'exact' })
        .eq('class_num', cls)
        .eq('subject', subj)
        .order('chapter_num');

      console.log(`Class ${cls} ${subj}: ${count} chapters`);
      if (data) {
        data.forEach(ch => console.log(`    Ch${ch.chapter_num}: ${ch.chapter_title}`));
      }
    }
  }

  // Check no "Science" remains
  const { count: scienceCount } = await supabase
    .from('chapters')
    .select('*', { count: 'exact', head: true })
    .in('class_num', [9, 10])
    .eq('subject', 'Science');

  console.log(`\nRemaining "Science" rows for 9-10: ${scienceCount}`);
  if (scienceCount === 0) {
    console.log('✅ All Science chapters successfully split into Physics/Chemistry/Biology');
  }
}

run().catch(err => { console.error(err); process.exit(1); });
