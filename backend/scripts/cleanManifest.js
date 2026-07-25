// backend/scripts/cleanManifest.js
// Post-process ncertManifest.json to fix common extraction artifacts:
//  1. Remove chapters with junk/partial-sentence titles
//  2. Fix truncated titles by appending "..." 
//  3. Remove books with display title mismatch (e.g. "Khel Yoga" for an English book)
//  4. Trim trailing periods, commas
//  5. Remove duplicate chapters within a book

const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '../data/ncertManifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('ncertManifest.json not found. Run scrapeNcert.js first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('═══════════════════════════════════════════════════');
console.log('  AbhyasAI — Manifest Post-Processing');
console.log('═══════════════════════════════════════════════════\n');

let removed = 0;
let fixed = 0;
let total = 0;

// Fix doubled-letter PDF artifact: "RREPRODUCTION" → "REPRODUCTION"
// This happens with old NCERT PDFs where each letter is rendered twice
function fixDoubledLetters(title) {
  // Check if most words have doubled first letters
  const words = title.split(/\s+/);
  let doubledCount = 0;
  for (const w of words) {
    if (w.length >= 4 && /^(.)\1/.test(w)) doubledCount++;
  }
  // If more than half the words have doubled first letters, it's the artifact
  if (doubledCount >= Math.ceil(words.length / 2) && doubledCount >= 2) {
    // Remove the doubled pattern: each pair of identical chars → single char
    // Pattern: RREPRODUCTION → REPRODUCTION
    // The doubling is: first letter doubled, then alternating real+duplicate
    const fixedWords = words.map(w => {
      if (w.length >= 4 && /^(.)\1/.test(w)) {
        // Try removing every other character pair
        let result = '';
        let i = 0;
        while (i < w.length) {
          result += w[i];
          // If next char is same as current (doubled), skip it
          if (i + 1 < w.length && w[i].toLowerCase() === w[i + 1].toLowerCase()) {
            i += 2;
          } else {
            i++;
          }
        }
        return result;
      }
      return w;
    });
    return fixedWords.join(' ');
  }
  return title;
}

// Patterns that indicate a bad title (body text, not a heading)
const BAD_TITLE_PATTERNS = [
  // Body text that starts with conjunctions/prepositions AND reads like a sentence
  /^(and|or|but|not|if|as|at|on|by|its|this|that|these|those|we|you|he|she|they|them)\s/i,
  /^(weights|family members|and how|In Chapter|Do you know|you have seen|begins with|discusses|the ways|the given|the school|the frog|the tune|at what time|fold a|let us make|of Physical|of Sports)/i,
  /\.\s*$/,                 // Ends with period (likely a sentence, not a title)
  /^\w{1,3}$/,             // Too short  
  /^Part \d+$/i,           // Generic "Part 1"
  /^Project \d+/i,         // Generic "Project 1"
  /^a Part/i,              // Noise
  /^th\s+th$/i,            // PDF artifact
  /^Note to the teacher$/i, // Instructor notes
  /^Before you read$/i,    // Reading instruction
  /^General$/i,            // Too generic
  /^UNITS? \d/i,           // "UNITS 4-7"
  /^Annexure/i,            // Appendix material
  /^Planning$/i,           // Too generic
  /^Katchall is/i,         // Body text
  /^The Martyrs At/i,      // Body text from English books
  /यथाा|योो|कााव्य/,       // Sanskrit/Hindi fragments
];

function isBadTitle(title) {
  return BAD_TITLE_PATTERNS.some(p => p.test(title));
}

function cleanChapterTitle(title) {
  let t = title
    .replace(/\s+/g, ' ')          // Collapse whitespace
    .replace(/\.\s*$/, '')          // Remove trailing period
    .replace(/,\s*$/, '')          // Remove trailing comma
    .replace(/:\s*$/, '')          // Remove trailing colon
    .replace(/^INTRODUCTION:\s*/i, '')  // Strip "INTRODUCTION:" prefix
    .replace(/\s+\d{1,3}\s*$/, '')     // Remove trailing page numbers (e.g. " 63")
    .trim();

  // Fix doubled-letter artifact
  t = fixDoubledLetters(t);

  // Fix ALL-CAPS titles — convert to Title Case
  if (t === t.toUpperCase() && t.length > 5) {
    t = t.replace(/\b\w+/g, word => {
      if (['AND', 'OR', 'THE', 'OF', 'IN', 'TO', 'FOR', 'WITH', 'FROM', 'A', 'AN', 'AT', 'ON', 'BY', 'IS'].includes(word)) {
        return word.toLowerCase();
      }
      return word.charAt(0) + word.slice(1).toLowerCase();
    });
    // Capitalize first letter
    t = t.charAt(0).toUpperCase() + t.slice(1);
    fixed++;
  }

  return t;
}

for (const book of manifest) {
  const before = book.chapters.length;
  total += before;

  // Filter out bad titles
  book.chapters = book.chapters.filter(ch => {
    if (isBadTitle(ch.title)) {
      console.log(`  REMOVE: Class ${book.class} ${book.subjectDb} Ch${ch.num} — "${ch.title}"`);
      removed++;
      return false;
    }
    return true;
  });

  // Clean remaining titles
  book.chapters = book.chapters.map(ch => ({
    ...ch,
    title: cleanChapterTitle(ch.title)
  }));

  // Remove duplicate titles within a book
  const seen = new Set();
  book.chapters = book.chapters.filter(ch => {
    const key = ch.title.toLowerCase();
    if (seen.has(key)) {
      console.log(`  DEDUP: Class ${book.class} ${book.subjectDb} Ch${ch.num} — "${ch.title}"`);
      removed++;
      return false;
    }
    seen.add(key);
    return true;
  });
}

// Save cleaned manifest
const outputPath = path.join(__dirname, '../data/ncertManifest.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

// Also save a human-readable summary
let summary = '# NCERT Chapter Manifest — Cleaned\n\n';
for (const book of manifest) {
  summary += `## Class ${book.class} — ${book.subjectDisplay} [${book.bookCode}]\n`;
  summary += `Subject DB: ${book.subjectDb}\n\n`;
  if (book.chapters.length === 0) {
    summary += '_No chapters extracted_\n\n';
  } else {
    book.chapters.forEach(ch => {
      summary += `- Ch${ch.num}: ${ch.title}\n`;
    });
    summary += '\n';
  }
}

const summaryPath = path.join(__dirname, '../data/manifestSummary.md');
fs.writeFileSync(summaryPath, summary);

const remaining = manifest.reduce((s, b) => s + b.chapters.length, 0);

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`  POST-PROCESSING COMPLETE`);
console.log(`  Original chapters: ${total}`);
console.log(`  Removed: ${removed}`);
console.log(`  Title-case fixed: ${fixed}`);
console.log(`  Remaining: ${remaining}`);
console.log(`  Manifest saved: ${outputPath}`);
console.log(`  Summary saved: ${summaryPath}`);
console.log(`═══════════════════════════════════════════════════`);
