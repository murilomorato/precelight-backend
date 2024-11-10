const { calcInitialExpirationDate } = require('../../src/services/candleExpiration');

describe('calcInitialExpirationDate', () => {
    it('should calculate expiration date correctly for simple type', () => {
        const result = calcInitialExpirationDate({ type: 'simple', addOn: [] });
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + 1);
        expect(result.toDateString()).toBe(expectedDate.toDateString());
    });

    it('should calculate expiration date correctly for treeDays type', () => {
        const result = calcInitialExpirationDate({ type: 'treeDays', addOn: [] });
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + 3);
        expect(result.toDateString()).toBe(expectedDate.toDateString());
    });

    it('should calculate expiration date correctly for week type', () => {
        const result = calcInitialExpirationDate({ type: 'week', addOn: [] });
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + 7);
        expect(result.toDateString()).toBe(expectedDate.toDateString());
    });

    it('should calculate expiration date correctly for month type', () => {
        const result = calcInitialExpirationDate({ type: 'month', addOn: [] });
        const expectedDate = new Date();
        expectedDate.setMonth(expectedDate.getMonth() + 1);
        expect(result.toDateString()).toBe(expectedDate.toDateString());
    });

    it('should add extra days correctly when addOn is provided', () => {
        const result = calcInitialExpirationDate({ type: 'simple', addOn: [{ type: 'extraDays', addonData: '2' }] });
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + 3); // 1 day for 'simple' + 2 extra days
        expect(result.toDateString()).toBe(expectedDate.toDateString());
    });

    it('should throw an error for invalid type', () => {
        expect(() => {
            calcInitialExpirationDate({ type: 'invalidType', addOn: [] });
        }).toThrow('Invalid type');
    });
});