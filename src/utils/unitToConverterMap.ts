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
import { TimeUnit } from '../types/TimeUnit.js';
import { UnitConverter } from './createUnitConverter.js';

export const unitToConverterMap = {
	ns: nanoseconds,
	μs: microseconds,
	ms: milliseconds,
	s: seconds,
	m: minutes,
	h: hours,
	d: days,
	w: weeks,
} as const satisfies Record<TimeUnit, UnitConverter>;
