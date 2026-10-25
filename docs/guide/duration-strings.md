---
description: Parse duration strings such as '1h 30m' into milliseconds with parseDuration.
---

# Duration strings

`parseDuration` turns a human-written duration into milliseconds. It's useful for durations that come from config files, environment variables or user input.

```ts twoslash
import { parseDuration } from 'niobe';
// ---cut---
parseDuration('2m 1s');
// => 121_000

parseDuration('1h 30m');
// => 5_400_000

parseDuration('1.5h');
// => 5_400_000

parseDuration('1d 2h 3m 4s 5ms 6μs 7ns');
// => 93_784_005.006_007
```

## Format

A duration string is one or more amounts, each followed by a unit. Amounts can be decimals, and can be separated by spaces or written together (`'1h30m'`). Repeated units are added up.

| Unit | Meaning      |
| ---- | ------------ |
| `w`  | Weeks        |
| `d`  | Days         |
| `h`  | Hours        |
| `m`  | Minutes      |
| `s`  | Seconds      |
| `ms` | Milliseconds |
| `μs` | Microseconds |
| `ns` | Nanoseconds  |

Units are case-sensitive, and there's no space between an amount and its unit. The units are also available as the [`TimeUnit`](/api/types#timeunit) type.

## Invalid strings

By default, a string that isn't a valid duration returns `0`:

```ts twoslash
import { parseDuration } from 'niobe';
// ---cut---
parseDuration('soon');
// => 0
```

Pass `true` as the second argument to throw instead, so mistakes don't go unnoticed:

```ts twoslash
import { parseDuration } from 'niobe';
// ---cut---
parseDuration('soon', true);
// => throws Error: "soon" is not a valid duration
```
