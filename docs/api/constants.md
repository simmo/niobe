---
description: Reference for every constant, including unit lengths in milliseconds, and how many of each unit fit in the next.
---

# Constants

See [Constants](/guide/constants) for examples.

## Unit lengths

The length of one unit, in milliseconds.

### `NANOSECOND`

```ts
const NANOSECOND = 0.000_001;
```

One nanosecond in milliseconds.

### `MICROSECOND`

```ts
const MICROSECOND = 0.001;
```

One microsecond in milliseconds.

### `MILLISECOND`

```ts
const MILLISECOND = 1;
```

One millisecond. See the [FAQ](/guide/faq#why-is-there-a-milliseconds-converter).

### `SECOND`

```ts
const SECOND = 1_000;
```

One second in milliseconds.

### `MINUTE`

```ts
const MINUTE = 60_000;
```

One minute in milliseconds.

### `HOUR`

```ts
const HOUR = 3_600_000;
```

One hour in milliseconds.

### `DAY`

```ts
const DAY = 86_400_000;
```

One day in milliseconds.

### `WEEK`

```ts
const WEEK = 604_800_000;
```

One week in milliseconds.

## Units per unit

How many of one unit fit in the next one up.

### `NANOSECONDS_IN_MICROSECOND`

```ts
const NANOSECONDS_IN_MICROSECOND = 1_000;
```

Nanoseconds in a microsecond.

### `MICROSECONDS_IN_MILLISECOND`

```ts
const MICROSECONDS_IN_MILLISECOND = 1_000;
```

Microseconds in a millisecond.

### `MILLISECONDS_IN_SECOND`

```ts
const MILLISECONDS_IN_SECOND = 1_000;
```

Milliseconds in a second.

### `SECONDS_IN_MINUTE`

```ts
const SECONDS_IN_MINUTE = 60;
```

Seconds in a minute.

### `MINUTES_IN_HOUR`

```ts
const MINUTES_IN_HOUR = 60;
```

Minutes in an hour.

### `HOURS_IN_DAY`

```ts
const HOURS_IN_DAY = 24;
```

Hours in a day.

### `DAYS_IN_WEEK`

```ts
const DAYS_IN_WEEK = 7;
```

Days in a week.
