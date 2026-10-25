<!-- The home page hero's code example, rendered by `HeroShowcase.vue`. Keep it short. -->

```ts twoslash
import { clockToMs, minutes, msToClock, parseDuration, seconds } from 'niobe';
declare function refresh(): void;
declare const config: { timeout: string };
// ---cut---
setTimeout(refresh, minutes(2) + seconds(30));
// => after 150_000ms

const timeout = parseDuration(config.timeout); // '1h 30m'
// => 5_400_000

msToClock(timeout);
// => '01:30:00'

clockToMs('00:02:30') === minutes(2.5);
// => true
```
