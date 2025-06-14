export const padLeadingZero = (value: number, length: number): string =>
	String(value).padStart(length, '0');
