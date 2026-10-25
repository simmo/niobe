import { onMounted, ref } from 'vue';

// Written by `scripts/build-docs.ts` at the site root, and fetched at runtime so that older
// builds also list versions released after them.
interface Versions {
	latest: string;
	next: string | null;
	versions: string[];
}

/** This build's folder: empty for the latest release, `x.y.z` or `next`. */
export const currentVersion = __DOCS_VERSION__;

/** The URL of `path` (relative to a version's root) in another version's folder. */
export function versionUrl(dir: string, path = '') {
	return `${__DOCS_SITE_BASE__}${dir ? `${dir}/` : ''}${path}`;
}

/** The versions published with the site, or `null` until loaded (or when there are none, e.g. in dev). */
export function useVersions() {
	const versions = ref<Versions | null>(null);
	onMounted(async () => {
		try {
			const response = await fetch(versionUrl('', 'versions.json'));
			if (response.ok) versions.value = (await response.json()) as Versions;
		} catch {
			// No versions.json: a local build.
		}
	});
	return versions;
}
