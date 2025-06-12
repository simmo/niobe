import { describe, expect, it } from 'vitest';
import {
	days,
	hours,
	microseconds,
	milliseconds,
	minutes,
	nanoseconds,
	seconds,
	weeks,
} from './conversion.js';
import { UnitConverter } from './utils/createUnitConverter.js';

const testCases: [
	unit: string,
	fn: UnitConverter,
	inputs: [amount: number, ms: number][],
][] = [
	[
		'nanoseconds',
		nanoseconds,
		[
			[1, 0.000_001],
			[2, 0.000_002],
			[3, 0.000_003],
			[5, 0.000_005],
			[8, 0.000_008],
		],
	],
	[
		'microseconds',
		microseconds,
		[
			[1, 0.001],
			[2, 0.002],
			[3, 0.003],
			[5, 0.005],
			[8, 0.008],
		],
	],
	[
		'milliseconds',
		milliseconds,
		[
			[1, 1],
			[2, 2],
			[3, 3],
			[5, 5],
			[8, 8],
		],
	],
	[
		'seconds',
		seconds,
		[
			[1, 1_000],
			[2, 2_000],
			[3, 3_000],
			[5, 5_000],
			[8, 8_000],
		],
	],
	[
		'minutes',
		minutes,
		[
			[1, 60_000],
			[2, 120_000],
			[3, 180_000],
			[5, 300_000],
			[8, 480_000],
		],
	],
	[
		'hours',
		hours,
		[
			[1, 3_600_000],
			[2, 7_200_000],
			[3, 10_800_000],
			[5, 18_000_000],
			[8, 28_800_000],
		],
	],
	[
		'days',
		days,
		[
			[1, 86_400_000],
			[2, 172_800_000],
			[3, 259_200_000],
			[5, 432_000_000],
			[8, 691_200_000],
		],
	],
	[
		'weeks',
		weeks,
		[
			[1, 604_800_000],
			[2, 1_209_600_000],
			[3, 1_814_400_000],
			[5, 3_024_000_000],
			[8, 4_838_400_000],
		],
	],
];

describe('conversion', () => {
	it.each(testCases)('returns milliseconds from %s', (_, fn, inputs) => {
		inputs.forEach(([amount, milliseconds]) => {
			expect(fn(amount), `${amount} >>> ${milliseconds}ms`).toBe(milliseconds);
		});
	});

	it.each(testCases)('returns %s from milliseconds', (_, fn, inputs) => {
		inputs.forEach(([amount, milliseconds]) => {
			expect(fn.from(milliseconds), `${milliseconds}ms >>> ${amount}`).toBe(
				amount,
			);
		});
	});
});
