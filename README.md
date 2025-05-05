<br/>

<div align="center">

<picture>
	<source media="(prefers-color-scheme: dark)" srcset="./.github/assets/logo-dark.svg">
	<img alt="Niobe logo" src="./.github/assets/logo-light.svg" width="100">
</picture>

<small>A simple and elegant way to manage time-based events and intervals in your applications</small>

![npm (latest)](https://img.shields.io/npm/v/niobe/latest?color=00b894&label=latest&style=flat) ![npm (beta)](https://img.shields.io/npm/v/niobe/beta?color=0984e3&label=beta&style=flat) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/simmo/niobe/ci.yml?style=flat)

</div>

---

## Usage

This library provides a set of functions to convert between different time units (milliseconds, seconds, minutes, hours, and days) and to parse durations from strings.

## API

### Conversion

#### `days(amount: number): number`

Converts between of days and milliseconds.

#### `hours(amount: number): number`

Converts between hours and milliseconds.

#### `minutes(amount: number): number`

Converts between minutes and milliseconds.

#### `seconds(amount: number): number`

Converts between seconds and milliseconds.

#### `milliseconds(amount: number): number`

Converts between milliseconds and milliseconds.

> [!NOTE]
> This is a no-op function that simply returns the input value.
> It is included for completeness and to match the other functions and not typically used in practice, as milliseconds are already in milliseconds.
> However, it can be useful for consistency in the API.

#### `days.from(ms: number): number`

Converts between milliseconds and days.

#### `hours.from(ms: number): number`

Converts between milliseconds and hours.

#### `minutes.from(ms: number): number`

Converts between milliseconds and minutes.

#### `seconds.from(ms: number): number`

Converts between milliseconds and seconds.

#### `milliseconds.from(ms: number): number`

Converts between milliseconds and milliseconds.

> [!NOTE]
> This is a no-op function that simply returns the input value.
> It is included for completeness and to match the other functions and not typically used in practice, as milliseconds are already in milliseconds.
> However, it can be useful for consistency in the API.

### Utilities

#### `parseDuration(duration: string, strict: boolean = false): number`

Parses a string into a duration, in milliseconds.

##### Usage

###### Valid formats

```ts
parseDuration('2m 1s');
// => 121_000

parseDuration('1h 2m 3s');
// => 3_723_004
```

###### Invalid format - Non-strict

```ts
parseDuration('invalid', true);
// => 0
```

###### Invalid format - Strict

```ts
parseDuration('invalid', true);
// => throws Error: "invalid" is not a valid duration
```

#### `toParts(milliseconds: number): { days: number, hours: number, minutes: number, seconds: number, milliseconds: number }`

Converts a duration in milliseconds to an object with properties for each time unit.

### Constants

These constants are used to represent the number of milliseconds in each time unit.

#### `MILLISECOND`

One millisecond.

> [!NOTE]
> Added from completeness.

#### `SECOND`

One second in milliseconds.

#### `MINUTE`

One minute in milliseconds.

#### `HOUR`

One hour in milliseconds.

#### `DAY`

One day in milliseconds.

#### `MILLISECONDS_IN_A_SECOND`

Number of milliseconds in a second.

#### `SECONDS_IN_A_MINUTE`

Number of seconds in a minute.

#### `MINUTES_IN_A_HOUR`

Number of minutes in an hour.

#### `HOURS_IN_A_DAY`

Number of hours in a day.
