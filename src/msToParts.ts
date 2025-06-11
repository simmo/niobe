import {
	DAYS_IN_WEEK,
	HOURS_IN_DAY,
	MICROSECONDS_IN_MILLISECOND,
	MILLISECONDS_IN_SECOND,
	MINUTES_IN_HOUR,
	NANOSECONDS_IN_MICROSECOND,
	SECONDS_IN_MINUTE,
} from './constant.js';
import {
	days,
	hours,
	microseconds,
	minutes,
	nanoseconds,
	seconds,
	weeks,
} from './conversion.js';

export interface Parts {
	days: number;
	hours: number;
	isNegative: boolean;
	nanoseconds: number;
	microseconds: number;
	milliseconds: number;
	minutes: number;
	seconds: number;
	weeks: number;
}

/**
 * Converts a duration in milliseconds to an object with properties for each time unit.
 *
 * @param ms The duration in milliseconds to convert
 * @returns An object with properties for each time unit
 */

export const msToParts = (ms: number): Parts => {
	const absoluteMs = Math.abs(ms);

	return {
		days: Math.floor(days.from(absoluteMs) % DAYS_IN_WEEK),
		hours: Math.floor(hours.from(absoluteMs) % HOURS_IN_DAY),
		isNegative: ms < 0,
		nanoseconds: Math.round(
			nanoseconds.from(absoluteMs) % NANOSECONDS_IN_MICROSECOND,
		),
		microseconds: Math.round(
			microseconds.from(absoluteMs) % MICROSECONDS_IN_MILLISECOND,
		),
		milliseconds: Math.round(absoluteMs % MILLISECONDS_IN_SECOND),
		minutes: Math.floor(minutes.from(absoluteMs) % MINUTES_IN_HOUR),
		seconds: Math.floor(seconds.from(absoluteMs) % SECONDS_IN_MINUTE),
		weeks: Math.floor(weeks.from(absoluteMs)),
	};
};
