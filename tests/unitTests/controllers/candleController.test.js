const candleController = require('../../../src/controllers/candleController');
const candleService = require('../../../src/services/candleService');

jest.mock('../../../src/services/candleService');

describe('Candle Controller', () => {

    it('should return all candles', async () => {

        //arrange
        const req = {};
        const res = {
            json: jest.fn(), //spy function
        };

        const candles = []
        candles[0] = { candleType: 'simple', message: 'New Candle 0' };
        candles[1] = { candleType: 'simple', message: 'New Candle 1' };
        candles[2] = { candleType: 'simple', message: 'New Candle 2' };

        candleService.getAllCandles.mockReturnValue(candles);

        //act
        await candleController.getAllCandles(req, res);

        //assert
        expect(res.json).toHaveBeenCalledWith({ candles: candles });
    });

    it('should create a new candle and return success true', async () => {

        const req = {
            body: {
                candleType: 'simple',
                message: 'New Candle',
                addon: []
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const serviceResponseMock = {
            uid: 'mocked-uid',
            candleType: 'simple',
            message: 'New Candle',
            addon: [{
                addonType: 'none',
                addonData: 'none'
            }],
            expireAt: "2024-11-16T13:27:21.743Z",
            likes: 0,
            shares: 0
        }

        candleService.createCandle.mockReturnValue(serviceResponseMock);

        await candleController.createCandle(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ success: true });

    });

    it('should return 500 success false if creation fails', () => {
        const req = {
            body: {
                candleType: 'simple',
                message: 'New Candle',
                addon: []
            }
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
        expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Internal server error' });
    });

    it('should return 400 success false if miss required data', () => {
        const req = {
            body: {
                message: 'New Candle',
                addon: []
            }
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
        expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Invalid candle data' });
    });

});


