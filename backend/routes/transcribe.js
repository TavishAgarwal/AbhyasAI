const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const Groq = require('groq-sdk');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

router.post('/', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file provided.' });
  }

  const uuid = crypto.randomUUID();
  const tmpPath = path.join(os.tmpdir(), `web_audio_${uuid}.webm`);
  await fs.promises.writeFile(tmpPath, req.file.buffer);

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY, timeout: 60000 });
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tmpPath),
      model: 'whisper-large-v3-turbo',
      response_format: 'json',
      language: 'en'
    });
    return res.json({ text: transcription.text });
  } catch (err) {
    console.error(`[POST /api/transcribe] Error:`, err);
    return res.status(500).json({ error: 'Failed to transcribe audio.' });
  } finally {
    if (fs.existsSync(tmpPath)) await fs.promises.unlink(tmpPath);
  }
});

module.exports = router;
