/**
 * app.js
 * Express application factory.
 *
 * CONTRACT: DO NOT MODIFY middleware order or /api mount prefix.
 *
 * Middleware order (MUST stay in this sequence):
 *   1. CORS
 *   2. JSON body parser
 *   3. Request logger
 *   4. API routes
 *   5. 404 handler
 *   6. Global error handler
 *
 * TODO: Add helmet() for HTTP security headers in production.
 * TODO: Add express-rate-limit to prevent abuse in production.
 * TODO: Add JWT / API-key authentication middleware before routes in production.
 */

const express = require('express');
const cors    = require('cors');

const { requestLogger } = require('./utils/logger');

// ─── Route Modules ────────────────────────────────────────────────────────────
const sensorRoutes = require('./routes/sensor.routes');
const statusRoutes = require('./routes/status.routes');

const app = express();

// ─── 1. CORS ──────────────────────────────────────────────────────────────────
// CONTRACT: DO NOT MODIFY — CORS must remain open for frontend to access backend.
// TODO: Restrict `origin` to your frontend domain in production.
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── 2. JSON Body Parser ──────────────────────────────────────────────────────
app.use(express.json());

// ─── 3. Request Logger ────────────────────────────────────────────────────────
// Prints: "API HIT: /api/status  [GET] <ISO timestamp>"
// CONTRACT: DO NOT MODIFY — frontend team uses these logs for debugging.
app.use(requestLogger);

// ─── 4. API Routes ────────────────────────────────────────────────────────────
// CONTRACT: DO NOT MODIFY the /api mount prefix — shared with frontend team.
//
//   sensor.routes.js → POST /api/sensor-data
//                      GET  /api/history
//
//   status.routes.js → GET  /api/status
//                      GET  /api/alerts
//
app.use('/api', sensorRoutes);
app.use('/api', statusRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
// Sanity endpoint — not part of the API contract, for ops/DevOps use only.
app.get('/health', (req, res) => {
  // CONTRACT: DO NOT MODIFY — must return { success, data, error }
  res.status(200).json({
    success: true,
    data: { message: 'IoT Backend is running' },
    error: null,
  });
});

// ─── 5. 404 Handler ───────────────────────────────────────────────────────────
// CONTRACT: DO NOT MODIFY — error response shape must match global contract.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─── 6. Global Error Handler ──────────────────────────────────────────────────
// CONTRACT: DO NOT MODIFY — error response shape must match global contract.
// TODO: Replace console.error with structured logging (winston / Sentry) in production.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[app] Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    data: null,
    error: 'Internal server error',
  });
});

module.exports = app;
