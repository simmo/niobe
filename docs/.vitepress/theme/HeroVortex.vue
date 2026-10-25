<script setup lang="ts">
import { useData } from 'vitepress';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { createVortex, type Vortex } from './vortex';

const { isDark } = useData();
const root = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();

let vortex: Vortex | undefined;
let cleanup = () => {};

// Browser-only: the canvas is drawn after mount, so server rendering just emits the element.
onMounted(() => {
	const element = root.value!;
	// The canvas extends a little below the hero (see `.hero-vortex` in `style.css`), so it
	// needs to know where the hero ends.
	const hero = element.parentElement?.querySelector<HTMLElement>('.VPHero');
	const fit = () => {
		if (hero) element.style.setProperty('--hero-bottom', `${hero.offsetTop + hero.offsetHeight}px`);
	};
	fit();

	vortex = createVortex(canvas.value!);
	vortex.setDark(isDark.value);
	// Slow down (rather than stop) for users who prefer reduced motion, following changes.
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const updateMotion = () => vortex!.setReducedMotion(reducedMotion.matches);
	updateMotion();
	reducedMotion.addEventListener('change', updateMotion);

	const measure = () => {
		const { height, width } = element.getBoundingClientRect();
		vortex!.resize(width, height);
	};

	// Measure straight away the first time. After that, re-measuring restarts (and warms up)
	// the simulation, so wait for resizing to settle.
	let measured = false;
	let timer: ReturnType<typeof setTimeout> | undefined;
	const resizes = new ResizeObserver(() => {
		if (!measured) {
			measured = true;
			measure();
			return;
		}
		clearTimeout(timer);
		timer = setTimeout(measure, 150);
	});
	// Only animate while it's on screen.
	const visibility = new IntersectionObserver(([entry]) =>
		vortex!.setRunning(entry!.isIntersecting),
	);
	// When the hero changes size, refit the canvas; that resizes `element`, which re-measures.
	const heroResizes = new ResizeObserver(fit);
	resizes.observe(element);
	if (hero) heroResizes.observe(hero);
	visibility.observe(element);

	cleanup = () => {
		clearTimeout(timer);
		resizes.disconnect();
		heroResizes.disconnect();
		reducedMotion.removeEventListener('change', updateMotion);
		visibility.disconnect();
		vortex!.destroy();
	};
});

watch(isDark, (dark) => vortex?.setDark(dark));

onBeforeUnmount(() => cleanup());
</script>

<template>
	<div ref="root" class="hero-vortex" aria-hidden="true">
		<canvas ref="canvas" />
	</div>
</template>
