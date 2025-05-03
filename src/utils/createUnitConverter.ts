export type UnitConverter = {
	/**
	 * Converts the number of units to milliseconds.
	 *
	 * @param amount The number of units
	 * @returns The number of milliseconds
	 */

	(amount: number): number;

	/**
	 * Converts milliseconds to the number of units.
	 *
	 * @param ms The number of milliseconds
	 * @returns The number of units
	 */

	from: (ms: number) => number;
};

/**
 * Creates a unit converter function for a given unit of time.
 *
 * @param unit The number of milliseconds in a single unit
 * @returns UnitConverter function
 * @see {@link UnitConverter}
 */

export const createUnitConverter = (unit: number): UnitConverter => {
	const fn = (amount: number) => amount * unit;

	fn.from = (ms: number) => ms / unit;

	return fn;
};
