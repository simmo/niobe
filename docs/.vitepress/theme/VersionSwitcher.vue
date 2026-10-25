<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
// Not part of the theme's public API: reused so the switcher matches the other nav menus.
import VPNavMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavMenuGroup.vue';
import { computed } from 'vue';

import { currentVersion, useVersions, versionUrl } from './versions';

defineProps<{ screenMenu?: boolean }>();

const { site } = useData();
const route = useRoute();
const versions = useVersions();

const label = (dir: string) => {
	if (dir === 'next') return versions.value?.next ? `Next (v${versions.value.next})` : 'Next';
	return dir ? `v${dir}` : versions.value ? `Latest (v${versions.value.latest})` : 'Latest';
};

const item = computed(() => {
	// Stay on the same page when switching; versions without it show the 404 page.
	const path = route.path.slice(site.value.base.length);
	const link = (dir: string) => ({
		text: label(dir),
		link: `${location.origin}${versionUrl(dir, path)}`,
		target: '_self',
		noIcon: true,
	});
	const list = versions.value;
	const items = list
		? [
				link(''),
				...(list.next ? [link('next')] : []),
				...list.versions.filter((v) => v !== list.latest).map(link),
			]
		: [];
	return { text: label(currentVersion), items };
});
</script>

<template>
	<VPNavMenuGroup v-if="item.items.length" :item="item" :screen="screenMenu" />
</template>
