/**
 * routes/sensor.routes.js
 * Route definitions for sensor-related endpoints.
 *
 * Mounted at: /api  (see app.js)
 * Full paths:
 *   POST /api/sensor-data
 *   GET  /api/history
 *
 * CONTRACT: DO NOT MODIFY route paths — they are shared with the frontend team.
 *
 * TODO: Add input validation middleware here before the controller handler.
 *       e.g. router.post('/sensor-data', validateSensorBody, addSensorData)
 */

const express         = require('express');
const router          = express.Router();
const sensorController = require('../controllers/sensor.controller');

// POST /api/sensor-data
// TODO: insert validateSensorBody middleware before controller
router.post('/sensor-data', sensorController.addSensorData);

// GET /api/history
// TODO: insert validateHistoryQuery middleware before controller
router.get('/history', sensorController.getHistory);

module.exports = router;
