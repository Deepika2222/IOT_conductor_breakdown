const express = require('express');
const router = express.Router();
const { getHistory } = require('../controllers/sensorController');

// TODO: implement logic
router.get('/', getHistory);

module.exports = router;
