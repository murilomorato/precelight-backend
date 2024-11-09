const express = require('express');
const candleController = require('../controllers/candleController');

const router = express.Router();

router.get('/', candleController.getAllCandles);

router.post('/', candleController.createCandle);

module.exports = router;