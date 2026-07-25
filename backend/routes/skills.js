// backend/routes/skills.js
// AbhyasAI — Skill extraction and retrieval routes.
// POST /api/skills/extract  — extract skills from topic/JD via LLM, persist to DB
// GET  /api/skills/:topicOrRoleId — retrieve skills for a given topic/role

const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');
const skillExtractor = require('../services/skillExtractor');

// ============================================================
// POST /api/skills/extract
// ============================================================
router.post('/extract', async (req, res) => {
  const startTime = Date.now();

  try {
    const { rawInput, type } = req.body;

    // ── Validation ──────────────────────────────────────────
    if (!rawInput || typeof rawInput !== 'string' || rawInput.trim().length === 0) {
      return res.status(400).json({
        error: 'rawInput is required and must be a non-empty string.',
      });
    }

    if (!type || !['topic', 'job_role'].includes(type)) {
      return res.status(400).json({
        error: "type is required and must be 'topic' or 'job_role'.",
      });
    }

    const trimmedInput = rawInput.trim();

    // ── 1. Insert into topics_or_roles ──────────────────────
    const { data: topicRow, error: topicError } = await supabase
      .from('topics_or_roles')
      .insert({ type, raw_input: trimmedInput })
      .select()
      .single();

    if (topicError) {
      console.error(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          route: 'POST /api/skills/extract',
          step: 'insert_topic',
          error: topicError.message,
        })
      );
      return res.status(500).json({ error: 'Failed to save topic. Please try again.' });
    }

    // ── 2. Call LLM to extract skills ───────────────────────
    let extracted;
    try {
      extracted = await skillExtractor.extract({ rawInput: trimmedInput, type });
    } catch (llmError) {
      console.error(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          route: 'POST /api/skills/extract',
          step: 'llm_extract',
          topicOrRoleId: topicRow.id,
          error: llmError.message,
        })
      );
      return res.status(502).json({
        error: 'AI skill extraction failed. Please try again.',
        topicOrRoleId: topicRow.id,
      });
    }

    // ── 3. Validate LLM output ──────────────────────────────
    if (
      !extracted ||
      !Array.isArray(extracted.skills) ||
      extracted.skills.length === 0
    ) {
      console.error(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          route: 'POST /api/skills/extract',
          step: 'validate_llm_output',
          topicOrRoleId: topicRow.id,
          extracted,
        })
      );
      return res.status(502).json({
        error: 'AI returned an invalid skill list. Please try again.',
        topicOrRoleId: topicRow.id,
      });
    }

    // Filter to valid categories only
    const validSkills = extracted.skills.filter(
      (s) =>
        s &&
        typeof s.name === 'string' &&
        s.name.trim().length > 0 &&
        ['technical', 'behavioral'].includes(s.category)
    );

    if (validSkills.length === 0) {
      return res.status(502).json({
        error: 'AI did not return any valid skills. Please try again.',
        topicOrRoleId: topicRow.id,
      });
    }

    // ── 4. Persist skills to DB ─────────────────────────────
    const skillRows = validSkills.map((s) => ({
      topic_or_role_id: topicRow.id,
      name: s.name.trim(),
      category: s.category,
    }));

    const { data: insertedSkills, error: skillsError } = await supabase
      .from('skills')
      .insert(skillRows)
      .select();

    if (skillsError) {
      console.error(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          route: 'POST /api/skills/extract',
          step: 'insert_skills',
          topicOrRoleId: topicRow.id,
          error: skillsError.message,
        })
      );
      return res.status(500).json({
        error: 'Failed to save extracted skills. Please try again.',
        topicOrRoleId: topicRow.id,
      });
    }

    // ── 5. Return result ────────────────────────────────────
    const elapsedMs = Date.now() - startTime;

    return res.status(201).json({
      topicOrRole: {
        id: topicRow.id,
        type: topicRow.type,
        rawInput: topicRow.raw_input,
        createdAt: topicRow.created_at,
      },
      skills: insertedSkills.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
      })),
      meta: {
        skillCount: insertedSkills.length,
        technicalCount: insertedSkills.filter((s) => s.category === 'technical').length,
        behavioralCount: insertedSkills.filter((s) => s.category === 'behavioral').length,
        extractionTimeMs: elapsedMs,
      },
    });
  } catch (err) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        route: 'POST /api/skills/extract',
        step: 'unhandled',
        error: err.message,
      })
    );
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ============================================================
// GET /api/skills/:topicOrRoleId
// ============================================================
router.get('/:topicOrRoleId', async (req, res) => {
  try {
    const { topicOrRoleId } = req.params;

    // Validate UUID format (basic check)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(topicOrRoleId)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    // Fetch topic/role
    const { data: topicRow, error: topicError } = await supabase
      .from('topics_or_roles')
      .select('*')
      .eq('id', topicOrRoleId)
      .single();

    if (topicError || !topicRow) {
      return res.status(404).json({ error: 'Topic or role not found.' });
    }

    // Fetch skills
    const { data: skillRows, error: skillsError } = await supabase
      .from('skills')
      .select('id, name, category, created_at')
      .eq('topic_or_role_id', topicOrRoleId)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (skillsError) {
      console.error(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          route: `GET /api/skills/${topicOrRoleId}`,
          error: skillsError.message,
        })
      );
      return res.status(500).json({ error: 'Failed to retrieve skills.' });
    }

    return res.json({
      topicOrRole: {
        id: topicRow.id,
        type: topicRow.type,
        rawInput: topicRow.raw_input,
        createdAt: topicRow.created_at,
      },
      skills: skillRows.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
      })),
      meta: {
        skillCount: skillRows.length,
        technicalCount: skillRows.filter((s) => s.category === 'technical').length,
        behavioralCount: skillRows.filter((s) => s.category === 'behavioral').length,
      },
    });
  } catch (err) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        route: `GET /api/skills/${req.params.topicOrRoleId}`,
        error: err.message,
      })
    );
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
