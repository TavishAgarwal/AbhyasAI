// backend/services/whatsappService.js
// Meta WhatsApp Business Cloud API helper functions

const axios = require('axios');

const WHATSAPP_API_URL = 'https://graph.facebook.com/v19.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// Mask phone numbers for logging — show first 2 + last 4 digits only
function maskPhone(phone) {
  if (!phone || phone.length < 6) return '****';
  return phone.slice(0, 2) + '****' + phone.slice(-4);
}

/**
 * Sends a plain text message to a WhatsApp user.
 * @param {string} to - Recipient phone number (with country code, no +)
 * @param {string} text - Message body (plain text only, no markdown)
 * @returns {Promise<void>}
 */
async function sendText(to, text) {
  try {
    await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: text }
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (err) {
    console.error(`[${new Date().toISOString()}] sendText error to ${maskPhone(to)}:`, err.response?.data || err.message);
  }
}

/**
 * Sends a document (PDF) to a WhatsApp user via a public URL.
 * @param {string} to - Recipient phone number
 * @param {string} documentUrl - Public or signed URL to the PDF file
 * @param {string} filename - Display filename for the document
 * @param {string} caption - Caption text shown below the document
 * @returns {Promise<void>}
 */
async function sendDocument(to, documentUrl, filename, caption) {
  try {
    await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'document',
        document: {
          link: documentUrl,
          filename,
          caption
        }
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (err) {
    console.error(`[${new Date().toISOString()}] sendDocument error to ${maskPhone(to)}:`, err.response?.data || err.message);
    // Fallback: send text with download link
    await sendText(to, `Your worksheet is ready! Download it here:\n${documentUrl}\n\nReply "new" for another worksheet.`);
  }
}

/**
 * Downloads media from WhatsApp servers using a media ID.
 * Step 1: Get the media URL from Meta API
 * Step 2: Download the actual binary content
 * @param {string} mediaId - WhatsApp media ID
 * @returns {Promise<{buffer: Buffer, mimeType: string}>}
 */
async function downloadMediaFromWhatsApp(mediaId) {
  // Step 1: Get the media URL
  const mediaResponse = await axios.get(
    `${WHATSAPP_API_URL}/${mediaId}`,
    {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    }
  );

  const mediaUrl = mediaResponse.data.url;
  const mimeType = mediaResponse.data.mime_type || 'image/jpeg';

  // Step 2: Download the binary content
  const downloadResponse = await axios.get(mediaUrl, {
    responseType: 'arraybuffer',
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
  });

  return {
    buffer: Buffer.from(downloadResponse.data),
    mimeType
  };
}

module.exports = { sendText, sendDocument, downloadMediaFromWhatsApp };
