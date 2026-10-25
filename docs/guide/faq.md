---
description: Answers to common questions about Niobe.
---

# FAQ

## Why is it called Niobe?

Naming things is hard! Most package names are taken, so the approach is often something random. Niobe is a character in the Matrix films.

## Why is there a milliseconds converter?

Some parts of the API don't change their input: `milliseconds(250)` returns `250`, and `MILLISECOND` is `1`. They're there for completeness, so every unit works the same way, which helps when code picks a unit at runtime:

```ts twoslash
import { milliseconds, seconds } from 'niobe';
declare const precise: boolean;
// ---cut---
const toMs = precise ? milliseconds : seconds;

toMs(250);
```

## Why milliseconds?

Milliseconds are what JavaScript uses for time: `setTimeout`, `setInterval`, `Date.now()` and `Date` arithmetic all take or return them. Using them everywhere means a duration from Niobe can be passed straight to any of those.
