// backend/utils/sanitiseInput.js
// Shared prompt injection defence — used by all LLM-facing services
function sanitiseInput(input) {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/[<>{}[\]]/g, '')
    .replace(/(\r?\n){3,}/g, '\n\n')
    .trim()
    .slice(0, 5000);
}

module.exports = { sanitiseInput };
