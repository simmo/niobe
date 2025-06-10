import {
	DAY,
	HOUR,
	MICROSECOND,
	MILLISECOND,
	MINUTE,
	NANOSECOND,
	SECOND,
	WEEK,
} from './constant.js';
import { createUnitConverter } from './utils/createUnitConverter.js';

/**
 * Converts between of weeks and milliseconds.
 */

export const weeks = createUnitConverter(WEEK);

/**
 * Converts between of days and milliseconds.
 */

export const days = createUnitConverter(DAY);

/**
 * Converts between hours and milliseconds.
 */

export const hours = createUnitConverter(HOUR);

/**
 * Converts between minutes and milliseconds.
 */

export const minutes = createUnitConverter(MINUTE);

/**
 * Converts between seconds and milliseconds.
 */

export const seconds = createUnitConverter(SECOND);

/**
 * Converts between milliseconds and milliseconds.
 *
 * @remarks
 * This is a no-op function that simply returns the input value.
 * It is included for completeness and to match the other functions and not typically used in practice, as milliseconds are already in milliseconds.
 * However, it can be useful for consistency in the API.
 */

export const milliseconds = createUnitConverter(MILLISECOND);

/**
 * Converts between microseconds and milliseconds.
 */

export const microseconds = createUnitConverter(MICROSECOND);

/**
 * Converts between nanoseconds and milliseconds.
 */

export const nanoseconds = createUnitConverter(NANOSECOND);
