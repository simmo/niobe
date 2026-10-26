---
description: Reference for the unit converters, weeks to nanoseconds, and their from methods.
---

# Conversion

Every converter has the same shape:

```ts
interface UnitConverter {
	(amount: number): number;
	from: (ms: number) => number;
}
```

- Calling it converts an amount of the unit to milliseconds.
- `.from(ms)` converts milliseconds to an amount of the unit.

See [Converting units](/guide/conversion) for examples.

## `weeks`

```ts
weeks(amount: number): number
weeks.from(ms: number): number
```

Converts weeks to milliseconds, and `.from()` converts milliseconds to weeks. One week is `604_800_000` milliseconds.

## `days`

```ts
days(amount: number): number
days.from(ms: number): number
```

Converts days to milliseconds, and `.from()` converts milliseconds to days. One day is `86_400_000` milliseconds.

## `hours`

```ts
hours(amount: number): number
hours.from(ms: number): number
```

Converts hours to milliseconds, and `.from()` converts milliseconds to hours. One hour is `3_600_000` milliseconds.

## `minutes`

```ts
minutes(amount: number): number
minutes.from(ms: number): number
```

Converts minutes to milliseconds, and `.from()` converts milliseconds to minutes. One minute is `60_000` milliseconds.

## `seconds`

```ts
seconds(amount: number): number
seconds.from(ms: number): number
```

Converts seconds to milliseconds, and `.from()` converts milliseconds to seconds. One second is `1_000` milliseconds.

## `milliseconds`

```ts
milliseconds(amount: number): number
milliseconds.from(ms: number): number
```

Returns its input unchanged, in both directions. It exists so every unit works the same way; see the [FAQ](/guide/faq#why-is-there-a-milliseconds-converter).

## `microseconds`

```ts
microseconds(amount: number): number
microseconds.from(ms: number): number
```

Converts microseconds to milliseconds, and `.from()` converts milliseconds to microseconds. One microsecond is `0.001` milliseconds.

## `nanoseconds`

```ts
nanoseconds(amount: number): number
nanoseconds.from(ms: number): number
```

Converts nanoseconds to milliseconds, and `.from()` converts milliseconds to nanoseconds. One nanosecond is `0.000_001` milliseconds.
