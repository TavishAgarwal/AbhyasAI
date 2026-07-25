// backend/routes/chapters.js
// GET /api/chapters — NCERT library chapter listing

const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');
const { validateChaptersQuery } = require('../middleware/validate');

// GET / — list chapters with optional filters
router.get('/', validateChaptersQuery, async (req, res) => {
  try {
    const { class: classNum, subject, language } = req.query;

    let query = supabase
      .from('chapters')
      .select('id, class_num, subject, chapter_num, chapter_title, language, learning_objectives, word_count');

    if (classNum) {
      query = query.eq('class_num', parseInt(classNum));
    }
    if (subject) {
      // Handle lowercase frontend values → title case DB values
      const subjectMap = {
        'mathematics': 'Mathematics',
        'science': 'Science',
        'english': 'English',
        'english supplementary': 'English Supplementary',
        'hindi': 'Hindi',
        'hindi supplementary': 'Hindi Supplementary',
        'social': 'Social Science',
        'social science': 'Social Science',
        'evs': 'EVS',
        'environmental studies': 'EVS',
        'physics': 'Physics',
        'chemistry': 'Chemistry',
        'biology': 'Biology',
        'history': 'History',
        'geography': 'Geography',
        'political science': 'Political Science',
        'economics': 'Economics',
      };
      const mappedSubject = subjectMap[subject.toLowerCase()] || subject;
      query = query.eq('subject', mappedSubject);
    }
    if (language) {
      query = query.eq('language', language);
    }

    query = query.order('chapter_num', { ascending: true });

    const { data, error } = await query;

    if (error) {
      console.error(`[${new Date().toISOString()}] Chapters query error:`, error.message);
      return res.status(500).json({ error: 'Failed to fetch chapters' });
    }

    res.json({ chapters: data || [] });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] GET /api/chapters error:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /subjects — list available subjects for a class
router.get('/subjects', async (req, res) => {
  try {
    const { class: classNum } = req.query;
    if (!classNum) {
      return res.status(400).json({ error: 'class param required' });
    }

    const { data, error } = await supabase
      .from('chapters')
      .select('subject')
      .eq('class_num', parseInt(classNum))
      .order('subject');

    if (error) {
      console.error(`[${new Date().toISOString()}] Subjects query error:`, error.message);
      return res.status(500).json({ error: 'Failed to fetch subjects' });
    }

    // Return unique subjects
    const subjects = [...new Set((data || []).map(r => r.subject))];
    res.json({ subjects });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] GET /api/chapters/subjects error:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /:id — single chapter
router.get('/:id', async (req, res) => {
  try {
    // Validate UUID format
    const { validate: isUUID } = require('uuid');
    if (!isUUID(req.params.id)) {
      return res.status(400).json({ error: 'Invalid chapter ID format.' });
    }

    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    res.json({ chapter: data });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] GET /api/chapters/:id error:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
