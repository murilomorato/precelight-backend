const candleService = require('../services/candleService');

exports.getAllCandles = async (req, res) => {
    const candles = await candleService.getAllCandles();
    res.json(candles);
};

exports.createCandle = async (req, res) => {
    const { candleType, message, addon } = req.body;

    try {
        await candleService.createCandle({ candleType, message, addon });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.message === 'Invalid candle data' || error.message === 'Invalid candle type' || error.message === 'Invalid candle addon') {
            res.status(400).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
};