const candleService = require('../../src/services/candleService');
const candleModel = require('../../src/models/candleModel');
const { v4: uuidv4 } = require('uuid');

jest.mock('../../src/models/candleModel');
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid')
}));


describe('Candle Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return all candles', async () => {
        const candles = [{ candleType: 'simple', message: 'New Candle' }];
        candleModel.find.mockResolvedValue(candles);

        const result = await candleService.getAllCandles();

        expect(result).toEqual(candles);
        expect(candleModel.find).toHaveBeenCalled();
    });

    it('should create a new candle and return it', async () => {
        const candle = { candleType: 'simple', message: 'New Candle', addon: [] };
        const newCandle = { ...candle, uid: 'mock-uuid', expireAt: new Date(), likes: 0, shares: 0 };
        candleModel.prototype.save = jest.fn().mockResolvedValue(newCandle);

        const result = await candleService.createCandle(candle);

        expect(result).toEqual(newCandle);
        expect(candleModel.prototype.save).toHaveBeenCalled();
    });

    it('should throw an error if candle data is invalid (missing candleType)', async () => {
        const invalidCandle = { message: 'New Candle' };

        await expect(candleService.createCandle(invalidCandle)).rejects.toThrow('Invalid candle data');
    });

    it('should throw an error if candle data is invalid (missing message)', async () => {
        const invalidCandle = { candleType: 'simple' };

        await expect(candleService.createCandle(invalidCandle)).rejects.toThrow('Invalid candle data');
    });

    it('should initialize addon if not provided', async () => {
        const candle = { candleType: 'simple', message: 'New Candle' };
        const newCandle = { ...candle, uid: 'mock-uuid', expireAt: new Date(), likes: 0, shares: 0, addon: [{ addonType: 'none', addonData: 'none' }] };
        candleModel.prototype.save = jest.fn().mockResolvedValue(newCandle);

        const result = await candleService.createCandle(candle);

        expect(result.addon).toEqual([{ addonType: 'none', addonData: 'none' }]);
        expect(candleModel.prototype.save).toHaveBeenCalled();

    });

    it('should initialize likes and shares to 0', async () => {
        const candle = { candleType: 'simple', message: 'New Candle', addon: [] };
        const newCandle = { ...candle, uid: 'mock-uuid', expireAt: new Date(), likes: 0, shares: 0 };
        candleModel.prototype.save = jest.fn().mockResolvedValue(newCandle);

        const result = await candleService.createCandle(candle);

        expect(result.likes).toBe(0);
        expect(result.shares).toBe(0);
    });

    xit('should calculate expireAt correctly for different candle types', async () => {
        const candleTypes = ['simple', 'treeDays', 'week', 'month'];
        const expectedDates = [1, 3, 7, 30]; // Assuming month is 30 days for simplicity

        for (let i = 0; i < candleTypes.length; i++) {
            let candle = { candleType: candleTypes[i], message: 'New Candle', addon: [] };
            let newCandle = { ...candle, uid: 'mock-uuid', expireAt: new Date(), likes: 0, shares: 0 };
            candleModel.prototype.save = jest.fn().mockResolvedValue(newCandle);

            let result = await candleService.createCandle(candle);

            const dateNow = new Date();
            let expectedDate = new Date();
            expectedDate.setDate(dateNow.getDate() + expectedDates[i]);

            console.log('result:' + result.expireAt.toISOString().split('T')[0])
            console.log('teste:' + expectedDate.toISOString().split('T')[0])
            expect(result.expireAt.toISOString().split('T')[0]).toBe(expectedDate.toISOString().split('T')[0]);

            // Comparar apenas a data (ano, mês, dia) sem considerar o horário
            expect(result.expireAt.toISOString().split('T')[0]).toBe(expectedDate.toISOString().split('T')[0]);
        }
    });

    xit('should process addon correctly when provided', async () => {
        const candle = { candleType: 'simple', message: 'New Candle', addon: [{ addonType: 'extraDays', addonData: '2' }] };
        const newCandle = { ...candle, uid: 'mock-uuid', expireAt: new Date(), likes: 0, shares: 0 };
        candleModel.prototype.save = jest.fn().mockResolvedValue(newCandle);

        const result = await candleService.createCandle(candle);

        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + 3); // 1 day for 'simple' + 2 extra days
        expect(result.expireAt.toDateString()).toBe(expectedDate.toDateString());
    });
});