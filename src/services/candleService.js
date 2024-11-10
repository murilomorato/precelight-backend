const { v4: uuidv4 } = require('uuid');
const Candle = require('../models/candleModel');

exports.getAllCandles = async () => {
    return await Candle.find({});
};

exports.createCandle = async (candle) => {

    if (!candle.candleType || !candle.message) throw new Error('Invalid candle data');
    candle.uid = uuidv4();
    const newCandle = new Candle(candle);

    return await newCandle.save();
};