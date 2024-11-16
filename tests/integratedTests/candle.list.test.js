require('dotenv').config()
const request = require('supertest');
const app = require('../../src/app');
const Candle = require('../../src/models/candleModel');


describe('Candle create integrated tests', () => {

    const apiCredentials = Buffer.from(`${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`).toString('base64');

    xit('should return all candles', async () => {
        await Candle.create({
            candleType: 'simple',
            message: 'New Candle',
            addon: [],
            expireAt: new Date(),
            likes: 0,
            shares: 0,
            uid: 'mock-uuid'
        });

        const response = await request(app)
            .get('/api/candles/get-all-candles');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ candleType: 'simple', message: 'New Candle' }]);
    });
});