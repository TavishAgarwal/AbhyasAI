const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { enqueueWhatsAppMessage } = require('../services/queue');

// ============================================================
// GET /whatsapp — Meta webhook verification
// ============================================================
router.get('/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

// ============================================================
// POST /whatsapp — Incoming messages
// ============================================================
router.post('/whatsapp', async (req, res) => {
  // Verify webhook signature (Fix 1 — CRITICAL)
  if (process.env.WHATSAPP_APP_SECRET) {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) {
      console.warn(`[${new Date().toISOString()}] Webhook received without signature`);
      return res.sendStatus(401);
    }
    const expectedSig = 'sha256=' + crypto
      .createHmac('sha256', process.env.WHATSAPP_APP_SECRET)
      .update(req.rawBody || JSON.stringify(req.body))
      .digest('hex');
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSig);
    if (sigBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      console.warn(`[${new Date().toISOString()}] Invalid webhook signature`);
      return res.sendStatus(401);
    }
  }

  // Respond 200 after signature check — Meta requires this within 1 second
  res.sendStatus(200);

  try {
    const entry = req.body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message) return;

    // Enqueue message for background processing
    await enqueueWhatsAppMessage(message);

  } catch (err) {
    console.error(`[${new Date().toISOString()}] Webhook error:`, err.message);
  }
});

module.exports = router;
