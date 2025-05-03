import { describe, expect, it } from 'vitest';
import { toParts } from './toParts.js';

describe('toParts()', () => {
	it('returns the correct parts for a positive duration', () => {
		const result = toParts(421_006_500);

		expect(result).toEqual({
			days: 4,
			hours: 20,
			isNegative: false,
			milliseconds: 500,
			minutes: 56,
			seconds: 46,
		});
	});

	it('returns the correct parts for a negative duration', () => {
		const result = toParts(-421_006_500);

		expect(result).toEqual({
			days: 4,
			hours: 20,
			isNegative: true,
			milliseconds: 500,
			minutes: 56,
			seconds: 46,
		});
	});
});
