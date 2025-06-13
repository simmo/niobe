import { describe, expect, it } from 'vitest';
import { padLeadingZero } from './padLeadingZero.js';

describe('padLeadingZero()', () => {
	it.each([
		['01', 1, 2],
		['10', 10, 2],
		['100', 100, 2],
		['001', 1, 3],
		['010', 10, 3],
		['100', 100, 3],
	])('returns %o when padding %s to length %s', (expected, value, length) => {
		expect(padLeadingZero(value, length)).toBe(expected);
	});
});
