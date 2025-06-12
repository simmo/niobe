import { Parts } from '../types.js';
import { UnitConverter } from './createUnitConverter.js';
import {
	days,
	hours,
	microseconds,
	milliseconds,
	minutes,
	nanoseconds,
	seconds,
	weeks,
} from '../conversion.js';

export const partToConverterMap = {
	nanoseconds,
	microseconds,
	milliseconds,
	seconds,
	minutes,
	hours,
	days,
	weeks,
} as const satisfies {
	[K in keyof Parts as Parts[K] extends number ? K : never]: UnitConverter;
};
