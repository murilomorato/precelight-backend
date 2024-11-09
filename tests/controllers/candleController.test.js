const candleController = require('../../src/controllers/candleController');
const candleService = require('../../src/services/candleService');

jest.mock('../../src/services/candleService');

describe('Candle Controller', () => {

    it('should return all candles', () => {
        const req = {};
        const res = {
            json: jest.fn(),
        };

        candleService.getAllCandles.mockReturnValue([{ id: 1, name: 'John Doe' }]);

        candleController.getAllCandles(req, res);

        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'John Doe' }]);
    });

    it('should create a new candle and return success true', () => {
        const req = {
            body: { uid: 3, candleType: 'Type A', message: 'New Candle' }
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

    it('should return success false if creation fails', () => {
        const req = {
            body: { uid: 3, candleType: 'Type A', message: 'New Candle' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        candleService.createCandle.mockImplementation(() => {
            throw new Error('Creation failed');
        });

        candleController.createCandle(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });

});


