/**
 * controllers/alertController.js
 * Handles GET /api/alerts
 *
 * CONTRACT: DO NOT MODIFY response shape.
 * All responses follow: { success, data, error }
 *
 * TODO: Replace mock logic with:
 *   1. Accept optional query params (pole_id, limit, since)
 *   2. Fetch real alert records from DB (e.g. Alert.find({ ... }).sort({ time: -1 }))
 *   3. Return paginated alert list
 */

const { simulateDelay } = require('../utils/delay');

/**
 * GET /api/alerts
 * Returns a list of active fault alerts.
 *
 * CONTRACT: DO NOT MODIFY — each alert must contain: { type, pole_id, time }
 */
const getAlerts = async (req, res) => {
  try {
    await simulateDelay();

    // TODO: query DB for real alert records
    // TODO: support pagination (req.query.limit, req.query.page)
    // CONTRACT: DO NOT MODIFY — response shape is locked for frontend contract
    return res.status(200).json({
      success: true,
      data: [
        // CONTRACT: DO NOT MODIFY — field names: type, pole_id, time
        {
          type: 'BREAKAGE',
          pole_id: 'P12',
          time: '2026-04-19T10:05:00',
        },
      ],
      error: null,
    });
  } catch (err) {
    console.error('Error in getAlerts:', err.message);
    // CONTRACT: DO NOT MODIFY — error response shape
    return res.status(500).json({
      success: false,
      data: null,
      error: 'Internal server error',
    });
  }
};

module.exports = { getAlerts };
