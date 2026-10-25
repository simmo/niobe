---
description: Split a duration into weeks, days, hours and smaller units with msToParts, and join them with partsToMs.
---

# Parts

Sometimes you need a duration's units separately, for example to show "1 day, 2 hours". `msToParts` splits milliseconds into a [`Parts`](/api/types#parts) object:

```ts twoslash
import { msToParts } from 'niobe';
// ---cut---
msToParts(93_784_005.006_007);
// => { weeks: 0, days: 1, hours: 2, minutes: 3, seconds: 4,
//      milliseconds: 5, microseconds: 6, nanoseconds: 7,
//      isNegative: false }
```

Each unit holds what's left after the larger units: `hours` is never more than 23, `minutes` never more than 59, and so on. Negative durations set `isNegative` and keep the units positive:

```ts twoslash
import { msToParts } from 'niobe';
// ---cut---
msToParts(-90_000);
// => { minutes: 1, seconds: 30, isNegative: true, …everything else 0 }
```

## Joining parts

`partsToMs` does the reverse. Pass any of the units, and set `isNegative` for a negative duration:

```ts twoslash
import { partsToMs } from 'niobe';
// ---cut---
partsToMs({ hours: 1, minutes: 30 });
// => 5_400_000

partsToMs({ minutes: 1, seconds: 30, isNegative: true });
// => -90_000
```

`partsToMs(msToParts(ms))` returns the original `ms`.
