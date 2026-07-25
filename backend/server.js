// backend/server.js
// AbhyasAI Express backend entry point

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
const { sanitiseError } = require('./utils/errorSanitiser');
const { apiKeyAuth } = require('./middleware/apiAuth');
const { supabase } = require('./services/supabaseClient');

// Import routes
const webhookRoutes = require('./routes/webhook');
const skillsRoutes = require('./routes/skills');
const questionsRoutes = require('./routes/questions');
const sessionsRoutes = require('./routes/sessions');
const reportsRoutes = require('./routes/reports');
const dashboardRoutes = require('./routes/dashboard');
const transcribeRoutes = require('./routes/transcribe');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================================
// Middleware
// ============================================================

// CORS — allow only frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language', 'x-api-key']
}));

// Security headers (Fix 5 — HIGH)
app.use(helmet({
  contentSecurityPolicy: false,  // Handled by frontend
  crossOriginEmbedderPolicy: false,
}));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Request ID middleware (Fix 14 — LOW)
app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader('X-Request-Id', req.requestId);
  next();
});

// Capture raw body for webhook signature verification (Fix 1)
app.use('/webhook', express.json({
  limit: '1mb',
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

// Body parsers with 50mb limit (non-webhook routes)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiter — 10 req/min/IP on credit-burning API routes
const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please wait a minute and try again.' },
  standardHeaders: true,
  legacyHeaders: false
});

// ============================================================
// Routes
// ============================================================

// Health check
app.get('/health', async (req, res) => {
  try {
    // Check DB
    await supabase.from('skills').select('id').limit(1);
    
    res.status(200).json({ status: 'ok', db: 'ok', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'error', error: err.message });
  }
});

// API routes (apiKeyAuth on credit-burning endpoints)
app.use('/api/skills', generateLimiter, apiKeyAuth, skillsRoutes);
app.use('/api/questions', generateLimiter, apiKeyAuth, questionsRoutes);
app.use('/api/sessions', generateLimiter, apiKeyAuth, sessionsRoutes);
app.use('/api/reports', generateLimiter, apiKeyAuth, reportsRoutes);
app.use('/api/dashboard', generateLimiter, apiKeyAuth, dashboardRoutes);
app.use('/api/transcribe', generateLimiter, apiKeyAuth, transcribeRoutes);
// Webhook rate limiter (Fix 11 — MEDIUM)
const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many webhook requests' },
  skip: (req) => req.method === 'GET'  // Skip GET (Meta verification)
});
app.use('/webhook', webhookLimiter, webhookRoutes);

// ============================================================
// Global Error Handler
// ============================================================
app.use((err, req, res, next) => {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    error: err.message
  }));
  res.status(500).json({ error: sanitiseError(err), requestId: req.requestId });
});

// ============================================================
// Start Server
// ============================================================
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] AbhyasAI backend running on port ${PORT}`);

    // Startup security checks
    if (!process.env.API_SECRET_KEY) {
      console.warn(`[${new Date().toISOString()}] ⚠️  SECURITY WARNING: API_SECRET_KEY is not set. API endpoints are unauthenticated. Set it in .env for production.`);
    }

  });
}

module.exports = app;
