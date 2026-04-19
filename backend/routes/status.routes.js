/**
 * routes/status.routes.js
 * Route definitions for status and alerts endpoints.
 *
 * Mounted at: /api  (see app.js)
 * Full paths:
 *   GET /api/status
 *   GET /api/alerts
 *
 * CONTRACT: DO NOT MODIFY route paths — they are shared with the frontend team.
 *
 * TODO: Add authentication middleware here before the controller handlers.
 *       e.g. router.get('/status', authMiddleware, getStatus)
 */

const express          = require('express');
const router           = express.Router();
const statusController = require('../controllers/status.controller');

// GET /api/status
// TODO: insert authMiddleware before controller
router.get('/status', statusController.getStatus);

// GET /api/alerts
// TODO: insert authMiddleware before controller
router.get('/alerts', statusController.getAlerts);

module.exports = router;
