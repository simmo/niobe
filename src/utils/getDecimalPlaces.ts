import { DECIMAL_SEPARATOR } from '../constants/DecimalSeparator.js';

export const getDecimalPlaces = (number: number): number => {
	const str = number.toExponential(); // handles cases like 1e-7
	const match = str.match(/e-(\d+)/);
	const decimalPart =
		number.toString().split(DECIMAL_SEPARATOR).at(1)?.length || 0;

	if (match) return Math.max(parseInt(match[1], 10), decimalPart);

	return Math.min(7, decimalPart);
};
