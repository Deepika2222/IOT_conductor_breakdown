/**
 * controllers/sensor.controller.js
 * Thin controller layer — delegates all logic to sensor.service.js.
 *
 * CONTRACT: DO NOT MODIFY response shape.
 * All responses MUST follow: { success, data, error }
 *
 * TODO: Add input validation middleware (express-validator / Joi) per route.
 */

const sensorService = require('../services/sensor.service');

/**
 * POST /api/sensor-data
 * Receives a sensor reading from a pole and returns fault status.
 *
 * Expected body: { pole_id, current, voltage, tilt }
 */
const addSensorData = async (req, res) => {
  try {
    console.log(`API HIT: /api/sensor-data`);

    // TODO: validate req.body before passing to service
    const result = await sensorService.processSensorData(req.body);

    // CONTRACT: DO NOT MODIFY — response shape is locked for frontend contract
    return res.status(200).json({
      success: true,
      data: result,
      error: null,
    });
  } catch (err) {
    console.error('[sensor.controller] addSensorData error:', err.message);
    // CONTRACT: DO NOT MODIFY — error response shape
    return res.status(500).json({
      success: false,
      data: null,
      error: 'Internal server error',
    });
  }
};

/**
 * GET /api/history
 * Returns historical sensor readings for a pole.
 */
const getHistory = async (req, res) => {
  try {
    console.log(`API HIT: /api/history`);

    // TODO: extract pole_id / from / to from req.query and pass to service
    const result = await sensorService.getSensorHistory();

    // CONTRACT: DO NOT MODIFY — response shape is locked for frontend contract
    return res.status(200).json({
      success: true,
      data: result,
      error: null,
    });
  } catch (err) {
    console.error('[sensor.controller] getHistory error:', err.message);
    // CONTRACT: DO NOT MODIFY — error response shape
    return res.status(500).json({
      success: false,
      data: null,
      error: 'Internal server error',
    });
  }
};

module.exports = { addSensorData, getHistory };
