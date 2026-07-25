// backend/services/documentGen.js
// Generates PDF (via Puppeteer) and DOCX (via docx library) documents

const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('docx');
const sanitizeHtml = require('sanitize-html');

// ============================================================
// Shared CSS
// ============================================================
const sharedCSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #1A1A2E;
    padding: 40px;
  }
  h1 { font-size: 22px; margin-bottom: 16px; color: #1B5E8B; }
  h2 { font-size: 18px; margin-top: 24px; margin-bottom: 12px; color: #1B5E8B; }
  h3 { font-size: 16px; margin-top: 20px; margin-bottom: 10px; color: #2B3440; }
  p { margin-bottom: 12px; }
  strong { color: #1B5E8B; }
  ul, ol { margin-left: 20px; margin-bottom: 12px; }
  li { margin-bottom: 6px; }
`;

// ============================================================
// Version-specific CSS
// ============================================================
const versionCSS = {
  standard: `
    .standard-content { max-width: 700px; margin: 0 auto; }
    .standard-content h2 { border-bottom: 2px solid #E2E8F0; padding-bottom: 8px; }
  `,
  dyslexia: `
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      font-size: 15px;
      line-height: 1.9;
      letter-spacing: 0.05em;
      text-align: left;
      max-width: 65ch;
      background: #FFFEF7;
      color: #1A1A2E;
      margin: 40px auto;
      padding: 40px;
    }
    p, .dyslexia-para { margin-bottom: 1.5em; }
    h2 { color: #1B5E8B; margin-top: 2em; }
    .syllable-word { letter-spacing: 0.08em; font-weight: 600; }
    .phonics-guide { font-size: 12px; color: #666; font-style: italic; }
    .dyslexia-content { max-width: 65ch; }
  `,
  adhd: `
    .adhd-content { max-width: 700px; margin: 0 auto; }
    .box { border-radius: 8px; padding: 14px; margin: 16px 0; }
    .box.definition { background: #E8F4FD; border-left: 4px solid #1B5E8B; }
    .box.example { background: #EAF5EA; border-left: 4px solid #1E7E34; }
    .box.remember { background: #FEF5EC; border-left: 4px solid #E67E22; }
    .box.tryit { background: #F3E8FD; border-left: 4px solid #7B2FBE; }
    .fidget-break {
      background: #FFF3CD;
      border: 1px dashed #F39C12;
      padding: 12px;
      border-radius: 6px;
      margin: 20px 0;
      font-style: italic;
      text-align: center;
    }
    .step { display: flex; gap: 12px; margin: 8px 0; align-items: flex-start; }
    .step-num { font-weight: bold; color: #1B5E8B; min-width: 24px; }
    .checkbox { width: 16px; height: 16px; border: 2px solid #1B5E8B;
                border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
  `
};

// ============================================================
// Sanitise HTML before Puppeteer rendering (Fix 3 — CRITICAL)
// ============================================================
function sanitiseForPuppeteer(html) {
  return sanitizeHtml(html, {
    allowedTags: [
      'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'strong', 'em', 'span', 'br',
      'section', 'article', 'table', 'thead', 'tbody',
      'tr', 'th', 'td', 'b', 'i', 'sub', 'sup'
    ],
    allowedAttributes: {
      '*': ['class']
    },
    disallowedTagsMode: 'discard'
  });
}

// ============================================================
// PDF Generation
// ============================================================
/**
 * Generates a PDF buffer from HTML content.
 * @param {string} html - HTML content to render
 * @param {string} version - 'standard' | 'dyslexia' | 'adhd'
 * @returns {Promise<Buffer>} - PDF buffer
 */
async function generatePdf(html, version) {
  const fullHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: A4; margin: 25mm 20mm; }
    ${sharedCSS}
    ${versionCSS[version] || ''}
  </style>
</head>
<body>
  ${sanitiseForPuppeteer(html)}
</body>
</html>`;

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();

    // Security hardening: disable JS (static HTML only) and block outbound requests
    await page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (interceptedRequest) => {
      // Block all network requests — the HTML is self-contained
      if (interceptedRequest.url().startsWith('data:') || interceptedRequest.url() === 'about:blank') {
        interceptedRequest.continue();
      } else {
        interceptedRequest.abort();
      }
    });

    await page.setContent(fullHTML, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '25mm', right: '20mm', bottom: '25mm', left: '20mm' },
      printBackground: true
    });
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

// ============================================================
// DOCX Generation
// ============================================================
const editionLabels = {
  standard: 'Standard Edition',
  dyslexia: 'Dyslexia-Friendly Edition',
  adhd: 'ADHD / Dyscalculia Edition'
};

/**
 * Generates a DOCX buffer from plain text content.
 * @param {string} plainTextContent - Plain text (HTML stripped)
 * @param {string} version - 'standard' | 'dyslexia' | 'adhd'
 * @param {Object} chapterMeta - { class, subject, chapterNum, title }
 * @returns {Promise<Buffer>} - DOCX buffer
 */
async function generateDocx(plainTextContent, version, chapterMeta) {
  const FORMAT_STYLES = {
    standard: { fontSize: 24, lineSpacing: 276, font: 'Calibri' },
    dyslexia: { fontSize: 32, lineSpacing: 400, font: 'Verdana' },     
    adhd:     { fontSize: 26, lineSpacing: 300, font: 'Segoe UI' },    
  };
  
  const style = FORMAT_STYLES[version] || FORMAT_STYLES['standard'];
  const editionLabel = editionLabels[version] || 'Worksheet';

  // Split content by paragraphs
  const contentLines = plainTextContent.split('\n').filter(line => line.trim().length > 0);

  const paragraphs = [
    new Paragraph({
      text: `${chapterMeta.subject} — Class ${chapterMeta.class}`,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: `Chapter ${chapterMeta.chapterNum}: ${chapterMeta.title}`,
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: editionLabel,
      heading: HeadingLevel.HEADING_3,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    }),
  ];

  // Convert each line into a paragraph with style
  for (const line of contentLines) {
    if (line.match(/^[A-Z\s]+$/) && line.length < 50) {
      // Looks like a heading
      paragraphs.push(new Paragraph({
        text: line,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 }
      }));
    } else {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: line, font: style.font, size: style.fontSize })],
        spacing: { after: 200, line: style.lineSpacing }
      }));
    }
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs
    }]
  });

  return await Packer.toBuffer(doc);
}

module.exports = { generatePdf, generateDocx };
