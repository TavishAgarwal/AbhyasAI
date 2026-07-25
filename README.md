# AbhyasAI

**An adaptive AI coach for exam and interview prep — built for learners who don't get the same static question bank as everyone else.**

AbhyasAI takes a topic or a job description, breaks it into individual skills, asks targeted questions, evaluates real answers against a rubric, and adjusts difficulty in real time using a multidimensional Elo rating system — the same mathematical family used for competitive chess ratings, not a rolling average. Practice happens by text or voice, on the web or over WhatsApp, and every piece of feedback can be rendered in three genuinely distinct formats: Standard, Dyslexia-friendly, and ADHD-friendly, built around adult cognitive-accessibility standards rather than adapted from children's reading aids.

---

## Table of Contents

- [Why This Exists](#why-this-exists)
- [Features](#features)
- [How It Works](#how-it-works)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Accessibility Design Notes](#accessibility-design-notes)
- [Roadmap](#roadmap)
- [License](#license)

---

## Why This Exists

Most exam and interview prep tools give every learner the same static question bank and the same generic feedback, regardless of what they've actually demonstrated. When a learner struggles, these tools rarely pinpoint *which specific skill* is the real gap — they just show a low overall score. And accessibility features, where they exist at all, are almost always built for children (phonics guides, syllable-breaking), which is genuinely unusable for an adult preparing for a real job interview.

AbhyasAI is built around three ideas instead:

1. **Precision over a flat score.** Every question is tagged to the specific skill(s) it tests via a Q-matrix, so feedback and difficulty are tracked per skill, not per topic.
2. **Real adaptivity, not an average.** A learner's rating and a question's difficulty both update after every single answer using an Elo-style formula — a rolling average never "forgives" early mistakes even after clear mastery; this does.
3. **Dignified accessibility.** The same underlying feedback data renders three distinct ways, designed for adult readers, not repurposed pediatric formatting.

---

## Features

- **Dynamic skill extraction** — paste a topic or a job description; GPT-4o-mini breaks it into a tagged skill matrix (technical and/or behavioral).
- **Adaptive questioning** — question difficulty is chosen per skill based on the learner's current rating, not a fixed sequence.
- **Multidimensional Elo rating** — learner ability (θ) and question difficulty (β) both update after each answer, weighted by how strongly that question tests each skill.
- **Rubric-based evaluation** — technical answers scored on correctness/completeness/understanding/clarity; behavioral answers scored against the STAR framework.
- **Voice-first practice** — answer by voice over WhatsApp or on the web; audio is transcoded with FFmpeg and transcribed with Groq's Whisper Large V3 Turbo.
- **Asynchronous WhatsApp bot** — the webhook verifies Meta's signature and returns immediately; actual processing happens on a Redis/BullMQ queue via a separate worker process, so it survives WhatsApp's short webhook timeout under real load.
- **Three accessibility report formats** — Standard, Dyslexia-friendly (cream background, sans-serif, 1.5x line spacing, plain-language structure), and ADHD-friendly (progressive disclosure, actionable checklist cards) — all rendered from one shared JSON payload.
- **Prompt injection defenses** — input normalization, delimiter-injection rejection, an instruction-density heuristic, and strict schema validation on every LLM response before it's trusted.

---

## How It Works

1. **Start a session** — submit a topic or paste a job description.
2. **Skill extraction** — the backend calls GPT-4o-mini to produce a skill matrix.
3. **Practice loop** — answer one question at a time (text or voice); each answer is evaluated against a rubric, and the relevant skill ratings update immediately.
4. **Adaptive next question** — the next question's difficulty is chosen based on the updated ratings for the skill(s) it targets.
5. **Session report** — once the session ends, pull a report summarizing skill progression and next steps, in any of the three accessibility formats.

---

## Architecture

**Web flow**
```
React Frontend  ⇄  Express Backend API  ⇄  OpenAI API (GPT-4o-mini)
                              ⇄
                     Supabase PostgreSQL
```

**WhatsApp flow**
```
Meta Webhook → Express /webhook/whatsapp (verifies signature, returns 200 immediately)
             → Redis / BullMQ queue
             → Worker process (worker.js) → OpenAI + Groq Whisper
             → Meta Graph API (reply)
```

The webhook never does LLM or transcription work inline — that's handed off to `worker.js`, which runs as its own process specifically so a slow AI call can't cause the webhook to time out.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, Radix UI |
| Backend | Node.js 20.x, Express |
| Queue | Redis + BullMQ |
| AI / ML | OpenAI (`gpt-4o-mini`), Groq (`whisper-large-v3-turbo`) |
| Audio | FFmpeg (`.ogg` → `.mp3` transcoding) |
| Database | PostgreSQL via Supabase |
| Messaging | Meta WhatsApp Business Cloud API |

---

## Getting Started

### Prerequisites
- Node.js 20.x
- A Supabase project
- A Redis instance (required for the WhatsApp queue/worker)
- An OpenAI API key
- A Groq API key
- A Meta WhatsApp Business API app (only needed if you're running the WhatsApp bot)

### 1. Clone the repository
```bash
git clone https://github.com/TavishAgarwal/AbhyasAI.git
cd AbhyasAI
```

### 2. Set up the database
Run the SQL in `database/schema.sql`, followed by any files in `database/migrations/`, in your Supabase SQL Editor, in order.

### 3. Configure environment variables
Copy `.env.example` to `.env` in the repo root and fill in every value — see [Environment Variables](#environment-variables) below for what each one is for.

### 4. Run the backend
```bash
cd backend
npm install
npm start
```
In a separate terminal, start the queue worker (required for WhatsApp and background document generation):
```bash
cd backend
node worker.js
```

### 5. Run the frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

See `.env.example` for the full list with inline explanations of where to get each value. At a glance:

**Frontend (Vite, browser-safe)**
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — Supabase public config
- `VITE_API_URL` — the deployed backend URL

**Backend (server-only — never expose these to the frontend)**
- `OPENAI_API_KEY` — question generation and answer evaluation
- `GROQ_API_KEY` — voice transcription
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — backend database access
- `REDIS_URL` — required for the WhatsApp queue/worker
- `FRONTEND_URL` — your deployed frontend origin, for CORS
- `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET` — only needed if running the WhatsApp bot
- `API_SECRET_KEY`, `WORKER_API_URL` — internal auth between the worker and the backend
- `CHROMIUM_PATH` — needed for PDF report generation in production environments
- `PORT`, `NODE_ENV` — standard server config

In production (`NODE_ENV=production`), the server fails fast on startup if any of `FRONTEND_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `API_SECRET_KEY`, `GROQ_API_KEY`, `WORKER_API_URL`, or `REDIS_URL` is missing, rather than starting in a broken state.

---

## Running Tests

```bash
cd backend
npm test
```
The suite runs entirely without real credentials — services are lazily initialized, so importing them in a test environment doesn't require live API keys.

---

## Project Structure

```
AbhyasAI/
├── backend/
│   ├── routes/           # Express route handlers
│   ├── services/         # Core logic: skill extraction, question generation,
│   │                     # answer evaluation, Elo rating, queue, WhatsApp, audio
│   ├── middleware/        # Auth, validation
│   ├── utils/             # Shared helpers (input sanitization, error handling)
│   ├── templates/         # HTML report templates (standard/dyslexia/adhd)
│   ├── tests/              # Vitest test suite
│   ├── server.js           # Express app entry point
│   └── worker.js            # BullMQ worker process (WhatsApp + doc generation)
├── frontend/
│   └── src/app/            # Pages, components, layouts
├── database/
│   ├── schema.sql          # Base schema
│   └── migrations/         # Incremental schema changes
├── ABHYASAI_CONTEXT.md      # Full technical/product spec
└── PROJECT_REPORT.md        # Detailed project status report
```

---

## Deployment

**Frontend — Vercel**
`vercel.json` is configured to build `frontend/` and rewrite all routes to `index.html` for client-side routing. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_API_URL` in the Vercel project's environment variables.

**Backend — Render**

- **Web service** — root directory `backend`, build command `npm install`, start command `npm start`, health check path `/health`.
- **Background worker** — root directory `backend`, build command `npm install`, start command `node worker.js`.

Set every server-only variable from `.env.example` on both services, with `FRONTEND_URL` set to your exact deployed Vercel origin (no trailing slash). Run `database/schema.sql` and any files in `database/migrations/` in Supabase before the first deploy.

---

## Accessibility Design Notes

The Dyslexia-friendly and ADHD-friendly report formats aren't a font-size toggle on one template — they're separate HTML templates (`backend/templates/`) with real structural differences:

- **Dyslexia-friendly:** cream background, sans-serif type, 1.5x line spacing, plain-language paragraph structure instead of dense tables.
- **ADHD-friendly:** progressive disclosure, card-based layout, and concrete "Try This Next" action items instead of a single wall of feedback.

Both are built for adult readers reviewing their own interview/exam performance, not adapted from formatting designed for children learning to read.

---

## Roadmap

- Add a deployment manifest for the backend (Render blueprint or equivalent) so both the web and worker services can be provisioned from one file.
- Wire the inline, real-time feedback tool on the practice page (currently a UI stub).
- Unified authentication tying WhatsApp (phone-based) and web sessions to a single account.
- Expand automated test coverage for the WhatsApp message-handling edge cases.

---

## License

MIT — see [LICENSE](./LICENSE).