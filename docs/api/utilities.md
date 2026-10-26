---
description: Reference for parseDuration, clockToMs, msToClock, msToParts and partsToMs.
---

# Utilities

## `parseDuration`

```ts
parseDuration(duration: string, strict?: boolean): number
```

Parses a duration string such as `'1h 30m'` and returns milliseconds. See [Duration strings](/guide/duration-strings) for the format.

| Parameter  | Type      | Default | Description                                                       |
| ---------- | --------- | ------- | ----------------------------------------------------------------- |
| `duration` | `string`  |         | The string to parse.                                              |
| `strict`   | `boolean` | `false` | Throw an `Error` for an invalid string, instead of returning `0`. |

## `clockToMs`

```ts
clockToMs(clock: string): number
```

Converts a clock string in the format `hh:mm:ss.ms_μs_ns` to milliseconds. Only the seconds are required. Prefix it with `-` for a negative duration. See [Clock strings](/guide/clock-strings).

| Part | Meaning      | Notes                           |
| ---- | ------------ | ------------------------------- |
| `hh` | Hours        | Optional; leading zero optional |
| `mm` | Minutes      | Optional; leading zero optional |
| `ss` | Seconds      | Required; leading zero optional |
| `ms` | Milliseconds | Optional                        |
| `μs` | Microseconds | Optional                        |
| `ns` | Nanoseconds  | Optional                        |

Separate milliseconds, microseconds and nanoseconds with underscores, or pad each to three digits.

## `msToClock`

```ts
msToClock(ms: number, options?: { separateDecimal?: boolean }): string
```

Formats milliseconds as `hh:mm:ss`, adding `.ms_μs_ns` when there's a fraction of a second. Negative durations start with `-`. See [Clock strings](/guide/clock-strings).

| Option            | Type      | Default | Description                                                                 |
| ----------------- | --------- | ------- | --------------------------------------------------------------------------- |
| `separateDecimal` | `boolean` | `true`  | Separate milliseconds, microseconds and nanoseconds with underscores (`_`). |

Days and weeks aren't included: the hours wrap after 23.

## `msToParts`

```ts
msToParts(ms: number): Parts
```

Splits milliseconds into a [`Parts`](./types#parts) object, with what's left of each unit after the larger ones. See [Parts](/guide/parts).

## `partsToMs`

```ts
partsToMs(parts: Partial<Parts>): number
```

Joins a [`Parts`](./types#parts) object into milliseconds. Every property is optional, and `isNegative` defaults to `false`. See [Parts](/guide/parts).
