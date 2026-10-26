import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import type { Theme } from 'vitepress';
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue';
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';

import HeroShowcase from './HeroShowcase.vue';
import HeroVortex from './HeroVortex.vue';
import VersionBanner from './VersionBanner.vue';
import VersionSwitcher from './VersionSwitcher.vue';

// After the default theme, so these override its variables.
import '@shikijs/vitepress-twoslash/style.css';
import './style.css';

export default {
	extends: DefaultTheme,
	Layout: () =>
		h(DefaultTheme.Layout, null, {
			'doc-before': () => h(VersionBanner),
			'home-hero-before': () => [h(HeroVortex), h(VersionBanner)],
			'home-hero-image': () => h(HeroShowcase),
		}),
	enhanceApp({ app }) {
		app.use(TwoslashFloatingVue);
		app.component('VersionSwitcher', VersionSwitcher);
		// Inserted under each page's title by `copyOrDownloadAsMarkdownButtons` (see `config.ts`).
		app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons);
	},
} satisfies Theme;
