// backend/routes/reports.js
// AbhyasAI — Session Report routes.
// POST /api/reports/generate      — Generate structured JSON report for a completed session
// GET  /api/reports/session/:id   — Retrieve existing JSON report for a session

const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');
const { generateReport } = require('../services/reportGenerator');
const { renderReport } = require('../services/reportRenderer');
const { generatePdf } = require('../services/documentGen');
const { generateReportDocx } = require('../services/docxGenerator');

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ============================================================
// POST /api/reports/generate
// ============================================================
router.post('/generate', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { sessionId } = req.body;
    
    if (!sessionId || !UUID_REGEX.test(sessionId)) {
      return res.status(400).json({ error: 'Valid sessionId is required.' });
    }

    // 1. Fetch Session to ensure it exists and is completed (optional, but good practice)
    const { data: session, error: sErr } = await supabase
      .from('sessions')
      .select('*, topics_or_roles(raw_input, type)')
      .eq('id', sessionId)
      .single();

    if (sErr || !session) {
      return res.status(404).json({ error: 'Session not found.' });
    }
    
    // Check if report already exists
    const { data: existingReport } = await supabase
      .from('reports')
      .select('report_json, created_at')
      .eq('session_id', sessionId)
      .single();
      
    if (existingReport) {
      return res.status(200).json(existingReport.report_json);
    }

    // 2. Fetch all answers for the session
    const { data: answers, error: aErr } = await supabase
      .from('answers')
      .select('question_id, answer_text, score, evaluation, elo_updates')
      .eq('session_id', sessionId)
      .order('question_index', { ascending: true });
      
    if (aErr || !answers || answers.length === 0) {
      return res.status(400).json({ error: 'No answers found for this session to report on.' });
    }
    
    // Fetch question text for the answers
    const qIds = answers.map(a => a.question_id);
    const { data: questions } = await supabase
      .from('questions')
      .select('id, question_text, question_type')
      .in('id', qIds);
      
    const qMap = new Map((questions || []).map(q => [q.id, q]));
    const enrichedAnswers = answers.map(a => ({
      ...a,
      questionText: qMap.get(a.question_id)?.question_text || 'Unknown Question',
      questionType: qMap.get(a.question_id)?.question_type || 'unknown'
    }));
    
    // 3. Fetch skill progression
    const { data: skillRatings, error: srErr } = await supabase
      .from('skill_ratings')
      .select('skill_id, rating')
      .eq('session_id', sessionId);
      
    if (srErr) {
      return res.status(500).json({ error: 'Failed to fetch skill ratings.' });
    }
    
    // We need the initial rating for each skill to compute deltas. 
    // Since our initial rating is fixed at 1500.0, we can just use that.
    // If it was dynamic, we would need to store initial ratings on session creation.
    const INITIAL_RATING = 0.0;
    
    const skillIds = skillRatings.map(sr => sr.skill_id);
    const { data: skills } = await supabase
      .from('skills')
      .select('id, name, category')
      .in('id', skillIds);
      
    const skillMap = new Map((skills || []).map(s => [s.id, s]));
    
    const skillChanges = skillRatings.map(sr => {
      const skill = skillMap.get(sr.skill_id);
      return {
        skillId: sr.skill_id,
        skillName: skill?.name || 'Unknown',
        category: skill?.category || 'technical',
        startingRating: INITIAL_RATING,
        endingRating: sr.rating,
        delta: sr.rating - INITIAL_RATING
      };
    });
    
    const topicContext = session.topics_or_roles?.raw_input || 'Unknown Topic';
    const sessionType = session.topics_or_roles?.type || 'topic';
    
    // 4. Generate the report via LLM
    let reportData;
    try {
      reportData = await generateReport({
        topicContext,
        answers: enrichedAnswers,
        skillChanges,
        sessionType
      });
    } catch (llmErr) {
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        route: 'POST /api/reports/generate',
        step: 'llm_generate',
        sessionId,
        error: llmErr.message,
      }));
      return res.status(502).json({ error: 'AI report generation failed. Please try again.' });
    }
    
    // Ensure the LLM provided valid JSON matching our schema loosely
    if (!reportData || !reportData.summary || !Array.isArray(reportData.top_strengths)) {
       return res.status(502).json({ error: 'AI returned an invalid report format.' });
    }
    
    // Override the skill progression in the report with our exact data to prevent LLM hallucinations on numbers
    reportData.skill_progression = skillChanges.map(sc => ({
      skill_name: sc.skillName,
      category: sc.category,
      starting_rating: Math.round(sc.startingRating),
      ending_rating: Math.round(sc.endingRating),
      delta: Math.round(sc.delta)
    }));

    // Calculate exact overall score average
    const totalScore = answers.reduce((sum, a) => sum + (a.score || 0), 0);
    reportData.overall_score = answers.length > 0 ? (totalScore / answers.length) : 0;
    
    // 5. Persist the report
    const { data: savedReport, error: saveErr } = await supabase
      .from('reports')
      .insert({
        session_id: sessionId,
        report_json: reportData
      })
      .select()
      .single();
      
    if (saveErr) {
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        route: 'POST /api/reports/generate',
        step: 'save_report',
        sessionId,
        error: saveErr.message,
      }));
      return res.status(500).json({ error: 'Failed to save the generated report.' });
    }
    
    return res.status(201).json(savedReport.report_json);
    
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      route: 'POST /api/reports/generate',
      error: err.message,
    }));
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ============================================================
// GET /api/reports/session/:sessionId
// ============================================================
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!UUID_REGEX.test(sessionId)) {
      return res.status(400).json({ error: 'Invalid sessionId format.' });
    }

    const { data: report, error } = await supabase
      .from('reports')
      .select('report_json, created_at')
      .eq('session_id', sessionId)
      .single();
      
    if (error || !report) {
      return res.status(404).json({ error: 'Report not found for this session.' });
    }
    
    return res.status(200).json(report.report_json);
    
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      route: `GET /api/reports/session/${req.params.sessionId}`,
      error: err.message,
    }));
    return res.status(500).json({ error: 'Something went wrong.' });
  }
});

// ============================================================
// GET /api/reports/session/:sessionId/render
// ============================================================
router.get('/session/:sessionId/render', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const format = req.query.format || 'standard';
    
    if (!['standard', 'dyslexia', 'adhd'].includes(format)) {
      return res.status(400).json({ error: 'Invalid format specified.' });
    }

    if (!UUID_REGEX.test(sessionId)) {
      return res.status(400).json({ error: 'Invalid sessionId format.' });
    }

    const { data: report, error } = await supabase
      .from('reports')
      .select('report_json, sessions(topics_or_roles(raw_input))')
      .eq('session_id', sessionId)
      .single();
      
    if (error || !report) {
      return res.status(404).send('Report not found for this session.');
    }
    
    const topicContext = report.sessions?.topics_or_roles?.raw_input || 'Practice Session';
    const html = renderReport(report.report_json, topicContext, format);
    
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
    
  } catch (err) {
    console.error(`Error rendering report HTML:`, err);
    return res.status(500).send('Something went wrong generating the report view.');
  }
});

// ============================================================
// GET /api/reports/session/:sessionId/pdf
// ============================================================
router.get('/session/:sessionId/pdf', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const format = req.query.format || 'standard';
    
    if (!['standard', 'dyslexia', 'adhd'].includes(format)) {
      return res.status(400).json({ error: 'Invalid format specified.' });
    }

    if (!UUID_REGEX.test(sessionId)) {
      return res.status(400).json({ error: 'Invalid sessionId format.' });
    }

    const { data: report, error } = await supabase
      .from('reports')
      .select('report_json, sessions(topics_or_roles(raw_input))')
      .eq('session_id', sessionId)
      .single();
      
    if (error || !report) {
      return res.status(404).send('Report not found for this session.');
    }
    
    const topicContext = report.sessions?.topics_or_roles?.raw_input || 'Practice Session';
    const html = renderReport(report.report_json, topicContext, format);
    
    const pdfBuffer = await generatePdf(html, format);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="AbhyasAI-Report-${format}.pdf"`);
    return res.status(200).send(pdfBuffer);
    
  } catch (err) {
    console.error(`Error generating report PDF:`, err);
    return res.status(500).send('Something went wrong generating the PDF.');
  }
});

// ============================================================
// GET /api/reports/session/:sessionId/docx
// ============================================================
router.get('/session/:sessionId/docx', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const format = req.query.format || 'standard';
    
    if (!['standard', 'dyslexia', 'adhd'].includes(format)) {
      return res.status(400).json({ error: 'Invalid format specified.' });
    }

    if (!UUID_REGEX.test(sessionId)) {
      return res.status(400).json({ error: 'Invalid sessionId format.' });
    }

    const { data: report, error } = await supabase
      .from('reports')
      .select('report_json, sessions(topics_or_roles(raw_input))')
      .eq('session_id', sessionId)
      .single();
      
    if (error || !report) {
      return res.status(404).send('Report not found for this session.');
    }
    
    const topicContext = report.sessions?.topics_or_roles?.raw_input || 'Practice Session';
    const docxBuffer = await generateReportDocx(report.report_json, topicContext, format);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="AbhyasAI-Report-${format}.docx"`);
    return res.status(200).send(docxBuffer);
    
  } catch (err) {
    console.error(`Error generating report DOCX:`, err);
    return res.status(500).send('Something went wrong generating the DOCX.');
  }
});

module.exports = router;
