# AbhyasAI

AbhyasAI is an adaptive AI coaching engine. It conducts interactive conversational practice sessions (e.g. mock interviews, technical drilling) and uses Item Response Theory (IRT) with a logistic 1PL Elo model to track and adapt to the learner's skill level across multiple dimensions.

## Features
- **Adaptive Questioning**: Modulates question difficulty based on dynamic skill tracking (θ and β).
- **Voice Intake**: Accepts WhatsApp voice notes and transcribes them using Groq Whisper.
- **Multidimensional Elo**: Tracks multiple skills per session using fractional weightings.
- **Accessibility Formats**: Generates session reports available in Standard, Dyslexia-friendly, and ADHD-friendly formats.
- **WhatsApp Integration**: Run practice sessions entirely through WhatsApp.

## Prerequisites
- Node.js 20.x
- Supabase project
- Redis (for BullMQ)
- OpenAI API Key (GPT-4o required)
- Groq API Key (for Whisper)
- Meta WhatsApp Business API Token

## Setup Instructions

1. **Clone the repository**
2. **Setup the Database**
   Run the SQL commands in `database/schema.sql` in your Supabase SQL Editor.
3. **Environment Variables**
   Copy `.env.example` to `.env` in the root folder.
   Fill in your API keys, Supabase credentials, Redis URL, and WhatsApp tokens.
4. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```
   *In a separate terminal, start the queue worker:*
   ```bash
   cd backend
   node worker.js
   ```
5. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Testing
Run the test suite in the backend folder:
```bash
cd backend
npm test
```

## Deployment
Deploy the repository root to Render using `render.yaml`; it builds and runs
the Express server in `backend/` and verifies `GET /health`. Add a separate
Render Background Worker with root directory `backend` and start command
`node worker.js` if WhatsApp processing is enabled. Deploy the repository root
to Vercel; the included `vercel.json` builds `frontend/` and rewrites SPA routes
to `index.html`.

Set the Vercel variables `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and
`VITE_API_URL`. Set the remaining server-only variables from `.env.example` in
Render, including `FRONTEND_URL` set to the exact Vercel origin. Run
`database/schema.sql` in Supabase before first deploy. The current code does
not use Supabase Storage, so no bucket needs to be created.
