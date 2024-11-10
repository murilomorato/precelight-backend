const express = require('express');
const candleController = require('../controllers/candleController');

const router = express.Router();

router.get('/get-all-candles', candleController.getAllCandles);

router.post('/create-candle', candleController.createCandle);

module.exports = router;