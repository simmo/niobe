import { type TimeUnit } from './types/TimeUnit.js';
import { unitToConverterMap } from './utils/unitToConverterMap.js';

const regex = new RegExp(
	`(\\d+(?:\\.\\d+)?)(${Object.keys(unitToConverterMap).join('|')})`,
	'g',
);

/**
 * Parses a duration string, returning milliseconds.
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
			total ??= 0;
			total += fn(parseFloat(num));
		}
	}

	if (total === null && strict)
		throw new Error(`"${duration}" is not a valid duration`);

	return total ?? 0;
};
