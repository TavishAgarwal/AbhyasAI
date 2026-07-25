// backend/services/ocrService.js
// OCR using GPT-4o Vision for Indian school textbook pages

const OpenAI = require('openai');
const { preprocessImage } = require('../utils/imagePreprocessor');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60 * 1000,  // 60 second timeout
  maxRetries: 1,
});

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB limit before base64 encoding

/**
 * Extracts text from a textbook page image using GPT-4o Vision.
 * @param {Buffer} imageBuffer - Raw image buffer (JPEG or PNG)
 * @returns {Promise<string>} - Extracted text with formatting preserved
 */
async function extractTextFromImage(imageBuffer) {
  // Guard: reject oversized images before expensive processing
  if (imageBuffer.length > MAX_IMAGE_SIZE) {
    throw new Error(`Image too large (${Math.round(imageBuffer.length / 1024 / 1024)}MB). Maximum size is 10MB.`);
  }

  try {
    // Step 1: Preprocess image for optimal OCR
    const processedBuffer = await preprocessImage(imageBuffer);

    // Step 2: Encode as base64
    const base64Image = processedBuffer.toString('base64');

    // Step 3: Send to GPT-4o Vision
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract ALL text from this Indian school textbook page. Mark headings with ### prefix. Preserve paragraph breaks. Preserve numbered lists and bullet points. If you see a diagram, write [DIAGRAM: brief description]. Remove page numbers, headers, footers. Return extracted text only — no commentary, no explanation.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: 'high'
              }
            }
          ]
        }
      ],
      max_tokens: 4000,
      temperature: 0.1
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] OCR extraction failed:`, error.message);
    throw new Error('Failed to extract text from image. Please try again with a clearer photo.');
  }
}

module.exports = { extractTextFromImage };
