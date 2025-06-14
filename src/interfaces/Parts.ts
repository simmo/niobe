/**
 * This interface represents the parts of a duration.
 */

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
