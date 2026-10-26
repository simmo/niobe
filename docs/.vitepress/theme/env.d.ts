/// <reference types="vite/client" />

// Set by `vite.define` in `docs/.vitepress/config.ts`.
declare const __DOCS_SITE_BASE__: string;
declare const __DOCS_VERSION__: string;

// Markdown files compile to Vue components, so partials can be rendered by the theme.
declare module '*.md' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent;
	export default component;
}

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent;
	export default component;
}
