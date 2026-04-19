const express = require('express');
const router = express.Router();
const { addSensorData } = require('../controllers/sensorController');

// TODO: implement logic
router.post('/', addSensorData);

module.exports = router;
