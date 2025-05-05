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
	['MILLISECOND', 1],
	['MILLISECONDS_IN_A_SECOND', 1_000],
	['MINUTE', 60_000],
	['MINUTES_IN_HOUR', 60],
	['SECOND', 1_000],
	['SECONDS_IN_MINUTE', 60],
	['WEEK', 604_800_000],
];

describe.each(constantsAndValues)('%s', (constant, value) => {
	it(`returns ${value}`, _ => {
		expect(constants[constant]).toBe(value);
	});
});
