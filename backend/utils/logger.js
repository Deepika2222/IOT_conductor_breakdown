/**
 * utils/logger.js
 * Centralized request logger — prints each API hit to the console.
 * CONTRACT: DO NOT MODIFY the log format — frontend team uses it for debugging.
 *
 * TODO: Replace with a proper logging library (e.g. winston or morgan) in production.
 */

/**
 * Express middleware that logs every incoming API request.
 * Format: "API HIT: /api/status  [GET] 2026-04-19T10:30:00.000Z"
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`API HIT: ${req.originalUrl}  [${req.method}] ${timestamp}`);
  next();
};

module.exports = { requestLogger };
