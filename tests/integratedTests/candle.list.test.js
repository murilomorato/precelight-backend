require('dotenv').config()
const request = require('supertest');
const app = require('../../src/app');
const Candle = require('../../src/models/candleModel');


describe('Candle list integrated tests', () => {

    const apiCredentials = Buffer.from(`${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`).toString('base64');

    it('should return zero candles', async () => {

        const response = await request(app)
            .get('/api/candles/get-all-candles')
            .set('Authorization', `Basic ${apiCredentials}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ candles: [] });
    });

    it('should return all candles', async () => {
        const candle01 = {
            candleType: 'simple',
            message: 'Candle 01',
            addon: [],
            expireAt: '2024-11-16T01:08:02.901Z',
            likes: 0,
            shares: 0,
            uid: 'mock-uuid-01',
            __v: 0,//mongo data
            _id: "6737f10961b21a3877e3d585",//mongo data
        };

        const candle02 = {
            candleType: 'simple',
            message: 'Candle 02',
            addon: [],
            expireAt: '2024-11-16T01:08:02.901Z',
            likes: 0,
            shares: 0,
            uid: 'mock-uuid-02',
            __v: 0,//mongo data
            _id: "6737f10961b21a3877e3d588",//mongo data
        };

        await Candle.create(candle01);
        await Candle.create(candle02);

        const response = await request(app)
            .get('/api/candles/get-all-candles')
            .set('Authorization', `Basic ${apiCredentials}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ candles: [candle01, candle02] });
    });

});