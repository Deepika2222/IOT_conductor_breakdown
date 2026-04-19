/**
 * services/sensor.service.js
 * Business logic layer for sensor readings and historical data.
 *
 * CONTRACT: DO NOT MODIFY — response shapes are shared with frontend team.
 *
 * TODO: Replace mock data with real database queries (e.g. Mongoose / Sequelize).
 * TODO: Integrate ML fault-detection pipeline on incoming sensor readings.
 */

const { simulateDelay } = require('../utils/delay');

/**
 * Processes an incoming sensor reading and returns a fault status.
 *
 * @param {Object} payload - { pole_id, current, voltage, tilt }
 * @returns {Object} - { status: 'NORMAL' | 'FAULT' }
 *
 * TODO: Persist payload to DB as a SensorReading document.
 * TODO: Run ML model on current/voltage/tilt to determine real fault status.
 */
const processSensorData = async (payload) => {
  await simulateDelay();

  // TODO: validate payload fields before processing
  // TODO: await SensorReading.create(payload);
  // TODO: const result = await faultDetectionModel.predict(payload);

  // CONTRACT: DO NOT MODIFY — return shape must be { status }
  return { status: 'NORMAL' };
};

/**
 * Retrieves historical sensor readings for a pole.
 *
 * @returns {Array} - Array of { current, voltage, tilt, timestamp }
 *
 * TODO: Accept pole_id, from, to as query params.
 * TODO: await SensorReading.find({ pole_id }).sort({ timestamp: -1 }).limit(100);
 */
const getSensorHistory = async () => {
  await simulateDelay();

  // TODO: Replace with real DB query
  // CONTRACT: DO NOT MODIFY — field names: current, voltage, tilt, timestamp
  return [
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
  ];
};

module.exports = { processSensorData, getSensorHistory };
