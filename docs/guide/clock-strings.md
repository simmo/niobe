---
description: Read and write clock strings such as '01:30:00' with clockToMs and msToClock.
---

# Clock strings

Clock strings show a duration the way a stopwatch does: `hh:mm:ss`, optionally followed by a fraction of a second.

## Reading

`clockToMs` turns a clock string into milliseconds. Hours and minutes are optional, and leading zeros are too:

```ts twoslash
import { clockToMs } from 'niobe';
// ---cut---
clockToMs('10');
// => 10_000

clockToMs('01:10');
// => 70_000

clockToMs('01:01:01');
// => 3_661_000

clockToMs('-00:30');
// => -30_000
```

### Fractions of a second

After a `.`, the fraction holds milliseconds, microseconds and nanoseconds, in that order (`.ms_μs_ns`). Separate them with underscores, or pad each to three digits:

```ts twoslash
import { clockToMs } from 'niobe';
// ---cut---
clockToMs('01:01:01.5');
// => 3_661_500

clockToMs('01:01:01.500_000_005');
// => 3_661_500.000_005

clockToMs('01:01:01.500000005');
// => 3_661_500.000_005
```

## Writing

`msToClock` formats milliseconds as `hh:mm:ss`, adding the fraction only when there is one:

```ts twoslash
import { msToClock } from 'niobe';
// ---cut---
msToClock(7_501_000);
// => '02:05:01'

msToClock(7_501_500);
// => '02:05:01.500'

msToClock(-7_501_500);
// => '-02:05:01.500'
```

Microseconds and nanoseconds are separated with underscores. Set `separateDecimal` to `false` to leave them out:

```ts twoslash
import { msToClock } from 'niobe';
// ---cut---
msToClock(3_661_500.000_005);
// => '01:01:01.500_000_005'

msToClock(3_661_500.000_005, { separateDecimal: false });
// => '01:01:01.500000005'
```

::: warning Days aren't included
The hours in `msToClock`'s output only count up to 23: days and weeks are left out, so `msToClock(days(2))` returns `'00:00:00'`. Use [`msToParts`](./parts) for longer durations.
:::
