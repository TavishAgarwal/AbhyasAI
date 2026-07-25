// backend/scripts/seedChapters.js
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { supabase } = require('../services/supabaseClient');
const chapters = require('./chapterData');

async function main() {
  console.log(`Seeding ${chapters.length} chapters...`);
  let count = 0;
  for (const ch of chapters) {
    const { error } = await supabase.from('chapters').upsert(ch, {
      onConflict: 'class_num,subject,chapter_num,language'
    });
    if (error) {
      console.error(`Failed: Class ${ch.class_num} ${ch.subject} Ch${ch.chapter_num} — ${error.message}`);
    } else {
      console.log(`Seeded: Class ${ch.class_num} ${ch.subject} Ch${ch.chapter_num} — ${ch.chapter_title}`);
      count++;
    }
  }
  console.log(`Seeded ${count} chapters successfully`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
