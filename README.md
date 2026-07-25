# AbhyasAI

AbhyasAI is an adaptive AI coaching engine. It conducts interactive conversational practice sessions (e.g. mock interviews, technical drilling) and uses Item Response Theory (IRT) with a logistic 1PL Elo model to track and adapt to the learner's skill level across multiple dimensions.

## Features
- **Adaptive Questioning**: Modulates question difficulty based on dynamic skill tracking (θ and β).
- **Voice Intake**: Accepts WhatsApp voice notes and transcribes them using Groq Whisper.
- **Multidimensional Elo**: Tracks multiple skills per session using fractional weightings.
- **Accessibility Formats**: Generates session reports available in Standard, Dyslexia-friendly, and ADHD-friendly formats.
- **WhatsApp Integration**: Run practice sessions entirely through WhatsApp.

## Prerequisites
- Node.js 18+
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
This project is configured for deployment with a `Procfile`.
- `web`: The main Express server
- `worker`: The BullMQ queue worker for WhatsApp processing.
