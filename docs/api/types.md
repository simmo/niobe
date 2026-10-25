---
description: Reference for the Parts and TimeUnit types.
---

# Types

## `Parts`

```ts
interface Parts {
	weeks: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	microseconds: number;
	nanoseconds: number;
	isNegative: boolean;
}
```

A duration split into units, as returned by [`msToParts`](./utilities#mstoparts) and accepted (partially) by [`partsToMs`](./utilities#partstoms). Each unit is a whole number, and `isNegative` is `true` for a negative duration.

## `TimeUnit`

```ts
type TimeUnit = 'ns' | 'μs' | 'ms' | 's' | 'm' | 'h' | 'd' | 'w';
```

The units [`parseDuration`](./utilities#parseduration) understands: nanoseconds, microseconds, milliseconds, seconds, minutes, hours, days and weeks.
