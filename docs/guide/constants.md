---
description: Constants for the length of each time unit, and for how many of one unit fit in the next.
---

# Constants

When you need a fixed value rather than a function call, Niobe exports constants. There are two kinds.

## Unit lengths

The length of one unit, in milliseconds: `NANOSECOND`, `MICROSECOND`, `MILLISECOND`, `SECOND`, `MINUTE`, `HOUR`, `DAY` and `WEEK`.

```ts twoslash
import { HOUR, MINUTE } from 'niobe';
// ---cut---
const cacheFor = 6 * HOUR;
// => 21_600_000

const retryAfter = MINUTE / 2;
// => 30_000
```

## Units per unit

How many of one unit fit in the next one up: `NANOSECONDS_IN_MICROSECOND`, `MICROSECONDS_IN_MILLISECOND`, `MILLISECONDS_IN_SECOND`, `SECONDS_IN_MINUTE`, `MINUTES_IN_HOUR`, `HOURS_IN_DAY` and `DAYS_IN_WEEK`.

```ts twoslash
import { MINUTES_IN_HOUR, SECONDS_IN_MINUTE } from 'niobe';
// ---cut---
const secondsInHour = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
// => 3_600
```

The [API reference](/api/constants) lists every value.
