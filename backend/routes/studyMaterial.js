const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 90 * 1000,
  maxRetries: 1,
});

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

router.post('/generate', async (req, res) => {
  try {
    const { sessionId, format = 'standard' } = req.body;
    
    if (!sessionId || !UUID_REGEX.test(sessionId)) {
      return res.status(400).json({ error: 'Valid sessionId is required.' });
    }

    // Fetch Session + Topic
    const { data: session, error: sErr } = await supabase
      .from('sessions')
      .select('*, topics_or_roles(raw_input)')
      .eq('id', sessionId)
      .single();

    if (sErr || !session) {
      return res.status(404).json({ error: 'Session not found.' });
    }
    
    const topicContext = session.topics_or_roles?.raw_input || 'Unknown Topic';
    const sessionType = session.topics_or_roles?.type || 'topic';

    // Fetch Answers + Evaluations
    const { data: answers, error: aErr } = await supabase
      .from('answers')
      .select('question_id, evaluation')
      .eq('session_id', sessionId);
      
    if (aErr || !answers || answers.length === 0) {
      return res.status(400).json({ error: 'No answers found for this session.' });
    }
    
    // Aggregate all gaps from all evaluations
    const allGaps = [];
    answers.forEach(a => {
      if (a.evaluation && Array.isArray(a.evaluation.gaps)) {
        allGaps.push(...a.evaluation.gaps);
      }
    });

    const uniqueGaps = [...new Set(allGaps)];
    
    if (uniqueGaps.length === 0) {
      uniqueGaps.push('General understanding and foundational concepts');
    }

    let formatRules = '';
    if (format === 'dyslexia') {
      formatRules = `
- COGNITIVE FORMAT: Dyslexia-friendly
- HARD LIMIT: Maximum 12 words per sentence.
- Break ALL technical terms into syllables with · separator (e.g., car·bo·hy·drates).
- Use <span class="syllable-word font-bold text-indigo-600"> for all syllable-broken terms.
- Active voice ONLY — no passive constructions.
- Add line breaks after every 3-4 sentences.
- Add a reading ruler note at the end: "Use a ruler under each line to help track your reading."`;
    } else if (format === 'adhd') {
      formatRules = `
- COGNITIVE FORMAT: ADHD-friendly
- Convert ALL processes into numbered micro-steps (one action per step).
- Add [ ] checkbox before each step.
- Wrap definitions in <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><strong>DEFINITION</strong><br>content</div>.
- Wrap examples in <div class="bg-green-50 border-l-4 border-green-500 p-4 my-4"><strong>EXAMPLE</strong><br>content</div>.
- Add TRY IT activities in <div class="bg-purple-50 border-l-4 border-purple-500 p-4 my-4"><strong>TRY IT</strong><br>content</div> every 3-4 steps.
- Contextualise ALL numbers with real-world references.
- Repeat key facts in each section.`;
    }

    let systemPrompt;
    if (sessionType === 'topic') {
      systemPrompt = `You are an expert technical tutor.
The student recently completed a practice study session on the academic topic of "${topicContext}".
During the session, the AI evaluator identified the following specific gaps and weaknesses in their knowledge:

${uniqueGaps.map(g => `- ${g}`).join('\n')}

Your task is to generate a comprehensive, personalized study guide (Revision Notes) that directly addresses these gaps.
For each gap area, provide:
1. A clear, textbook-style explanation of the concept (include formula or diagram descriptions if applicable).
2. A concrete, real-world example.
3. A short exam-style practice exercise.

Format your response as clean HTML wrapped in a <div class="study-material prose prose-slate max-w-none">.
IMPORTANT FORMATTING RULES:
- ALWAYS use <h2> tags for main topics/gap areas.
- ALWAYS use <h3> tags for sub-sections (Explanation, Example, Exercise).
- Wrap inline important terms or topic names in <strong> tags so they stand out bold.
- Use appropriate HTML tags (<p>, <ul>, <li>, <code>, <pre>) to make the content highly readable.${formatRules}
Do NOT include markdown code fences (like \`\`\`html) around the output. Only output the raw HTML.`;
    } else {
      systemPrompt = `You are an expert technical interviewer and coach.
The candidate recently completed a practice interview for the role of "${topicContext}".
During the interview, the AI evaluator identified the following specific gaps and weaknesses in their knowledge:

${uniqueGaps.map(g => `- ${g}`).join('\n')}

Your task is to generate a comprehensive, personalized Interview Prep Guide that directly addresses these gaps.
For each gap area, provide:
1. A clear explanation of the concept or framework (e.g., STAR method, system design templates).
2. A strong sample interview answer or concrete example.
3. A short mock question for practice.

Format your response as clean HTML wrapped in a <div class="study-material prose prose-slate max-w-none">.
IMPORTANT FORMATTING RULES:
- ALWAYS use <h2> tags for main topics/gap areas.
- ALWAYS use <h3> tags for sub-sections (Explanation, Sample Answer, Mock Question).
- Wrap inline important terms or topic names in <strong> tags so they stand out bold.
- Use appropriate HTML tags (<p>, <ul>, <li>, <code>, <pre>) to make the content highly readable.${formatRules}
Do NOT include markdown code fences (like \`\`\`html) around the output. Only output the raw HTML.`;
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.3,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Please generate my personalized study guide for "${topicContext}" based on my identified gaps.` }
      ]
    });

    let htmlContent = response.choices[0].message.content;
    // Strip markdown if accidentally included by the model
    htmlContent = htmlContent.replace(/^```html\s*/i, '').replace(/```\s*$/i, '').trim();

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(htmlContent);

  } catch (err) {
    console.error(`[POST /api/study-material/generate] Error:`, err);
    return res.status(500).json({ error: 'Something went wrong generating study material.' });
  }
});

const { generatePdf, generateDocx } = require('../services/documentGen');

router.post('/download/pdf', async (req, res) => {
  try {
    const { html, format = 'standard' } = req.body;
    if (!html) return res.status(400).json({ error: 'HTML content required.' });
    
    const pdfBuffer = await generatePdf(html, format);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Study-Material-${format}.pdf"`);
    return res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error(`[POST /api/study-material/download/pdf] Error:`, err);
    res.status(500).json({ error: 'PDF generation failed' });
  }
});

router.post('/download/docx', async (req, res) => {
  try {
    const { html, format = 'standard', topic = 'Topic' } = req.body;
    if (!html) return res.status(400).json({ error: 'HTML content required.' });
    
    const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const docxBuffer = await generateDocx(plainText, format, { subject: topic, class: 'Interview Prep', chapterNum: '1' });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="Study-Material-${format}.docx"`);
    return res.status(200).send(docxBuffer);
  } catch (err) {
    console.error(`[POST /api/study-material/download/docx] Error:`, err);
    res.status(500).json({ error: 'DOCX generation failed' });
  }
});

module.exports = router;
