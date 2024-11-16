const express = require('express');
const candleController = require('../controllers/candleController');
const basicAuth = require('../middleware/basicAuth');
const router = express.Router();

router.use(basicAuth);

router.get('/get-all-candles', candleController.getAllCandles);
router.post('/create-candle', candleController.createCandle);

module.exports = router;