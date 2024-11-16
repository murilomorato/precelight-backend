require('dotenv').config()
const request = require('supertest');
const app = require('../../src/app');
const Candle = require('../../src/models/candleModel');


describe('Candle create integrated tests', () => {

    const apiCredentials = Buffer.from(`${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`).toString('base64');

    it('should create a new simple candle and return success true', async () => {

        const response = await request(app)
            .post('/api/candles/create-candle')
            .set('Authorization', `Basic ${apiCredentials}`)
            .send({
                candleType: 'simple',
                message: 'New Candle',
                addon: []
            });

        const expectedExpireAt = new Date()
        expectedExpireAt.setDate(expectedExpireAt.getDate() + 1);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true });

        const candle = await Candle.findOne({ message: 'New Candle' });
        expect(candle).not.toBeNull();
        expect(candle.uid).toBeDefined();
        expect(candle.candleType).toBe('simple');
        expect(candle.message).toBe('New Candle');
        expect(candle.addon[0].addonType).toEqual('none')
        expect(candle.addon[0].addonData).toEqual('none');
        expect(candle.likes).toBe(0);
        expect(candle.shares).toBe(0);
        expect(candle.expireAt.toISOString().split('T')[0]).toBe(expectedExpireAt.toISOString().split('T')[0]);

    });

    it('should create a new candle with addon extradays and return success true', async () => {

        const response = await request(app)
            .post('/api/candles/create-candle')
            .set('Authorization', `Basic ${apiCredentials}`)
            .send({
                candleType: 'simple',
                message: 'New Candle with addon',
                addon: [{
                    addonType: 'extraDays',
                    addonData: '2'
                }]
            });

        const expectedExpireAt = new Date()
        expectedExpireAt.setDate(expectedExpireAt.getDate() + 3); //1 + 2 addon days

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true });

        const candle = await Candle.findOne({ message: 'New Candle with addon' });
        expect(candle).not.toBeNull();
        expect(candle.uid).toBeDefined();
        expect(candle.candleType).toBe('simple');
        expect(candle.message).toBe('New Candle with addon');
        expect(candle.addon[0].addonType).toEqual('extraDays')
        expect(candle.addon[0].addonData).toEqual('2');
        expect(candle.likes).toBe(0);
        expect(candle.shares).toBe(0);
        expect(candle.expireAt.toISOString().split('T')[0]).toBe(expectedExpireAt.toISOString().split('T')[0]);

    });

    it('should create a new complex candle with addon extradays and return success true', async () => {

        const response = await request(app)
            .post('/api/candles/create-candle')
            .set('Authorization', `Basic ${apiCredentials}`)
            .send({
                candleType: 'week',
                message: 'New week Candle with addon',
                addon: [{
                    addonType: 'extraDays',
                    addonData: '3'
                }]
            });

        const expectedExpireAt = new Date()
        expectedExpireAt.setDate(expectedExpireAt.getDate() + 10); //7 week + 3 addon days

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true });

        const candle = await Candle.findOne({ message: 'New week Candle with addon' });
        expect(candle).not.toBeNull();
        expect(candle.uid).toBeDefined();
        expect(candle.candleType).toBe('week');
        expect(candle.message).toBe('New week Candle with addon');
        expect(candle.addon[0].addonType).toEqual('extraDays')
        expect(candle.addon[0].addonData).toEqual('3');
        expect(candle.likes).toBe(0);
        expect(candle.shares).toBe(0);
        expect(candle.expireAt.toISOString().split('T')[0]).toBe(expectedExpireAt.toISOString().split('T')[0]);

    });

    it('try to create a new candle without required field and return success false', async () => {

        const response = await request(app)
            .post('/api/candles/create-candle')
            .set('Authorization', `Basic ${apiCredentials}`)
            .send({
                candleType: undefined,
                message: 'Error Candle',
                addon: []
            });

        const expectedExpireAt = new Date()
        expectedExpireAt.setDate(expectedExpireAt.getDate() + 1);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ success: false, error: 'Invalid candle data' });

        const candle = await Candle.findOne({ message: 'Error Candle' });
        expect(candle).toBeNull();

    });

    it('try to create a new candle with invalid candle type and return success false', async () => {

        const response = await request(app)
            .post('/api/candles/create-candle')
            .set('Authorization', `Basic ${apiCredentials}`)
            .send({
                candleType: 'invalidType',
                message: 'Error Candle',
                addon: []
            });

        const expectedExpireAt = new Date()
        expectedExpireAt.setDate(expectedExpireAt.getDate() + 1);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ success: false, error: 'Invalid candle type' });

        const candle = await Candle.findOne({ message: 'Error Candle' });
        expect(candle).toBeNull();

    });

    it('try to create a new candle with invalid addon type and return success false', async () => {

        const response = await request(app)
            .post('/api/candles/create-candle')
            .set('Authorization', `Basic ${apiCredentials}`)
            .send({
                candleType: 'simple',
                message: 'Error Candle',
                addon: [{
                    addonType: 'invalidAddon',
                    addonData: '3'
                }]
            });

        const expectedExpireAt = new Date()
        expectedExpireAt.setDate(expectedExpireAt.getDate() + 1);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ success: false, error: 'Invalid candle addon' });

        const candle = await Candle.findOne({ message: 'Error Candle' });
        expect(candle).toBeNull();

    });

});