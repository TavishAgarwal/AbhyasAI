// backend/routes/sessions.js
// AbhyasAI — Session management for practice loop.
// POST /api/sessions/start     — Initialize session and get first question
// POST /api/sessions/:id/answer — Submit answer, evaluate, update Elo, get next question
// GET  /api/sessions/:id        — Retrieve full session state

const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');
const { evaluate } = require('../services/answerEvaluator');
const { updateRatings } = require('../services/eloRating');
const { selectNextQuestion } = require('../services/questionSelector');

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ============================================================
// POST /api/sessions/start
// ============================================================
router.post('/start', async (req, res) => {
  try {
    const { topicOrRoleId, questionCount, questionIds } = req.body;

    if (!topicOrRoleId || !UUID_REGEX.test(topicOrRoleId)) {
      return res.status(400).json({ error: 'Valid topicOrRoleId is required.' });
    }

    let questions;
    let totalQuestionsToUse;

    if (questionIds && Array.isArray(questionIds)) {
      // Use pre-generated question IDs
      const { data: fetchedQuestions, error: qError } = await supabase
        .from('questions')
        .select('id, question_text, question_type, difficulty_level, difficulty_rating')
        .in('id', questionIds)
        .eq('topic_or_role_id', topicOrRoleId);

      if (qError) throw new Error(`Failed to fetch questions: ${qError.message}`);
      questions = fetchedQuestions;
      totalQuestionsToUse = questions.length;
    } else {
      // Fall back to original behavior: fetch questions for the topic
      const { data: fetchedQuestions, error: qError } = await supabase
        .from('questions')
        .select('id, question_text, question_type, difficulty_level, difficulty_rating')
        .eq('topic_or_role_id', topicOrRoleId);

      if (qError) throw new Error(`Failed to fetch questions: ${qError.message}`);
      questions = fetchedQuestions;
      totalQuestionsToUse = Math.min(Math.max(parseInt(questionCount) || 10, 1), 20);
    }

    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: 'No questions found for this topic.' });
    }

    // 2. Create session
    const { data: sessionRow, error: sError } = await supabase
      .from('sessions')
      .insert({
        topic_or_role_id: topicOrRoleId,
        total_questions: Math.min(totalQuestionsToUse, questions.length),
      })
      .select()
      .single();

    if (sError) {
      throw new Error(`Failed to create session: ${sError.message}`);
    }

    // 3. Init skill ratings (fetch skills for topic first)
    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('id, name, category')
      .eq('topic_or_role_id', topicOrRoleId);

    if (skillsError) {
      throw new Error(`Failed to fetch skills: ${skillsError.message}`);
    }

    let initialSkillRatings = [];
    if (skills && skills.length > 0) {
      const ratingRows = skills.map((s) => ({
        session_id: sessionRow.id,
        skill_id: s.id,
        rating: 0.0,
      }));

      const { data: insertedRatings, error: rError } = await supabase
        .from('skill_ratings')
        .insert(ratingRows)
        .select();

      if (rError) throw new Error(`Failed to init skill ratings: ${rError.message}`);
      initialSkillRatings = insertedRatings;
    }

    // 4. Load Q-matrix to select first question
    const qIds = questions.map(q => q.id);
    const { data: mappings } = await supabase
      .from('question_skill_map')
      .select('question_id, skill_id, weight')
      .in('question_id', qIds);

    const mappingMap = new Map();
    for (const m of (mappings || [])) {
      if (!mappingMap.has(m.question_id)) mappingMap.set(m.question_id, []);
      mappingMap.get(m.question_id).push({ skillId: m.skill_id, weight: m.weight });
    }

    const firstQuestion = selectNextQuestion(questions, initialSkillRatings, mappingMap);

    return res.status(201).json({
      session: {
        id: sessionRow.id,
        status: sessionRow.status,
        totalQuestions: sessionRow.total_questions,
        currentQuestionIndex: 0,
      },
      firstQuestion: {
        id: firstQuestion.id,
        questionText: firstQuestion.question_text,
        questionType: firstQuestion.question_type,
        difficultyLevel: firstQuestion.difficulty_level,
        questionIndex: 0,
        skillsTested: mappingMap.get(firstQuestion.id)?.map(m => {
          const s = skills.find(sk => sk.id === m.skillId);
          return s ? { name: s.name, category: s.category } : null;
        }).filter(Boolean) || [],
      },
      skillRatings: initialSkillRatings.map(r => ({
        skillName: skills.find(sk => sk.id === r.skill_id)?.name || 'Unknown',
        rating: r.rating,
      })),
    });
  } catch (error) {
    console.error(`POST /api/sessions/start error: ${error.message}`);
    return res.status(500).json({ error: 'Failed to start session' });
  }
});

// ============================================================
// POST /api/sessions/:id/answer
// ============================================================
router.post('/:id/answer', async (req, res) => {
  try {
    const sessionId = req.params.id;
    const { questionId, answerText } = req.body;

    if (!UUID_REGEX.test(sessionId) || !UUID_REGEX.test(questionId)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    if (!answerText || answerText.trim() === '') {
      return res.status(400).json({ error: 'Answer text is required.' });
    }

    // 1. Fetch Session and Question
    const { data: session, error: sessionErr } = await supabase
      .from('sessions')
      .select('*, topics_or_roles(type)')
      .eq('id', sessionId)
      .single();

    if (sessionErr || !session) return res.status(404).json({ error: 'Session not found.' });
    if (session.status !== 'active') return res.status(400).json({ error: 'Session is not active.' });

    const { data: question, error: questionErr } = await supabase
      .from('questions')
      .select('*')
      .eq('id', questionId)
      .single();

    if (questionErr || !question) return res.status(404).json({ error: 'Question not found.' });

    // 2. Fetch Q-Matrix for this question
    const { data: mappings } = await supabase
      .from('question_skill_map')
      .select('skill_id, weight')
      .eq('question_id', questionId);

    const skillIds = (mappings || []).map(m => m.skill_id);

    // 3. Fetch current skill ratings for the learner
    const { data: skillRatings } = await supabase
      .from('skill_ratings')
      .select('id, skill_id, rating')
      .eq('session_id', sessionId)
      .in('skill_id', skillIds);

    // 4. Evaluate Answer via LLM
    const evaluation = await evaluate({
      questionText: question.question_text,
      questionType: question.question_type,
      expectedPoints: question.expected_answer_points,
      answerText: answerText,
      sessionType: session.topics_or_roles?.type,
    });

    // 5. Compute Elo Updates
    const inputForElo = (skillRatings || []).map(sr => {
      const mapping = mappings.find(m => m.skill_id === sr.skill_id);
      return {
        skillId: sr.skill_id,
        rating: sr.rating,
        weight: mapping ? mapping.weight : 1.0,
      };
    });

    const eloUpdates = updateRatings({
      score: evaluation.score,
      questionDifficulty: question.difficulty_rating,
      skillRatings: inputForElo,
    });

    // 6. Persist Updates (Answer, Ratings, Question)
    const { error: ansError } = await supabase.from('answers').insert({
      session_id: sessionId,
      question_id: questionId,
      answer_text: answerText,
      score: evaluation.score,
      evaluation,
      elo_updates: eloUpdates,
      question_index: session.current_question_index,
    });
    if (ansError) throw new Error(`Failed to save answer: ${ansError.message}`);

    // Update Skill Ratings
    for (const change of eloUpdates.skillChanges) {
      const { error: srErr } = await supabase
        .from('skill_ratings')
        .update({ rating: change.newRating, updated_at: new Date().toISOString() })
        .eq('session_id', sessionId)
        .eq('skill_id', change.skillId);
      if (srErr) console.error(`Skill rating update failed for ${change.skillId}: ${srErr.message}`);
    }

    // Update Question Difficulty
    const { error: qErr } = await supabase
      .from('questions')
      .update({ difficulty_rating: eloUpdates.questionDifficultyChange.new })
      .eq('id', questionId);
    if (qErr) console.error(`Question difficulty update failed: ${qErr.message}`);

    // 7. Increment Session progress and pick next question
    const nextIndex = session.current_question_index + 1;
    let nextQuestion = null;
    let newStatus = 'active';

    if (nextIndex >= session.total_questions) {
      newStatus = 'completed';
      const { error: sUpdateErr } = await supabase.from('sessions').update({ 
        current_question_index: nextIndex, 
        status: newStatus,
        completed_at: new Date().toISOString()
      }).eq('id', sessionId);
      if (sUpdateErr) throw new Error(`Failed to update session status: ${sUpdateErr.message}`);
    } else {
      // Find answered questions
      const { data: answeredRows } = await supabase
        .from('answers')
        .select('question_id')
        .eq('session_id', sessionId);
      const answeredSet = new Set((answeredRows || []).map(r => r.question_id));

      // Fetch all remaining questions + mappings
      const { data: allQuestions } = await supabase
        .from('questions')
        .select('id, question_text, question_type, difficulty_level, difficulty_rating')
        .eq('topic_or_role_id', session.topic_or_role_id);
      
      const availableQuestions = (allQuestions || []).filter(q => !answeredSet.has(q.id));

      if (availableQuestions.length === 0) {
        newStatus = 'completed';
        const { error: sUpdateErr } = await supabase.from('sessions').update({ 
          current_question_index: nextIndex, 
          status: newStatus,
          completed_at: new Date().toISOString()
        }).eq('id', sessionId);
        if (sUpdateErr) throw new Error(`Failed to update session status: ${sUpdateErr.message}`);
      } else {
        const { error: idxUpdateErr } = await supabase.from('sessions').update({ current_question_index: nextIndex }).eq('id', sessionId);
        if (idxUpdateErr) throw new Error(`Failed to update session index: ${idxUpdateErr.message}`);

        const availableQIds = availableQuestions.map(q => q.id);
        const { data: allMappings } = await supabase
          .from('question_skill_map')
          .select('question_id, skill_id, weight')
          .in('question_id', availableQIds);
        
        const qMappings = new Map();
        for (const m of (allMappings || [])) {
          if (!qMappings.has(m.question_id)) qMappings.set(m.question_id, []);
          qMappings.get(m.question_id).push({ skillId: m.skill_id, weight: m.weight });
        }

        const { data: currentSkills } = await supabase
          .from('skill_ratings')
          .select('skill_id, rating')
          .eq('session_id', sessionId);

        nextQuestion = selectNextQuestion(availableQuestions, currentSkills || [], qMappings);
      }
    }

    // Resolve skill names for Elo updates
    const { data: skillsData } = await supabase
      .from('skills')
      .select('id, name')
      .eq('topic_or_role_id', session.topic_or_role_id);
    const skillNameMap = new Map((skillsData || []).map(s => [s.id, s.name]));

    const enrichedSkillChanges = eloUpdates.skillChanges.map(sc => ({
      skillName: skillNameMap.get(sc.skillId) || 'Unknown',
      oldRating: sc.oldRating,
      newRating: sc.newRating,
      delta: sc.delta,
    }));

    return res.json({
      evaluation,
      eloUpdates: {
        skillChanges: enrichedSkillChanges,
        questionDifficultyChange: eloUpdates.questionDifficultyChange,
      },
      nextQuestion: nextQuestion ? {
        id: nextQuestion.id,
        questionText: nextQuestion.question_text,
        questionType: nextQuestion.question_type,
        difficultyLevel: nextQuestion.difficulty_level,
        questionIndex: nextIndex,
      } : null,
      sessionComplete: newStatus === 'completed',
      sessionProgress: {
        answered: nextIndex,
        total: session.total_questions,
      }
    });
  } catch (error) {
    console.error(`POST /api/sessions/:id/answer error: ${error.message}`);
    return res.status(500).json({ error: 'Failed to process answer' });
  }
});

// ============================================================
// GET /api/sessions/:id
// ============================================================
router.get('/:id', async (req, res) => {
  try {
    const sessionId = req.params.id;
    if (!UUID_REGEX.test(sessionId)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    const { data: session, error: sErr } = await supabase
      .from('sessions')
      .select('*, topics_or_roles(type, raw_input)')
      .eq('id', sessionId)
      .single();

    if (sErr || !session) return res.status(404).json({ error: 'Session not found.' });

    const { data: answers } = await supabase
      .from('answers')
      .select('question_id, answer_text, score, evaluation, elo_updates, question_index, created_at')
      .eq('session_id', sessionId)
      .order('question_index', { ascending: true });

    const { data: skillRatings } = await supabase
      .from('skill_ratings')
      .select('skill_id, rating')
      .eq('session_id', sessionId);

    // Attach question texts
    let enrichedAnswers = [];
    if (answers && answers.length > 0) {
      const qIds = answers.map(a => a.question_id);
      const { data: questions } = await supabase
        .from('questions')
        .select('id, question_text, question_type')
        .in('id', qIds);
      
      const qMap = new Map((questions || []).map(q => [q.id, q]));
      
      enrichedAnswers = answers.map(a => {
        const q = qMap.get(a.question_id);
        return {
          ...a,
          questionText: q ? q.question_text : '',
          questionType: q ? q.question_type : '',
        };
      });
    }

    return res.json({
      session: {
        id: session.id,
        topicOrRoleId: session.topic_or_role_id,
        type: session.topics_or_roles?.type,
        topicName: session.topics_or_roles?.raw_input,
        status: session.status,
        currentQuestionIndex: session.current_question_index,
        totalQuestions: session.total_questions,
        createdAt: session.created_at,
        completedAt: session.completed_at,
      },
      answers: enrichedAnswers,
      currentSkillRatings: skillRatings || [],
    });
  } catch (error) {
    console.error(`GET /api/sessions/:id error: ${error.message}`);
    return res.status(500).json({ error: 'Failed to fetch session' });
  }
});

module.exports = router;
