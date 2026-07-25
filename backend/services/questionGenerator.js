// backend/services/questionGenerator.js
// AbhyasAI — Generates practice questions from a skill set, each tagged
// with a Q-matrix mapping (which skills it tests and at what weight).
// Uses GPT-4o-mini with structured JSON output, retry-once pattern.

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 90 * 1000,
  maxRetries: 0,
});

// Elo constants
const INITIAL_DIFFICULTY = 1500.0; // β_i starting rating

// ============================================================
// System prompt for question generation
// ============================================================

const SYSTEM_PROMPT = `You are an expert question designer for an adaptive study and interview coaching system.

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
 * @returns {Promise<{ questions: Array }>}
 */
async function generate({ skills, count = 10, topicContext = '' }) {
  // Build the user message with skill list
  const skillListText = skills
    .map((s) => `- ID: ${s.id} | Name: ${s.name} | Category: ${s.category}`)
    .join('\n');

  const userMessage = [
    topicContext ? `Topic/Role context: "${topicContext}"` : '',
    `Generate exactly ${count} practice questions for these skills:`,
    '',
    skillListText,
    '',
    `Ensure a good mix: roughly 60% technical, 40% behavioral (or adjust based on the skill distribution).`,
    `Spread difficulty: ~30% easy, ~50% medium, ~20% hard.`,
    `Each question should map to 1–3 skills from the list above.`,
  ]
    .filter(Boolean)
    .join('\n');

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
  ];

  const callLLM = async () => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7, // Higher for question variety
      max_tokens: 4000,
      messages,
    });

    let content = response.choices[0].message.content;
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
      return INITIAL_DIFFICULTY - 200; // 1300
    case 'hard':
      return INITIAL_DIFFICULTY + 200; // 1700
    case 'medium':
    default:
      return INITIAL_DIFFICULTY; // 1500
  }
}

module.exports = { generate, difficultyToRating, INITIAL_DIFFICULTY };
