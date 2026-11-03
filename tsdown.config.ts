import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['./src/index.ts'],
	format: 'esm',
	// No Node APIs are used, so the build stays usable in browsers and other runtimes.
	platform: 'neutral',
	// The library's own config: no Node or DOM types (see `src/tsconfig.json`).
	tsconfig: './src/tsconfig.json',
	// Declaration maps would point into `src`, which isn't published.
	dts: { sourcemap: false },
	// The JS map embeds the source, so stack traces stay readable without `src`.
	sourcemap: true,
	// Keep `.js` / `.d.ts` (the package is `"type": "module"`), matching `exports`.
	fixedExtension: false,
});
