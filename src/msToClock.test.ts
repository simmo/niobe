import { describe, expect, it } from 'vitest';

import { msToClock } from './msToClock.js';
import { DECIMAL_UNIT_SEPARATOR } from './constants/DecimalUnitSeparator.js';

const testCases = [
	['00:00:01', 1_000],
	['00:01:01', 61_000],
	['01:01:01', 3_661_000],
	['00:00:01.001', 1_001],
	['00:00:01.500', 1_500],
	['00:00:01.500_400', 1_500.4],
	['00:00:01.500_400_300', 1_500.4003],
	['00:00:01.000_400_300', 1_000.4003],
	['00:00:01.000_000_300', 1_000.0003],
	['00:00:01.001_002_003', 1_001.002003],
	['00:00:01.010_020_030', 1_010.02003],
] as const satisfies [clock: string, Parameters<typeof msToClock>[0]][];

describe('msToClock()', () => {
	describe.each([
		['positive', false],
		['negative', true],
	])('%s time', (_, isNegative) => {
		const [offset, sign] = isNegative ? [-1, '-'] : [1, ''];

		it.each(testCases)(
			`returns ${sign}%s for ${sign}%s`,
			(clock, milliseconds) => {
				const output = msToClock(milliseconds * offset);

				expect(output).toBe(`${sign}${clock}`);
			},
		);

		it.each(testCases)(
			`returns ${sign}%s for ${sign}%s without decimal separators`,
			(clock, milliseconds) => {
				const output = msToClock(milliseconds * offset, {
					separateDecimal: false,
				});

				expect(output).toBe(
					`${sign}${clock.replaceAll(DECIMAL_UNIT_SEPARATOR, '')}`,
				);
			},
		);
	});
});
