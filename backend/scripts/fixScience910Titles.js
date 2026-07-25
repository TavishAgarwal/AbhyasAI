// backend/scripts/fixScience910Titles.js
// Fix the chapter titles for Class 9-10 Physics/Chemistry/Biology
// The PDF extraction pulled wrong titles due to NCERT book code reassignment.
// This script updates all rows to use the correct, verified chapter titles.

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Verified NCERT Class 9 Science chapter titles and branches
const CLASS_9 = [
  { ch: 1,  subject: 'Chemistry', title: 'Matter in Our Surroundings' },
  { ch: 2,  subject: 'Chemistry', title: 'Is Matter Around Us Pure' },
  { ch: 3,  subject: 'Biology',   title: 'The Fundamental Unit of Life' },
  { ch: 4,  subject: 'Biology',   title: 'Tissues' },
  { ch: 5,  subject: 'Biology',   title: 'Diversity in Living Organisms' },
  { ch: 6,  subject: 'Biology',   title: 'Why Do We Fall Ill' },
  { ch: 7,  subject: 'Biology',   title: 'Natural Resources' },
  { ch: 8,  subject: 'Physics',   title: 'Motion' },
  { ch: 9,  subject: 'Physics',   title: 'Force and Laws of Motion' },
  { ch: 10, subject: 'Physics',   title: 'Gravitation' },
  { ch: 11, subject: 'Physics',   title: 'Work and Energy' },
  { ch: 12, subject: 'Physics',   title: 'Sound' },
  { ch: 13, subject: 'Biology',   title: 'Improvement in Food Resources' },
];

// Verified NCERT Class 10 Science chapter titles and branches
const CLASS_10 = [
  { ch: 1,  subject: 'Chemistry', title: 'Chemical Reactions and Equations' },
  { ch: 2,  subject: 'Chemistry', title: 'Acids, Bases and Salts' },
  { ch: 3,  subject: 'Chemistry', title: 'Metals and Non-metals' },
  { ch: 4,  subject: 'Chemistry', title: 'Carbon and its Compounds' },
  { ch: 5,  subject: 'Chemistry', title: 'Periodic Classification of Elements' },
  { ch: 6,  subject: 'Biology',   title: 'Life Processes' },
  { ch: 7,  subject: 'Biology',   title: 'Control and Coordination' },
  { ch: 8,  subject: 'Biology',   title: 'How do Organisms Reproduce?' },
  { ch: 9,  subject: 'Biology',   title: 'Heredity and Evolution' },
  { ch: 10, subject: 'Physics',   title: 'Light - Reflection and Refraction' },
  { ch: 11, subject: 'Physics',   title: 'Human Eye and Colourful World' },
  { ch: 12, subject: 'Physics',   title: 'Electricity' },
  { ch: 13, subject: 'Physics',   title: 'Magnetic Effects of Electric Current' },
  { ch: 14, subject: 'Biology',   title: 'Our Environment' },
  { ch: 15, subject: 'Biology',   title: 'Management of Natural Resources' },
  { ch: 16, subject: 'Physics',   title: 'Sources of Energy' },
];

async function run() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  Fix Class 9-10 Science Titles');
  console.log('═══════════════════════════════════════════════════\n');

  // First, delete ALL existing Physics/Chemistry/Biology for 9-10
  // to start clean (the previous run inserted with wrong titles + wrong branch assignments)
  for (const cls of [9, 10]) {
    for (const subj of ['Physics', 'Chemistry', 'Biology', 'Science']) {
      await supabase
        .from('chapters')
        .delete()
        .eq('class_num', cls)
        .eq('subject', subj);
    }
  }
  console.log('Cleared all Science/Physics/Chemistry/Biology for Classes 9-10\n');

  const configs = [
    { classNum: 9, chapters: CLASS_9 },
    { classNum: 10, chapters: CLASS_10 },
  ];

  for (const { classNum, chapters } of configs) {
    console.log(`📚 Class ${classNum}`);
    let ok = 0;

    for (const entry of chapters) {
      const row = {
        class_num: classNum,
        subject: entry.subject,
        chapter_num: entry.ch,
        chapter_title: entry.title,
        language: 'english',
        content_json: {
          sections: [{ heading: entry.title, content: '', type: 'text' }],
          bookTitle: `Science (${entry.subject})`,
          pdfUrl: `https://ncert.nic.in/textbook/pdf/${classNum === 9 ? 'iesc1' : 'jesc1'}${String(entry.ch).padStart(2, '0')}.pdf`
        },
        learning_objectives: [
          `Understand the key concepts of ${entry.title}`,
          `Identify and explain the main ideas covered in this chapter`,
          `Apply knowledge from ${entry.title} to solve problems`,
          `Recall important terms and definitions`
        ],
        word_count: 0
      };

      const { error } = await supabase
        .from('chapters')
        .upsert(row, {
          onConflict: 'class_num,subject,chapter_num,language',
          ignoreDuplicates: false
        });

      if (error) {
        console.log(`  ✗ Ch${entry.ch} ${entry.subject}: ${entry.title} — ${error.message}`);
      } else {
        console.log(`  ✓ Ch${String(entry.ch).padStart(2)} ${entry.subject.padEnd(9)}: ${entry.title}`);
        ok++;
      }
    }
    console.log(`  ✅ ${ok}/${chapters.length} inserted\n`);
  }

  // Verify
  console.log('═══════════════════════════════════════════════════');
  console.log('  FINAL VERIFICATION');
  console.log('═══════════════════════════════════════════════════\n');

  for (const cls of [9, 10]) {
    console.log(`Class ${cls}:`);
    for (const subj of ['Physics', 'Chemistry', 'Biology']) {
      const { data } = await supabase
        .from('chapters')
        .select('chapter_num, chapter_title')
        .eq('class_num', cls)
        .eq('subject', subj)
        .order('chapter_num');

      console.log(`  ${subj} (${data?.length || 0} chapters):`);
      data?.forEach(ch => console.log(`    Ch${ch.chapter_num}: ${ch.chapter_title}`));
    }
    console.log();
  }

  // Confirm no "Science" remains
  const { count } = await supabase
    .from('chapters')
    .select('*', { count: 'exact', head: true })
    .in('class_num', [9, 10])
    .eq('subject', 'Science');
  console.log(`"Science" rows remaining for 9-10: ${count}`);
}

run().catch(console.error);
