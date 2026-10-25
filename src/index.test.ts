import { readdirSync, readFileSync } from 'node:fs';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import * as api from './index.js';

describe('api', () => {
	it('exports the correct values', () => {
		expect(api).toMatchInlineSnapshot(`
			{
			  "DAY": 86400000,
			  "DAYS_IN_WEEK": 7,
			  "HOUR": 3600000,
			  "HOURS_IN_DAY": 24,
			  "MICROSECOND": 0.001,
			  "MICROSECONDS_IN_MILLISECOND": 1000,
			  "MILLISECOND": 1,
			  "MILLISECONDS_IN_SECOND": 1000,
			  "MINUTE": 60000,
			  "MINUTES_IN_HOUR": 60,
			  "NANOSECOND": 0.000001,
			  "NANOSECONDS_IN_MICROSECOND": 1000,
			  "SECOND": 1000,
			  "SECONDS_IN_MINUTE": 60,
			  "WEEK": 604800000,
			  "clockToMs": [Function],
			  "days": [Function],
			  "hours": [Function],
			  "microseconds": [Function],
			  "milliseconds": [Function],
			  "minutes": [Function],
			  "msToClock": [Function],
			  "msToParts": [Function],
			  "nanoseconds": [Function],
			  "parseDuration": [Function],
			  "partsToMs": [Function],
			  "seconds": [Function],
			  "weeks": [Function],
			}
		`);
	});
});

describe('documentation', () => {
	// Every export: values at runtime, plus the types named in `index.ts`.
	const exported = () => {
		const file = new URL('index.ts', import.meta.url);
		const source = ts.createSourceFile(
			'index.ts',
			readFileSync(file, 'utf8'),
			ts.ScriptTarget.Latest,
		);
		const types = source.statements.flatMap((statement) =>
			ts.isExportDeclaration(statement) &&
			statement.isTypeOnly &&
			statement.exportClause &&
			ts.isNamedExports(statement.exportClause)
				? statement.exportClause.elements.map((element) => element.name.text)
				: [],
		);
		return [...Object.keys(api), ...types];
	};

	// Headings of the API reference (`docs/api/*.md`) naming an export, e.g. ``## `minutes` ``.
	const documented = () => {
		const dir = new URL('../docs/api/', import.meta.url);
		const pages = readdirSync(dir).filter((name) => name.endsWith('.md'));
		return new Set(
			pages.flatMap((page) =>
				[...readFileSync(new URL(page, dir), 'utf8').matchAll(/^#{2,3} `(\w+)`/gm)].map(
					([, name]) => name,
				),
			),
		);
	};

	it('every export has a heading in the API reference', () => {
		const names = exported();
		expect(names).toContain('Parts');
		const headings = documented();
		expect(names.filter((name) => !headings.has(name))).toEqual([]);
	});
});
