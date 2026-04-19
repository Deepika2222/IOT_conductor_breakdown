/**
 * services/status.service.js
 * Business logic layer for pole status and fault alerts.
 *
 * CONTRACT: DO NOT MODIFY — response shapes are shared with frontend team.
 *
 * TODO: Replace mock data with real database queries.
 * TODO: Integrate alerting engine (e.g. push notifications, SMS via Twilio).
 */

const { simulateDelay } = require('../utils/delay');

/**
 * Returns the current fault status of a given pole.
 *
 * @param {string} poleId - The pole identifier (e.g. "P12")
 * @returns {Object} - { pole_id, status, fault_type, last_updated }
 *
 * TODO: Accept poleId from query params in controller.
 * TODO: await PoleStatus.findOne({ pole_id: poleId });
 */
const getPoleStatus = async (poleId = 'P12') => {
  await simulateDelay();

  // TODO: Replace with real DB lookup
  // CONTRACT: DO NOT MODIFY — field names: pole_id, status, fault_type, last_updated
  return {
    pole_id: poleId,
    status: 'FAULT',
    fault_type: 'BREAKAGE',
    last_updated: '2026-04-19T10:30:00',
  };
};

/**
 * Returns a list of active fault alerts.
 *
 * @returns {Array} - Array of { type, pole_id, time }
 *
 * TODO: Accept limit / page query params for pagination.
 * TODO: await Alert.find({}).sort({ time: -1 }).limit(limit);
 */
const getActiveAlerts = async () => {
  await simulateDelay();

  // TODO: Replace with real DB query
  // CONTRACT: DO NOT MODIFY — field names: type, pole_id, time
  return [
    {
      type: 'BREAKAGE',
      pole_id: 'P12',
      time: '2026-04-19T10:05:00',
    },
  ];
};

module.exports = { getPoleStatus, getActiveAlerts };
