# Agent guide

Niobe is a small, dependency-free library of duration helpers (parsing, converting and formatting milliseconds). The source is in `src/`; the public API is everything exported from `src/index.ts`.

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

The docs site (VitePress, in `docs/`) is the reference for users. Every change that affects users or the public API must update it in the same change, alongside the changelog. Don't leave it for later.

- `docs/guide/*.md` explains features with examples. Update every page whose behaviour, options or output changed, and add a page (and a `sidebar` entry in `docs/.vitepress/config.ts`) for a new feature.
- `docs/api/*.md` is the API reference. Every export of `src/index.ts` needs a `##` or `###` heading there, named in backticks (``## `minutes` ``); `src/index.test.ts` fails otherwise. Keep signatures, options and defaults in step with the source.
- Write TypeScript examples as `ts twoslash` blocks. They import `niobe` from `src/index.ts` and are type-checked by `npm run docs:build`, so a broken example fails the build. Show values with `// =>` comments, and use `// ^?` to show an inferred type. Avoid hovering Node globals such as `process`: their JSDoc breaks the build.
- Example output (`// =>` values, thrown errors) must be real: run the code (e.g. with `npx tsx`) and copy it.
- In user-facing text the library is **Niobe**; the lowercase `niobe` is only for the package name, imports and URLs.
- `README.md` is a short introduction that links to the site. Don't copy the reference into it.
- Every page needs a `description` in its frontmatter: one sentence saying what the page covers. It's the page's meta description and its summary in `llms.txt`. Quote it if it contains a colon.

How the site is published:

- Releases deploy it. `release.yml` calls `docs.yml`, which runs `scripts/build-docs.ts` and deploys to GitHub Pages. Run `docs.yml` by hand to redeploy without a release.
- The site's address is `homepage` in `package.json`. `scripts/build-docs.ts` reads it from the current checkout and passes it to every version's build, so changing it moves every version, old tags included. Don't hard-code the address in `docs/`.
- `scripts/build-docs.ts` rebuilds every version from its own tag: the root is the latest release, `/<version>/` is each release, and `/next/` is the newest prerelease. Tags without `docs/.vitepress/config.ts` are skipped. Until any tag has docs, it builds the current commit instead, labelled with the `package.json` version. Node runs it directly (type stripping), so it can only use erasable TypeScript syntax and `node:` modules.
- Old tags are rebuilt with today's script, so the build contract must stay compatible: `npx vitepress build docs` in a checkout of the tag, with `DOCS_SITE_ORIGIN`, `DOCS_SITE_BASE` and `DOCS_VERSION` set in the environment (see `docs/.vitepress/config.ts`).
- Each build also writes files for AI assistants: `llms.txt`, `llms-full.txt` and a `.md` copy of every page (`vitepress-plugin-llms`). `docs/.vitepress/llms.ts` writes the twoslash types and errors into those copies as comments.

## Commands

- `npm test` runs vitest in watch mode; `npx vitest run` runs once. `npm run coverage` adds coverage
- `npm run typecheck`
- `npm run lint` (`oxlint`; `lint:fix` applies safe fixes)
- `npm run format` (`oxfmt`; `format:check` in CI)
- `npm run dead-code` runs `fallow dead-code` (unused code, private type leaks, circular dependencies; type-aware via `.fallowrc.jsonc`)
- `npm run build` produces `dist/` with rollup
- `npm run docs:dev` serves the docs site locally. `npm run docs:build` builds it, failing on dead links or broken `twoslash` examples. `npm run docs:build:all -- <out-dir>` builds every published version, as the deploy does (needs git tags)

Use the Node version in `.nvmrc`. Before reporting work as done, run tests, typecheck, lint, format, dead-code and `docs:build`. CI's Code Style job fails on any of them.

## Conventions

- Each `src/<name>.ts` has a matching `src/<name>.test.ts`.
- Changes to the public API also update `src/index.test.ts`, which pins the exports, and the API reference in `docs/api/`.
- Exported functions must not reference unexported types in their signatures (fallow reports these as private type leaks): export the type.
- Tabs and single quotes; `oxfmt` decides formatting and import order. Don't hand-format.
- Niobe runs in any JavaScript runtime. `src/tsconfig.json` checks and builds the library without Node or DOM types, so don't use runtime-specific globals (`process`, `document`, timers) or `node:` modules in `src`. Tests and tooling use the root `tsconfig.json`, which has Node's types.

## Agent hooks

`.claude/settings.json` runs two hooks for Claude Code:

- After every edit, `.claude/hooks/format-file.sh` formats the file with oxfmt and reports oxlint findings for it.
- When a turn ends, `.claude/hooks/check.sh` runs `format:check`, `lint` and `dead-code`, and checks that `CHANGELOG.md` changed if source or tooling did. It blocks once with the problems; fix them, or say why the changelog is skipped.
