const candleService = require('../services/candleService');

exports.getAllCandles = async (req, res) => {
    const candles = await candleService.getAllCandles();
    res.json(candles);
};

exports.createCandle = async (req, res) => {
    const { candleType, message } = req.body;

    try {
        await candleService.createCandle({ candleType, message });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.message === 'Invalid candle data') {
            res.status(400).json({ success: false });
        } else {
            res.status(500).json({ success: false });
        }
    }
};