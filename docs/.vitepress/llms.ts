import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { createTwoslasher } from 'twoslash';

export type CompilerOptions = NonNullable<
	Parameters<typeof createTwoslasher>[0]
>['compilerOptions'];

/** A `ts twoslash` code block in a page's Markdown. */
const fence = /^```ts twoslash\n([\s\S]*?)^```$/gm;

/** The site hides the code above a cut (usually imports), but an agent needs all of it. */
const cut = /^[ \t]*\/\/ ---cut(?:-before|-after)?---\n/gm;

/** `text` as comment lines, indented like the code line they follow. */
const comment = (indent: string, text: string) =>
	text.split('\n').map((line) => `${indent}// ${line}`.trimEnd());

/**
 * The Markdown copies of pages (from `vitepress-plugin-llms`) keep the examples' twoslash
 * markup, which an agent can't run: `// ^?` with no type after it, and `// @errors` with no
 * error. Run each example through twoslash, as the site does, and write what it shows as
 * comments instead: the type under the line it describes, and expected errors under the line
 * that has them.
 */
export const inlineTwoslash = async (outDir: string, compilerOptions: CompilerOptions) => {
	const twoslasher = createTwoslasher({ compilerOptions });
	// The same examples appear in a page's Markdown and in `llms-full.txt`.
	const rendered = new Map<string, string>();

	const render = (source: string) => {
		const result = twoslasher(source.replace(cut, ''), 'ts');
		const lines = result.code.split('\n');
		const notes = new Map<number, string[]>();
		const note = (line: number, text: string) => {
			const indent = /^\s*/.exec(lines[line]!)![0];
			notes.set(line, [...(notes.get(line) ?? []), ...comment(indent, text)]);
		};
		for (const error of result.errors) note(error.line!, `error TS${error.code}: ${error.text}`);
		// Drop the kind, as the site does: `(parameter) flags: …` → `flags: …`.
		for (const query of result.queries) note(query.line, query.text.replace(/^\(\w+\) /, ''));
		return lines.flatMap((line, index) => [line, ...(notes.get(index) ?? [])]).join('\n');
	};

	const files = (await readdir(outDir, { recursive: true })).filter(
		(file) => file.endsWith('.md') || file === 'llms-full.txt',
	);
	await Promise.all(
		files.map(async (file) => {
			const path = join(outDir, file);
			const markdown = await readFile(path, 'utf8');
			const inlined = markdown.replace(fence, (_, source: string) => {
				if (!rendered.has(source)) rendered.set(source, render(source));
				return `\`\`\`ts\n${rendered.get(source)}\`\`\``;
			});
			if (inlined !== markdown) await writeFile(path, inlined);
		}),
	);
};
