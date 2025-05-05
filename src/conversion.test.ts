import { describe, expect, it } from 'vitest';
import { days, hours, minutes, seconds, weeks } from './conversion.js';
import { UnitConverter } from './utils/createUnitConverter.js';

const testCases: [unit: string, fn: UnitConverter, milliseconds: number][] = [
	['seconds', seconds, 1_000],
	['minutes', minutes, 60_000],
	['hours', hours, 3_600_000],
	['days', days, 86_400_000],
	['weeks', weeks, 604_800_000],
];

const testUnitAmounts = [1, 2, 3, 5, 8];

describe('conversion', () => {
	it.each(testCases)('returns milliseconds from %s', (_, fn, milliseconds) => {
		testUnitAmounts.forEach(amount => {
			expect(fn(amount)).toBe(amount * milliseconds);
		});
	});

	it.each(testCases)('returns %s from milliseconds', (_, fn, milliseconds) => {
		testUnitAmounts.forEach(amount => {
			expect(fn.from(amount * milliseconds)).toBe(amount);
		});
	});
});
