const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const Groq = require('groq-sdk');
const fs = require('fs');
const os = require('os');
const path = require('path');

router.post('/', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file provided.' });
  }

  const tmpPath = path.join(os.tmpdir(), `web_audio_${Date.now()}.webm`);
  fs.writeFileSync(tmpPath, req.file.buffer);

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
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
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
});

module.exports = router;
