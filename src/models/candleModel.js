const candles = [
    { uid: 1, candleType: 'simple', message: 'first candle message' },
    { uid: 2, candleType: 'simple', message: 'second candle message' },
];

exports.getAllCandles = () => {
    return candles;
};

exports.createCandle = (candle) => {
    candles.push(candle);
    return candle;
};