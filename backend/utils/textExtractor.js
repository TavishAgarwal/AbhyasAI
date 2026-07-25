// backend/utils/textExtractor.js
// Extracts text from PDF files using pdfjs-dist legacy build

/**
 * Extracts text from a PDF buffer.
 * Uses pdfjs-dist legacy build for Node.js compatibility.
 * Strips standalone page numbers and collapses excessive whitespace.
 * @param {Buffer} buffer - PDF file buffer
 * @returns {Promise<string>} - Clean extracted text
 */
async function extractFromPdf(buffer) {
  // Dynamic import for ESM module
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdfDocument = await loadingTask.promise;

  let fullText = '';

  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map(item => item.str)
      .join(' ');
    fullText += pageText + '\n\n';
  }

  // Strip standalone page numbers (digits on their own line)
  let cleaned = fullText.replace(/^\s*\d+\s*$/gm, '');

  // Collapse triple+ whitespace to double newline
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Trim leading/trailing whitespace
  cleaned = cleaned.trim();

  return cleaned;
}

module.exports = { extractFromPdf };
