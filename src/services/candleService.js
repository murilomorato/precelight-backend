const { v4: uuidv4 } = require('uuid');
const Candle = require('../models/candleModel');
const candleExpire = require('./candleExpiration');

exports.getAllCandles = async () => {
    return await Candle.find({});
};

exports.createCandle = async (candle) => {
    if (!candle.candleType || !candle.message) {
        throw new Error('Invalid candle data');
    }

    if (!Array.isArray(candle.addon) || candle.addon.length < 1) {
        candle.addon = [{ addonType: 'none', addonData: 'none' }];
    }

    candle.expireAt = candleExpire.calcInitialExpirationDate({ type: candle.candleType, addOn: candle.addon });
    candle.likes = 0;
    candle.shares = 0;
    candle.uid = uuidv4();

    console.log('objectlog:' + candle.expireAt);

    const newCandle = new Candle(candle);

    console.log('Candlelog:' + newCandle.expireAt);
    return await newCandle.save();
};