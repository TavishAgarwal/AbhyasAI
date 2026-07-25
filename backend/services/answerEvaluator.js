// backend/services/answerEvaluator.js
// AbhyasAI — LLM-powered answer evaluator with technical and behavioral rubrics.

const OpenAI = require('openai');

let openai;
function getOpenAI() {
  return openai ||= new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 60 * 1000, maxRetries: 0 });
}

// Prompt injection mitigation
const DELIMITER_START = '=== USER ANSWER START ===';
const DELIMITER_END = '=== USER ANSWER END ===';
const MAX_ANSWER_CHARS = 12_000;

function sanitiseInput(text) {
  return String(text || '').normalize('NFKC')
    .replace(/=== USER ANSWER START ===/g, '')
    .replace(/=== USER ANSWER END ===/g, '')
    .replace(/ignore (all |previous |the )?instructions?/gi, '[REDACTED]')
    .replace(/system prompt/gi, '[REDACTED]')
    .trim();
}

function prepareAnswer(text) {
  const normalised = String(text || '').normalize('NFKC');
  if (normalised.includes(DELIMITER_START) || normalised.includes(DELIMITER_END)) {
    throw new Error('Answer contains reserved delimiters.');
  }

  const truncated = normalised.length > MAX_ANSWER_CHARS;
  const answer = sanitiseInput(normalised.slice(0, MAX_ANSWER_CHARS));
  const delimiterLike = /={3,}.*(?:user\s+answer|answer\s+(?:start|end)).*={3,}/i.test(normalised);
  const instructionTerms = normalised.match(/\b(?:ignore|disregard|override|reveal|expose|print|output|follow)\b/gi) || [];
  const protectedTerms = normalised.match(/\b(?:instructions?|prompts?|systems?|polic(?:y|ies)|delimiters?)\b/gi) || [];
  const words = normalised.match(/\b[\p{L}\p{N}_'-]+\b/gu) || [];
  const instructionHeavy = words.length > 0 && (instructionTerms.length + protectedTerms.length) / words.length > 0.2;

  if (delimiterLike || (instructionTerms.length && protectedTerms.length) || instructionHeavy) {
    throw new Error('Answer was rejected as instruction-like content.');
  }
  return { answer, truncated };
}

function isScore(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
}

function validateEvaluation(value, rubricKeys) {
  const expectedKeys = ['score', 'strengths', 'gaps', 'resources', 'rubric_details'];
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
      Object.keys(value).length !== expectedKeys.length || !expectedKeys.every((key) => Object.hasOwn(value, key))) {
    throw new Error('LLM returned an invalid evaluation schema');
  }
  if (!isScore(value.score) || !['strengths', 'gaps', 'resources'].every((key) =>
    Array.isArray(value[key]) && value[key].every((item) => typeof item === 'string'))) {
    throw new Error('LLM returned invalid evaluation fields');
  }
  const details = value.rubric_details;
  if (!details || typeof details !== 'object' || Array.isArray(details) ||
      Object.keys(details).length !== rubricKeys.length || !rubricKeys.every((key) => isScore(details[key]))) {
    throw new Error('LLM returned invalid rubric details');
  }
  return value;
}

// ============================================================
// System Prompts for Rubrics
// ============================================================

const ACADEMIC_SYSTEM_PROMPT = `You are an expert academic tutor evaluating a student's answer.
Given a question, the expected answer points, and the student's answer, evaluate their response.

Rubric for Academic Questions:
- Correctness (35%): Is the information factually accurate?
- Completeness (25%): Did they cover the expected answer points?
- Understanding (25%): Do they demonstrate deep understanding vs rote memorization?
- Clarity (15%): Is the explanation clear, structured, and easy to follow?

Rules:
- Provide a score between 0.0 and 1.0 based on the rubric above.
- Identify 1-3 specific strengths in their answer.
- Identify 1-3 specific gaps or areas for improvement.
- Suggest 1-2 actionable study resources or tips based on their gaps.
- Return ONLY valid JSON matching the schema below. No markdown fences.

Schema:
{
  "score": 0.85,
  "strengths": ["string"],
  "gaps": ["string"],
  "resources": ["string"],
  "rubric_details": {
    "correctness": 0.9,
    "completeness": 0.8,
    "understanding": 0.8,
    "clarity": 0.9
  }
}`;

const TECHNICAL_SYSTEM_PROMPT = `You are an expert technical interviewer evaluating a candidate's answer.
Given a question, the expected answer points, and the candidate's answer, evaluate their response.

Rubric for Technical Questions:
- Correctness (40%): Is the information factually accurate?
- Completeness (30%): Did they cover the expected answer points?
- Clarity (20%): Is the explanation clear and easy to follow?
- Examples (10%): Did they use relevant examples to illustrate their points?

Rules:
- Provide a score between 0.0 and 1.0 based on the rubric above.
- Identify 1-3 specific strengths in their answer.
- Identify 1-3 specific gaps or areas for improvement.
- Suggest 1-2 actionable resources or study tips based on their gaps.
- Return ONLY valid JSON matching the schema below. No markdown fences.

Schema:
{
  "score": 0.85,
  "strengths": ["string"],
  "gaps": ["string"],
  "resources": ["string"],
  "rubric_details": {
    "correctness": 0.9,
    "completeness": 0.8,
    "clarity": 0.8,
    "examples": 0.9
  }
}`;

const BEHAVIORAL_SYSTEM_PROMPT = `You are an expert behavioral interviewer evaluating a candidate's answer using the STAR method.
Given a behavioral question and the candidate's answer, evaluate their response.

Rubric for Behavioral Questions (STAR):
- Situation (25%): Did they clearly set the context and describe the situation?
- Task (20%): Did they explain their specific role and the challenge they faced?
- Action (35%): Did they detail the specific steps they took to address the challenge?
- Result (20%): Did they share the outcome, impact, and what they learned?

Rules:
- Provide a score between 0.0 and 1.0 based on the rubric above.
- Identify 1-3 specific strengths in their answer.
- Identify 1-3 specific gaps or areas for improvement.
- Suggest 1-2 actionable resources or interview tips based on their gaps.
- Return ONLY valid JSON matching the schema below. No markdown fences.

Schema:
{
  "score": 0.75,
  "strengths": ["string"],
  "gaps": ["string"],
  "resources": ["string"],
  "rubric_details": {
    "situation": 0.8,
    "task": 0.7,
    "action": 0.8,
    "result": 0.6
  }
}`;

// ============================================================
// Core evaluation function
// ============================================================

/**
 * Calls GPT-4o-mini to evaluate an answer based on question type.
 * @param {Object} params
 * @param {string} params.questionText - The question asked
 * @param {string} params.questionType - 'technical' or 'behavioral'
 * @param {Array<string>} params.expectedPoints - Expected key points
 * @param {string} params.answerText - The user's answer
 * @param {string} params.sessionType - 'topic' or 'job_role'
 * @returns {Promise<{ score: number, strengths: string[], gaps: string[], resources: string[], rubric_details: Object }>}
 */
async function evaluate({ questionText, questionType, expectedPoints, answerText, sessionType }, {
  client,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
} = {}) {
  let systemPrompt;
  if (sessionType === 'topic') {
    systemPrompt = ACADEMIC_SYSTEM_PROMPT;
  } else {
    systemPrompt = questionType === 'behavioral' ? BEHAVIORAL_SYSTEM_PROMPT : TECHNICAL_SYSTEM_PROMPT;
  }
  
  const { answer, truncated } = prepareAnswer(answerText);
  const rubricKeys = sessionType === 'topic'
    ? ['correctness', 'completeness', 'understanding', 'clarity']
    : questionType === 'behavioral'
      ? ['situation', 'task', 'action', 'result']
      : ['correctness', 'completeness', 'clarity', 'examples'];
  const userMessageContent = JSON.stringify({
    question: questionText,
    expected_answer_points: Array.isArray(expectedPoints) ? expectedPoints : [],
    student_answer: {
      delimiter_start: DELIMITER_START,
      content: answer,
      delimiter_end: DELIMITER_END,
      truncated
    }
  });

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessageContent },
  ];

  const callLLM = async () => {
    const response = await (client || getOpenAI()).chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.1, // Low temp for consistent evaluation
      max_tokens: 1500,
      messages,
    });

    const choice = response.choices?.[0];
    if (!choice?.message?.content) {
      throw new Error('LLM returned empty response');
    }
    let content = choice.message.content;
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    return validateEvaluation(JSON.parse(content), rubricKeys);
  };

  try {
    return await callLLM();
  } catch (error) {
    await sleep(2000);
    try {
      return await callLLM();
    } catch (retryError) {
      throw new Error(`Answer evaluation failed after retry: ${retryError.message}`);
    }
  }
}

module.exports = { evaluate, sanitiseInput, prepareAnswer, validateEvaluation };
