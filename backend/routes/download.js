// backend/routes/download.js
// GET /api/download/:jobId — serves generated files

const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');
const { validateDownloadRequest } = require('../middleware/validate');

// GET /:jobId — download a generated file
router.get('/:jobId', validateDownloadRequest, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { version = 'standard', format = 'pdf' } = req.query;

    // Fetch job
    const { data: job, error } = await supabase
      .from('generation_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (error || !job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check expiry
    if (job.expires_at && new Date(job.expires_at) < new Date()) {
      return res.status(410).json({ error: 'File has expired. Please generate again.' });
    }

    // Build column name
    const columnName = format === 'docx'
      ? `${version}_docx_url`
      : `${version}_file_url`;

    const fileUrl = job[columnName];

    if (!fileUrl) {
      return res.status(404).json({ error: `No ${format} file found for ${version} version` });
    }

    // Redirect to signed URL
    res.redirect(fileUrl);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] GET /api/download/:jobId error:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
