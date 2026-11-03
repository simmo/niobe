---
description: Reference for the MsToClockOptions, Parts, TimeUnit and UnitConverter types.
---

# Types

## `MsToClockOptions`

```ts
interface MsToClockOptions {
	separateDecimal?: boolean;
}
```

The options for [`msToClock`](./utilities#mstoclock).

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

## `UnitConverter`

```ts
type UnitConverter = {
	(amount: number): number;
	from: (ms: number) => number;
};
```

The type of the [converters](./conversion), such as `minutes`: call one to convert to milliseconds, or use `.from()` to convert back.
