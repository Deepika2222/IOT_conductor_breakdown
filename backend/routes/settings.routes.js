const express = require('express');
const router = express.Router();

const {
    fetchSettings,
    saveSettings
} = require('../controllers/settings.controller');

router.get('/settings', fetchSettings);
router.post('/settings', saveSettings);

module.exports = router;