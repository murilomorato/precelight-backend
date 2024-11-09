const candleService = require('../services/candleService');

exports.getAllCandles = (req, res) => {
    const candles = candleService.getAllCandles();
    res.json(candles);
};

exports.createCandle = (req, res) => {
    const { uid, candleType, message } = req.body;
    try {
        candleService.createCandle({ uid, candleType, message });
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};