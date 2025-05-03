// const creationFnsTestCases: [fn: UnitConverter, unit: string, ms: number][] = [
// 	[seconds, 'second', 1_000],
// 	[minutes, 'minute', 60_000],
// 	[hours, 'hour', 3_600_000],
// 	[days, 'day', 86_400_000],
// ];
//
// creationFnsTestCases.forEach(([fn, unit, ms]) => {
// 	describe(`${fn.name}()`, () => {
// 		it.each([1, 2, 3, 5, 8])(
// 			`returns %sx ${fn.name} in milliseconds`,
// 			input => {
// 				expect(fn(input)).toBe(input * ms);
// 			},
// 		);
// 	});

// 	describe(`${fn.name}.from()`, () => {
// 		it.each([1, 2, 3, 5, 8])(
// 			`returns %sx ${fn.name} from milliseconds`,
// 			input => {
// 				expect(fn.from(input * ms)).toBe(input);
// 			},
// 		);
// 	});
// });

import { describe, expect, it } from 'vitest';
import { days, hours, minutes, seconds } from './conversion.js';
import { UnitConverter } from './utils/createUnitConverter.js';

const testCases: [unit: string, fn: UnitConverter, milliseconds: number][] = [
	['seconds', seconds, 1_000],
	['minutes', minutes, 60_000],
	['hours', hours, 3_600_000],
	['days', days, 86_400_000],
];

const testUnitAmounts = [1, 2, 3, 5, 8];

describe('conversion', () => {
	it.each(testCases)('returns milliseconds from %s', (_, fn, milliseconds) => {
		testUnitAmounts.forEach(amount => {
			expect(fn(amount)).toBe(amount * milliseconds);
		});
	});

	it.each(testCases)('returns %s from milliseconds', (_, fn, milliseconds) => {
		testUnitAmounts.forEach(amount => {
			expect(fn.from(amount * milliseconds)).toBe(amount);
		});
	});
});
