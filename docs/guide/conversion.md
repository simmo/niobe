---
description: Turn amounts of any time unit into milliseconds, and milliseconds back into any unit.
---

# Converting units

Each time unit has a converter. Call it with an amount to get milliseconds:

```ts twoslash
import { days, hours, minutes, seconds, weeks } from 'niobe';
// ---cut---
minutes(2) + seconds(30);
// => 150_000

hours(1.5);
// => 5_400_000

weeks(2);
// => 1_209_600_000

const expiresAt = Date.now() + days(30);
```

Amounts can be fractional or negative, and converters can be added together for compound durations.

## Converting back

Every converter has a `.from()` method that turns milliseconds back into that unit:

```ts twoslash
import { days, hours, minutes, seconds, weeks } from 'niobe';
// ---cut---
minutes.from(150_000);
// => 2.5

hours.from(5_400_000);
// => 1.5

days.from(weeks(1));
// => 7
```

Combine a converter and `.from()` to convert between any two units.

## Units

| Converter      | One unit in milliseconds |
| -------------- | ------------------------ |
| `weeks`        | `604_800_000`            |
| `days`         | `86_400_000`             |
| `hours`        | `3_600_000`              |
| `minutes`      | `60_000`                 |
| `seconds`      | `1_000`                  |
| `milliseconds` | `1`                      |
| `microseconds` | `0.001`                  |
| `nanoseconds`  | `0.000_001`              |

Sub-millisecond units produce fractions of a millisecond:

```ts twoslash
import { microseconds, nanoseconds } from 'niobe';
// ---cut---
microseconds(1);
// => 0.001

nanoseconds(500);
// => 0.0005
```

`milliseconds` returns its input unchanged. See [why it exists](./faq#why-is-there-a-milliseconds-converter).
