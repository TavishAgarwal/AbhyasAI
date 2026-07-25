// backend/services/cleanupService.js
// Cleans up expired generation jobs and their storage files (Fix 9 — MEDIUM)

const { supabase } = require('./supabaseClient');

async function cleanupExpiredFiles() {
  try {
    const { data: expiredJobs } = await supabase
      .from('generation_jobs')
      .select('id')
      .lt('expires_at', new Date().toISOString())
      .eq('status', 'done')
      .limit(50);

    if (!expiredJobs || expiredJobs.length === 0) return;

    for (const job of expiredJobs) {
      const paths = [
        `${job.id}_standard.pdf`,
        `${job.id}_dyslexia.pdf`,
        `${job.id}_adhd.pdf`,
        `${job.id}_standard.docx`,
        `${job.id}_dyslexia.docx`,
        `${job.id}_adhd.docx`,
      ];

      await supabase.storage
        .from('generated-worksheets')
        .remove(paths);

      await supabase
        .from('generation_jobs')
        .update({ status: 'expired' })
        .eq('id', job.id);

      console.log(`[${new Date().toISOString()}] Cleaned up job: ${job.id}`);
    }
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Cleanup error:`, err.message);
  }
}

module.exports = { cleanupExpiredFiles };
