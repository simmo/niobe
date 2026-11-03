import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.test.ts'],
			reporter: ['text'],
			// Every line, statement, function and branch in `src` must be tested.
			thresholds: { 100: true },
		},
		projects: [
			{
				extends: true,
				test: {
					name: 'unit',
					include: ['src/**/*.test.ts'],
					typecheck: { enabled: true, include: ['src/**/*.test.ts'] },
				},
			},
			{
				// Tests the built package in `dist`, so run `npm run build` first.
				extends: true,
				test: { name: 'package', include: ['test/**/*.test.ts'] },
			},
		],
	},
});
