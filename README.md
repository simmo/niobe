<br/>

<picture>
	<source media="(prefers-color-scheme: dark)" srcset="./.github/assets/logo-dark.svg">
	<img alt="Niobe logo" src="./.github/assets/logo-light.svg" width="150">
</picture>

<small>A simple way to manage time-based intervals in your applications.</small>

[![npm (latest)](https://img.shields.io/npm/v/niobe/latest?color=00b894&label=latest&style=flat)](https://www.npmjs.com/package/niobe) [![npm (beta)](https://img.shields.io/npm/v/niobe/beta?color=0984e3&label=beta&style=flat)](https://www.npmjs.com/package/niobe?activeTab=versions) [![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/simmo/niobe/ci.yml?style=flat)](https://github.com/simmo/niobe/actions/workflows/ci.yml)

---

**Niobe** gives you a simple, readable way to write durations. Instead of this:

```ts
setTimeout(refresh, 1_000 * 60 * 2.5);
```

write this:

```ts
import { minutes, seconds } from 'niobe';

setTimeout(refresh, minutes(2) + seconds(30));
```

Niobe also converts milliseconds back to any unit, parses strings like `'1h 30m'`, reads and writes clock strings like `'01:30:00'`, and splits durations into their parts.

## Installation

```bash
npm i niobe
```

## Documentation

Guides and the full API reference are at **[niobe.js.org](https://niobe.js.org/)**.

See the [changelog](./CHANGELOG.md) for the latest changes, or the [contribution guide](./CONTRIBUTING.md) if you want to get involved.

---

<small>© 2025 [Mike Simmonds](https://mike.id)</small>
