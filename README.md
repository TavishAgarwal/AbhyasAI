# AbhyasAI

**Your AI-powered study and interview coach.**

AbhyasAI takes a topic or job role as input, extracts the skills you need to
master, generates targeted practice questions, evaluates your spoken or written
answers, and provides structured feedback — strengths, gaps, and suggested
resources — while adapting difficulty based on your performance.

---

## What It Does

1. **Skill Extraction** — Provide a topic (e.g., "Operating Systems") or paste a
   job description. AbhyasAI extracts a structured skill matrix of technical and
   behavioral competencies.

2. **Adaptive Questioning** — The system asks one question at a time, matched to
   your current skill level using a Multidimensional Elo rating system. Questions
   test one or more skills simultaneously.

3. **Answer Evaluation** — Answer by typing or voice note. AbhyasAI evaluates
   technical answers against a correctness/completeness rubric, and behavioral
   answers against STAR structure. Returns structured feedback: strengths, gaps,
   next steps, and resources.

4. **Difficulty Adaptation** — After every answer, both the learner's skill
   rating and the question's difficulty rating update via Elo. The next question
   targets the updated rating band, so the system gets smarter with every
   interaction.

5. **Session Reports** — Pull a detailed report at any point, available in three
   accessible formats: Standard, Dyslexia-friendly, and ADHD-friendly.

6. **WhatsApp Bot** — (Coming Soon) Practice anywhere via WhatsApp. Voice notes are transcribed using Whisper Large V3 via Groq for real-time conversational coaching.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + Vite + TypeScript + Tailwind CSS |
| **Backend** | Node.js 20+ / Express 4.x |
| **AI** | OpenAI GPT-4o-mini (generation/evaluation), Groq Whisper Large V3 (STT) |
| **Database** | PostgreSQL via Supabase |
| **WhatsApp** | Meta WhatsApp Business Cloud API (async queue architecture) |
| **PDF/DOCX** | Puppeteer + docx npm library |
| **Deployment** | Vercel (frontend), Railway (backend), Supabase (DB + storage) |

---

## Project Structure

```
abhyas-ai/
├── frontend/                  # React 19 + Vite + Tailwind
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
│   │   ├── generate.js        # POST /api/generate
│   │   ├── chapters.js        # GET /api/chapters
│   │   ├── download.js        # GET /api/download/:jobId
│   │   └── webhook.js         # POST /webhook/whatsapp
│   ├── services/
│   │   ├── skillExtractor.js  # LLM-powered skill matrix extraction
│   │   ├── promptChain.js     # Multi-stage GPT-4o pipeline
│   │   ├── ocrService.js      # GPT-4o Vision + sharp preprocessing
│   │   ├── documentGen.js     # Puppeteer PDF + docx generation
│   │   ├── whatsappService.js # Meta API calls
│   │   └── cacheService.js    # Response caching
│   ├── templates/             # PDF rendering templates
│   └── package.json
│
├── database/
│   └── schema.sql             # Complete PostgreSQL schema
│
├── ABHYASAI_CONTEXT.md        # Full architecture reference
├── RULES.md                   # Project rules for AI agents
└── railway.json               # Railway deployment config
```

---

## Quick Start

### Prerequisites
- Node.js 20+
- OpenAI API key with GPT-4o access
- Supabase project (free tier)

### Setup

```bash
git clone https://github.com/TavishAgarwal/AbhyasAI.git
cd AbhyasAI

# Backend
cd backend
npm install
cp ../.env.example ../.env
# Fill in your API keys in .env

# Run the database schema in Supabase SQL editor:
#   database/schema.sql

# Start backend
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Environment Variables

See [.env.example](.env.example) for the full list. Key variables:

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp Business phone number ID |
| `WHATSAPP_ACCESS_TOKEN` | WhatsApp Business access token |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/skills/extract` | Extract skill matrix from topic or JD |
| GET | `/api/skills/:id` | Retrieve skills for a topic/role |
| POST | `/api/sessions/start` | Start adaptive practice session |
| POST | `/api/sessions/:id/answer`| Submit answer & get evaluation |
| POST | `/api/reports/generate` | Generate end-of-session JSON report |
| GET | `/api/reports/session/:id/render`| Render report as accessible HTML |
| GET | `/api/reports/session/:id/pdf`| Render report as downloadable PDF |
| POST | `/api/generate` | Generate adapted content |
| GET | `/api/chapters` | List available chapters |
| GET | `/api/download/:jobId` | Download generated files |
| POST | `/webhook/whatsapp` | (Planned) WhatsApp webhook |
| GET | `/webhook/whatsapp` | (Planned) WhatsApp webhook verification |
| GET | `/health` | Health check |

---

## Adaptive Difficulty — Multidimensional Elo

AbhyasAI uses an Elo-style rating system, not a rolling average:

- Each learner has a rating `θ_u` **per skill**
- Each question has a difficulty rating `β_i` per skill it tests
- Expected performance: `E = 1 / (1 + e^-(θ_u - β_i))`
- After evaluation (score `S`, scaled 0–1):
  - `θ_u_new = θ_u + K × (S - E)`
  - `β_i_new = β_i + K × (E - S)`
- Questions are tagged with a Q-matrix mapping them to multiple skills

This ensures the system adapts based on both the learner's ability and the
question's actual difficulty — no under/over-correction from early mistakes.

---

## Accessibility Formats

All three formats render from the **same structured JSON**. Only the rendering
layer changes:

- **Standard** — Clean, direct, professional
- **Dyslexia-friendly** — Sans-serif fonts, 1.5x line spacing, cream
  backgrounds, no hyphenation, active voice only, inline definitions
- **ADHD-friendly** — Progressive disclosure, concrete micro-actions, minimal
  visual noise, checkbox-style next steps

These are designed for **adults** — no syllable-breaking, no phonics guides,
no pediatric formatting.

---

## Deployment

| Service | Platform | Config |
|---|---|---|
| Backend | Railway | `railway.json` — auto-deploys from GitHub |
| Frontend | Vercel | Standard Vite build |
| Database | Supabase | Free tier PostgreSQL |
| Storage | Supabase Storage | Private bucket with signed URLs |

---

## License

MIT — see [LICENSE](LICENSE) for details.
