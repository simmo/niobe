import { describe, expect, it } from 'vitest';
import { partsToMs } from './partsToMs.js';

describe('partsToMs()', () => {
	it('returns the correct parts for a positive duration', () => {
		const result = partsToMs({
			days: 1,
			hours: 20,
			milliseconds: 500,
			minutes: 56,
			seconds: 46,
			weeks: 1,
		});

		expect(result).toEqual(766_606_500);
	});

	it('returns the correct parts for a negative duration', () => {
		const result = partsToMs({
			days: 1,
			hours: 20,
			isNegative: true,
			milliseconds: 500,
			minutes: 56,
			seconds: 46,
			weeks: 1,
		});

		expect(result).toEqual(-766_606_500);
	});

	it('returns the correct parts for a positive duration with decimal places', () => {
		const result = partsToMs({
			days: 1,
			hours: 20,
			microseconds: 3,
			milliseconds: 500,
			minutes: 56,
			nanoseconds: 2,
			seconds: 46,
			weeks: 1,
		});

		expect(result).toEqual(766_606_500.003002);
	});

	it('returns the correct parts for a negative duration with decimal places', () => {
		const result = partsToMs({
			days: 1,
			hours: 20,
			isNegative: true,
			microseconds: 3,
			milliseconds: 500,
			minutes: 56,
			nanoseconds: 2,
			seconds: 46,
			weeks: 1,
		});

		expect(result).toEqual(-766_606_500.003002);
	});
});
