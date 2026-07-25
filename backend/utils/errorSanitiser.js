// backend/utils/errorSanitiser.js
// Sanitises error messages before sending to clients (Fix 10 — MEDIUM)

const SAFE_ERROR_MESSAGES = {
  'pgrst': 'Database operation failed. Please try again.',
  'openai': 'AI service temporarily unavailable. Please try again.',
  'puppeteer': 'Document generation failed. Please try again.',
  'storage': 'File storage error. Please try again.',
  'timeout': 'Request timed out. Please try again.',
  'econnrefused': 'Service temporarily unavailable. Please try again.',
};

function sanitiseError(err) {
  const msg = (err.message || '').toLowerCase();

  for (const [key, safeMsg] of Object.entries(SAFE_ERROR_MESSAGES)) {
    if (msg.includes(key)) return safeMsg;
  }

  // Check for API key exposure in error messages
  if (msg.includes('sk-') || msg.includes('eaa') || msg.includes('eyj')) {
    return 'An internal error occurred. Please try again.';
  }

  return 'Something went wrong. Please try again.';
}

module.exports = { sanitiseError };
