import { readFileSync } from 'node:fs';

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import type { PartialCompilerOptions } from '@rollup/plugin-typescript';
import typescript from '@rollup/plugin-typescript';
import type { ModuleFormat, RollupOptions } from 'rollup';
import { defineConfig } from 'rollup';
import { dts } from 'rollup-plugin-dts';

const pkg = JSON.parse(
	readFileSync(new URL('./package.json', import.meta.url)).toString(),
);

const builds: Array<{
	extension: string;
	format: ModuleFormat;
	compilerOptions?: PartialCompilerOptions;
}> = [
	{ extension: 'cjs', format: 'cjs' },
	{
		extension: 'js',
		format: 'esm',
		compilerOptions: { declaration: true, declarationDir: 'dist/.types' },
	},
];

export default defineConfig([
	...builds.map<RollupOptions>(({ compilerOptions, extension, format }) => ({
		input: './src/index.ts',
		output: {
			file: `dist/index.${extension}`,
			format,
			sourcemap: true,
		},
		plugins: [
			resolve({ browser: true }),
			json(),
			typescript({
				filterRoot: false,
				exclude: ['**/*.{config,test}.ts'],
				compilerOptions,
			}),
			commonjs(),
			terser({}),
		],
		external: [...Object.keys(pkg.peerDependencies ?? {})],
	})),
	{
		input: './dist/.types/index.d.ts',
		output: {
			file: 'dist/index.d.ts',
		},
		plugins: [dts()],
	},
]);
