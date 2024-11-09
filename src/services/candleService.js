const candleModel = require('../models/candleModel');

exports.getAllCandles = () => {
    return candleModel.getAllCandles();
};

exports.createCandle = (candle) => {
    if (!candle.uid || !candle.candleType || !candle.message) {
        throw new Error('Invalid candle data');
    }
    return candleModel.createCandle(candle);
};