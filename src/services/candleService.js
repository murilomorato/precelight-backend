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

    if (!candle.addon || !Array.isArray(candle.addon) || candle.addon.length < 1) {
        candle.addon = [{ addonType: 'none', addonData: 'none' }];
    }

    candle.expireAt = candleExpire.calcInitialExpirationDate({ type: candle.candleType, addOn: candle.addon });
    candle.likes = 0;
    candle.shares = 0;
    candle.uid = uuidv4();

    let newCandle = new Candle
    newCandle.uid = candle.uid
    newCandle.candleType = candle.candleType
    newCandle.message = candle.message
    newCandle.addon = candle.addon
    newCandle.expireAt = candle.expireAt
    newCandle.likes = candle.likes
    newCandle.shares = candle.shares

    return await newCandle.save();
};