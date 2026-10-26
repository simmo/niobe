import { fileURLToPath } from 'node:url';

import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { defineConfig } from 'vitepress';
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms';

import { inlineTwoslash } from './llms';

// Every version of the docs is built from its own tag with these variables, so keep them
// stable (see AGENTS.md). `DOCS_SITE_ORIGIN` is the site's scheme and host
// (`https://simmo.github.io`), `DOCS_SITE_BASE` is the path it's served from (`/niobe/`)
// and `DOCS_VERSION` is the folder for this build: empty for the latest release, `x.y.z` for
// a release or `next` for the newest prerelease.
const siteOrigin = process.env.DOCS_SITE_ORIGIN || undefined;
const siteBase = process.env.DOCS_SITE_BASE || '/';
const version = process.env.DOCS_VERSION || '';
const base = version ? `${siteBase}${version}/` : siteBase;

const repo = 'https://github.com/simmo/niobe';

// Examples import the source, so they're checked against the current API.
const twoslashCompilerOptions = {
	paths: { niobe: [fileURLToPath(new URL('../../src/index.ts', import.meta.url))] },
};

/** The parts of a HAST node this file reads. */
interface HastNode {
	type: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: HastNode[];
}

const hasClass = (node: HastNode, name: string) =>
	String(node.properties?.class ?? '')
		.split(/[\s,]+/)
		.includes(name);

const text = (node: HastNode): string => node.value ?? (node.children ?? []).map(text).join('');

/**
 * Twoslash indents each `^?` result with spaces, counting a tab as one column. Examples are
 * indented with tabs, so swap the leading spaces for the code line's tabs to keep the result
 * under the token it describes.
 */
const alignQueries = (node: HastNode) => {
	let line: HastNode | undefined;
	for (const child of node.children ?? []) {
		if (child.type !== 'element') continue;
		if (hasClass(child, 'line')) line = child;
		const first = child.children?.[0];
		if (hasClass(child, 'twoslash-query-line') && line && first?.type === 'text' && first.value) {
			const tabs = /^\t*/.exec(text(line))![0];
			first.value = tabs + first.value.slice(tabs.length);
		}
		alignQueries(child);
	}
};

export default defineConfig({
	title: 'Niobe',
	description: 'Human-readable durations for JavaScript and TypeScript',
	base,
	// Partials imported by the theme (e.g. the home page's showcase), not pages.
	srcExclude: ['parts/**'],
	cleanUrls: true,
	lastUpdated: true,
	head: [
		// Safari before 26 ignores SVG favicons, so PNG, ICO and Apple touch icons back it up.
		['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
		['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: `${base}favicon-96x96.png` }],
		['link', { rel: 'shortcut icon', href: `${base}favicon.ico` }],
		['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}apple-touch-icon.png` }],
		['link', { rel: 'manifest', href: `${base}site.webmanifest` }],
		['meta', { name: 'theme-color', content: '#28c6e4' }],
	],
	vite: {
		define: {
			__DOCS_SITE_BASE__: JSON.stringify(siteBase),
			__DOCS_VERSION__: JSON.stringify(version),
		},
		plugins: [
			// `llms.txt`, `llms-full.txt` and a Markdown copy of each page, for agents. With an
			// origin, links are absolute, so they work wherever the file is read; without one (local
			// builds), they're root-relative.
			llmstxt({
				domain: siteOrigin,
				ignoreFiles: ['parts/**'],
				title: 'Niobe',
				description: 'Human-readable durations for JavaScript and TypeScript',
				details: [
					'Use Niobe to write durations as `minutes(2) + seconds(30)` instead of `150_000`, convert milliseconds back to any unit, parse strings like `1h 30m`, read and write clock strings like `01:30:00`, and split a duration into its parts.',
					'Install it with `npm install niobe`. It has no runtime dependencies and works in Node and browsers. Every value is a number of milliseconds. Its types (`node_modules/niobe/dist/index.d.ts`) are the most reliable reference for the installed version.',
					'In the examples, `// =>` comments show the value a line returns, and comments under a line show the type TypeScript infers for it.',
				].join('\n\n'),
			}),
		],
	},
	// Write the types that examples show on hover into those Markdown files.
	buildEnd: ({ outDir }) => inlineTwoslash(outDir, twoslashCompilerOptions),
	markdown: {
		// A "Copy page" menu on each page: copy or view its Markdown, or open it in an AI chat.
		config: (md) => {
			md.use(copyOrDownloadAsMarkdownButtons);
		},
		codeTransformers: [
			transformerTwoslash({
				// `^?` results as a line under the code (styled as a comment in `style.css`), not a
				// popup that's always open.
				queryRendering: 'line',
				twoslashOptions: { compilerOptions: twoslashCompilerOptions },
			}),
			{ name: 'align-twoslash-queries', enforce: 'post', root: alignQueries },
		],
	},
	themeConfig: {
		logo: { light: '/logo-light.svg', dark: '/logo-dark.svg', alt: 'Niobe' },
		siteTitle: false,
		nav: [
			{ text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
			{ text: 'API', link: '/api/conversion', activeMatch: '/api/' },
			{ text: 'Changelog', link: '/changelog' },
			{ component: 'VersionSwitcher' },
		],
		sidebar: {
			'/guide/': [
				{
					text: 'Introduction',
					items: [{ text: 'Getting started', link: '/guide/getting-started' }],
				},
				{
					text: 'Essentials',
					items: [
						{ text: 'Converting units', link: '/guide/conversion' },
						{ text: 'Constants', link: '/guide/constants' },
					],
				},
				{
					text: 'Formats',
					items: [
						{ text: 'Duration strings', link: '/guide/duration-strings' },
						{ text: 'Clock strings', link: '/guide/clock-strings' },
						{ text: 'Parts', link: '/guide/parts' },
					],
				},
				{
					text: 'Going further',
					items: [{ text: 'FAQ', link: '/guide/faq' }],
				},
			],
			'/api/': [
				{
					text: 'API reference',
					items: [
						{ text: 'Conversion', link: '/api/conversion' },
						{ text: 'Utilities', link: '/api/utilities' },
						{ text: 'Constants', link: '/api/constants' },
						{ text: 'Types', link: '/api/types' },
					],
				},
			],
		},
		search: { provider: 'local' },
		editLink: { pattern: `${repo}/edit/main/docs/:path`, text: 'Edit this page on GitHub' },
		socialLinks: [
			{ icon: 'github', link: repo },
			{ icon: 'npm', link: 'https://www.npmjs.com/package/niobe' },
		],
		footer: {
			message: 'Released under the MIT License.',
			copyright: '© 2026 <a href="https://mike.id">Mike Simmonds</a>',
		},
	},
});
