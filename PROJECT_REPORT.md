# AbhyasAI: Project Report

=====================================================================
## 1. EXECUTIVE SUMMARY
=====================================================================

AbhyasAI is an AI-powered personalized study and interview coaching platform designed to dynamically extract skill matrices from a given topic or job role, generate adaptive practice questions, and evaluate user responses (currently via text). It provides structured feedback on strengths and gaps while automatically adjusting the difficulty of subsequent questions using a Multidimensional Elo rating system. By breaking down complex topics into targeted micro-skills, AbhyasAI solves the problem of generic, one-size-fits-all learning, offering a highly personalized and scientifically grounded path to mastery.

In the Indian context, where competitive exams and job interviews demand rigorous, targeted preparation, AbhyasAI bridges the gap between rote memorization and true conceptual understanding. It is built for adult learners, job seekers, and students who need accessible, high-quality coaching without the prohibitive costs of human tutors. Crucially, it renders feedback in three specialized, adult-appropriate formats (Standard, Dyslexia-Friendly, and ADHD-Friendly), ensuring that neurodivergent learners in India have access to dignified, highly legible, and actionable educational materials.

**Current Overall Completion Status: ~65%**
- Core AI Loop (Skill extraction, question generation, evaluation): **100%**
- Adaptive Difficulty (Multidimensional Elo): **100%**
- Accessibility Rendering (3 formats): **100%**
- Data Model (Supabase schema): **100%**
- WhatsApp Pipeline: **30%** (Basic webhook exists, but operates synchronously without the planned queue)
- Voice Pipeline: **0%** (Not implemented)
- Runs Cleanly: **Yes**, web app functions end-to-end for text-based practice.

=====================================================================
## 2. PROBLEM & MOTIVATION
=====================================================================

**The Problem:** Traditional study tools and interview prep platforms rely on static question banks that do not adapt to a learner's evolving proficiency. When a learner struggles, these platforms fail to pinpoint the exact underlying micro-skill causing the issue. Furthermore, most educational tools are incredibly hostile to neurodivergent learners, offering dense walls of text or infantalizing "accessibility" features (like phonics guides) that are inappropriate for adults. 

**Why Existing Solutions Fall Short:** Generic AI interview tools often use simple rolling averages for scoring or provide unstructured conversational feedback that is difficult to track over time. Static question banks offer no personalization. Standard learning management systems lack the ability to dynamically generate content based on real-time performance.

**What Makes This Approach Different:**
AbhyasAI implements a true Multidimensional Elo rating system (`eloRating.js`) that maintains separate ratings (`θ_u`) for every individual skill a user is learning. When a user answers a question, the system updates only the specific skills mapped to that question via a Q-matrix. Additionally, the project actively implements accessible, neuro-inclusive design in its report generation (`reportRenderer.js`), rendering the exact same underlying JSON data into completely different visual and structural formats based on cognitive needs.

=====================================================================
## 3. PRODUCT OVERVIEW
=====================================================================

**The User Journey (As it actually works today):**
1. **Initiation (`NewSessionPage.tsx`):** The user starts a new session by inputting a topic or job role.
2. **Skill Extraction:** The backend (`skillExtractor.js`) queries GPT-4o-mini to break the topic down into a matrix of technical and behavioral skills.
3. **Practice Loop (`PracticeSessionPage.tsx`):** 
   - The user is presented with a generated question tagged to specific skills.
   - The user types their answer into a text area and submits it.
   - The backend evaluates the answer against a rubric (`answerEvaluator.js`) and calculates Elo rating changes.
   - The UI immediately displays an AI evaluation card showing a score out of 1.0, specific strengths, gaps, and the precise numerical updates to their skill ratings.
   - The user proceeds to the next question.
4. **Session Report (`SessionReportPage.tsx`):** Once the total number of questions is reached, the session ends, and the user can view a generated report summarizing their skill progression and actionable recommendations.

**Stubbed / Unwired Features:**
- **Inline Feedback Tool:** In `PracticeSessionPage.tsx`, there is a hardcoded stub (`// ⚠️ STUB: Inline feedback tool could be embedded here`) in the answer text area.
- **WhatsApp Integration:** The UI features a `WhatsAppComingSoonPage.tsx` acknowledging that the WhatsApp frontend integration is not yet active.
- **Voice Input:** There is no UI for recording or submitting voice notes.

=====================================================================
## 4. TECHNICAL ARCHITECTURE
=====================================================================

**Full Stack Breakdown:**
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS. Components built using Radix UI primitives (Lucide icons).
- **Backend:** Node.js 20+, Express 4.x.
- **AI/ML:** OpenAI Node SDK (using `gpt-4o-mini` for extraction, generation, and evaluation).
- **Database:** PostgreSQL hosted on Supabase.
- **Infrastructure:** Frontend intended for Vercel, Backend intended for Railway.

**System Architecture Flow:**
1. **Web Flow:** `React Frontend` ↔ `Express Backend API` ↔ `OpenAI API` & `Supabase PostgreSQL`.
2. **WhatsApp Flow (Current Implementation):** `Meta Webhook` → `Express Backend (/webhook/whatsapp)` → Synchronous processing via OpenAI → `Meta Graph API (Reply)`.

**WhatsApp Async/Queue Architecture Reality Check:**
The specification (`ABHYASAI_CONTEXT.md`) mandates an asynchronous queue architecture using Redis and BullMQ to prevent WhatsApp's 5-10 second webhook timeout. **This is NOT implemented.** The current `webhook.js` file verifies the signature and immediately returns a `200 OK` to Meta, but then proceeds to execute the LLM chain (`handleGeneration`) *synchronously* in the background of the same Express process. There is no Redis, no BullMQ, and no dedicated worker process.

**Database Schema (Implemented in `schema.sql`):**
- `chapters`: Reference NCERT chapter content (`class_num`, `subject`, `chapter_num`, `content_json`).
- `generation_jobs`: Tracks generation requests (`source_type`, `status`, `standard_file_url`, etc.).
- `whatsapp_sessions`: Tracks WhatsApp conversation state (`phone_number`, `conversation_state`, `class_num`, etc.).
- `topics_or_roles`: Learner inputs (`type`, `raw_input`, `created_by`).
- `skills`: Extracted skills (`topic_or_role_id`, `name`, `category`).
- `questions`: Generated questions (`topic_or_role_id`, `question_text`, `difficulty_rating`).
- `question_skill_map`: The Q-matrix mapping questions to skills with a `weight`.
- `sessions`: Active practice sessions (`topic_or_role_id`, `status`).
- `skill_ratings`: Learner Elo ratings per skill (`session_id`, `skill_id`, `rating`).
- `answers`: Submitted answers and evaluations (`session_id`, `question_id`, `answer_text`, `score`, `elo_updates`).
- `reports`: Synthesized end-of-session JSON reports.

=====================================================================
## 5. KEY ALGORITHMS & LOGIC
=====================================================================

**Adaptive Difficulty (Multidimensional Elo):**
Implemented in `backend/services/eloRating.js`, the system does *not* use a rolling average. It successfully uses the standard Elo formula:
`E = 1.0 / (1.0 + Math.pow(10, (questionDifficulty - learnerRating) / 400.0))`
When an answer is scored (S from 0.0 to 1.0), the learner's rating (`θ_u`) is updated:
`θ_u_new = θ_u + (K * weight) * (S - E)` (where K = 32, scaled by the Q-matrix weight).
The question's difficulty (`β_i`) is inversely updated based on the average expected performance of all tested skills.

**Answer Evaluation Rubric (`answerEvaluator.js`):**
The backend uses two distinct system prompts via `gpt-4o-mini`:
- **Technical Questions:** Scored on Correctness (40%), Completeness (30%), Clarity (20%), and Examples (10%).
- **Behavioral Questions:** Scored using the STAR method: Situation (25%), Task (20%), Action (35%), Result (20%).
Both rubrics demand structured JSON output containing the overall score, strengths, gaps, and actionable resources.

**Accessibility Rendering Logic (`reportRenderer.js`):**
The logic transforms raw JSON report data into distinct HTML based on the requested format:
- **Standard:** Renders standard tables and bulleted lists.
- **Dyslexia:** Replaces tables with plain text blocks describing score changes actively (e.g., "Rating changed from 1500 to 1520. It improved by +20").
- **ADHD:** Uses a progressive disclosure UI model (`<details>` tags) for strengths/gaps so the user isn't overwhelmed, and renders recommendations as actionable checkbox cards.

=====================================================================
## 6. VOICE & MULTIMODAL PIPELINE
=====================================================================

**Status: Not Implemented.**
The specification outlines a pipeline using FFmpeg to transcode WhatsApp `.ogg` voice notes to `.mp3`, followed by transcription using Groq's Whisper Large V3. 
Currently, the codebase contains zero implementation of this. `webhook.js` explicitly handles `text` and `image` message types, but ignores `audio`. There are no FFmpeg or Groq dependencies in use.

=====================================================================
## 7. ACCESSIBILITY & INCLUSIVE DESIGN
=====================================================================

AbhyasAI implements adult-appropriate accessibility formatting, avoiding pediatric aesthetics (like phonics guides) that can be patronizing to adult learners.

- **Dyslexia-Friendly Format:** Focuses on legibility and cognitive load reduction. It utilizes plain text structures, active voice, and explicit directional language instead of dense data tables.
- **ADHD-Friendly Format:** Focuses on executive function support. It uses "progressive disclosure" (collapsible sections) to hide overwhelming text walls, and transforms vague advice into concrete, visual checkbox cards to encourage immediate action.
- **Standard Format:** A clean, professional, data-dense view for neurotypical users.

These designs reflect principles aligned with W3C COGA (Cognitive and Learning Disabilities Accessibility Task Force) guidelines, prioritizing clear visual hierarchy, chunking of information, and reduced visual noise.

=====================================================================
## 8. CURRENT STATE OF EACH COMPONENT
=====================================================================

| Component | Status | Notes |
| :--- | :--- | :--- |
| **Skill Extraction** | Complete | Works via `gpt-4o-mini` in `skillExtractor.js`. |
| **Question Generation** | Complete | Generates Q-matrix tagged questions in `questionGenerator.js`. |
| **Answer Evaluation** | Complete | Handles both technical and behavioral rubrics. |
| **Adaptive Difficulty** | Complete | Multidimensional Elo math fully implemented. |
| **Report Generation** | Complete | HTML rendering for 3 accessibility formats works. |
| **Database/Data Model** | Complete | Full PostgreSQL schema defined in `schema.sql`. |
| **Web UI Dashboard** | Partial | Core practice loop works; some UI elements are stubbed. |
| **WhatsApp Bot** | Partial | Webhook exists and processes text/images, but runs synchronously. No job queue. |
| **Voice Pipeline** | Not Started | No STT, no Groq, no FFmpeg implementation. |

=====================================================================
## 9. KNOWN LIMITATIONS & GAPS
=====================================================================

- **WhatsApp Timeout Risk:** Because `webhook.js` executes LLM calls inline within the Express request context (after returning a 200), the Node process could easily run out of memory or drop execution under real load. It entirely lacks the planned Redis/BullMQ architecture.
- **No Voice Support:** Voice notes sent via WhatsApp will be ignored.
- **UI Stubs:** The inline feedback tool on the practice page is visually present but functionally dead. The WhatsApp web page is a "Coming Soon" placeholder.
- **Hardcoded Prompts/Delimiters:** The `answerEvaluator.js` relies on simple string replacement (`=== USER ANSWER START ===`) to prevent prompt injection, which is easily bypassed by sophisticated inputs.
- **LLM Rate Limiting:** The backend handles LLM retries via a simplistic `setTimeout` (1 retry). Under heavy load, this will fail ungracefully.

=====================================================================
## 10. SETUP & DEPLOYMENT
=====================================================================

**Local Setup:**
1. Clone the repository.
2. **Database:** Create a Supabase project, execute `database/schema.sql` in the SQL Editor. Create a private bucket named `generated-worksheets`.
3. **Environment:** Copy `.env.example` to `.env` in the root and fill in `OPENAI_API_KEY`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY`.
4. **Backend:** 
   ```bash
   cd backend
   npm install
   node server.js
   ```
5. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

**Deployment Targets:**
- **Frontend:** Vercel (standard Vite/React deployment).
- **Backend:** Railway (using the provided `Procfile` and `railway.json`).
- **Database:** Supabase.

=====================================================================
## 11. FUTURE ROADMAP
=====================================================================

If development continued past the hackathon, the immediate priorities would be:

1. **Implement the Async Queue:** Refactor `webhook.js` to push incoming messages to a Redis + BullMQ queue, and create a separate worker process to handle LLM evaluation safely.
2. **Build the Voice Pipeline:** Integrate FFmpeg for `.ogg` to `.mp3` conversion and the Groq API for Whisper Large V3 transcription, allowing users to practice verbal interviews via WhatsApp voice notes.
3. **Wire up UI Stubs:** Connect the inline feedback UI in the web practice session to provide real-time spelling/grammar/tone checks before final submission.
4. **User Authentication:** Currently, the system relies on phone numbers for WhatsApp and anonymous sessions for the web. Implementing proper Supabase Auth to tie web and WhatsApp progress to a single user account is critical.
