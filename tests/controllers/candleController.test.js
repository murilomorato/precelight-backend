const candleController = require('../../src/controllers/candleController');
const candleService = require('../../src/services/candleService');

jest.mock('../../src/services/candleService');

describe('Candle Controller', () => {

    it('should return all candles', async () => {

        //arrange
        const req = {};
        const res = {
            json: jest.fn(),//spy function
        };

        candleService.getAllCandles.mockReturnValue([{ candleType: 'simple', message: 'New Candle' }]);

        //act
        await candleController.getAllCandles(req, res);

        //assert
        expect(res.json).toHaveBeenCalledWith([{ candleType: 'simple', message: 'New Candle' }]);

    });

    it('should create a new candle and return success true', async () => {

        const req = {
            body: {
                candleType: 'simple',
                message: 'New Candle'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        candleService.createCandle.mockReturnValue({ candleType: 'simple', message: 'New Candle' });

        await candleController.createCandle(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ success: true });

    });

    it('should return 500 success false if creation fails', () => {
        const req = {
            body: { candleType: 'simple', message: 'New Candle' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        candleService.createCandle.mockImplementation(() => {
            throw new Error('Unexpected failure');;
        });

        candleController.createCandle(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });

    it('should return 400 success false if miss required data', () => {
        const req = {
            body: { candleType: 'simple', message: 'New Candle' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        candleService.createCandle.mockImplementation(() => {
            throw new Error('Invalid candle data');;
        });

        candleController.createCandle(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });

});


