// backend/services/docxGenerator.js
// Generates DOCX files for Session Reports

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');
const sanitizeHtml = require('sanitize-html');

/**
 * Strips HTML tags and returns plain text.
 */
function stripHtml(html) {
  return sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {}
  });
}

/**
 * Generates a DOCX buffer from a JSON report.
 * @param {Object} reportJson - The parsed report_json
 * @param {string} topicContext - The topic context
 * @param {string} version - 'standard' | 'dyslexia' | 'adhd'
 * @returns {Promise<Buffer>} - DOCX buffer
 */
async function generateReportDocx(reportJson, topicContext, version) {
  const editionLabels = {
    standard: 'Standard Edition',
    dyslexia: 'Dyslexia-Friendly Edition',
    adhd: 'ADHD / Dyscalculia Edition'
  };

  const FORMAT_STYLES = {
    standard: { fontSize: 24, lineSpacing: 276, font: 'Calibri' },
    dyslexia: { fontSize: 32, lineSpacing: 400, font: 'Verdana' },     
    adhd:     { fontSize: 26, lineSpacing: 300, font: 'Segoe UI' },    
  };
  
  const style = FORMAT_STYLES[version] || FORMAT_STYLES['standard'];
  const editionLabel = editionLabels[version] || 'Session Report';

  const paragraphs = [
    new Paragraph({
      text: `Session Report: ${topicContext}`,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: editionLabel,
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.LEFT,
      spacing: { after: 400 }
    }),
    
    // Overall Summary
    new Paragraph({
      text: 'Overall Summary',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: stripHtml(reportJson.summary || 'No summary available.'),
      spacing: { after: 100, line: style.lineSpacing },
      style: "Normal",
      children: [new TextRun({ text: stripHtml(reportJson.summary || 'No summary available.'), font: style.font, size: style.fontSize })]
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: 'Overall Score: ', bold: true, font: style.font, size: style.fontSize }),
        new TextRun({ text: `${(reportJson.overall_score || 0).toFixed(2)} / 1.0`, font: style.font, size: style.fontSize })
      ]
    })
  ];

  // Skill Progression
  if (reportJson.skill_progression && reportJson.skill_progression.length > 0) {
    paragraphs.push(
      new Paragraph({
        text: 'Skill Progression',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 }
      })
    );

    const tableRows = [];
    
    // Header Row
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ text: 'Skill', bold: true })], shading: { fill: 'F1F5F9' }, width: { size: 30, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ text: 'Category', bold: true })], shading: { fill: 'F1F5F9' }, width: { size: 20, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ text: 'Start Rating', bold: true })], shading: { fill: 'F1F5F9' }, width: { size: 15, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ text: 'End Rating', bold: true })], shading: { fill: 'F1F5F9' }, width: { size: 15, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ text: 'Change', bold: true })], shading: { fill: 'F1F5F9' }, width: { size: 20, type: WidthType.PERCENTAGE } })
        ]
      })
    );

    for (const skill of reportJson.skill_progression) {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: skill.skill_name || '-' })] }),
            new TableCell({ children: [new Paragraph({ text: skill.category || '-' })] }),
            new TableCell({ children: [new Paragraph({ text: `${skill.starting_rating || 0}` })] }),
            new TableCell({ children: [new Paragraph({ text: `${skill.ending_rating || 0}` })] }),
            new TableCell({ children: [
              new Paragraph({ 
                children: [
                  new TextRun({ 
                    text: `${(skill.delta || 0) >= 0 ? '+' : ''}${skill.delta || 0}`, 
                    color: (skill.delta || 0) >= 0 ? '16A34A' : 'DC2626',
                    bold: true
                  })
                ] 
              })
            ] })
          ]
        })
      );
    }

    const table = new Table({
      rows: tableRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
        left: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
        right: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' }
      }
    });

    paragraphs.push(table);
  }

  // Top Strengths
  paragraphs.push(
    new Paragraph({
      text: 'Top Strengths',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 100 }
    })
  );
  for (const item of (reportJson.top_strengths || [])) {
    paragraphs.push(
      new Paragraph({
        text: stripHtml(item),
        bullet: { level: 0 }
      })
    );
  }

  // Top Areas for Improvement
  paragraphs.push(
    new Paragraph({
      text: 'Top Areas for Improvement',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 100 }
    })
  );
  for (const item of (reportJson.top_gaps || [])) {
    paragraphs.push(
      new Paragraph({
        text: stripHtml(item),
        bullet: { level: 0 }
      })
    );
  }

  // Recommended Next Steps
  paragraphs.push(
    new Paragraph({
      text: 'Recommended Next Steps',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 100 }
    })
  );
  
  let stepCounter = 1;
  for (const item of (reportJson.recommendations || [])) {
    paragraphs.push(
      new Paragraph({
        text: `${stepCounter}. ${stripHtml(item)}`,
        spacing: { after: 100 }
      })
    );
    stepCounter++;
  }

  // Questions and Answers
  if (reportJson.questions && reportJson.questions.length > 0) {
    paragraphs.push(
      new Paragraph({
        text: 'Review Questions',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 100 }
      })
    );
    for (const q of reportJson.questions) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'Q: ', bold: true, font: style.font, size: style.fontSize }), new TextRun({ text: q.question, font: style.font, size: style.fontSize })],
          spacing: { before: 200, after: 100, line: style.lineSpacing }
        }),
        new Paragraph({
          children: [new TextRun({ text: 'A: ', bold: true, font: style.font, size: style.fontSize }), new TextRun({ text: q.answer, font: style.font, size: style.fontSize })],
          spacing: { after: 100, line: style.lineSpacing }
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Feedback: ', bold: true, font: style.font, size: style.fontSize }), new TextRun({ text: q.feedback || 'None', font: style.font, size: style.fontSize })],
          spacing: { after: 200, line: style.lineSpacing }
        })
      );
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

module.exports = { generateReportDocx };
