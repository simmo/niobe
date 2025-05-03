import { describe, expect, it } from 'vitest';
import { createUnitConverter } from './createUnitConverter.js';

describe('createUnitConverter()', () => {
	it('returns a function that provides the number of milliseconds of a given input', () => {
		const fn = createUnitConverter(1000);

		expect(fn(1)).toBe(1000);
		expect(fn(2)).toBe(2000);
		expect(fn(3)).toBe(3000);
	});

	it('returns a method that provides the number of units from a given input', () => {
		const fn = createUnitConverter(1000);

		expect(fn.from(1_000)).toBe(1);
		expect(fn.from(2_000)).toBe(2);
		expect(fn.from(3_000)).toBe(3);
	});
});
