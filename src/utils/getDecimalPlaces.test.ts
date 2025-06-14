import { describe, expect, it } from 'vitest';
import { getDecimalPlaces } from './getDecimalPlaces.js';

describe('getDecimalPlaces()', () => {
	it('returns the number of decimal places in a number', () => {
		expect(getDecimalPlaces(1.23)).toBe(2);
		expect(getDecimalPlaces(1.2345)).toBe(4);
		expect(getDecimalPlaces(1)).toBe(0);
		expect(getDecimalPlaces(0.001)).toBe(3);
		expect(getDecimalPlaces(1e-7)).toBe(7);
		expect(getDecimalPlaces(1234567890.123456789)).toBe(7);
	});
});
