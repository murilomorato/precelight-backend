const candleController = require('../../src/controllers/candleController');
const candleService = require('../../src/services/candleService');

jest.mock('../../src/services/candleService');

describe('Candle Controller', () => {

    it('should return all candles', () => {

        //arrange
        const req = {};
        const res = {
            json: jest.fn(),//spy function
        };

        candleService.getAllCandles.mockReturnValue([{ uid: 1, candleType: 'Type A', message: 'New Candle' }]);

        //act
        candleController.getAllCandles(req, res);

        //assert
        expect(res.json).toHaveBeenCalledWith([{ uid: 1, candleType: 'Type A', message: 'New Candle' }]);

    });

    it('should create a new candle and return success true', () => {

        const req = {
            body: {
                uid: 3,
                candleType: 'Type A',
                message: 'New Candle'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        candleService.createCandle.mockReturnValue({ uid: 3, candleType: 'Type A', message: 'New Candle' });

        candleController.createCandle(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ success: true });

    });

    it('should return 500 success false if creation fails', () => {
        const req = {
            body: { uid: 3, candleType: 'Type A', message: 'New Candle' }
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

    it('should return 404 success false if miss required data', () => {
        const req = {
            body: { uid: 3, candleType: 'Type A', message: 'New Candle' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        candleService.createCandle.mockImplementation(() => {
            throw new Error('Invalid candle data');;
        });

        candleController.createCandle(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });

});


