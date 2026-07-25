const fs = require('fs');
const path = require('path');
const os = require('os');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const { downloadMediaFromWhatsApp } = require('./whatsappService');
const Groq = require('groq-sdk');

// Point fluent-ffmpeg at the bundled binary
ffmpeg.setFfmpegPath(ffmpegPath);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Converts .ogg (Opus codec, from WhatsApp voice notes) to .mp3 via FFmpeg.
 * Required because Groq Whisper performs best on .mp3 input.
 */
function convertOggToMp3(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat('mp3')
      .audioCodec('libmp3lame')
      .audioBitrate(128)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(new Error(`FFmpeg conversion failed: ${err.message}`)))
      .save(outputPath);
  });
}

async function downloadAndTranscribeAudio(mediaId) {
  // 1. Download from WhatsApp
  const media = await downloadMediaFromWhatsApp(mediaId);

  // 2. Save temporarily as .ogg
  const tmpOggPath = path.join(os.tmpdir(), `whatsapp_${mediaId}.ogg`);
  const tmpMp3Path = path.join(os.tmpdir(), `whatsapp_${mediaId}.mp3`);
  fs.writeFileSync(tmpOggPath, media.buffer);

  try {
    // 3. Convert .ogg → .mp3 via FFmpeg
    await convertOggToMp3(tmpOggPath, tmpMp3Path);

    // 4. Transcribe .mp3 with Groq Whisper
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tmpMp3Path),
      model: 'whisper-large-v3-turbo',
      prompt: 'Student answering an interview or practice question.',
      response_format: 'json',
      language: 'en'
    });

    return transcription.text;
  } finally {
    // 5. Cleanup both temp files
    if (fs.existsSync(tmpOggPath)) fs.unlinkSync(tmpOggPath);
    if (fs.existsSync(tmpMp3Path)) fs.unlinkSync(tmpMp3Path);
  }
}

module.exports = { downloadAndTranscribeAudio };
