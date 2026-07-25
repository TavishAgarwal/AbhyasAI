// backend/services/cacheService.js
// In-memory cache with 7-day TTL for library chapters

const NodeCache = require('node-cache');
const { supabase } = require('./supabaseClient');
const promptChain = require('./promptChain');

const cache = new NodeCache({
  stdTTL: 7 * 24 * 60 * 60, // 7 days
  checkperiod: 3600           // check every hour
});

function get(key) {
  return cache.get(key);
}

function set(key, value, ttl) {
  return cache.set(key, value, ttl || 7 * 24 * 60 * 60);
}

function del(key) {
  return cache.del(key);
}

// Demo chapters to pre-cache on startup
// These match the seeded NCERT data (Classes 1-8, English-medium)
const DEMO_CHAPTERS = [
  { classNum: 6, subject: 'Science', chapterNum: 1 },
  { classNum: 6, subject: 'Mathematics', chapterNum: 1 },
  { classNum: 7, subject: 'Science', chapterNum: 1 },
  { classNum: 8, subject: 'Science', chapterNum: 1 },
  { classNum: 8, subject: 'Mathematics', chapterNum: 1 }
];

async function warmCache() {
  console.log(`[${new Date().toISOString()}] Starting cache warm...`);

  for (const demo of DEMO_CHAPTERS) {
    const cacheKey = `demo_${demo.classNum}_${demo.subject}_${demo.chapterNum}`;

    // Skip if already cached
    if (cache.get(cacheKey)) {
      console.log(`Already cached: Class ${demo.classNum} ${demo.subject} Ch${demo.chapterNum}`);
      continue;
    }

    try {
      // Fetch chapter from DB
      const { data: chapter, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('class_num', demo.classNum)
        .eq('subject', demo.subject)
        .eq('chapter_num', demo.chapterNum)
        .single();

      if (error || !chapter) {
        console.log(`Cache warm skipped: Class ${demo.classNum} ${demo.subject} Ch${demo.chapterNum} — not in DB yet`);
        continue;
      }

      // Extract text from content_json sections
      const sections = chapter.content_json?.sections || [];
      const chapterText = sections
        .map(s => `${s.heading}\n${s.content}`)
        .join('\n\n');

      if (chapterText.length < 100) {
        console.log(`Cache warm skipped: ${demo.subject} Ch${demo.chapterNum} — insufficient text`);
        continue;
      }

      // Run prompt chain with all three versions
      const result = await promptChain.run({
        chapterText,
        language: 'english',
        versionsToGenerate: ['standard', 'dyslexia', 'adhd']
      });

      // Cache with 7-day TTL
      cache.set(cacheKey, {
        ...result,
        chapterId: chapter.id,
        chapterMeta: {
          class: chapter.class_num,
          subject: chapter.subject,
          chapterNum: chapter.chapter_num,
          title: chapter.chapter_title
        }
      }, 7 * 24 * 60 * 60);

      console.log(`Cached: Class ${demo.classNum} ${demo.subject} Ch${demo.chapterNum}`);
    } catch (err) {
      console.log(`Cache warm failed: ${demo.subject} Ch${demo.chapterNum} — ${err.message}`);
    }
  }

  console.log(`[${new Date().toISOString()}] Cache warm complete`);
}

module.exports = { get, set, del, warmCache };
