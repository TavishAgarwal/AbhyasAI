// backend/scripts/downloadAndSeed.js
// Downloads NCERT PDFs, extracts text, and seeds chapters into Supabase

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const axios = require('axios');
const { supabase } = require('../services/supabaseClient');
const ncertCatalog = require('./ncertCatalog');

// We use dynamic import for pdfjs-dist (ESM)
let pdfjsLib;

const NCERT_PDF_BASE = 'https://ncert.nic.in/textbook/pdf/';
const DELAY_MS = 500; // delay between downloads to avoid rate limiting

async function extractTextFromPdfBuffer(buffer) {
  if (!pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  }
  
  const uint8Array = new Uint8Array(buffer);
  const doc = await pdfjsLib.getDocument({ data: uint8Array }).promise;
  const pages = [];
  
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    if (pageText.trim()) pages.push(pageText.trim());
  }
  
  return pages.join('\n\n');
}

function splitIntoSections(text, chapterTitle) {
  // Try to split on common heading patterns
  const sections = [];
  
  // Split by lines and group into paragraphs
  const paragraphs = text.split(/\n{2,}/).filter(p => p.trim().length > 50);
  
  if (paragraphs.length <= 1) {
    // Can't split meaningfully, use as single section
    return [{ heading: chapterTitle || 'Content', content: text.substring(0, 5000) }];
  }
  
  // Create sections of ~3-4 paragraphs each
  const PARAS_PER_SECTION = 3;
  for (let i = 0; i < paragraphs.length; i += PARAS_PER_SECTION) {
    const chunk = paragraphs.slice(i, i + PARAS_PER_SECTION);
    const sectionNum = Math.floor(i / PARAS_PER_SECTION) + 1;
    sections.push({
      heading: `Section ${sectionNum}`,
      content: chunk.join('\n\n')
    });
  }
  
  return sections.slice(0, 10); // Max 10 sections
}

async function downloadChapterPdf(bookCode, chapterNum) {
  const chapterStr = String(chapterNum).padStart(2, '0');
  const url = `${NCERT_PDF_BASE}${bookCode}${chapterStr}.pdf`;
  
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AbhyasAI/1.0; Educational)'
      }
    });
    
    // Check if response is actually a PDF (not an error page)
    const contentType = response.headers['content-type'] || '';
    if (!contentType.includes('pdf') && response.data.length < 1000) {
      return null;
    }
    
    return Buffer.from(response.data);
  } catch (err) {
    if (err.response?.status === 404) return null;
    if (err.response?.status === 403) return null;
    console.error(`  Download error for ${url}: ${err.message}`);
    return null;
  }
}

/**
 * Extracts a meaningful chapter title from PDF text.
 * Tries multiple strategies to find the actual chapter heading.
 */
function extractChapterTitle(text, chapterNum) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Patterns to skip (common PDF header/footer junk)
  const junkPatterns = [
    /^\d+$/,                          // Just a page number
    /^\d+\s+\d{4}-\d{2,4}$/,          // "47 2024-25"
    /reprint\s+\d{4}/i,               // "Reprint 2024-25"
    /^\s*ncert/i,                      // "NCERT"
    /^\s*©/,                           // Copyright
    /^\s*class\s*$/i,                  // Just "Class"
    /isbn/i,                           // ISBN numbers
    /^unit\s+\d+$/i,                   // "Unit 4"
    /^\s*\d{4}-\d{2,4}\s*$/,          // "2024-25"
    /^contents?$/i,                    // "Contents"
    /national council/i,               // NCERT full name
    /textbook/i,                       // Book descriptors
    /^chapter$/i,                      // Just "chapter" alone
    /all rights reserved/i,
    /published by/i,
    /printed in india/i,
  ];
  
  function isJunk(line) {
    return junkPatterns.some(p => p.test(line));
  }
  
  // Strategy 1: Look for "Chapter N: Title" or "Chapter N — Title" pattern
  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const match = lines[i].match(/chapter\s*\d+\s*[:\-—–.]\s*(.+)/i);
    if (match && match[1].trim().length >= 3 && match[1].trim().length <= 200) {
      return match[1].trim();
    }
  }
  
  // Strategy 2: Look for "N. Title" or "N Title" at start of line
  for (let i = 0; i < Math.min(lines.length, 20); i++) {
    const match = lines[i].match(new RegExp(`^${chapterNum}\\s*[.:\\-—–]\\s*(.+)`, 'i'));
    if (match && match[1].trim().length >= 3 && match[1].trim().length <= 200 && !isJunk(match[1])) {
      return match[1].trim();
    }
  }
  
  // Strategy 3: Find the first non-junk line that looks like a title
  //   (between 5-150 chars, not all numbers, not too many special chars)
  for (let i = 0; i < Math.min(lines.length, 25); i++) {
    const line = lines[i];
    if (line.length < 5 || line.length > 150) continue;
    if (isJunk(line)) continue;
    if (/^[\d\s.]+$/.test(line)) continue;  // All numbers/dots
    if ((line.match(/[^a-zA-Z0-9\s]/g) || []).length > line.length * 0.3) continue; // Too many special chars
    
    // Clean up: remove leading "Chapter N" prefix
    let cleaned = line.replace(/^chapter\s*\d+\s*/i, '').trim();
    if (cleaned.length < 3) continue;
    
    // Remove trailing page numbers or year references
    cleaned = cleaned.replace(/\s+\d{1,3}\s+\d{4}-\d{2,4}\s*$/, '').trim();
    cleaned = cleaned.replace(/\s+\d{1,3}\s*$/, '').trim();
    
    if (cleaned.length >= 3 && cleaned.length <= 200) {
      return cleaned;
    }
  }
  
  // Fallback: generic title
  return `Chapter ${chapterNum}`;
}

async function processBook(book) {
  console.log(`\n📚 Processing: Class ${book.classNum} ${book.subject}${book.subSubject ? ` (${book.subSubject})` : ''} — ${book.bookTitle} [${book.bookCode}]`);
  
  let seeded = 0;
  let failed = 0;
  
  for (let ch = 1; ch <= book.maxChapters; ch++) {
    // Delay between downloads
    if (ch > 1) await new Promise(r => setTimeout(r, DELAY_MS));
    
    const pdfBuffer = await downloadChapterPdf(book.bookCode, ch);
    if (!pdfBuffer) {
      // If chapter 1 fails, the book code might be wrong
      if (ch === 1) {
        console.log(`  ❌ Chapter 1 not found — skipping entire book (code might be wrong)`);
        return { seeded: 0, failed: 0, skipped: true };
      }
      // Otherwise, we might have reached the last chapter
      console.log(`  ⏭️  Chapter ${ch} not found — assuming end of book`);
      break;
    }
    
    try {
      const text = await extractTextFromPdfBuffer(pdfBuffer);
      
      if (text.length < 100) {
        console.log(`  ⚠️  Chapter ${ch}: extracted text too short (${text.length} chars), skipping`);
        failed++;
        continue;
      }
      
      const chapterTitle = extractChapterTitle(text, ch);
      
      const displaySubject = book.subSubject
        ? `${book.subject} - ${book.subSubject}`
        : book.subject;
      
      const sections = splitIntoSections(text, chapterTitle);
      const wordCount = text.split(/\s+/).length;
      
      const chapterData = {
        class_num: book.classNum,
        subject: book.subject,
        chapter_num: ch,
        chapter_title: chapterTitle.substring(0, 200),
        language: 'english',
        content_json: {
          sections,
          bookTitle: book.bookTitle,
          subSubject: book.subSubject || null
        },
        learning_objectives: [],
        word_count: wordCount
      };
      
      const { error } = await supabase.from('chapters').upsert(chapterData, {
        onConflict: 'class_num,subject,chapter_num,language'
      });
      
      if (error) {
        console.log(`  ❌ Chapter ${ch}: DB error — ${error.message}`);
        failed++;
      } else {
        console.log(`  ✅ Chapter ${ch}: ${chapterTitle.substring(0, 60)} (${wordCount} words)`);
        seeded++;
      }
    } catch (err) {
      console.log(`  ❌ Chapter ${ch}: extraction error — ${err.message}`);
      failed++;
    }
  }
  
  return { seeded, failed, skipped: false };
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  AbhyasAI — NCERT PDF Download & Seed Script');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Total books in catalog: ${ncertCatalog.length}`);
  console.log(`PDF base URL: ${NCERT_PDF_BASE}`);
  console.log('');
  
  let totalSeeded = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  
  for (const book of ncertCatalog) {
    const result = await processBook(book);
    totalSeeded += result.seeded;
    totalFailed += result.failed;
    if (result.skipped) totalSkipped++;
  }
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log(`  DONE`);
  console.log(`  Chapters seeded: ${totalSeeded}`);
  console.log(`  Chapters failed: ${totalFailed}`);
  console.log(`  Books skipped (bad code): ${totalSkipped}`);
  console.log('═══════════════════════════════════════════════════');
  
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
