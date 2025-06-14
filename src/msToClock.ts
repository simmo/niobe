import { DECIMAL_SEPARATOR } from './constants/DecimalSeparator.js';
import { DECIMAL_UNIT_SEPARATOR } from './constants/DecimalUnitSeparator.js';
import { HMS_SEPARATOR } from './constants/HmsSeparator.js';
import { msToParts } from './msToParts.js';
import { padLeadingZero } from './utils/padLeadingZero.js';

interface Options {
	separateDecimal?: boolean;
}

/**
 * Converts milliseconds to a string in the format 'hh:mm:ss' optionally suffixing '.ms_μs_ns' if there are any remaining milliseconds, microseconds or nanoseconds.
 *
 * @example
 * ```ts
 * msToClock(7_501_500);
 * // => '02:05:01.500'
 * ```
 *
 * @example
 * ```ts
 * msToClock(-7_501_500);
 * // => '-02:05:01.500'
 * ```
 *
 * @example
 * ```ts
 * msToClock(7_501_000);
 * // => '02:05:01'
 * ```
 */

export const msToClock = (
	ms: number,
	{ separateDecimal = true }: Options = {},
): string => {
	const {
		hours,
		isNegative,
		nanoseconds,
		microseconds,
		milliseconds,
		minutes,
		seconds,
	} = msToParts(ms);
	const time = [hours, minutes, seconds]
		.map(value => padLeadingZero(value, 2))
		.join(HMS_SEPARATOR);

	const decimal = [nanoseconds, microseconds, milliseconds].reduce(
		(acc, value, index) => {
			if (!acc && value === 0) return acc;

			return (
				padLeadingZero(value, 3) +
				(separateDecimal && acc && index !== 0 ? DECIMAL_UNIT_SEPARATOR : '') +
				acc
			);
		},
		'',
	);

	return [`${isNegative ? '-' : ''}${time}`, decimal]
		.filter(Boolean)
		.join(DECIMAL_SEPARATOR);
};
