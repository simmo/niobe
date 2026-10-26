---
layout: home

# The hero's code example comes from `docs/parts/showcase.md` (see `HeroShowcase.vue`).
hero:
  name: Niobe
  text: Durations you can read
  tagline: Write minutes(2) + seconds(30) instead of 150_000. Convert, parse and format durations with small, typed functions.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: API reference
      link: /api/conversion
    - theme: alt
      text: GitHub
      link: https://github.com/simmo/niobe

features:
  - title: Readable by default
    details: weeks, days, hours, minutes, seconds and smaller units turn amounts into milliseconds, so a duration says what it means.
  - title: Convert both ways
    details: Every unit has .from() to turn milliseconds back into that unit, such as minutes.from(150_000) for 2.5.
  - title: Parse duration strings
    details: parseDuration reads strings like '1h 30m' or '2m 1s' from config files, environment variables or user input.
  - title: Clock strings
    details: clockToMs and msToClock read and write hh:mm:ss, down to nanoseconds.
  - title: Split into parts
    details: msToParts breaks a duration into weeks, days, hours and smaller units, and partsToMs puts it back together.
  - title: Small and typed
    details: No runtime dependencies, ESM and CommonJS builds, and types for everything, including the constants.
---
