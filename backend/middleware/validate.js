// backend/middleware/validate.js
// Input validation middleware for all API routes (Fix 6 — HIGH)

const { validate: isUUID } = require('uuid');

const VALID_SOURCES = ['library', 'upload', 'camera'];
const VALID_VERSIONS = ['standard', 'dyslexia', 'adhd'];
const VALID_LANGUAGES = ['english', 'hindi'];
const VALID_SUBJECTS = [
  'Mathematics', 'Science', 'English', 'Hindi',
  'Social Science', 'EVS',
  // Also allow lowercase frontend values
  'mathematics', 'science', 'english', 'hindi',
  'social', 'social science', 'evs', 'environmental studies'
];

function validateGenerateRequest(req, res, next) {
  const { source, chapterId, language, versions } = req.body;

  if (!source || !VALID_SOURCES.includes(source)) {
    return res.status(400).json({
      error: 'Invalid source. Must be library, upload, or camera.'
    });
  }

  if (source === 'library') {
    if (!chapterId || !isUUID(chapterId)) {
      return res.status(400).json({
        error: 'Invalid chapterId. Must be a valid UUID.'
      });
    }
  }

  if (language && !VALID_LANGUAGES.includes(language)) {
    return res.status(400).json({
      error: 'Invalid language. Must be english or hindi.'
    });
  }

  let versionsArray = versions;
  if (typeof versions === 'string') {
    try { versionsArray = JSON.parse(versions); }
    catch { return res.status(400).json({ error: 'Invalid versions format.' }); }
  }

  if (Array.isArray(versionsArray)) {
    const invalidVersions = versionsArray.filter(v => !VALID_VERSIONS.includes(v));
    if (invalidVersions.length > 0) {
      return res.status(400).json({
        error: `Invalid version values: ${invalidVersions.join(', ')}`
      });
    }
    if (versionsArray.length > 3) {
      return res.status(400).json({ error: 'Maximum 3 versions allowed.' });
    }
  }

  next();
}

function validateChaptersQuery(req, res, next) {
  const { class: classNum, subject, language } = req.query;

  if (classNum !== undefined) {
    const n = parseInt(classNum);
    if (isNaN(n) || n < 1 || n > 10) {
      return res.status(400).json({ error: 'class must be a number between 1 and 10.' });
    }
  }

  if (language !== undefined && !VALID_LANGUAGES.includes(language)) {
    return res.status(400).json({ error: 'Invalid language.' });
  }

  next();
}

function validateDownloadRequest(req, res, next) {
  const { jobId } = req.params;
  const { version, format } = req.query;

  if (!isUUID(jobId)) {
    return res.status(400).json({ error: 'Invalid jobId format.' });
  }

  if (version && !VALID_VERSIONS.includes(version)) {
    return res.status(400).json({ error: 'Invalid version.' });
  }

  if (format && !['pdf', 'docx'].includes(format)) {
    return res.status(400).json({ error: 'Invalid format. Must be pdf or docx.' });
  }

  next();
}

module.exports = {
  validateGenerateRequest,
  validateChaptersQuery,
  validateDownloadRequest
};
