import { describe, expect, it, test } from 'vitest';
import { parseDuration } from './parseDuration.js';

const createAllPossibleOptions = (parts: string[]): string[] => {
	const results: string[] = [];

	const helper = (index: number, current: string) => {
		if (index === parts.length) {
			results.push(current);
			return;
		}

		const nextIndex = index + 1;
		const part = parts[index];

		helper(nextIndex, current + part);
		helper(nextIndex, current + ' ' + part);
	};

	if (parts.length > 0) helper(1, parts[0]);

	return results;
};

const testCases: [string[], number][] = [
	[['1s', '2ms'], 1_002],
	[['1m', '2s', '3ms'], 62_003],
	[['1h', '2m', '3s', '4ms'], 3_723_004],
	[['1d', '2h', '3m', '4s', '5ms'], 93_784_005],
];

describe('parseDuration()', () => {
	it('parses a single time unit', () => {
		expect(parseDuration('1s')).toBe(1_000);
		expect(parseDuration('1m')).toBe(60_000);
		expect(parseDuration('1h')).toBe(3_600_000);
		expect(parseDuration('1d')).toBe(86_400_000);
		expect(parseDuration('1ms')).toBe(1);
	});

	it.each([
		['ordered', testCases],
		[
			'unordered',
			testCases.map<[string[], number]>(([parts, expected]) => [
				parts.reverse(),
				expected,
			]),
		],
	])('parses multiple %s time units with mixed spacing', (_, cases) => {
		cases.forEach(([parts, expected]) => {
			const inputs = createAllPossibleOptions(parts);

			inputs.forEach(input => {
				expect(parseDuration(input), `${input}`).toBe(expected);
			});
		});
	});

	it('returns 0 for an invalid format when not strict', () => {
		expect(parseDuration('1x')).toBe(0);
	});

	it('throws and error an invalid format when strict', () => {
		expect(() => parseDuration('1x', true)).toThrowErrorMatchingInlineSnapshot(
			`[Error: "1x" is not a valid duration]`,
		);
	});
});
