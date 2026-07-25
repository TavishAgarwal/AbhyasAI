# AbhyasAI — IDE Context File
# Read this before touching any file in this project.
# Last updated: July 2026

---

## WHAT THIS PROJECT IS

AbhyasAI is an AI-powered personalized study and interview coach. It takes a
topic or job role as input, extracts a structured skill matrix, generates
adaptive practice questions, evaluates spoken or written answers, and provides
structured feedback — strengths, gaps, and suggested resources — while adapting
difficulty based on performance using a Multidimensional Elo rating system.

Session reports are available in three accessible formats:
- **Standard**: Clean, direct, professional
- **Dyslexia-Friendly**: Sans-serif fonts, wide spacing, cream backgrounds,
  active voice, no jargon without inline definitions
- **ADHD-Friendly**: Progressive disclosure, concrete micro-actions, minimal
  visual noise, checkbox-style next steps

---

## PROJECT ARCHITECTURE

```
abhyas-ai/
├── frontend/                  # React 19 + Vite + TS + Tailwind
│   ├── src/
│   │   ├── app/components/    # UI components
│   │   ├── lib/api.ts         # API client
│   │   └── styles/            # Theme and styles
│   └── package.json
│
├── backend/                   # Node.js + Express
│   ├── server.js              # Entry point
│   ├── routes/
│   │   ├── skills.js          # POST /api/skills/extract, GET /api/skills/:id
│   │   ├── generate.js        # POST /api/generate — content pipeline
│   │   ├── chapters.js        # GET /api/chapters — reference library
│   │   ├── download.js        # GET /api/download/:jobId — file serving
│   │   └── webhook.js         # POST /webhook/whatsapp — WA bot
│   ├── services/
│   │   ├── skillExtractor.js  # LLM-powered skill matrix extraction
│   │   ├── promptChain.js     # Multi-stage GPT-4o pipeline
│   │   ├── ocrService.js      # GPT-4o Vision + sharp preprocessing
│   │   ├── documentGen.js     # Puppeteer PDF + docx generation
│   │   ├── whatsappService.js # Meta WhatsApp Cloud API calls
│   │   └── cacheService.js    # Response caching
│   ├── templates/             # Puppeteer HTML templates for PDF rendering
│   ├── data/                  # Reference content data
│   └── utils/
│       ├── textExtractor.js   # pdfjs-dist text extraction
│       └── imagePreprocessor.js # sharp image preprocessing
│
├── database/
│   └── schema.sql             # Complete PostgreSQL schema
│
├── .env.example               # All required env vars listed
└── ABHYASAI_CONTEXT.md        # This file
```

---

## TECH STACK — EXACT VERSIONS

### Frontend
- React 19 with Vite
- TypeScript
- Tailwind CSS
- Deployed on Vercel

### Backend
- Node.js 20+
- Express 4.x
- OpenAI Node SDK (`openai` npm package)
- `sharp` — image preprocessing for OCR
- `pdfjs-dist` — PDF text extraction
- `puppeteer` — HTML to PDF rendering
- `docx` — Word document generation
- `multer` — file upload handling
- `node-cache` — in-memory caching
- `dotenv` — environment variables
- `cors` — cross-origin for frontend
- `axios` — WhatsApp API calls

### Database
- PostgreSQL via Supabase (free tier)
- Supabase Storage for generated file serving

### WhatsApp
- Meta WhatsApp Business Cloud API (official, free tier)
- Webhook-based, no Twilio
- Async queue architecture (Redis + BullMQ) for LLM/STT processing

### Speech-to-Text
- Whisper Large V3 via Groq (NOT the standard OpenAI Whisper API)

---

## ENVIRONMENT VARIABLES

All of these must exist in `.env`. Never hardcode any of them.

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# WhatsApp Business Cloud API
WHATSAPP_PHONE_NUMBER_ID=1234567890
WHATSAPP_ACCESS_TOKEN=EAAxxxx
WHATSAPP_VERIFY_TOKEN=abhyasai_verify_2026

# App
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# API authentication
API_SECRET_KEY=your-api-secret-key-here

# File storage
FILE_TTL_HOURS=24
```

---

## DATABASE SCHEMA

### All tables are in schema.sql

**chapters** — Stores reference content for practice generation.

**generation_jobs** — Tracks generation requests for caching and analytics.

**whatsapp_sessions** — WhatsApp conversation state per phone number.


**topics_or_roles** — Topics or job roles submitted by learners.
```sql
CREATE TABLE IF NOT EXISTS topics_or_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('topic', 'job_role')),
  raw_input TEXT NOT NULL,
  created_by UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**skills** — Skills extracted from a topic or job role.
```sql
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_or_role_id UUID NOT NULL REFERENCES topics_or_roles(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('technical', 'behavioral')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(topic_or_role_id, name)
);
```

### Planned Tables (to be added as build progresses)

- `questions` — Questions with skill tags and difficulty ratings (β)
- `sessions` — Practice sessions per user
- `answers` — Learner answers with evaluation JSON
- `skill_ratings` — Per-skill Elo ratings (θ) per user
- `reports` — Generated session reports (Standard/Dyslexia/ADHD format)

---

## ADAPTIVE DIFFICULTY — MULTIDIMENSIONAL ELO

**Do not implement adaptive difficulty as a rolling average.** Use an Elo-style
rating system:

- Each learner has a rating `θ_u` per skill
- Each question has a difficulty rating `β_i` per skill it tests
- Expected performance: `E = 1 / (1 + e^-(θ_u - β_i))`
- After AI rubric scores the answer (`S`, scaled 0–1):
  - `θ_u_new = θ_u + K * (S - E)`
  - `β_i_new = β_i + K * (E - S)`
- `K` ≈ 32 initially, tune down for stability with more data

Maintain a Q-matrix mapping each question to the skill(s) it tests. Update
ratings for every relevant skill after each interaction.

---

## WHATSAPP BOT — ASYNC ARCHITECTURE

The webhook has a hard ~5–10 second timeout. Transcribing voice notes + running
LLM evaluation synchronously will blow past this.

**Required architecture:**
1. Express handler receives webhook, verifies signature, extracts payload —
   **immediately returns HTTP 200**. No LLM/STT work inline.
2. Raw event pushed onto a job queue (Redis + BullMQ).
3. Separate worker process pulls jobs: download media → transcode audio →
   transcribe (Groq Whisper) → evaluate → update ratings → generate next
   question → send reply via WhatsApp Graph API.

**Audio handling:** WhatsApp voice notes arrive as `.ogg` (Opus). Convert with
FFmpeg to `.mp3` before transcription.

---

## ACCESSIBILITY RENDERING — ADULT-APPROPRIATE

These formats are designed for **adults** studying or preparing for interviews.
No syllable-breaking, no phonics guides, no pediatric formatting.

**Dyslexia-friendly format:**
- Sans-serif fonts only (Arial, Verdana)
- Minimum 12–14pt text, 1.5x line spacing
- Cream/off-white backgrounds, dark gray (not pure black) text
- No hyphenation, no paragraph indentation
- Active voice only in generated feedback
- No jargon without inline definition, no nested clauses

**ADHD-friendly format:**
- Progressive disclosure — one strength and one gap at a time
- Concrete, executable micro-actions (not vague advice)
- Minimal visual noise, clear bold headings
- Checkbox-style "Try This Next" items, kept short

**Standard format:** Clean, direct, professional.

All three render from the **same underlying structured JSON** — only the
rendering layer changes per format.

---

## API ROUTES

### POST /api/skills/extract
Extract skill matrix from a topic or job description.

Request body:
```json
{
  "rawInput": "Operating Systems",
  "type": "topic"
}
```

Response (201):
```json
{
  "topicOrRole": { "id": "uuid", "type": "topic", "rawInput": "...", "createdAt": "..." },
  "skills": [
    { "id": "uuid", "name": "Process Scheduling", "category": "technical" }
  ],
  "meta": { "skillCount": 12, "technicalCount": 10, "behavioralCount": 2, "extractionTimeMs": 2340 }
}
```

### GET /api/skills/:topicOrRoleId
Retrieve previously extracted skills.

### POST /api/generate
Main content generation endpoint.

### GET /api/chapters
Returns reference content for dropdowns.

### GET /api/download/:jobId
Serves generated PDF/DOCX files via signed Supabase URLs.

### POST /webhook/whatsapp
Meta webhook for incoming WhatsApp messages. Must respond 200 immediately.

### GET /webhook/whatsapp
Webhook verification (required by Meta).

---

## ERROR HANDLING RULES

1. LLM extraction failures → retry once with 2s delay, then return 502
2. DB insert failures → return 500 with safe error message
3. All errors logged with: timestamp, route, step, error message
4. Never expose OpenAI API errors to the frontend response
5. Use error sanitiser for all client-facing error messages

---

## SECURITY RULES

- CORS: only allow requests from FRONTEND_URL
- WhatsApp webhook: verify X-Hub-Signature-256 header
- API key auth via x-api-key header on credit-burning endpoints
- File uploads: validate MIME type, max 20MB
- Generated files served via signed Supabase URLs
- Rate limiting: 10 req/IP/min on generation endpoints
- No PII stored — session-level analytics only

---

## BUILD ORDER

1. ✅ Skill-matrix extraction from topic/JD input
2. ✅ Question generation + Q-matrix tagging
3. ✅ Text-only answer evaluation loop (web app)
4. ✅ Multidimensional Elo rating update logic
5. ✅ Session report generation (Standard format)
6. ✅ Add Dyslexia/ADHD report formats
7. ⏳ WhatsApp async architecture (queue + worker) — Planned
8. ⏳ Voice pipeline (FFmpeg + Groq Whisper) on top of async WhatsApp — Planned

---

## DEPLOYMENT

- Backend: Railway (Node.js, auto-deploy from GitHub)
- Frontend: Vercel
- Database: Supabase (free tier PostgreSQL)
- File storage: Supabase Storage (private, signed URLs)

Railway start command: `cd backend && node server.js`
Port: process.env.PORT (Railway injects automatically)
