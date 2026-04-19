const express = require('express');
const router = express.Router();
const { getAlerts } = require('../controllers/alertController');

// TODO: implement logic
router.get('/', getAlerts);

module.exports = router;
