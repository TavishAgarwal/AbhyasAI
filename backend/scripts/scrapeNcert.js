// backend/scripts/scrapeNcert.js
// NCERT chapter title scraper — Puppeteer + PDF title extraction
//
// The NCERT website sidebar only shows "Chapter 1", "Chapter 2", etc.
// (not the actual titles). We must:
//   1. Visit each book page to count chapters & get PDF URLs
//   2. Download the first page of each chapter PDF
//   3. Extract the chapter title from the PDF text
//
// No chapter titles are hardcoded — every title comes from the NCERT source.

const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ncertCatalog = require('./ncertCatalog');

// Only scrape Classes 1–8
const CLASSES_TO_SCRAPE = [1, 2, 3, 4, 5, 6, 7, 8];

// Map NCERT book subject → DB subject name
const SUBJECT_MAPPING = {
  'Mathematics': 'Mathematics',
  'Math Magic': 'Mathematics',
  'Joyful Mathematics': 'Mathematics',
  'Maths Mela': 'Mathematics',
  'Math Mela': 'Mathematics',
  'Science': 'Science',
  'Curiosity (Science)': 'Science',
  'English': 'English',
  'Mridang': 'English',
  'Marigold': 'English',
  'Honeysuckle': 'English',
  'Honeydew': 'English',
  'An Alien Hand': 'English',
  'A Pact With the Sun': 'English',
  'It So Happened': 'English',
  'English Textbook': 'English',
  'English Supplementary': 'English',
  'English (Marigold)': 'English',
  'Hindi': 'Hindi',
  'Rimjhim': 'Hindi',
  'Vasant': 'Hindi',
  'Durva': 'Hindi',
  'Bal Ram Katha': 'Hindi',
  'Sarangi': 'Hindi',
  'Veena': 'Hindi',
  'Santoor': 'Hindi',
  'Bansuri - I': 'Hindi',
  'Social Science': 'Social Science',
  'Exploring Society': 'Social Science',
  'Knowledge Tradition': 'Social Science',
  'Our Pasts II': 'Social Science',
  'Our Pasts III Part 1': 'Social Science',
  'Our Pasts III Part 2': 'Social Science',
  'Our Environment': 'Social Science',
  'Social and Political Life II': 'Social Science',
  'Social and Political Life III': 'Social Science',
  'Resources and Development': 'Social Science',
  'Geography': 'Social Science',
  'Geography Practical': 'Social Science',
  'Geography Part 2': 'Social Science',
  'EVS': 'EVS',
  'Looking Around': 'EVS',
  'Our Wondrous World': 'EVS',
  'Aas Paas': 'EVS',
  'Environmental Studies': 'EVS',
  'Sanskrit': 'Sanskrit',
};

function mapSubjectName(bookTitle) {
  if (SUBJECT_MAPPING[bookTitle]) return SUBJECT_MAPPING[bookTitle];
  for (const [key, value] of Object.entries(SUBJECT_MAPPING)) {
    if (bookTitle.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return 'Unknown';
}

/**
 * Visit a book page and extract the chapter count + chapter numbers from the sidebar.
 * The sidebar shows entries like "Chapter 1 (Open)", "Chapter 2 (Open)", etc.
 */
async function scrapeBookSidebar(browser, book) {
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  // Visit chapter 1 to load the full sidebar
  const url = `https://ncert.nic.in/textbook.php?${book.bookCode}=1-1`;

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    // Extract all chapter entries from the sidebar
    const sidebarData = await page.evaluate((bookCode) => {
      const chapters = [];
      const bookTitle = '';

      // Find the book title from the header row (bgcolor #981F4D)
      const headerTd = document.querySelector('td.st1[bgcolor="#981F4D"]');
      const displayTitle = headerTd ? headerTd.textContent.trim() : '';

      // Find all chapter links
      const links = document.querySelectorAll('a');
      for (const link of links) {
        const href = link.getAttribute('href') || '';
        // Match: textbook.php?bookcode=N-N
        const match = href.match(new RegExp(bookCode + '=(\\d+)-(\\d+)'));
        if (match) {
          const chNum = parseInt(match[1]);
          if (chNum > 0) { // Skip prelims (ps-1)
            chapters.push(chNum);
          }
        }
      }

      // De-duplicate and sort
      const unique = [...new Set(chapters)].sort((a, b) => a - b);
      return { displayTitle, chapterNums: unique };
    }, book.bookCode);

    await page.close();
    return sidebarData;
  } catch (err) {
    console.error(`  Sidebar error for ${book.bookCode}: ${err.message}`);
    await page.close();
    return { displayTitle: '', chapterNums: [] };
  }
}

/**
 * Extract the chapter title from the first page of a PDF.
 * Downloads just enough of the PDF to get the title.
 */
async function extractTitleFromPdf(pdfUrl) {
  try {
    // Download the PDF
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

    // Only need first 2 pages at most for title extraction
    const maxPages = Math.min(pdf.numPages, 2);
    let allText = '';

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      // Sort items by vertical position (top of page first), then horizontal
      const items = content.items
        .filter(item => item.str && item.str.trim().length > 0)
        .sort((a, b) => {
          const yDiff = b.transform[5] - a.transform[5]; // Higher Y = closer to top
          if (Math.abs(yDiff) > 5) return yDiff;
          return a.transform[4] - b.transform[4]; // Left to right
        });

      // Build text preserving structure — ADD SPACE between items on same line
      let pageText = '';
      let lastY = null;
      let lastX = 0;
      for (const item of items) {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          pageText += '\n';
          lastX = 0;
        } else if (lastY !== null && item.transform[4] > lastX + 2) {
          // Items on the same line with a gap — add space
          pageText += ' ';
        }
        pageText += item.str;
        lastY = item.transform[5];
        lastX = item.transform[4] + (item.width || item.str.length * 6);
      }

      allText += pageText + '\n';
    }

    return extractTitleFromText(allText);
  } catch (err) {
    return null;
  }
}

/**
 * Parse the extracted PDF text to find the chapter title.
 * NCERT PDFs have varying layouts:
 *   - Title above "Chapter N" (most common in newer books)
 *   - "Chapter N" followed by title on the next line
 *   - "N. Title" pattern
 *   - "Unit N: Title" pattern
 */
function extractTitleFromText(text) {
  // Clean text
  const cleaned = text
    .replace(/©\s*NCERT[^\n]*/gi, '')
    .replace(/not to be republished/gi, '')
    .replace(/Rationalised\s+\d{4}-\d{2,4}/gi, '')
    .replace(/Reprint\s+\d{4}[-–]\d{2,4}/gi, '')
    .replace(/\d{4}[-–]\d{2,4}\s*$/gm, '')
    .trim();

  const lines = cleaned.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  function isJunkTitle(s) {
    const t = s.trim();
    return (
      t.length < 4 ||
      /^\d+$/.test(t) ||
      /^chapter\s*\d*$/i.test(t) ||
      /^unit\s*\d*$/i.test(t) ||
      /ncert/i.test(t) ||
      /copyright/i.test(t) ||
      /rationalised/i.test(t) ||
      /^reprint/i.test(t) ||
      /^introduction$/i.test(t) ||
      /^prelims?$/i.test(t) ||
      /^\(open\)$/i.test(t) ||
      /^class\s|^grade\s/i.test(t) ||
      /^\d{4}[-–]/i.test(t) ||
      /^let us (read|sing|recite)$/i.test(t) ||
      /^picture reading$/i.test(t) ||
      /^contents?$/i.test(t) ||
      /^foreword$/i.test(t) ||
      /^preface$/i.test(t) ||
      /^acknowledgement/i.test(t) ||
      /^textbook/i.test(t)
    );
  }

  // Strategy 0: Title appears BEFORE "Chapter N" (common in new NCERT books)
  for (let i = 0; i < lines.length; i++) {
    if (/^chapter\s*\d+$/i.test(lines[i]) || /^chapter$/i.test(lines[i])) {
      for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
        const candidate = cleanTitle(lines[j]);
        if (candidate.length >= 4 && candidate.length <= 120 && !isJunkTitle(candidate)) {
          return candidate;
        }
      }
    }
  }

  // Strategy 1: "Chapter N" on the same line with title, or title on next line
  for (let i = 0; i < lines.length; i++) {
    if (/^chapter\s+\d+/i.test(lines[i])) {
      const sameLine = lines[i].replace(/^chapter\s+\d+\s*[:\-—–.]*\s*/i, '').trim();
      if (sameLine.length > 3 && !isJunkTitle(sameLine)) {
        return cleanTitle(sameLine);
      }
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        const next = cleanTitle(lines[j]);
        if (next.length > 3 && !isJunkTitle(next)) {
          return next;
        }
      }
    }
  }

  // Strategy 2: "Unit N" pattern (English textbooks)
  for (let i = 0; i < lines.length; i++) {
    if (/^unit\s+\d+/i.test(lines[i])) {
      const sameLine = lines[i].replace(/^unit\s+\d+\s*[:\-—–.]*\s*/i, '').trim();
      if (sameLine.length > 3 && !isJunkTitle(sameLine)) return cleanTitle(sameLine);
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        const next = cleanTitle(lines[j]);
        if (next.length > 3 && !isJunkTitle(next)) return next;
      }
    }
  }

  // Strategy 3: "Lesson N" pattern
  for (let i = 0; i < lines.length; i++) {
    if (/^lesson\s+\d+/i.test(lines[i])) {
      const sameLine = lines[i].replace(/^lesson\s+\d+\s*[:\-—–.]*\s*/i, '').trim();
      if (sameLine.length > 3 && !isJunkTitle(sameLine)) return cleanTitle(sameLine);
      if (i + 1 < lines.length && !isJunkTitle(lines[i + 1])) return cleanTitle(lines[i + 1]);
    }
  }

  // Strategy 4: "N. Title" pattern (like "1. KNOWING OUR NUMBERS")
  for (const line of lines.slice(0, 15)) {
    const match = line.match(/^\d+[.)]\s+(.{4,100})$/);
    if (match && !isJunkTitle(match[1])) return cleanTitle(match[1]);
  }

  // Strategy 5: First prominent line that looks like a title
  for (const line of lines.slice(0, 20)) {
    const c = cleanTitle(line);
    if (c.length >= 5 && c.length <= 100 && !isJunkTitle(c) &&
        !/mathematics|science|english|hindi|social/i.test(c)) {
      return c;
    }
  }

  return null;
}

function cleanTitle(title) {
  let t = title
    .replace(/^\d+[.)\s]*(?=[A-Z])/,  '') // Remove leading number stuck to title (e.g. "2Shapes" → "Shapes")
    .replace(/^\d+[.)]\s*/,           '') // Remove leading "1. " or "2) "
    .replace(/\s+/g,                   ' ')// Collapse whitespace
    .replace(/^["']+|["']+$/g,         '') // Remove quotes
    .replace(/(.{5,})\1/,        '$1') // Remove exact duplicates ("FoodFood" → "Food")
    .trim();

  // If the title still starts with a digit that touches a letter (e.g. "3Fun"), strip it
  t = t.replace(/^\d+(?=[A-Z])/, '').trim();

  return t;
}

async function scrapeNcert() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  AbhyasAI — NCERT Chapter Scraper (Puppeteer)');
  console.log('═══════════════════════════════════════════════════');
  console.log('Strategy: Sidebar for chapter count → PDF for titles');
  console.log(`Classes to scrape: ${CLASSES_TO_SCRAPE.join(', ')}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  // Filter catalog to Classes 1-8
  const booksToScrape = ncertCatalog.filter(
    b => CLASSES_TO_SCRAPE.includes(b.classNum)
  );

  console.log(`Total books to scrape: ${booksToScrape.length}\n`);

  const manifest = [];

  for (const book of booksToScrape) {
    console.log(`\n📚 Class ${book.classNum} — ${book.bookTitle} [${book.bookCode}]`);

    // Step 1: Get sidebar chapter count
    const sidebar = await scrapeBookSidebar(browser, book);
    let chapterNums = sidebar.chapterNums;

    // If sidebar returned 0 or 1 chapter, use maxChapters from catalog as fallback
    if (chapterNums.length <= 1 && book.maxChapters > 1) {
      console.log(`  Sidebar found ${chapterNums.length} chapters, using catalog maxChapters=${book.maxChapters}`);
      chapterNums = Array.from({ length: book.maxChapters }, (_, i) => i + 1);
    }

    console.log(`  Display title: "${sidebar.displayTitle || book.bookTitle}"`);
    console.log(`  Chapters to process: ${chapterNums.length}`);

    // Step 2: For each chapter, extract title from PDF
    const chapters = [];
    for (const chNum of chapterNums) {
      const pdfUrl = `https://ncert.nic.in/textbook/pdf/${book.bookCode}${String(chNum).padStart(2, '0')}.pdf`;

      process.stdout.write(`  Ch${chNum}: `);
      const title = await extractTitleFromPdf(pdfUrl);

      if (title) {
        chapters.push({
          num: chNum,
          title: title,
          pdfUrl: pdfUrl,
          rawValue: book.bookCode
        });
        console.log(`"${title}"`);
      } else {
        console.log('⚠ Could not extract title (PDF may not exist)');
      }

      // Polite delay between PDF downloads
      await new Promise(r => setTimeout(r, 800));
    }

    const dbSubject = mapSubjectName(book.bookTitle);

    manifest.push({
      class: book.classNum,
      subjectDisplay: sidebar.displayTitle || book.bookTitle,
      subjectDb: dbSubject,
      bookCode: book.bookCode,
      subSubject: book.subSubject || null,
      chapters
    });

    console.log(`  ✅ ${chapters.length}/${chapterNums.length} chapter titles extracted`);

    // Polite delay between books
    await new Promise(r => setTimeout(r, 1500));
  }

  await browser.close();

  // Save manifest
  const outputDir = path.join(__dirname, '../data');
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'ncertManifest.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

  // Print summary
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  SCRAPE COMPLETE');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Total books processed: ${manifest.length}`);
  const totalChapters = manifest.reduce((sum, m) => sum + m.chapters.length, 0);
  console.log(`Total chapters found: ${totalChapters}`);
  console.log(`Manifest saved to: ${outputPath}`);

  const unmapped = manifest.filter(m => m.subjectDb === 'Unknown');
  if (unmapped.length > 0) {
    console.log('\n⚠ Unmapped subjects:');
    unmapped.forEach(m => console.log(`  Class ${m.class}: "${m.subjectDisplay}" [${m.bookCode}]`));
  }

  const empty = manifest.filter(m => m.chapters.length === 0);
  if (empty.length > 0) {
    console.log('\n⚠ Books with 0 chapters:');
    empty.forEach(m => console.log(`  Class ${m.class}: "${m.subjectDisplay}" [${m.bookCode}]`));
  }

  console.log('\nBreakdown by class:');
  for (const cls of CLASSES_TO_SCRAPE) {
    const classBooks = manifest.filter(m => m.class === cls);
    const classChapters = classBooks.reduce((s, m) => s + m.chapters.length, 0);
    const subjects = [...new Set(classBooks.map(m => m.subjectDb))].join(', ');
    console.log(`  Class ${cls}: ${classChapters} chapters — ${subjects}`);
  }

  return manifest;
}

scrapeNcert().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
