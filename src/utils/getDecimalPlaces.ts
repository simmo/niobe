export const getDecimalPlaces = (number: number): number => {
	const str = number.toExponential(); // handles cases like 1e-7
	const match = str.match(/e-(\d+)/);
	const decimalPart = number.toString().split('.').at(1)?.length || 0;

	if (match) {
		const decimals = parseInt(match[1], 10);

		return Math.max(decimals, decimalPart);
	}

	return Math.min(7, decimalPart);
};
