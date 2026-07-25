# AbhyasAI — Project Rules for AI Agent

## What This Project Is
AbhyasAI is an AI-powered personalized study and interview coach. It takes a
topic or job role as input, extracts a skill matrix, generates adaptive
practice questions, evaluates spoken or written answers, and provides
structured feedback (strengths, gaps, suggested resources) while adapting
difficulty based on performance using a Multidimensional Elo rating system.

Session reports are available in three accessible formats:
- Standard: clean, direct, professional
- Dyslexia-Friendly: sans-serif fonts, wide spacing, cream backgrounds,
  active voice, inline definitions
- ADHD-Friendly: progressive disclosure, concrete micro-actions, minimal
  visual noise, checkbox-style next steps

## Stack
Frontend: React 19, Vite, TypeScript, Tailwind CSS
Backend: Node.js, Express, OpenAI SDK (gpt-4o-mini), Supabase, Puppeteer, sharp
WhatsApp: Meta WhatsApp Business Cloud API (official, not Twilio)
Hosting: Vercel (frontend), Railway (backend), Supabase (DB + storage)

## Project Structure
abhyas-ai/
├── frontend/                  # Already built — do not modify structure
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── generate/page.tsx  # Main generator screen
│   │   └── whatsapp/page.tsx  # WhatsApp bot info page
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── ThreePanelView.tsx
│   │   ├── PanelCard.tsx
│   │   ├── VersionSelector.tsx
│   │   └── ProgressTracker.tsx
│   └── lib/
│       └── api.ts             # API client — to be created
│
├── backend/
│   ├── server.js              # Express entry point
│   ├── routes/
│   │   ├── generate.js        # POST /api/generate
│   │   ├── chapters.js        # GET /api/chapters
│   │   ├── download.js        # GET /api/download/:jobId
│   │   └── webhook.js         # POST /webhook/whatsapp
│   ├── services/
│   │   ├── promptChain.js     # Three-stage GPT-4o pipeline
│   │   ├── ocrService.js      # GPT-4o Vision + sharp
│   │   ├── documentGen.js     # Puppeteer PDF + docx generation
│   │   ├── whatsappService.js # Meta API calls
│   │   ├── cacheService.js    # node-cache + warm on startup
│   │   └── supabaseClient.js  # Supabase singleton
│   ├── templates/
│   │   ├── standard.html      # PDF template — Edition A
│   │   ├── dyslexia.html      # PDF template — Edition B
│   │   └── adhd.html          # PDF template — Edition C
│   ├── utils/
│   │   ├── textExtractor.js   # pdfjs-dist extraction
│   │   └── imagePreprocessor.js # sharp preprocessing
│   └── scripts/
│       └── seedChapters.js    # Seeds 20 NCERT chapters to DB
│
└── database/
    └── schema.sql             # Run in Supabase SQL editor

## Environment Variables (all required, never hardcode)
OPENAI_API_KEY
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_ACCESS_TOKEN
WHATSAPP_VERIFY_TOKEN=abhyasai_verify_2026
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
FILE_TTL_HOURS=24

## Database Tables
chapters: id, class_num(1-8), subject, chapter_num, chapter_title,
          language, content_json(JSONB), learning_objectives(TEXT[]),
          word_count, created_at

generation_jobs: id, chapter_id(FK), source_type(library/upload/camera),
                 versions_requested(TEXT[]), language, status,
                 standard_file_url, dyslexia_file_url, adhd_file_url,
                 standard_docx_url, dyslexia_docx_url, adhd_docx_url,
                 quality_score(JSONB), generation_time_ms,
                 created_at, expires_at

whatsapp_sessions: phone_number(PK), conversation_state, class_num,
                   subject, chapter_num, version_type, uploaded_text,
                   last_job_id(FK), last_message_at, created_at

## The AI Pipeline — Three Stages (CRITICAL)

### Stage 1 — Analysis
Model: gpt-4o | Temp: 0.1 | Max tokens: 2000
Input: raw chapter text
Output: JSON only — no markdown, no preamble
Schema: {
  learning_objectives: string[],
  complex_sentences: [{original, complexity_reason}],
  technical_terms: [{term, definition, syllables}],
  numerical_content: [{type, content}],
  procedural_sections: string[],
  total_objectives_count: number
}

### Stage 2 — Adaptation (THREE CONCURRENT CALLS via Promise.all)
Model: gpt-4o | Temp: 0.3 | Max tokens: 4000 each
Input: chapter text + Stage 1 JSON
Run all three versions simultaneously — never sequentially

Standard constraints: max 20 words/sentence, active voice, bold key
terms with <strong>, proper <h2>/<h3> hierarchy, output HTML wrapped
in <div class="standard-content">

Dyslexia constraints: HARD LIMIT 12 words/sentence, ALL technical terms
syllable-broken with · separator, active voice only, left-align only
(never justify), phonics guide for every term, <p class="dyslexia-para">
for paragraphs, <span class="syllable-word"> for broken terms, phonics
glossary at end, reading ruler note at end, output HTML wrapped in
<div class="dyslexia-content">

ADHD constraints: numbered micro-steps (one action per step), □ checkbox
per step, wrap definitions in <div class="box definition">, examples in
<div class="box example">, reminders in <div class="box remember">,
TRY IT activities in <div class="box tryit">, fidget break every 2
sections, real-world context for all numbers, repeat key facts each
section, progress checklist at end, output HTML wrapped in
<div class="adhd-content">

ALL versions: preserve every learning objective from Stage 1 analysis.
If language=hindi, entire output must be in Devanagari script.

### Stage 3 — Quality Check
Model: gpt-4o | Temp: 0.1 | Max tokens: 1000
Input: all three adapted versions + original learning objectives
Output: JSON only
Schema: {
  standard_fidelity: 0.0-1.0,
  dyslexia_fidelity: 0.0-1.0,
  adhd_fidelity: 0.0-1.0,
  flagged_sections: [{version, section, reason, severity}],
  all_objectives_verified: boolean,
  objectives_covered: number,
  objectives_total: number
}
If any fidelity score < 0.80, set flagged: true in that version's
response. Never hide uncertainty — surface it to the teacher.

## API Routes

POST /api/generate
Body (JSON): { source, chapterId, language, versions[] }
Body (multipart): files[] for upload/camera source
Response: { jobId, status, generationTimeMs, versions{}, qualityReport,
            chapterMeta, fromCache }
Each version in response: { html, pdfUrl, docxUrl, fidelityScore,
                             flagged, flaggedSections[] }

GET /api/chapters?class=N&subject=S&language=L
Response: { chapters: [{id, chapter_num, chapter_title, ...}] }

GET /api/chapters/:id
Response: { chapter: full chapter object }

GET /api/download/:jobId?version=standard|dyslexia|adhd&format=pdf|docx
Redirects to signed Supabase URL. Returns 410 if expired.

GET /webhook/whatsapp — Meta verification
Query: hub.mode, hub.verify_token, hub.challenge
Response: hub.challenge string if token matches

POST /webhook/whatsapp — incoming messages
Must respond 200 to Meta within 1 second.
All processing happens after res.sendStatus(200).

## WhatsApp Bot State Machine
States: greeting → awaiting_class → awaiting_subject →
        awaiting_chapter → awaiting_version → processing → done

Shortcut: if message matches "[class] [subject] [chapter] [version]"
e.g. "5 science 2 dyslexia" — skip guided flow entirely

Reset commands: "new", "reset", "start", "hi", "hello", "namaste"

Image messages: download from WhatsApp media URL → run OCR pipeline
→ save extracted text to session → ask for version → generate

Reply format: plain text only, no markdown (WhatsApp renders * literally)

## Document Generation
PDF: Puppeteer with @sparticuz/chromium (required for Railway/cloud)
DOCX: docx npm library

Dyslexia PDF CSS must include:
font-family: Arial, Helvetica (no serif), font-size: 15px,
line-height: 1.9, letter-spacing: 0.05em, text-align: left (never justify),
max-width: 65ch, background: #FFFEF7 (cream, not white)

ADHD PDF CSS must include:
.box { border-radius: 8px, padding: 14px }
.box.definition { background: #E8F4FD, border-left: 4px solid #1B5E8B }
.box.example { background: #EAF5EA, border-left: 4px solid #1E7E34 }
.box.remember { background: #FEF5EC, border-left: 4px solid #E67E22 }
.box.tryit { background: #F3E8FD, border-left: 4px solid #7B2FBE }
.fidget-break { background: #FFF3CD, border: 1px dashed #F39C12 }

## Caching
Library: node-cache, TTL 7 days
Upload/camera: TTL 24 hours
Cache key: {chapterId}_{versions_sorted}_{language}
On server startup: pre-generate and cache these 5 demo chapters:
- Class 5 Science Ch2 (Components of Food)
- Class 5 Science Ch3 (Fibre to Fabric)
- Class 6 Science Ch1 (Food: Where Does It Come From?)
- Class 5 Mathematics Ch1 (The Fish Tale)
- Class 4 English Ch1 (Wake Up!)
These must never require an API call during demo.

## File Upload Rules
Accepted MIME types: application/pdf, image/jpeg, image/png
Max size: 20MB per file, up to 15 files for camera uploads
Storage: Supabase bucket "generated-worksheets" (private, signed URLs)
Signed URL TTL: 24 hours
All generated files deleted after expires_at timestamp

## Security Rules
CORS: allow only FRONTEND_URL
WhatsApp webhook: verify X-Hub-Signature-256 on every POST
Rate limit: 10 requests/IP/minute on /api/generate
No student data stored anywhere — chapter-level analytics only
Phone numbers hashed in production

## Error Handling Rules
Stage 1 fail → return 500, do not proceed
Stage 2 partial fail → return successful versions, mark failed as unavailable
Stage 3 score < 0.80 → return version with flagged: true
WhatsApp send fail → send text fallback message
Retry policy: one retry with 2 second delay before throwing
All errors logged with: timestamp, route, error message

## npm Packages (backend)
openai, express, cors, dotenv, multer, sharp, pdfjs-dist,
puppeteer-core, @sparticuz/chromium, docx, axios, node-cache,
@supabase/supabase-js, express-rate-limit, uuid
Dev: nodemon

## Deployment
Backend: Railway — start command: node backend/server.js
Frontend: Vercel — already configured
Railway injects PORT automatically — use process.env.PORT

## Demo Chapters — Must Work Perfectly
These 5 must be pre-cached and never fail during demo:
1. Class 5 Science Ch2 — Components of Food
2. Class 5 Science Ch3 — Fibre to Fabric
3. Class 6 Science Ch1 — Food: Where Does It Come From?
4. Class 5 Mathematics Ch1 — The Fish Tale
5. Class 4 English Ch1 — Wake Up!