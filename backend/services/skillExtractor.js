// backend/services/skillExtractor.js
// AbhyasAI — Extracts a structured skill matrix from a topic or job description.
// Uses GPT-4o-mini with retry-once,
// prompt-injection sanitisation, JSON-fence stripping.

const OpenAI = require('openai');

let openai;
function getOpenAI() {
  return openai ||= new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 60 * 1000, maxRetries: 0 });
}

// Prompt injection mitigation
const DELIMITER_START = '=== USER INPUT START ===';
const DELIMITER_END = '=== USER INPUT END ===';

function sanitiseInput(text) {
  return text
    .replace(/=== USER INPUT START ===/g, '')
    .replace(/=== USER INPUT END ===/g, '')
    .replace(/ignore (all |previous |the )?instructions?/gi, '[REDACTED]')
    .replace(/system prompt/gi, '[REDACTED]')
    .trim();
}

// ============================================================
// System prompts — one for topics, one for job roles / JDs
// ============================================================

const TOPIC_SYSTEM_PROMPT = `You are an expert curriculum designer and skills taxonomist.

Given a study topic, extract the distinct skills a learner must master.
Return BOTH technical skills (concrete knowledge areas, tools, algorithms,
concepts) AND behavioral/soft skills (communication, problem-solving patterns,
teamwork aspects) that are relevant to deeply understanding this topic.

Rules:
- Each skill name should be specific and actionable, not vague.
  Good: "Process scheduling algorithms"  Bad: "Operating systems stuff"
- Tag each skill as "technical" or "behavioral".
- Return between 5 and 20 skills. Fewer is fine if the topic is narrow;
  more is fine if the topic is broad. Do not pad with filler.
- Do NOT include meta-skills like "study habits" or "time management"
  unless the topic is explicitly about those.

Return ONLY raw JSON — no markdown fences, no preamble, no explanation.
Schema:
{
  "skills": [
    { "name": "string", "category": "technical | behavioral" }
  ]
}`;

const JD_SYSTEM_PROMPT = `You are an expert recruiter and skills taxonomist.

Given a job description or job role title, extract every distinct skill the
candidate is expected to demonstrate. Return BOTH technical skills (languages,
frameworks, tools, domain knowledge) AND behavioral skills (leadership,
communication, collaboration patterns) mentioned or strongly implied.

Rules:
- Each skill name should be specific and actionable, not vague.
  Good: "RESTful API design"  Bad: "Backend knowledge"
- Tag each skill as "technical" or "behavioral".
- Return between 5 and 30 skills. Cover the full breadth of the JD.
- If a JD mentions a technology stack, list each technology as a separate skill.
- If the input is just a role title (e.g. "Frontend Engineer"), infer the
  standard industry skills for that role.

Return ONLY raw JSON — no markdown fences, no preamble, no explanation.
Schema:
{
  "skills": [
    { "name": "string", "category": "technical | behavioral" }
  ]
}`;

// ============================================================
// Core extraction function
// ============================================================

/**
 * Calls GPT-4o-mini to extract skills from a topic or job description.
 * @param {Object} params
 * @param {string} params.rawInput - Topic name or pasted JD text
 * @param {string} params.type    - 'topic' or 'job_role'
 * @returns {Promise<{ skills: Array<{ name: string, category: string }> }>}
 */
async function extract({ rawInput, type }) {
  const systemPrompt = type === 'job_role' ? JD_SYSTEM_PROMPT : TOPIC_SYSTEM_PROMPT;
  const sanitised = sanitiseInput(rawInput);

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `${DELIMITER_START}\n${sanitised}\n${DELIMITER_END}` },
  ];

  const callLLM = async () => {
    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      max_tokens: 2000,
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
    // Retry once after 2 seconds.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      return await callLLM();
    } catch (retryError) {
      throw new Error(
        `Skill extraction failed after retry: ${retryError.message}`
      );
    }
  }
}

module.exports = { extract };
