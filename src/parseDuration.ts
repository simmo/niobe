import { days, hours, minutes, seconds } from './conversion.js';
import { UnitConverter } from './utils/createUnitConverter.js';

type TimeUnit = 'ms' | 's' | 'm' | 'h' | 'd';

const unitToConverterMap = {
	ms: null,
	s: seconds,
	m: minutes,
	h: hours,
	d: days,
} satisfies Record<TimeUnit, UnitConverter | null>;

const regex = new RegExp(
	`(\\d+(?:\\.\\d+)?)(${Object.keys(unitToConverterMap).join('|')})`,
	'g',
);

/**
 * Parses a string into a duration, in milliseconds.
 *
 * @param duration String to parse
 * @param strict Indicates whether to disallow invalid formats [Default: `false`]
 * @returns The duration in milliseconds
 * @throws Error if the string is not a valid duration and strict is true
 *
 * @example Valid formats
 * ```ts
 * parseDuration('2m 1s');
 * // => 121_000
 *
 * parseDuration('1h 2m 3s');
 * // => 3_723_004
 *```
 *
 * @example Invalid format - Non-strict
 * ```ts
 * parseDuration('invalid', true);
 * // => 0
 * ```
 *
 * @example Invalid format - Strict
 * ```ts
 * parseDuration('invalid', true);
 * // => throws Error: "invalid" is not a valid duration
 * ```
 */

export const parseDuration = (
	duration: string,
	strict: boolean = false,
): number => {
	let total: number | null = null;
	let match: RegExpExecArray | null;

	while ((match = regex.exec(duration)) !== null) {
		const [, num, unit] = match;
		const fn = unitToConverterMap[unit as TimeUnit];

		if (fn !== undefined) {
			const value = parseFloat(num);

			total ??= 0;
			total += fn === null ? value : fn(value);
		}
	}

	if (total === null && strict)
		throw new Error(`"${duration}" is not a valid duration`);

	return total ?? 0;
};

parseDuration('1s', false); // $ExpectType number
