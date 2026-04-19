const express = require('express');
const router = express.Router();
const { getStatus } = require('../controllers/statusController');

// TODO: implement logic
router.get('/', getStatus);

module.exports = router;
