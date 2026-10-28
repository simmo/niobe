// Builds every published version of the docs into one site, ready for GitHub Pages:
//
//   <out>/               the latest release
//   <out>/<version>/     each release
//   <out>/next/          the newest prerelease, when it's newer than the latest release
//   <out>/versions.json  the list, read at runtime by the version switcher
//
// Each version is built from its own tag, so the docs always match what was published. Tags
// without docs (from before the site existed) are skipped. Until there's a release with
// docs, the root shows the newest prerelease, and until any tag has docs, it shows the
// current commit.
//
// The site is served from `homepage` in package.json. It's read here, from the current
// checkout, and passed to every version's build as `DOCS_SITE_ORIGIN` and `DOCS_SITE_BASE`, so
// changing it moves every version, old tags included.
//
// Usage: node scripts/build-docs.ts [out-dir]

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

interface Target {
	/** Folder in the site: empty for the root. Also passed to the build as `DOCS_VERSION`. */
	dir: string;
	tag: string;
}

const out = resolve(process.argv[2] ?? '_site');
const { homepage, version } = JSON.parse(readFileSync('package.json', 'utf8')) as {
	homepage: string;
	version: string;
};
// `https://niobe.js.org/` → `https://niobe.js.org` and `/`.
const { origin: siteOrigin, pathname: siteBase } = new URL(homepage);
const marker = 'docs/.vitepress/config.ts';

const run = (command: string, args: string[], cwd = process.cwd(), env = process.env) =>
	execFileSync(command, args, { cwd, env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });

const hasDocs = (tag: string) => {
	try {
		// Quietly: git reports every tag without docs as `fatal`, which is expected here.
		execFileSync('git', ['cat-file', '-e', `${tag}:${marker}`], { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
};

// Newest first, with prereleases before their release (`1.0.0-beta.1` < `1.0.0`).
const tags = run('git', ['-c', 'versionsort.suffix=-', 'tag', '--list', '--sort=-v:refname'])
	.split('\n')
	.filter((tag) => tag !== '' && hasDocs(tag));
const isPrerelease = (tag: string) => tag.includes('-');
const releases = tags.filter((tag) => !isPrerelease(tag));
// No tag has docs yet (the site is newer than the latest release), so publish the current
// commit until one does.
const latest = releases[0] ?? tags[0] ?? 'HEAD';

if (latest === 'HEAD')
	console.warn(`No tags contain ${marker} yet, so building the current commit.`);

// The newest tag, when it's a prerelease newer than the latest release.
const next = tags[0] !== undefined && tags[0] !== latest && isPrerelease(tags[0]) ? tags[0] : null;

const targets: Target[] = [
	{ dir: '', tag: latest },
	...releases.map((tag) => ({ dir: tag, tag })),
	...(next ? [{ dir: 'next', tag: next }] : []),
];

const work = mkdtempSync(join(tmpdir(), 'niobe-docs-'));
rmSync(out, { recursive: true, force: true });

try {
	for (const tag of new Set(targets.map((target) => target.tag))) {
		const checkout = join(work, tag);
		console.log(`\n▸ ${tag}: installing`);
		run('git', ['worktree', 'add', '--detach', checkout, tag]);
		try {
			run('npm', ['ci', '--no-audit', '--no-fund'], checkout);
			for (const { dir } of targets.filter((target) => target.tag === tag)) {
				const built = join(work, `site-${dir || 'root'}`);
				console.log(`▸ ${tag}: building /${dir}`);
				run('npx', ['vitepress', 'build', 'docs', '--outDir', built], checkout, {
					...process.env,
					DOCS_SITE_ORIGIN: siteOrigin,
					DOCS_SITE_BASE: siteBase,
					DOCS_VERSION: dir,
				});
				cpSync(built, join(out, dir), { recursive: true });
			}
		} finally {
			run('git', ['worktree', 'remove', '--force', checkout]);
		}
	}
} finally {
	rmSync(work, { recursive: true, force: true });
}

writeFileSync(
	join(out, 'versions.json'),
	// The current commit is labelled with its package version.
	`${JSON.stringify({ latest: latest === 'HEAD' ? version : latest, next, versions: releases })}\n`,
);

if (!existsSync(join(out, 'index.html'))) throw new Error(`Nothing was built into ${out}`);
console.log(
	`\n✓ Built ${targets.length} version(s) into ${out}: latest ${latest}, next ${next ?? 'none'}`,
);
