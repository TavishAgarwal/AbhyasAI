// backend/utils/imagePreprocessor.js
// Preprocesses textbook page images for optimal OCR accuracy

const sharp = require('sharp');

/**
 * Preprocesses an image buffer for OCR.
 * Operations in order: grayscale, normalise, sharpen, rotate (EXIF-based).
 * @param {Buffer} imageBuffer - Raw image buffer
 * @returns {Promise<Buffer>} - Processed JPEG buffer at quality 95
 */
async function preprocessImage(imageBuffer) {
  const processed = await sharp(imageBuffer)
    .grayscale()
    .normalise()
    .sharpen()
    .rotate() // EXIF-based auto-rotation
    .jpeg({ quality: 95 })
    .toBuffer();

  return processed;
}

module.exports = { preprocessImage };
