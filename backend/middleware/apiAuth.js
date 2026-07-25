// backend/middleware/apiAuth.js
// Require a Supabase user session for public routes. The optional API key is
// reserved for the internal BullMQ worker and is never shipped to the browser.

const API_KEY_HEADER = 'x-api-key';
const { getSupabase } = require('../services/supabaseClient');

async function apiKeyAuth(req, res, next) {
  const authorization = req.headers.authorization;
  if (authorization?.startsWith('Bearer ')) {
    try {
      const { data: { user }, error } = await getSupabase().auth.getUser(authorization.slice(7));
      if (!error && user) {
        req.user = user;
        return next();
      } else {
        console.error('Supabase Auth Error:', error);
      }
    } catch (err) {
      console.error('Supabase Auth Exception:', err);
    }
  }

  const configuredKey = process.env.API_SECRET_KEY;
  const providedKey = req.headers[API_KEY_HEADER];

  if (configuredKey && providedKey && providedKey.length === configuredKey.length) {
    const crypto = require('crypto');
    if (crypto.timingSafeEqual(Buffer.from(providedKey), Buffer.from(configuredKey))) {
      // Set a synthetic zero-UUID user so downstream endpoints don't crash
      req.user = { id: '00000000-0000-0000-0000-000000000000' };
      return next();
    }
  }

  return res.status(401).json({ error: 'Authentication required.' });
}

module.exports = { apiKeyAuth };
