const { v4: uuidv4 } = require('uuid');
const Candle = require('../models/candleModel');
const candleExpire = require('./candleExpiration');

exports.getAllCandles = async () => {
    return await Candle.find();
};

exports.createCandle = async (candle) => {
    if (!candle.candleType || !candle.message) {
        throw new Error('Invalid candle data');
    }

    const validCandleTypes = ['simple', 'threeDays', 'week', 'month']
    if (!validCandleTypes.includes(candle.candleType)) {
        throw new Error('Invalid candle type');
    }

    if (!candle.addon || !Array.isArray(candle.addon) || candle.addon.length < 1) {
        candle.addon = [{ addonType: 'none', addonData: 'none' }];
    }

    const validCandleAddons = ['none', 'extraDays'];
    candle.addon.forEach(element => {
        if (!validCandleAddons.includes(element.addonType)) {
            throw new Error('Invalid candle addon');
        }
    });

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
    debugger
    return await newCandle.save();
};