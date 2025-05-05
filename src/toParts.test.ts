import { describe, expect, it } from 'vitest';
import { toParts } from './toParts.js';
import { weeks } from './conversion.js';

describe('toParts()', () => {
	it('returns the correct parts for a positive duration', () => {
		const result = toParts(766_606_500);

		expect(result).toEqual({
			days: 1,
			hours: 20,
			isNegative: false,
			milliseconds: 500,
			minutes: 56,
			seconds: 46,
			weeks: 1,
		});
	});

	it('returns the correct parts for a negative duration', () => {
		const result = toParts(-766_606_500);

		expect(result).toEqual({
			days: 1,
			hours: 20,
			isNegative: true,
			milliseconds: 500,
			minutes: 56,
			seconds: 46,
			weeks: 1,
		});
	});
});
