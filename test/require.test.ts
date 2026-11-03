import { createRequire } from 'node:module';

import { describe, expect, test } from 'vitest';

// Types come from `src`: `dist` doesn't exist when `npm run typecheck` runs.
import type * as Niobe from '../src/index';

// Node's own `require()`, not vitest's module loader, so this exercises Node loading the
// ESM build into CommonJS (Node >= 22.12) and resolving `niobe` through `exports`.
const require = createRequire(import.meta.url);

const load = () => require('niobe') as typeof Niobe;

describe("require('niobe')", () => {
	test('loads the built package', () => {
		expect(require.resolve('niobe')).toMatch(/[/\\]dist[/\\]index\.js$/);
		const { MINUTE, minutes } = load();
		expect(typeof minutes).toBe('function');
		expect(MINUTE).toBe(60_000);
	});

	test('runs the helpers', () => {
		const { clockToMs, minutes, msToClock, msToParts, parseDuration, partsToMs } = load();
		expect(minutes(2)).toBe(120_000);
		expect(minutes.from(120_000)).toBe(2);
		expect(msToClock(parseDuration('1h 30m'))).toBe('01:30:00');
		expect(clockToMs('01:30:00')).toBe(5_400_000);
		expect(partsToMs(msToParts(5_400_000))).toBe(5_400_000);
	});
});
