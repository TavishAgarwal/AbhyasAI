// backend/services/questionGenerator.js
// AbhyasAI — Generates practice questions from a skill set, each tagged
// with a Q-matrix mapping (which skills it tests and at what weight).
// Uses GPT-4o-mini with structured JSON output, retry-once pattern.

const OpenAI = require('openai');

let openai;
function getOpenAI() {
  return openai ||= new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 90 * 1000 });
}

// Elo constants
const INITIAL_DIFFICULTY = 0.0; // β_i starting rating

const TOPIC_SYSTEM_PROMPT = `You are an expert question designer for an adaptive academic coaching system.

Given a list of skills (each with an id, name, and category), generate practice questions that test one or more of those skills.

For Academic Topics, generate questions that test conceptual understanding, application, or problem-solving. Mix question types:
- Explain/define questions ("Explain the difference between...", "What is the purpose of...")
- Application questions ("Solve...", "Calculate...", "Given this scenario, predict...")
- Analytical/Critical thinking questions ("Compare and contrast...", "Why does...")

Rules:
- Generate exactly the number of questions requested.
- Each question MUST map to 1–3 skills from the provided list. Use skill IDs for the mapping.
- Assign a weight (0.0–1.0) to each skill mapping: 1.0 = primary skill tested, 0.5 = secondary, 0.3 = tangentially tested.
- Assign a difficulty_level to each question: "easy", "medium", or "hard".
- Include 3–5 key answer points that a good answer should cover.
- Set question_type to "technical" for all academic questions. Do NOT generate STAR behavioral questions.

Return ONLY raw JSON — no markdown fences, no preamble, no explanation.
Schema:
{
  "questions": [
    {
      "question_text": "string",
      "question_type": "technical",
      "difficulty_level": "easy | medium | hard",
      "answer_points": ["string"],
      "skill_mappings": [
        { "skill_id": "uuid", "weight": 0.0-1.0 }
      ]
    }
  ]
}`;

const JOB_ROLE_SYSTEM_PROMPT = `You are an expert question designer for an adaptive interview coaching system.

Given a list of skills (each with an id, name, and category), generate practice questions that test one or more of those skills.

For TECHNICAL skills, generate questions that test conceptual understanding, application, or problem-solving. Mix question types:
- Explain/define questions ("Explain the difference between...")
- Scenario-based questions ("Given a system that..., how would you...")
- Application questions ("Design a solution for...")

For BEHAVIORAL skills, generate questions that require structured answers (STAR format):
- Situation-based questions ("Tell me about a time when...")
- Hypothetical scenarios ("How would you handle...")

Rules:
- Generate exactly the number of questions requested.
- Each question MUST map to 1–3 skills from the provided list. Use skill IDs for the mapping.
- Assign a weight (0.0–1.0) to each skill mapping: 1.0 = primary skill tested, 0.5 = secondary, 0.3 = tangentially tested.
- Assign a difficulty_level to each question: "easy", "medium", or "hard".
- Include 3–5 key answer points that a good answer should cover.
- For behavioral questions, set question_type to "behavioral". For technical, set it to "technical".

Return ONLY raw JSON — no markdown fences, no preamble, no explanation.
Schema:
{
  "questions": [
    {
      "question_text": "string",
      "question_type": "technical | behavioral",
      "difficulty_level": "easy | medium | hard",
      "answer_points": ["string"],
      "skill_mappings": [
        { "skill_id": "uuid", "weight": 0.0-1.0 }
      ]
    }
  ]
}`;

// ============================================================
// Core generation function
// ============================================================

/**
 * Calls GPT-4o-mini to generate questions for a set of skills.
 * @param {Object} params
 * @param {Array<{ id: string, name: string, category: string }>} params.skills
 * @param {number} [params.count=10] - Number of questions to generate
 * @param {string} [params.topicContext=''] - Original topic/role for context
 * @param {string} params.type - 'topic' or 'role'
 * @returns {Promise<{ questions: Array }>}
 */
const { sanitiseInput } = require('../utils/sanitiseInput');

async function generate({ skills, count = 10, topicContext, type, previousScore, previousQuestions }) {
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    throw new Error('Skills array is required to generate questions.');
  }

  const simplifiedSkills = skills.map(s => ({
    id: s.id,
    name: s.name,
    category: s.category
  }));

  const systemPrompt = type === 'topic' ? TOPIC_SYSTEM_PROMPT : JOB_ROLE_SYSTEM_PROMPT;

  let userPrompt = `Context: "${sanitiseInput(topicContext || 'General')}"
Number of questions to generate: ${count}
Skills available to test:
${JSON.stringify(simplifiedSkills, null, 2)}

Please generate ${count} practice questions mapping to these skills. Ensure the IDs exactly match.`;

  // Adaptive Retry Logic
  if (previousScore !== undefined && previousQuestions && previousQuestions.length > 0) {
    let difficultyInstruction = 'Generate 30% easy, 50% medium, 20% hard questions (default mix).';
    if (previousScore >= 0.7) {
      difficultyInstruction = 'Generate 20% easy, 40% medium, 40% hard questions. Focus on edge cases, synthesis, and deeper conceptual challenges.';
    } else if (previousScore <= 0.3) {
      difficultyInstruction = 'Generate 50% easy, 40% medium, 10% hard questions. Focus on fundamentals and core concepts.';
    }

    userPrompt += `\n\nDIFFICULTY ADJUSTMENT:
The learner scored ${previousScore.toFixed(2)} on their last attempt.
${difficultyInstruction}

AVOID THESE PREVIOUSLY ASKED QUESTIONS — do NOT repeat or rephrase them:
${previousQuestions.map((q, i) => `${i + 1}. "${q}"`).join('\n')}
`;
  }

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

  const callLLM = async () => {
    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7, // Higher for question variety
      max_tokens: 4000,
      messages,
    });

    const choice = response.choices?.[0];
    if (!choice?.message?.content) {
      throw new Error('LLM returned empty response');
    }
    let content = choice.message.content;
    // Strip markdown code fences if present
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    return JSON.parse(content);
  };

  try {
    return await callLLM();
  } catch (error) {
    // Retry once after 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      return await callLLM();
    } catch (retryError) {
      throw new Error(
        `Question generation failed after retry: ${retryError.message}`
      );
    }
  }
}

/**
 * Maps difficulty_level string to an initial Elo β rating.
 * @param {string} level - "easy", "medium", or "hard"
 * @returns {number}
 */
function difficultyToRating(level) {
  switch (level) {
    case 'easy':
      return -1.0;
    case 'hard':
      return 1.0;
    case 'medium':
    default:
      return 0.0;
  }
}

module.exports = { generate, difficultyToRating, INITIAL_DIFFICULTY };
