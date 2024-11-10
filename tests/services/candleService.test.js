const candleService = require('../../src/services/candleService');
const candleModel = require('../../src/models/candleModel');

jest.mock('../../src/models/candleModel');

describe('Candle Service', () => {

    it('should return all candles', () => {
        const candles = [{ uid: 1, candleType: 'Type A', message: 'New Candle' }];
        candleModel.getAllCandles.mockReturnValue(candles);

        const result = candleService.getAllCandles();

        expect(result).toEqual(candles);
        expect(candleModel.getAllCandles).toHaveBeenCalled();
    });

    it('should create a new candle and return it', () => {
        const newCandle = { uid: 3, candleType: 'Type A', message: 'New Candle' };
        candleModel.createCandle.mockReturnValue(newCandle);

        const result = candleService.createCandle(newCandle);

        expect(result).toEqual(newCandle);
        expect(candleModel.createCandle).toHaveBeenCalledWith(newCandle);
    });

    it('should throw an error if candle data is invalid (required key missing)', () => {
        
        const invalidCandle = [
            { uid: null, candleType: 'Type A', message: 'New Candle' },
            { uid: 1, candleType: null, message: 'New Candle' },
            { uid: 1, candleType: 'Type A', message: null }]

        invalidCandle.forEach(element => {
            
            expect(() => {
                candleService.createCandle(element);
            }).toThrow('Invalid candle data');

        });

    });

});