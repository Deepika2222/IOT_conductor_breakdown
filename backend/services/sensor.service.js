/**
 * services/sensor.service.js
 * Business logic layer for sensor readings and historical data.
 *
 * CONTRACT: DO NOT MODIFY — response shapes are shared with frontend team.
 */

const { simulateDelay } = require('../utils/delay');
const axios = require('axios');

const { getSettings } = require('./settings.service');

/**
 * Processes an incoming sensor reading and returns a fault status.
 *
 * CONTRACT: DO NOT MODIFY — return shape must be { status }
 */
const processSensorData = async (payload) => {
  await simulateDelay();

  const { current, tilt } = payload;
  const settings = await getSettings();
  const currentThreshold = Number(settings.current_threshold || 50);
  const useTilt = settings.tilt_sensitivity !== false;

  let status = 'NORMAL';

  if ((useTilt && Number(tilt) >= 1) || Number(current) > currentThreshold || Number(current) < 20) {
    status = 'FAULT';
  }

  return { status };
};

/**
 * Retrieves historical sensor readings for a pole.
 *
 * CONTRACT: DO NOT MODIFY — field names: current, voltage, tilt, timestamp
 */
const getSensorHistory = async () => {
  await simulateDelay();

  const CHANNEL_ID = process.env.TS_CHANNEL_ID;
  const READ_KEY = process.env.TS_READ_KEY;

  const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_KEY}&results=10`;

  try {
    const response = await axios.get(url);
    const feeds = response.data.feeds || [];

    // 🔥 Transform ThingSpeak data → your API format
    const history = feeds.map((f) => ({
      current: Number(f.field1 || 0),
      voltage: Number(f.field2 || 0),
      tilt: Number(f.field3 || 0),
      timestamp: f.created_at,
    }));

    return history;

  } catch (error) {
    console.error("History fetch error:", error.message);
    return [];
  }
};

module.exports = { processSensorData, getSensorHistory };
