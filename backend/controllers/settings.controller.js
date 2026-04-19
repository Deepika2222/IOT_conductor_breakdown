const {
    getSettings,
    updateSettings
} = require('../services/settings.service');

// GET settings
const fetchSettings = async (req, res) => {
    console.log("API HIT: /api/settings");

    try {
        const data = await getSettings();

        res.json({
            success: true,
            data,
            error: null
        });
    } catch (err) {
        res.json({
            success: false,
            data: null,
            error: "Failed to fetch settings"
        });
    }
};

// POST update settings
const saveSettings = async (req, res) => {
    console.log("API HIT: /api/settings");

    try {
        const updated = await updateSettings(req.body);

        res.json({
            success: true,
            data: updated,
            error: null
        });
    } catch (err) {
        res.json({
            success: false,
            data: null,
            error: "Failed to update settings"
        });
    }
};

module.exports = { fetchSettings, saveSettings };