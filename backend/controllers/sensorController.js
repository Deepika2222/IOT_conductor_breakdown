/**
 * controllers/sensorController.js
 * Handles POST /api/sensor-data
 *
 * CONTRACT: DO NOT MODIFY response shape.
 * All responses follow: { success, data, error }
 *
 * TODO: Replace mock logic with:
 *   1. Input validation (Joi / express-validator)
 *   2. Persist reading to DB (e.g. SensorReading model)
 *   3. Run ML fault-detection pipeline on incoming values
 *   4. Return real fault status instead of hardcoded "NORMAL"
 */

const { simulateDelay } = require('../utils/delay');

/**
 * POST /api/sensor-data
 * Accepts sensor readings from a pole and returns fault status.
 *
 * Expected body: { pole_id, current, voltage, tilt }
 *
 * CONTRACT: DO NOT MODIFY — response must always contain { status }
 */
const addSensorData = async (req, res) => {
  try {
    await simulateDelay(); // simulate network + processing time

    // TODO: validate req.body fields (pole_id, current, voltage, tilt)
    // TODO: persist reading to DB
    // TODO: run fault detection model on current/voltage/tilt
    // CONTRACT: DO NOT MODIFY — response shape is locked for frontend contract
    return res.status(200).json({
      success: true,
      data: {
        status: 'NORMAL', // TODO: replace with real ML model output
      },
      error: null,
    });
  } catch (err) {
    // TODO: use structured error logging in production
    console.error('Error in addSensorData:', err.message);
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
 *
 * CONTRACT: DO NOT MODIFY — response must always be an array of readings
 */
const getHistory = async (req, res) => {
  try {
    await simulateDelay();

    // TODO: accept query params (pole_id, from, to) for filtering
    // TODO: fetch real data from DB (e.g. SensorReading.find({ pole_id }))
    // CONTRACT: DO NOT MODIFY — response shape is locked for frontend contract
    return res.status(200).json({
      success: true,
      data: [
        // CONTRACT: DO NOT MODIFY — field names: current, voltage, tilt, timestamp
        {
          current: 120,
          voltage: 230,
          tilt: 0,
          timestamp: '2026-04-19T10:00:00',
        },
        {
          current: 0,
          voltage: 230,
          tilt: 1,
          timestamp: '2026-04-19T10:05:00',
        },
      ],
      error: null,
    });
  } catch (err) {
    console.error('Error in getHistory:', err.message);
    // CONTRACT: DO NOT MODIFY — error response shape
    return res.status(500).json({
      success: false,
      data: null,
      error: 'Internal server error',
    });
  }
};

module.exports = { addSensorData, getHistory };
