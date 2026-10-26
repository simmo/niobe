# Agent guide

niobe is a small, dependency-free library of duration helpers (parsing, converting and formatting milliseconds). The source is in `src/`; the public API is everything exported from `src/index.ts`.

## Changelog (required)

Every change that affects users, the public API, the build or tooling must update `CHANGELOG.md` in the same change. Don't leave it for later.

- Add entries under `## [Unreleased]`, following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
- Use these subheadings, in this order, creating them as needed: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
- Write one line per change, from a user's point of view. Wrap API names in backticks.
- Breaking changes go under `Changed` or `Removed`, start with `**Breaking:**`, come before the other entries in their section, and must say what to do instead.
- If a change revises something already listed under `[Unreleased]`, edit that entry. Don't add a second one.
- Never edit released sections (`## [x.y.z]`). Release tooling (`release-it` with `keep-a-changelog`) moves `[Unreleased]` into a version.
- Skip the changelog only for changes with no external effect, such as test-only edits or internal refactors. Say so when reporting the change.

## Documentation (required)

`README.md` is the API reference. Every change to the public API must update it in the same change: signatures, options, defaults and examples. Check them against the code in `src/`, not from memory, and run any example whose output the README shows.

## Commands

- `npm test` runs vitest in watch mode; `npx vitest run` runs once. `npm run coverage` adds coverage
- `npm run typecheck`
- `npm run lint` (`oxlint`; `lint:fix` applies safe fixes)
- `npm run format` (`oxfmt`; `format:check` in CI)
- `npm run dead-code` runs `fallow dead-code` (unused code, private type leaks, circular dependencies; type-aware via `.fallowrc.jsonc`)
- `npm run build` produces `dist/` with rollup

Use the Node version in `.nvmrc`. Before reporting work as done, run tests, typecheck, lint, format and dead-code. CI's Code Style job fails on any of format, lint or dead-code.

## Conventions

- Each `src/<name>.ts` has a matching `src/<name>.test.ts`.
- Changes to the public API also update `src/index.test.ts`, which pins the exports.
- Exported functions must not reference unexported types in their signatures (fallow reports these as private type leaks): export the type.
- Tabs and single quotes; `oxfmt` decides formatting and import order. Don't hand-format.

## Agent hooks

`.claude/settings.json` runs two hooks for Claude Code:

- After every edit, `.claude/hooks/format-file.sh` formats the file with oxfmt and reports oxlint findings for it.
- When a turn ends, `.claude/hooks/check.sh` runs `format:check`, `lint` and `dead-code`, and checks that `CHANGELOG.md` changed if source or tooling did. It blocks once with the problems; fix them, or say why the changelog is skipped.
