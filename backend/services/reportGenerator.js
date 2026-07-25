// backend/services/reportGenerator.js
// AbhyasAI — LLM-powered session report generation.

const OpenAI = require('openai');

let openai;
function getOpenAI() {
  return openai ||= new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 90 * 1000 });
}

const TOPIC_REPORT_SYSTEM_PROMPT = `You are an expert AI tutor generating an end-of-session Study Progress Report.
You will be provided with:
1. The academic topic the learner practiced.
2. The Q&A history (questions asked, the learner's answers, and the AI evaluator's feedback).
3. The learner's skill progression (initial vs final ratings).

Your task is to synthesize this data into a cohesive, structured JSON report.

Rules:
1. Focus on actionable learning insights. Identify clear patterns in their strengths and gaps across all answers.
2. Provide concrete study recommendations based on their weakest areas. Address the user as "student" or "learner".
3. The summary should be a 2-3 sentence positive, constructive overall academic assessment.
4. Calculate the overall_score as a float (0.0 to 1.0), which is roughly the average of all answer scores.
5. Provide 2-4 top_strengths (Topics mastered) and 2-4 top_gaps (Areas to revise).
6. Provide 2-4 actionable recommendations (Recommended study resources).
7. Return ONLY valid JSON matching the schema below. No markdown fences.
8. Use active voice throughout (e.g. "You explained X clearly" not "X was explained").
   Avoid jargon without inline definitions. Keep sentences under 20 words where possible.

Schema:
{
  "summary": "string",
  "overall_score": 0.0,
  "top_strengths": ["string"],
  "top_gaps": ["string"],
  "recommendations": ["string"],
  "skill_progression": [
    {
      "skill_name": "string",
      "category": "technical",
      "starting_rating": 0.0,
      "ending_rating": 0.0,
      "delta": 0.0
    }
  ]
}`;

const JOB_ROLE_REPORT_SYSTEM_PROMPT = `You are an expert AI coach generating an end-of-session Interview Readiness Report.
You will be provided with:
1. The job role the candidate practiced for.
2. The Q&A history (questions asked, the candidate's answers, and the AI evaluator's feedback).
3. The candidate's skill progression (initial vs final ratings).

Your task is to synthesize this data into a cohesive, structured JSON report.

Rules:
1. Focus on actionable interview insights. Identify clear patterns in their strengths and gaps across all answers.
2. Provide concrete interview preparation recommendations based on their weakest areas. Address the user as "candidate".
3. The summary should be a 2-3 sentence positive, constructive overall interview assessment.
4. Calculate the overall_score as a float (0.0 to 1.0), which is roughly the average of all answer scores.
5. Provide 2-4 top_strengths (Interview strengths) and 2-4 top_gaps (Knowledge gaps).
6. Provide 2-4 actionable recommendations (Interview tips).
7. Return ONLY valid JSON matching the schema below. No markdown fences.
8. Use active voice throughout (e.g. "You explained X clearly" not "X was explained").
   Avoid jargon without inline definitions. Keep sentences under 20 words where possible.

Schema:
{
  "summary": "string",
  "overall_score": 0.0,
  "top_strengths": ["string"],
  "top_gaps": ["string"],
  "recommendations": ["string"],
  "skill_progression": [
    {
      "skill_name": "string",
      "category": "technical | behavioral",
      "starting_rating": 0.0,
      "ending_rating": 0.0,
      "delta": 0.0
    }
  ]
}`;

/**
 * Generates a structured JSON report using GPT-4o-mini.
 * 
 * @param {Object} params
 * @param {string} params.topicContext - The topic or role
 * @param {Array} params.answers - Array of answers with their evaluations
 * @param {Array} params.skillChanges - Array of skill progression data
 * @param {string} params.sessionType - 'topic' or 'job_role'
 * @returns {Promise<Object>} The parsed JSON report
 */
const { sanitiseInput } = require('../utils/sanitiseInput');

async function generateReport({ topicContext, answers, skillChanges, sessionType }) {
  // Build the user message
  const answerSummaries = answers.map((a, i) => `
--- Q${i + 1}: ${a.questionText} ---
Learner Answer: ${sanitiseInput(a.answer_text)}
AI Score: ${a.score}
Strengths identified: ${a.evaluation.strengths?.join(', ')}
Gaps identified: ${a.evaluation.gaps?.join(', ')}
`).join('\n');

  const skillSummaries = skillChanges.map(s => 
    `- ${s.skillName} (${s.category}): Started at ${Math.round(s.startingRating)}, Ended at ${Math.round(s.endingRating)} (Delta: ${Math.round(s.delta > 0 ? '+' + s.delta : s.delta)})`
  ).join('\n');

  const userMessageContent = `
Topic/Role: ${sanitiseInput(topicContext)}

Skill Progression:
${skillSummaries}

Q&A History:
${answerSummaries}
`;

  const systemPrompt = sessionType === 'topic' ? TOPIC_REPORT_SYSTEM_PROMPT : JOB_ROLE_REPORT_SYSTEM_PROMPT;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessageContent },
  ];

  const callLLM = async () => {
    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3, // Slightly higher for synthesis
      max_tokens: 1500,
      messages,
    });

    const choice = response.choices?.[0];
    if (!choice?.message?.content) {
      throw new Error('LLM returned empty response');
    }
    let content = choice.message.content;
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const parsed = JSON.parse(content);
    
    // Merge the skill progression details provided by the LLM 
    // to make sure it accurately reflects the raw numbers passed in,
    // or just let the LLM generate it based on the summary provided.
    // We'll enforce the LLM's output but can fallback to raw data if needed.
    
    return parsed;
  };

  try {
    return await callLLM();
  } catch (error) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      return await callLLM();
    } catch (retryError) {
      throw new Error(`Report generation failed after retry: ${retryError.message}`);
    }
  }
}

module.exports = { generateReport };
