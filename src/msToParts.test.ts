import { describe, expect, it } from 'vitest';
import { msToParts } from './msToParts.js';

describe('msToParts()', () => {
	it('returns the correct parts for a positive duration', () => {
		const result = msToParts(766_606_500);

		expect(result).toEqual({
			days: 1,
			hours: 20,
			isNegative: false,
			microseconds: 0,
			milliseconds: 500,
			minutes: 56,
			nanoseconds: 0,
			seconds: 46,
			weeks: 1,
		});
	});

	it('returns the correct parts for a negative duration', () => {
		const result = msToParts(-766_606_500);

		expect(result).toEqual({
			days: 1,
			hours: 20,
			isNegative: true,
			microseconds: 0,
			milliseconds: 500,
			minutes: 56,
			nanoseconds: 0,
			seconds: 46,
			weeks: 1,
		});
	});

	it('returns the correct parts for a positive duration with decimal places', () => {
		const result = msToParts(766_606_500.003002);

		expect(result).toEqual({
			days: 1,
			hours: 20,
			isNegative: false,
			microseconds: 3,
			milliseconds: 500,
			minutes: 56,
			nanoseconds: 2,
			seconds: 46,
			weeks: 1,
		});
	});

	it('returns the correct parts for a negative duration with decimal places', () => {
		const result = msToParts(-766_606_500.003002);

		expect(result).toEqual({
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
	});
});
