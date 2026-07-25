// backend/server.js
// AbhyasAI Express backend entry point

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
const { cleanupExpiredFiles } = require('./services/cleanupService');
const { sanitiseError } = require('./utils/errorSanitiser');
const { apiKeyAuth } = require('./middleware/apiAuth');

// Import routes
const generateRoutes = require('./routes/generate');
const chaptersRoutes = require('./routes/chapters');
const downloadRoutes = require('./routes/download');
const webhookRoutes = require('./routes/webhook');
const skillsRoutes = require('./routes/skills');
const questionsRoutes = require('./routes/questions');
const sessionsRoutes = require('./routes/sessions');
const reportsRoutes = require('./routes/reports');

// Import cache service
const cacheService = require('./services/cacheService');

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

// Rate limiter — 10 req/min/IP on /api/generate only
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
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AbhyasAI', time: new Date() });
});

// API routes (apiKeyAuth on credit-burning endpoints)
app.use('/api/generate', generateLimiter, apiKeyAuth, generateRoutes);
app.use('/api/skills', generateLimiter, apiKeyAuth, skillsRoutes);
app.use('/api/questions', generateLimiter, apiKeyAuth, questionsRoutes);
app.use('/api/sessions', generateLimiter, apiKeyAuth, sessionsRoutes);
app.use('/api/reports', generateLimiter, apiKeyAuth, reportsRoutes);

// Read-only endpoints — rate-limited to prevent enumeration
const readLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/chapters', readLimiter, chaptersRoutes);
app.use('/api/download', readLimiter, apiKeyAuth, downloadRoutes);
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
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] AbhyasAI backend running on port ${PORT}`);

  // Startup security checks
  if (!process.env.WHATSAPP_APP_SECRET) {
    console.warn(`[${new Date().toISOString()}] ⚠️  SECURITY WARNING: WHATSAPP_APP_SECRET is not set. Webhook signature verification is DISABLED. Set it in .env to enable.`);
  }
  if (!process.env.API_SECRET_KEY) {
    console.warn(`[${new Date().toISOString()}] ⚠️  SECURITY WARNING: API_SECRET_KEY is not set. API endpoints are unauthenticated. Set it in .env for production.`);
  }

  // Warm cache in background — don't block startup
  cacheService.warmCache().catch(err => {
    console.error(`[${new Date().toISOString()}] Cache warm error:`, err.message);
  });

  // Expired file cleanup — run every hour (Fix 9)
  setInterval(cleanupExpiredFiles, 60 * 60 * 1000);
  cleanupExpiredFiles().catch(err => {
    console.error(`[${new Date().toISOString()}] Initial cleanup error:`, err.message);
  });
});
