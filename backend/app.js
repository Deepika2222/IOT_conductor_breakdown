/**
 * app.js
 * Express application entry point.
 *
 * CONTRACT: DO NOT MODIFY middleware order or route mount paths.
 *
 * TODO: Add authentication middleware (JWT / API key) before routes in production.
 * TODO: Add rate-limiting middleware (express-rate-limit) in production.
 * TODO: Add helmet() for HTTP security headers in production.
 */

const express = require('express');
const cors    = require('cors');

const { requestLogger } = require('./utils/logger');

const sensorRoutes  = require('./routes/sensorRoutes');
const statusRoutes  = require('./routes/statusRoutes');
const alertRoutes   = require('./routes/alertRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────

// CONTRACT: DO NOT MODIFY — CORS must remain open so frontend can access backend
// TODO: Restrict CORS origin to specific domain in production
app.use(cors({
  origin: '*',          // allow all origins during development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse incoming JSON bodies
app.use(express.json());

// Log every incoming request: "API HIT: /api/status  [GET] <timestamp>"
// CONTRACT: DO NOT MODIFY — frontend team relies on these logs for debugging
app.use(requestLogger);

// ─── API Routes ───────────────────────────────────────────────────────────────
// CONTRACT: DO NOT MODIFY mount paths — these are shared with frontend team
app.use('/api/sensor-data', sensorRoutes);
app.use('/api/status',      statusRoutes);
app.use('/api/history',     historyRoutes);
app.use('/api/alerts',      alertRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
// Quick sanity endpoint — not part of the frontend API contract
app.get('/health', (req, res) => {
  res.json({ success: true, data: { message: 'IoT Backend is running' }, error: null });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
// CONTRACT: DO NOT MODIFY — error response shape must match global contract
app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─── Global Error Handler ──────────────────────────────────────────────────────
// CONTRACT: DO NOT MODIFY — error response shape must match global contract
// TODO: Integrate structured error logging (e.g. winston / Sentry) in production
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    data: null,
    error: 'Internal server error',
  });
});

module.exports = app;
