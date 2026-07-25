// backend/routes/questions.js
// AbhyasAI — Question generation and retrieval routes.
// POST /api/questions/generate     — generate questions for a topic's skills
// GET  /api/questions/:topicOrRoleId — retrieve questions with Q-matrix

const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');
const questionGenerator = require('../services/questionGenerator');
const { validate } = require('../middleware/validate');

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ============================================================
// POST /api/questions/generate
// ============================================================
router.post('/generate', validate('questions.generate'), async (req, res) => {
  const startTime = Date.now();

  try {
    const { topicOrRoleId, count, previousScore, previousQuestions } = req.body;

    // ── Validation ──────────────────────────────────────────
    if (!topicOrRoleId || !UUID_REGEX.test(topicOrRoleId)) {
      return res.status(400).json({
        error: 'topicOrRoleId is required and must be a valid UUID.',
      });
    }

    const questionCount = Math.min(Math.max(parseInt(count) || 10, 1), 25);

    // ── 1. Fetch the topic/role ─────────────────────────────
    const { data: topicRow, error: topicError } = await supabase
      .from('topics_or_roles')
      .select('*')
      .eq('id', topicOrRoleId)
      .single();

    if (topicError || !topicRow) {
      return res.status(404).json({ error: 'Topic or role not found.' });
    }

    // ── 2. Fetch skills for this topic ──────────────────────
    const { data: skillRows, error: skillsError } = await supabase
      .from('skills')
      .select('id, name, category')
      .eq('topic_or_role_id', topicOrRoleId);

    if (skillsError) {
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        route: 'POST /api/questions/generate',
        step: 'fetch_skills',
        error: skillsError.message,
      }));
      return res.status(500).json({ error: 'Failed to fetch skills.' });
    }

    if (!skillRows || skillRows.length === 0) {
      return res.status(400).json({
        error: 'No skills found for this topic. Extract skills first via POST /api/skills/extract.',
      });
    }

    // ── 3. Call LLM for Questions ───────────────────────────
    let generated;
    try {
      generated = await questionGenerator.generate({
        skills: skillRows,
        count: questionCount,
        topicContext: topicRow.raw_input,
        type: topicRow.type,
        previousScore,
        previousQuestions
      });
    } catch (llmError) {
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        route: 'POST /api/questions/generate',
        step: 'llm_generate',
        topicOrRoleId,
        error: llmError.message,
      }));
      return res.status(502).json({
        error: 'AI question generation failed. Please try again.',
        topicOrRoleId,
      });
    }

    // ── 4. Validate LLM output ──────────────────────────────
    if (!generated || !Array.isArray(generated.questions) || generated.questions.length === 0) {
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        route: 'POST /api/questions/generate',
        step: 'validate_llm_output',
        topicOrRoleId,
        generated,
      }));
      return res.status(502).json({
        error: 'AI returned an invalid question list. Please try again.',
        topicOrRoleId,
      });
    }

    // Build a set of valid skill IDs for filtering
    const validSkillIds = new Set(skillRows.map((s) => s.id));

    // ── 5. Persist questions + Q-matrix to DB ───────────────
    const insertedQuestions = [];

    for (const q of generated.questions) {
      // Validate question structure
      if (
        !q.question_text ||
        typeof q.question_text !== 'string' ||
        !['technical', 'behavioral'].includes(q.question_type) ||
        !Array.isArray(q.skill_mappings) ||
        q.skill_mappings.length === 0
      ) {
        continue; // Skip malformed questions
      }

      // Filter skill mappings to only valid skill IDs
      const validMappings = q.skill_mappings.filter(
        (m) => m && validSkillIds.has(m.skill_id) && typeof m.weight === 'number'
      );

      if (validMappings.length === 0) continue;

      // Insert question
      const difficultyRating = questionGenerator.difficultyToRating(q.difficulty_level);

      const { data: questionRow, error: qError } = await supabase
        .from('questions')
        .insert({
          topic_or_role_id: topicOrRoleId,
          question_text: q.question_text.trim(),
          question_type: q.question_type,
          difficulty_rating: difficultyRating,
          difficulty_level: q.difficulty_level || 'medium',
          expected_answer_points: q.answer_points || [],
          metadata: {},
        })
        .select()
        .single();

      if (qError) {
        console.error(JSON.stringify({
          timestamp: new Date().toISOString(),
          route: 'POST /api/questions/generate',
          step: 'insert_question',
          topicOrRoleId,
          error: qError.message,
        }));
        continue; // Skip this question, try the rest
      }

      // Insert Q-matrix mappings
      const mappingRows = validMappings.map((m) => ({
        question_id: questionRow.id,
        skill_id: m.skill_id,
        weight: Math.max(0, Math.min(1, m.weight)), // Clamp 0–1
      }));

      const { data: insertedMappings, error: mError } = await supabase
        .from('question_skill_map')
        .insert(mappingRows)
        .select();

      if (mError) {
        console.error(JSON.stringify({
          timestamp: new Date().toISOString(),
          route: 'POST /api/questions/generate',
          step: 'insert_q_matrix',
          questionId: questionRow.id,
          error: mError.message,
        }));
      }

      insertedQuestions.push({
        id: questionRow.id,
        questionText: questionRow.question_text,
        questionType: questionRow.question_type,
        difficultyLevel: questionRow.difficulty_level,
        difficultyRating: questionRow.difficulty_rating,
        expectedAnswerPoints: questionRow.expected_answer_points,
        skillMappings: (insertedMappings || []).map((m) => ({
          skillId: m.skill_id,
          skillName: skillRows.find((s) => s.id === m.skill_id)?.name || '',
          weight: m.weight,
        })),
      });
    }

    if (insertedQuestions.length === 0) {
      return res.status(502).json({
        error: 'AI generated questions but none had valid skill mappings. Please try again.',
        topicOrRoleId,
      });
    }

    // ── 6. Return result ────────────────────────────────────
    const elapsedMs = Date.now() - startTime;

    return res.status(201).json({
      topicOrRole: {
        id: topicRow.id,
        type: topicRow.type,
        rawInput: topicRow.raw_input,
      },
      questions: insertedQuestions,
      meta: {
        questionCount: insertedQuestions.length,
        technicalCount: insertedQuestions.filter((q) => q.questionType === 'technical').length,
        behavioralCount: insertedQuestions.filter((q) => q.questionType === 'behavioral').length,
        difficultyDistribution: {
          easy: insertedQuestions.filter((q) => q.difficultyLevel === 'easy').length,
          medium: insertedQuestions.filter((q) => q.difficultyLevel === 'medium').length,
          hard: insertedQuestions.filter((q) => q.difficultyLevel === 'hard').length,
        },
        generationTimeMs: elapsedMs,
      },
    });
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      route: 'POST /api/questions/generate',
      step: 'unhandled',
      error: err.message,
    }));
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ============================================================
// GET /api/questions/:topicOrRoleId
// ============================================================
router.get('/:topicOrRoleId', async (req, res) => {
  try {
    const { topicOrRoleId } = req.params;

    if (!UUID_REGEX.test(topicOrRoleId)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    // Fetch topic/role
    const { data: topicRow, error: topicError } = await supabase
      .from('topics_or_roles')
      .select('*')
      .eq('id', topicOrRoleId)
      .eq('user_id', req.user.id)
      .single();

    if (topicError || !topicRow) {
      return res.status(404).json({ error: 'Topic or role not found.' });
    }

    // Fetch questions
    const { data: questionRows, error: qError } = await supabase
      .from('questions')
      .select('*')
      .eq('topic_or_role_id', topicOrRoleId)
      .order('created_at', { ascending: true });

    if (qError) {
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        route: `GET /api/questions/${topicOrRoleId}`,
        error: qError.message,
      }));
      return res.status(500).json({ error: 'Failed to retrieve questions.' });
    }

    if (!questionRows || questionRows.length === 0) {
      return res.json({
        topicOrRole: {
          id: topicRow.id,
          type: topicRow.type,
          rawInput: topicRow.raw_input,
        },
        questions: [],
        meta: { questionCount: 0 },
      });
    }

    // Fetch all Q-matrix mappings for these questions
    const questionIds = questionRows.map((q) => q.id);
    const { data: mappingRows, error: mError } = await supabase
      .from('question_skill_map')
      .select('question_id, skill_id, weight')
      .in('question_id', questionIds);

    if (mError) {
      console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        route: `GET /api/questions/${topicOrRoleId}`,
        step: 'fetch_mappings',
        error: mError.message,
      }));
    }

    // Fetch skill names for display
    const { data: skillRows } = await supabase
      .from('skills')
      .select('id, name, category')
      .eq('topic_or_role_id', topicOrRoleId);

    const skillMap = new Map((skillRows || []).map((s) => [s.id, s]));

    // Assemble response
    const questions = questionRows.map((q) => {
      const qMappings = (mappingRows || []).filter((m) => m.question_id === q.id);
      return {
        id: q.id,
        questionText: q.question_text,
        questionType: q.question_type,
        difficultyLevel: q.difficulty_level,
        difficultyRating: q.difficulty_rating,
        expectedAnswerPoints: q.expected_answer_points,
        skillMappings: qMappings.map((m) => ({
          skillId: m.skill_id,
          skillName: skillMap.get(m.skill_id)?.name || '',
          skillCategory: skillMap.get(m.skill_id)?.category || '',
          weight: m.weight,
        })),
        createdAt: q.created_at,
      };
    });

    return res.json({
      topicOrRole: {
        id: topicRow.id,
        type: topicRow.type,
        rawInput: topicRow.raw_input,
      },
      questions,
      meta: {
        questionCount: questions.length,
        technicalCount: questions.filter((q) => q.questionType === 'technical').length,
        behavioralCount: questions.filter((q) => q.questionType === 'behavioral').length,
      },
    });
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      route: `GET /api/questions/${req.params.topicOrRoleId}`,
      error: err.message,
    }));
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
