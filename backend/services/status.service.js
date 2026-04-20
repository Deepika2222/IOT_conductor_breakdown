/**
 * services/status.service.js
 * Business logic layer for pole status and fault alerts.
 *
 * CONTRACT: DO NOT MODIFY — response shapes are shared with frontend team.
 */

const { simulateDelay } = require('../utils/delay');
const axios = require('axios');

const { getSettings } = require('./settings.service');

/**
 * Returns the current fault status of a given pole.
 */
const getPoleStatus = async (poleId = 'P12') => {
  await simulateDelay();

  const CHANNEL_ID = process.env.TS_CHANNEL_ID;
  const READ_KEY = process.env.TS_READ_KEY;

  const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_KEY}&results=1`;

  try {
    const response = await axios.get(url);
    const feed = response.data.feeds?.[0];

    // 🔴 No data case
    if (!feed) {
      return {
        pole_id: poleId,
        status: 'NORMAL',
        fault_type: null,
        last_updated: new Date().toISOString(),
      };
    }

    const current = Number(feed.field1 || 0);
    const tilt = Number(feed.field3 || 0);

    const settings = await getSettings();
    const currentThreshold = Number(settings.current_threshold || 50);
    const useTilt = settings.tilt_sensitivity !== false;

    let status = 'NORMAL';
    let fault_type = null;

    if (useTilt && tilt >= 1) {
      status = 'FAULT';
      fault_type = 'SAG';
    } else if (current > currentThreshold) {
      status = 'FAULT';
      fault_type = 'OVERHEATING';
    } else if (current < 20) {
      status = 'FAULT';
      fault_type = 'BREAKAGE';
    }

    return {
      pole_id: poleId,
      status,
      fault_type,
      last_updated: feed.created_at,
    };

  } catch (error) {
    console.error("ThingSpeak Error:", error.message);

    return {
      pole_id: poleId,
      status: 'UNKNOWN',
      fault_type: null,
      last_updated: new Date().toISOString(),
    };
  }
};

/**
 * Returns active alerts list
 */
const getActiveAlerts = async () => {
  await simulateDelay();

  const CHANNEL_ID = process.env.TS_CHANNEL_ID;
  const READ_KEY = process.env.TS_READ_KEY;

  const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_KEY}&results=10`;

  try {
    const response = await axios.get(url);
    const feeds = response.data.feeds || [];

    const settings = await getSettings();
    const currentThreshold = Number(settings.current_threshold || 50);
    const useTilt = settings.tilt_sensitivity !== false;

    // 🔥 Step 1: Filter faults
    let alerts = feeds
      .map((f) => {
        const current = Number(f.field1 || 0);
        const tilt = Number(f.field3 || 0);
        
        let type = null;
        if (useTilt && tilt >= 1) {
           type = 'SAG';
        } else if (current > currentThreshold) {
           type = 'OVERHEATING';
        } else if (current < 20) {
           type = 'BREAKAGE';
        }
        
        if (!type) return null;

        return {
          type,
          pole_id: 'P12',
          time: f.created_at,
        };
      })
      .filter(Boolean); // Remove nulls

    // 🔥 Step 2: Remove duplicates (same timestamp)
    const seen = new Set();
    alerts = alerts.filter((a) => {
      if (seen.has(a.time)) return false;
      seen.add(a.time);
      return true;
    });

    // 🔥 Step 3: Sort latest first
    alerts.sort((a, b) => new Date(b.time) - new Date(a.time));

    // 🔥 Step 4: Limit results (optional)
    alerts = alerts.slice(0, 5);

    return alerts;

  } catch (error) {
    console.error("Alert Fetch Error:", error.message);
    return [];
  }
};

module.exports = { getPoleStatus, getActiveAlerts };
