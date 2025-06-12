import { Parts } from './interfaces/Parts.js';
import { UnitConverter } from './utils/createUnitConverter.js';
import { floatOperation } from './utils/floatOperation.js';
import { partToConverterMap } from './utils/partToConverterMap.js';

/**
 * Converts a Parts object to duration in milliseconds.
 *
 * @param parts An partial object with properties for each time unit
 * @returns The duration in milliseconds
 */

export const partsToMs = ({
	isNegative = false,
	...parts
}: Partial<Parts>): number => {
	const convertedValues = Object.entries(parts).reduce<number[]>(
		(acc, [key, value]) => {
			if (typeof value === 'number' && !isNaN(value) && value >= 0) {
				const unitConverter: UnitConverter | undefined =
					partToConverterMap[key as keyof typeof partToConverterMap];

				if (unitConverter) acc.push(unitConverter(value));
			}

			return acc;
		},
		[],
	);

	const result = floatOperation(
		convertedValues,
		(values, factor) => values.reduce((sum, value) => sum + value, 0) / factor,
	);

	return isNegative ? -result : result;
};
