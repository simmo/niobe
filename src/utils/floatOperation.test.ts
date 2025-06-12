import { describe, expect, it } from 'vitest';
import { floatOperation } from './floatOperation.js';

describe('floatOperation()', () => {
	it('return normalised values and factor from input floats', () => {
		const value = floatOperation([0.000_005, 0.000_001], (values, factor) => {
			expect(values).toStrictEqual([5, 1]);
			expect(factor).toBe(1_000_000);

			return values[0] / values[1];
		});

		expect(value).toStrictEqual(5);
	});
});
