import { createNoise3D } from './noise';

/**
 * A flow field of particles: each one drifts along an angle taken from 3D simplex noise
 * (x, y and time). Every frame is drawn from scratch, each particle as just its latest tiny
 * movement (so they read as particles, not lines), then composited with blurred copies of
 * itself for a glow. Inspired by Aceternity UI's Vortex; written from scratch, without
 * packages.
 */

const TAU = Math.PI * 2;

/** Values stored per particle, packed into one Float32Array for speed. */
const FIELDS = 9;
const [X, Y, VX, VY, LIFE, TTL, SPEED, RADIUS, HUE] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/** Tuned against the brand cyan (#28c6e4 is hue 190). */
const SETTINGS = {
	/** Particles per 1440×900px area, spread across the whole canvas. */
	density: 900,
	minParticles: 260,
	baseHue: 170,
	rangeHue: 45,
	baseTtl: 60,
	rangeTtl: 160,
	baseSpeed: 0.1,
	rangeSpeed: 1.6,
	baseRadius: 0.8,
	rangeRadius: 1.8,
	noiseSteps: 3,
	xOff: 0.00125,
	yOff: 0.00125,
	zOff: 0.0005,
	/**
	 * Frames simulated (not drawn) before the first frame, about three seconds at 60fps, so
	 * it starts mid-swirl rather than with every particle fading in together.
	 */
	warmUpFrames: 180,
	/** How fast everything moves (and particles age), as a fraction of the values above. */
	pace: 0.6,
	/** The pace when the user prefers reduced motion. */
	reducedPace: 0.15,
};

const lerp = (from: number, to: number, amount: number) => (1 - amount) * from + amount * to;

/** 0 at birth and death, 1 halfway: particles fade in and out. */
const fadeInOut = (life: number, ttl: number) => {
	const half = ttl / 2;
	return Math.abs(((life + half) % ttl) - half) / half;
};

export interface Vortex {
	/** Re-measure after the element resizes. */
	resize(width: number, height: number): void;
	/** Switch the palette and compositing for the page's colour scheme. */
	setDark(dark: boolean): void;
	/** Slow everything down, for users who prefer reduced motion. */
	setReducedMotion(reduced: boolean): void;
	/** Run or pause the animation (e.g. while off screen). */
	setRunning(running: boolean): void;
	destroy(): void;
}

export const createVortex = (canvas: HTMLCanvasElement): Vortex => {
	const screen = canvas.getContext('2d')!;
	// Particles are drawn here first, then composited onto the visible canvas with a glow.
	const buffer = document.createElement('canvas');
	const draw = buffer.getContext('2d')!;
	const noise = createNoise3D();

	let width = 0;
	let height = 0;
	let dark = false;
	let tick = 0;
	/** Simulation time per frame, slower for reduced motion. */
	let pace = SETTINGS.pace;
	let frame = 0;
	let running = false;
	let count = 0;
	let particles = new Float32Array(0);

	const spawn = (index: number) => {
		const at = index * FIELDS;
		particles[at + X] = Math.random() * width;
		particles[at + Y] = Math.random() * height;
		particles[at + VX] = 0;
		particles[at + VY] = 0;
		particles[at + LIFE] = 0;
		particles[at + TTL] = SETTINGS.baseTtl + Math.random() * SETTINGS.rangeTtl;
		particles[at + SPEED] = SETTINGS.baseSpeed + Math.random() * SETTINGS.rangeSpeed;
		particles[at + RADIUS] = SETTINGS.baseRadius + Math.random() * SETTINGS.rangeRadius;
		particles[at + HUE] = SETTINGS.baseHue + Math.random() * SETTINGS.rangeHue;
	};

	/** Moves a particle along the field, drawing just this frame's movement when `paint`. */
	const step = (index: number, paint: boolean) => {
		const at = index * FIELDS;
		const x = particles[at + X]!;
		const y = particles[at + Y]!;
		const angle =
			noise(x * SETTINGS.xOff, y * SETTINGS.yOff, tick * SETTINGS.zOff) * SETTINGS.noiseSteps * TAU;
		const vx = lerp(particles[at + VX]!, Math.cos(angle), 0.5);
		const vy = lerp(particles[at + VY]!, Math.sin(angle), 0.5);
		const speed = particles[at + SPEED]!;
		const life = particles[at + LIFE]!;
		const ttl = particles[at + TTL]!;
		const nextX = x + vx * speed * pace;
		const nextY = y + vy * speed * pace;

		if (paint) {
			const alpha = fadeInOut(life, ttl) * (dark ? 0.6 : 0.85);
			draw.lineWidth = particles[at + RADIUS]!;
			draw.strokeStyle = `hsla(${particles[at + HUE]},100%,${dark ? 60 : 50}%,${alpha})`;
			draw.beginPath();
			draw.moveTo(x, y);
			draw.lineTo(nextX, nextY);
			draw.stroke();
		}

		particles[at + X] = nextX;
		particles[at + Y] = nextY;
		particles[at + VX] = vx;
		particles[at + VY] = vy;
		particles[at + LIFE] = life + pace;

		const outside = nextX < 0 || nextX > width || nextY < 0 || nextY > height;
		if (outside || life + pace > ttl) spawn(index);
	};

	const render = () => {
		// A zero-sized canvas (e.g. measured while hidden) can't be drawn.
		if (!width || !height) return;
		tick += pace;
		draw.clearRect(0, 0, width, height);
		draw.lineCap = 'round';
		for (let index = 0; index < count; index++) step(index, true);

		screen.clearRect(0, 0, width, height);
		screen.save();
		if (dark) {
			// Brightened, blurred copies add light on a dark page.
			screen.globalCompositeOperation = 'lighter';
			screen.filter = 'blur(8px) brightness(130%)';
			screen.drawImage(buffer, 0, 0, width, height);
			screen.filter = 'blur(4px) brightness(130%)';
			screen.drawImage(buffer, 0, 0, width, height);
		} else {
			// Adding light would wash out on a light page, so the glow is a soft halo.
			screen.globalAlpha = 0.8;
			screen.filter = 'blur(6px)';
			screen.drawImage(buffer, 0, 0, width, height);
			screen.globalAlpha = 1;
		}
		screen.filter = 'none';
		screen.drawImage(buffer, 0, 0, width, height);
		screen.restore();
	};

	const loop = () => {
		render();
		frame = requestAnimationFrame(loop);
	};

	/**
	 * Runs the simulation (at full pace) without drawing, so the first visible frame is already
	 * spread out.
	 */
	const warmUp = () => {
		const previous = pace;
		pace = 1;
		for (let frame = 0; frame < SETTINGS.warmUpFrames; frame++) {
			tick++;
			for (let index = 0; index < count; index++) step(index, false);
		}
		pace = previous;
	};

	return {
		resize(nextWidth, nextHeight) {
			width = nextWidth;
			height = nextHeight;
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			for (const [target, context] of [
				[canvas, screen],
				[buffer, draw],
			] as const) {
				target.width = Math.round(width * ratio);
				target.height = Math.round(height * ratio);
				context.setTransform(ratio, 0, 0, ratio, 0, 0);
			}
			count = Math.max(
				SETTINGS.minParticles,
				Math.round((SETTINGS.density * width * height) / (1440 * 900)),
			);
			particles = new Float32Array(count * FIELDS);
			for (let index = 0; index < count; index++) spawn(index);
			warmUp();
			// Draw straight away, rather than leaving it blank until the next animation frame.
			render();
		},
		setDark(nextDark) {
			dark = nextDark;
		},
		setReducedMotion(reduced) {
			pace = reduced ? SETTINGS.reducedPace : SETTINGS.pace;
		},
		setRunning(nextRunning) {
			if (nextRunning === running) return;
			running = nextRunning;
			if (running) frame = requestAnimationFrame(loop);
			else cancelAnimationFrame(frame);
		},
		destroy() {
			cancelAnimationFrame(frame);
			running = false;
		},
	};
};
