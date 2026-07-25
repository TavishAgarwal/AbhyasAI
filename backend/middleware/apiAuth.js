// backend/middleware/apiAuth.js
// Simple API key authentication for public-facing routes
// Prevents unauthenticated callers from burning OpenAI credits

const API_KEY_HEADER = 'x-api-key';

function apiKeyAuth(req, res, next) {
  const configuredKey = process.env.API_SECRET_KEY;

  // If no API key is configured, allow requests (dev mode) but log warning
  if (!configuredKey) {
    return next();
  }

  const providedKey = req.headers[API_KEY_HEADER];

  if (!providedKey) {
    return res.status(401).json({
      error: 'Authentication required. Provide an API key via the x-api-key header.'
    });
  }

  // Constant-time comparison to prevent timing attacks
  if (providedKey.length !== configuredKey.length) {
    return res.status(403).json({ error: 'Invalid API key.' });
  }

  const crypto = require('crypto');
  const a = Buffer.from(providedKey);
  const b = Buffer.from(configuredKey);
  if (!crypto.timingSafeEqual(a, b)) {
    return res.status(403).json({ error: 'Invalid API key.' });
  }

  next();
}

module.exports = { apiKeyAuth };
