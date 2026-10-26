<script setup lang="ts">
import { computed } from 'vue';

import { currentVersion, useVersions, versionUrl } from './versions';

const versions = useVersions();

// Shown on every version except the latest release.
const message = computed(() => {
	const list = versions.value;
	if (!list || !currentVersion || currentVersion === list.latest) return null;
	return currentVersion === 'next'
		? `You're reading the docs for the next release${list.next ? ` (v${list.next})` : ''}, which is a prerelease.`
		: `You're reading the docs for v${currentVersion}.`;
});
</script>

<template>
	<div v-if="message" class="version-banner">
		{{ message }}
		<a :href="versionUrl('')">Go to the latest release (v{{ versions?.latest }})</a>
	</div>
</template>
