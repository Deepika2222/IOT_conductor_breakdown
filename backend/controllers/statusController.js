/**
 * controllers/statusController.js
 * Handles GET /api/status
 *
 * CONTRACT: DO NOT MODIFY response shape.
 * All responses follow: { success, data, error }
 *
 * TODO: Replace mock logic with:
 *   1. Accept query param pole_id
 *   2. Fetch current pole status from DB (e.g. PoleStatus.findOne({ pole_id }))
 *   3. Return live fault_type and last_updated from DB record
 */

const { simulateDelay } = require('../utils/delay');

/**
 * GET /api/status
 * Returns the current fault status of a pole.
 *
 * CONTRACT: DO NOT MODIFY — response must always contain:
 *   { pole_id, status, fault_type, last_updated }
 */
const getStatus = async (req, res) => {
  try {
    await simulateDelay();

    // TODO: read pole_id from query params (req.query.pole_id)
    // TODO: query real DB status record
    // CONTRACT: DO NOT MODIFY — response shape is locked for frontend contract
    return res.status(200).json({
      success: true,
      data: {
        // CONTRACT: DO NOT MODIFY — field names must stay exactly as below
        pole_id: 'P12',
        status: 'FAULT',
        fault_type: 'BREAKAGE',
        last_updated: '2026-04-19T10:30:00',
      },
      error: null,
    });
  } catch (err) {
    console.error('Error in getStatus:', err.message);
    // CONTRACT: DO NOT MODIFY — error response shape
    return res.status(500).json({
      success: false,
      data: null,
      error: 'Internal server error',
    });
  }
};

module.exports = { getStatus };
