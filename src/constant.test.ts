import { describe, expect, it } from 'vitest';
import * as constants from './constant.js';

const constantsAndValues: [
	constant: keyof typeof constants,
	expected: number,
][] = [
	['DAY', 86_400_000],
	['DAYS_IN_WEEK', 7],
	['HOUR', 3_600_000],
	['HOURS_IN_DAY', 24],
	['MICROSECOND', 0.001],
	['MICROSECONDS_IN_MILLISECOND', 1_000],
	['MILLISECOND', 1],
	['MILLISECONDS_IN_SECOND', 1_000],
	['MINUTE', 60_000],
	['MINUTES_IN_HOUR', 60],
	['NANOSECOND', 0.000_001],
	['NANOSECONDS_IN_MICROSECOND', 1_000],
	['SECOND', 1_000],
	['SECONDS_IN_MINUTE', 60],
	['WEEK', 604_800_000],
];

describe('constants', () => {
	it('exports the correct values', () => {
		expect(constants).toMatchInlineSnapshot(`
			{
			  "DAY": 86400000,
			  "DAYS_IN_WEEK": 7,
			  "HOUR": 3600000,
			  "HOURS_IN_DAY": 24,
			  "MICROSECOND": 0.001,
			  "MICROSECONDS_IN_MILLISECOND": 1000,
			  "MILLISECOND": 1,
			  "MILLISECONDS_IN_SECOND": 1000,
			  "MINUTE": 60000,
			  "MINUTES_IN_HOUR": 60,
			  "NANOSECOND": 0.000001,
			  "NANOSECONDS_IN_MICROSECOND": 1000,
			  "SECOND": 1000,
			  "SECONDS_IN_MINUTE": 60,
			  "WEEK": 604800000,
			}
		`);
	});
});
