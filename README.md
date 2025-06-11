<br/>

<picture>
	<source media="(prefers-color-scheme: dark)" srcset="./.github/assets/logo-dark.svg">
	<img alt="Niobe logo" src="./.github/assets/logo-light.svg" width="150">
</picture>

<small>A simple way to manage time-based intervals in your applications.</small>

[![npm (latest)](https://img.shields.io/npm/v/niobe/latest?color=00b894&label=latest&style=flat)](https://www.npmjs.com/package/niobe) [![npm (beta)](https://img.shields.io/npm/v/niobe/beta?color=0984e3&label=beta&style=flat)](https://www.npmjs.com/package/niobe?activeTab=versions) [![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/simmo/niobe/ci.yml?style=flat)](https://github.com/simmo/niobe/actions/workflows/ci.yml)

---

## The Problem

How often do you write code like this?

```ts
setTimeout(() => /* Do something */, 1_000 * 60 * 2.5);
```

It is hard to understand what `1_000 * 60 * 2.5` means at first glance, although we get used to seeing common durations in our projects, there is an additional cognitive load when reading and writing code like this. The alternative is to create constants but when you have multiple engineers working on a project, it can be hard to keep track of what is in use, you get different naming conventions and you may end up with multiple constants for the same thing.

## The Solution

**Niobe** provides a simple, unified, human readable way to provide durations. The same duration can be expressed as:

```ts
import { minutes, seconds } from 'niobe';

setTimeout(() => /* Do something */}, minutes(2) + seconds(30));
```

Additionally, Niobe provides [utilities](#utilities) to parse durations, split them into their components and [convert](#conversion) between different time units. There is even a range of common [constants](#constants).

---

## Installation

```bash
npm i niobe
```

## API

### Conversion

#### `weeks(amount: number): number`

Converts between weeks and milliseconds.

#### `days(amount: number): number`

Converts between days and milliseconds.

#### `hours(amount: number): number`

Converts between hours and milliseconds.

#### `minutes(amount: number): number`

Converts between minutes and milliseconds.

#### `seconds(amount: number): number`

Converts between seconds and milliseconds.

#### `milliseconds(amount: number): number`

Converts between milliseconds and milliseconds.

_[This seems pointless, why is it here?](#this-seems-pointless-why-is-it-here)_

#### `weeks.from(ms: number): number`

Converts between milliseconds and weeks.

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

_[This seems pointless, why is it here?](#this-seems-pointless-why-is-it-here)_

### Utilities

#### `parseDuration(duration: string, strict: boolean = false): number`

Parses a duration string, returning milliseconds.

##### Usage

###### Valid formats

```ts
parseDuration('2m 1s');
// => 121_000

parseDuration('1h 2m 3s');
// => 3_723_004

parseDuration('1d 2h 3m 4s 5ms 6μs 7ns');
// => 93_784_005.006_007
```

###### Invalid format - Non-strict (Default)

```ts
parseDuration('invalid');
// => 0

parseDuration('invalid', false);
// => 0
```

###### Invalid format - Strict

```ts
parseDuration('invalid', true);
// => throws Error: "invalid" is not a valid duration
```

#### `msToParts(milliseconds: number): Parts`

Converts a duration in milliseconds to a [Parts](#parts) object with properties for each time unit.

### Types

#### `Parts`

Used in the [`msToParts`](#mstopartsmilliseconds-number-parts) function, this type represents the parts of a duration.

```ts
interface Parts {
	days: number;
	hours: number;
	isNegative: boolean;
	nanoseconds: number;
	microseconds: number;
	milliseconds: number;
	minutes: number;
	seconds: number;
	weeks: number;
}
```

### Constants

These constants are used to represent the number of milliseconds in each time unit.

#### `NANOSECOND`

One nanosecond in milliseconds.

#### `MICROSECOND`

One microsecond in milliseconds.

#### `MILLISECOND`

One millisecond.

_[This seems pointless, why is it here?](#this-seems-pointless-why-is-it-here)_

#### `SECOND`

One second in milliseconds.

#### `MINUTE`

One minute in milliseconds.

#### `HOUR`

One hour in milliseconds.

#### `DAY`

One day in milliseconds.

#### `WEEK`

One week in milliseconds.

#### `NANOSECONDS_IN_MICROSECOND`

Number of nanoseconds in a second.

#### `MICROSECONDS_IN_MILLISECOND`

Number of microseconds in a second.

#### `MILLISECONDS_IN_SECOND`

Number of milliseconds in a second.

#### `SECONDS_IN_MINUTE`

Number of seconds in a minute.

#### `MINUTES_IN_HOUR`

Number of minutes in an hour.

#### `HOURS_IN_DAY`

Number of hours in a day.

#### `DAYS_IN_WEEK`

Number of days in a week.

---

## FAQs

<details>
<summary id="why-niobe">
Why is it called Niobe?
</summary>
Naming things is hard! Most package names are taken so my approach is often something random. In this instance Niobe is a reference to a character in the Matrix films.
</details>

<details>
<summary id="this-seems-pointless-why-is-it-here">
"This seems pointless, why is it here?"
</summary>
There are several components in the API that are no-ops, meaning they don't actually do anything. For example, the `milliseconds` function simply returns the input value. This is included for completeness and to match the other functions, but is not typically used in practice, as milliseconds are already in milliseconds. However, it can be useful for consistency in the API or maybe you need to do something where you conditionally switch between functions.
</details>

---

<small>© 2025 [Mike Simmonds](https://mike.id)</small>
