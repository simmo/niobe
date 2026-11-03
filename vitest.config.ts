import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.test.ts'],
			reporter: ['text'],
		},
		projects: [
			{
				extends: true,
				test: { name: 'unit', include: ['src/**/*.test.ts'] },
			},
			{
				// Tests the built package in `dist`, so run `npm run build` first.
				extends: true,
				test: { name: 'package', include: ['test/**/*.test.ts'] },
			},
		],
	},
});
