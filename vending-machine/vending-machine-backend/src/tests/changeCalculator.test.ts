import { calculateChange } from '../../src/utils/changeCalculator';

describe('Change Calculator', () => {
    it('returns 0 for exact match', () => {
        expect(calculateChange(20, 20)).toBe(0);
    });

    it('returns correct numeric change when change is needed', () => {
        expect(calculateChange(50, 30)).toBe(20);
        expect(calculateChange(100, 45)).toBe(55);
    });

    it('returns correct numeric change for other values', () => {
        expect(calculateChange(100, 60)).toBe(40);
    });

    it('returns full cash when price is 0', () => {
        expect(calculateChange(50, 0)).toBe(50);
    });
});
