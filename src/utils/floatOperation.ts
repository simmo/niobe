import { getDecimalPlaces } from './getDecimalPlaces.js';

export const floatOperation = (
	floats: number[],
	operation: (normalised: number[], factor: number) => number,
) => {
	const maxDecimals = Math.max(...floats.map(getDecimalPlaces));
	const factor = Math.pow(10, maxDecimals);

	return operation(
		floats.map(value => Math.round(value * factor)),
		factor,
	);
};
