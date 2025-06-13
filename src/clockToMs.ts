import {
	hours,
	microseconds,
	milliseconds,
	minutes,
	nanoseconds,
	seconds,
} from './conversion.js';

/**
 * Converts a `hh:mm:ss.ms_μs_ns` string to milliseconds.
 *
 * - `hh` - Hours - Optional, optional leading zero
 * - `mm` - Minutes - Optional, optional leading zero
 * - `ss` - Seconds - Required, optional leading zero
 * - `ms` - Milliseconds - Optional, optional trailing zeros
 * - `μs` - Microseconds - Optional, optional trailing zeros
 * - `ns` - Nanoseconds - Optional, optional trailing zeros
 * 
 * Milliseconds, microseconds, and nanoseconds can be optionally separated by underscores, if not, you must provide padding.
 *
 * @example Seconds
 * ```ts
 * clockToMs('01:10')
 * // => 70_000
 * ```
 *
 * @example Minutes and seconds
 * ```ts
 * clockToMs('01:10')
 * // => 70_000
 * ```
 *
 * @example Hours, minutes, seconds
 * ```ts
 * clockToMs('01:01:01')
 * // => 3_661_000
 * ```
 *
 * @example Decimal notation with underscores
 * ```ts
 * clockToMs('01:01:01.500_000_005')
 * // => 3_661_500.000_005
 * ```

* @example Decimal notation without underscores
 * ```ts
 * clockToMs('01:01:01.500000005')
 * // => 3_661_500.000_005
 * ```

* @example Negative time
 * ```ts
 * clockToMs('-01:01:01.500000005')
 * // => -3_661_500.000_005
 * ```
 */

export const clockToMs = (clock: string): number => {
	const [time, fraction] = clock.split('.');
	const [timeAbsolute, isNegative] = time.startsWith('-')
		? [time.slice(1), true]
		: [time, false];
	const [s = 0, m = 0, h = 0] = timeAbsolute.split(':').map(Number).reverse();

	let millis = 0;
	let micros = 0;
	let nanos = 0;

	if (fraction) {
		const parts = fraction.split('_');

		if (parts.length === 1) {
			const fractionStr = (parts[0] + '000000000').slice(0, 9);

			millis = parseInt(fractionStr.slice(0, 3), 10);
			micros = parseInt(fractionStr.slice(3, 6), 10);
			nanos = parseInt(fractionStr.slice(6, 9), 10);
		} else {
			if (typeof parts[0] !== 'undefined')
				millis = parseInt(parts[0].padEnd(3, '0'), 10);
			if (typeof parts[1] !== 'undefined')
				micros = parseInt(parts[1].padEnd(3, '0'), 10);
			if (typeof parts[2] !== 'undefined')
				nanos = parseInt(parts[2].padEnd(3, '0'), 10);
		}
	}

	return (
		(hours(h) +
			minutes(m) +
			seconds(s) +
			milliseconds(millis) +
			microseconds(micros) +
			nanoseconds(nanos)) *
		(isNegative ? -1 : 1)
	);
};
