/**
 * services/settings.service.js
 * Handles system configuration
 *
 * CONTRACT: DO NOT MODIFY RESPONSE FORMAT
 */

// 🔥 In-memory storage (temporary)
let settings = {
    current_threshold: 250,
    leakage_threshold: 50,
    tilt_sensitivity: true,
    system_mode: "AUTO",
    polling_interval: 5
};

const getSettings = async () => {
    return settings;
};

const updateSettings = async (payload) => {
    settings = { ...settings, ...payload };

    return settings;
};

module.exports = { getSettings, updateSettings };