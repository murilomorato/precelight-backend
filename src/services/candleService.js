const Candle = require('../models/candleModel');

exports.getAllCandles = async () => {
    return await Candle.find();
};

exports.createCandle = async (candle) => {
    if (!candle.uid || !candle.candleType || !candle.message) {
        throw new Error('Invalid candle data');
    }
    const newCandle = new Candle(candle);
    return await newCandle.save();
};