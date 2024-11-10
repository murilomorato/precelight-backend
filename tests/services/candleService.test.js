const candleService = require('../../src/services/candleService');
const candleModel = require('../../src/models/candleModel');

jest.mock('../../src/models/candleModel');

describe('Candle Service', () => {

    it('should return all candles', async () => {
        const candles = [{ uid: 1, candleType: 'Type A', message: 'New Candle' }];
        candleModel.find.mockResolvedValue(candles);

        const result = await candleService.getAllCandles();

        expect(result).toEqual(candles);
        expect(candleModel.find).toHaveBeenCalled();
    });

    it('should create a new candle and return it', async () => {
        const newCandle = { uid: 3, candleType: 'Type A', message: 'New Candle' };
        candleModel.prototype.save = jest.fn().mockResolvedValue(newCandle);

        const result = await candleService.createCandle(newCandle);

        expect(result).toEqual(newCandle);
        expect(candleModel.prototype.save).toHaveBeenCalled();
    });

    it('should throw an error if candle data is invalid (required key missing)', async () => {

        const invalidCandle = [
            { uid: null, candleType: 'Type A', message: 'New Candle' },
            { uid: 1, candleType: null, message: 'New Candle' },
            { uid: 1, candleType: 'Type A', message: null }]

        for (const element of invalidCandle) {
            await expect(candleService.createCandle(element)).rejects.toThrow('Invalid candle data');
        }

    });

});