/**
 * controllers/status.controller.js
 * Thin controller layer — delegates all logic to status.service.js.
 *
 * CONTRACT: DO NOT MODIFY response shape.
 * All responses MUST follow: { success, data, error }
 *
 * TODO: Add authentication middleware to gate status and alerts endpoints.
 */

const statusService = require('../services/status.service');

/**
 * GET /api/status
 * Returns the current fault status of a pole.
 *
 * Query params:
 *   pole_id (optional) — defaults to "P12" in service mock
 */
const getStatus = async (req, res) => {
  try {
    console.log(`API HIT: /api/status`);

    // TODO: extract req.query.pole_id and pass to service
    const result = await statusService.getPoleStatus(req.query.pole_id);

    // CONTRACT: DO NOT MODIFY — response shape is locked for frontend contract
    return res.status(200).json({
      success: true,
      data: result,
      error: null,
    });
  } catch (err) {
    console.error('[status.controller] getStatus error:', err.message);
    // CONTRACT: DO NOT MODIFY — error response shape
    return res.status(500).json({
      success: false,
      data: null,
      error: 'Internal server error',
    });
  }
};

/**
 * GET /api/alerts
 * Returns a list of active fault alerts.
 */
const getAlerts = async (req, res) => {
  try {
    console.log(`API HIT: /api/alerts`);

    // TODO: extract pagination params from req.query (limit, page)
    const result = await statusService.getActiveAlerts();

    // CONTRACT: DO NOT MODIFY — response shape is locked for frontend contract
    return res.status(200).json({
      success: true,
      data: result,
      error: null,
    });
  } catch (err) {
    console.error('[status.controller] getAlerts error:', err.message);
    // CONTRACT: DO NOT MODIFY — error response shape
    return res.status(500).json({
      success: false,
      data: null,
      error: 'Internal server error',
    });
  }
};

module.exports = { getStatus, getAlerts };
