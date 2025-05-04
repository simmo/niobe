import { DAY, HOUR, MILLISECOND, MINUTE, SECOND } from './constant.js';
import { createUnitConverter } from './utils/createUnitConverter.js';

/**
 * Converts between of days and milliseconds.
 */

export const days = createUnitConverter(DAY);

/**
 * Converts between hours and milliseconds.
 */

export const hours = createUnitConverter(HOUR);

/**
 * Converts between hours and milliseconds.
 */

export const minutes = createUnitConverter(MINUTE);

/**
 * Converts between hours and milliseconds.
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
