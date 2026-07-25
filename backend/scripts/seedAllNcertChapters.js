// backend/scripts/seedAllNcertChapters.js
// Reads extracted chapter JSONs and upserts into Supabase chapters table
// English version gets priority when multiple books map to same subject

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Priority order for books within the same subject
// Lower index = higher priority. English-language books prioritised.
const BOOK_PRIORITY = {
  // Class 1-2: New NCF books (Mridang, Joyful Math) over old ones
  'aemr1': 1, 'aejm1': 1,    // Class 1 Mridang, Joyful Math
  'bemr1': 1, 'bejm1': 1,    // Class 2 Mridang, Joyful Math

  // Class 3-5: New NCF English books over old Marigold
  'ceky1': 1, 'cemm1': 1, 'ceev1': 1,  // Class 3
  'deky1': 1, 'demm1': 1, 'deev1': 1,  // Class 4
  'eeky1': 1, 'eemh1': 1, 'eeev1': 1,  // Class 5 new
  'eeen1': 2, 'eemm1': 2, 'eeap1': 2,  // Class 5 old

  // Class 6-8: Main English textbooks
  'fekb1': 1, 'feky1': 2, 'fees1': 3,  // Class 6 English
  'fecu1': 1,                            // Class 6 Science
  'fepr1': 1, 'fekr1': 2, 'fegp1': 3,  // Class 6 Social Science

  'gekb1': 1, 'geky1': 2, 'geah1': 3, 'gees2': 4,  // Class 7 English
  'gecu1': 1, 'gesc1': 2,                             // Class 7 Science
  'gess1': 1, 'gess2': 2, 'gess3': 3, 'gepr1': 4, 'gekr1': 5, 'gegp1': 6, 'gegp2': 7, // Class 7 SS

  'hekb1': 1, 'heky1': 2, 'hekr1': 3, 'heih1': 4,   // Class 8 English
  'hecu1': 1, 'hesc1': 2,                              // Class 8 Science
  'hemh1': 1,                                           // Class 8 Math
  'hehd1': 1, 'hess2': 2, 'hess3': 3, 'hess4': 4, 'hepr1': 5, 'hegp1': 6, // Class 8 SS
};

function getBookPriority(bookCode) {
  return BOOK_PRIORITY[bookCode] || 50;
}

async function seedAll() {
  const chaptersDir = path.join(__dirname, '../data/chapters');
  if (!fs.existsSync(chaptersDir)) {
    console.error('chapters directory not found. Run extractNcertText.js first.');
    process.exit(1);
  }

  const files = fs.readdirSync(chaptersDir)
    .filter(f => f.endsWith('.json'))
    .sort();

  console.log('═══════════════════════════════════════════════════');
  console.log('  AbhyasAI — Seed NCERT Chapters to Supabase');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Target: ${process.env.SUPABASE_URL}`);
  console.log(`Files found: ${files.length}\n`);

  // Group by (class, subject, chapterNum) to handle priority
  const grouped = {};
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(chaptersDir, file), 'utf8'));
    const key = `${data.class}_${data.subject}_${data.chapterNum}`;

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push({ file, data });
  }

  // For each group, pick the highest-priority book
  const toSeed = [];
  for (const [key, entries] of Object.entries(grouped)) {
    // Sort by priority (lower = better)
    entries.sort((a, b) =>
      getBookPriority(a.data.bookCode) - getBookPriority(b.data.bookCode)
    );
    toSeed.push(entries[0]); // Take highest priority
  }

  // Sort for consistent ordering
  toSeed.sort((a, b) => {
    if (a.data.class !== b.data.class) return a.data.class - b.data.class;
    if (a.data.subject !== b.data.subject) return a.data.subject.localeCompare(b.data.subject);
    return a.data.chapterNum - b.data.chapterNum;
  });

  console.log(`Unique chapters to seed: ${toSeed.length}\n`);

  let inserted = 0;
  let skipped = 0;
  let failed = 0;

  for (const { file, data } of toSeed) {
    // Skip bad data
    if (!data.sections || data.sections.length === 0) {
      console.log(`SKIP (no sections): ${file}`);
      skipped++;
      continue;
    }
    if (data.wordCount < 100) {
      console.log(`SKIP (too short): ${file} — ${data.wordCount} words`);
      skipped++;
      continue;
    }
    if (data.subject === 'Unknown' || !data.subject) {
      console.log(`SKIP (unmapped): ${file}`);
      skipped++;
      continue;
    }

    const row = {
      class_num: data.class,
      subject: data.subject,
      chapter_num: data.chapterNum,
      chapter_title: data.title.substring(0, 200),
      language: 'english',
      content_json: {
        sections: data.sections,
        bookTitle: data.subjectDisplay,
        subSubject: data.subSubject || null,
        pdfUrl: data.pdfUrl
      },
      learning_objectives: data.learningObjectives,
      word_count: data.wordCount
    };

    const { error } = await supabase
      .from('chapters')
      .upsert(row, {
        onConflict: 'class_num,subject,chapter_num,language',
        ignoreDuplicates: false
      });

    if (error) {
      console.error(`FAILED: ${file} — ${error.message}`);
      failed++;
    } else {
      console.log(`✓ Class ${data.class} ${data.subject} Ch${data.chapterNum} — ${data.title.substring(0, 60)}`);
      inserted++;
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  SEEDING COMPLETE`);
  console.log(`  Inserted/Updated: ${inserted}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total processed: ${toSeed.length}`);
  console.log(`═══════════════════════════════════════════════════`);

  // Verify by querying the DB
  const { count } = await supabase
    .from('chapters')
    .select('*', { count: 'exact', head: true });

  console.log(`\nTotal chapters in database: ${count}`);

  // Print breakdown
  const { data: breakdown } = await supabase
    .from('chapters')
    .select('class_num, subject')
    .order('class_num')
    .order('subject');

  if (breakdown) {
    const summary = {};
    breakdown.forEach(row => {
      const key = `Class ${row.class_num}`;
      if (!summary[key]) summary[key] = { subjects: new Set(), count: 0 };
      summary[key].subjects.add(row.subject);
      summary[key].count++;
    });

    console.log('\nDatabase contents:');
    Object.entries(summary).forEach(([cls, info]) => {
      console.log(`  ${cls}: ${info.count} chapters — ${[...info.subjects].join(', ')}`);
    });
  }
}

seedAll().catch(err => { console.error(err); process.exit(1); });
