---
description: Install Niobe and write your first readable durations.
---

# Getting started

Niobe gives you small functions for writing, converting, parsing and formatting durations. Every duration is a plain number of milliseconds, so it works anywhere a number of milliseconds does: `setTimeout`, `Date` arithmetic, cache lifetimes, rate limits and so on.

## The problem

How often do you write code like this?

```ts
setTimeout(refresh, 1_000 * 60 * 2.5);
```

`1_000 * 60 * 2.5` takes a moment to read, and every project grows its own constants for it, named differently by each person who needs one.

## The solution

With Niobe, the same duration says what it means:

```ts twoslash
import { minutes, seconds } from 'niobe';
declare function refresh(): void;
// ---cut---
setTimeout(refresh, minutes(2) + seconds(30));
```

## Installation

::: code-group

```sh [npm]
npm install niobe
```

```sh [pnpm]
pnpm add niobe
```

```sh [yarn]
yarn add niobe
```

:::

Niobe has no runtime dependencies. It ships ESM and CommonJS builds, with types.

## What's included

- [Converting units](./conversion): `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `microseconds` and `nanoseconds`, each with `.from()` to convert back.
- [Constants](./constants): `MINUTE`, `HOUR`, `SECONDS_IN_MINUTE` and friends.
- [Duration strings](./duration-strings): parse `'1h 30m'` with `parseDuration`.
- [Clock strings](./clock-strings): read and write `'01:30:00'` with `clockToMs` and `msToClock`.
- [Parts](./parts): split a duration into units with `msToParts`, and join them with `partsToMs`.

The [API reference](/api/conversion) lists every export.
