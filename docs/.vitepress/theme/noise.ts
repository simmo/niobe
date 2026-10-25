/** Gradient directions: the midpoints of a cube's 12 edges. */
const GRADIENTS = [
	[1, 1, 0],
	[-1, 1, 0],
	[1, -1, 0],
	[-1, -1, 0],
	[1, 0, 1],
	[-1, 0, 1],
	[1, 0, -1],
	[-1, 0, -1],
	[0, 1, 1],
	[0, -1, 1],
	[0, 1, -1],
	[0, -1, -1],
] as const;

const F3 = 1 / 3;
const G3 = 1 / 6;

/**
 * 3D simplex noise (Stefan Gustavson's algorithm): smooth values in roughly [-1, 1] that
 * change gradually with x, y and z. `random` shuffles the permutation table, so each call
 * gives a different field.
 */
export const createNoise3D = (random: () => number = Math.random) => {
	const table = Array.from({ length: 256 }, (_, index) => index);
	for (let index = table.length - 1; index > 0; index--) {
		const swap = Math.floor(random() * (index + 1));
		[table[index], table[swap]] = [table[swap]!, table[index]!];
	}
	const perm = Uint8Array.from({ length: 512 }, (_, index) => table[index & 255]!);

	/** One corner's contribution: falls off with distance, along its gradient. */
	const corner = (hash: number, x: number, y: number, z: number) => {
		const t = 0.6 - x * x - y * y - z * z;
		if (t < 0) return 0;
		const [gx, gy, gz] = GRADIENTS[hash % 12]!;
		return t * t * t * t * (gx * x + gy * y + gz * z);
	};

	return (x: number, y: number, z: number): number => {
		// Skew into simplex space to find the cell, then unskew back.
		const skew = (x + y + z) * F3;
		const i = Math.floor(x + skew);
		const j = Math.floor(y + skew);
		const k = Math.floor(z + skew);
		const unskew = (i + j + k) * G3;
		const x0 = x - (i - unskew);
		const y0 = y - (j - unskew);
		const z0 = z - (k - unskew);

		// Which of the six tetrahedra in the cube holds the point.
		let i1, j1, k1, i2, j2, k2;
		if (x0 >= y0) {
			if (y0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 1, 0];
			else if (x0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 0, 1];
			else [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 1, 0, 1];
		} else if (y0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 0, 1, 1];
		else if (x0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 0, 1, 1];
		else [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 1, 1, 0];

		const ii = i & 255;
		const jj = j & 255;
		const kk = k & 255;
		const hash = (di: number, dj: number, dk: number) =>
			perm[ii + di + perm[jj + dj + perm[kk + dk]!]!]!;

		return (
			32 *
			(corner(hash(0, 0, 0), x0, y0, z0) +
				corner(hash(i1, j1, k1), x0 - i1 + G3, y0 - j1 + G3, z0 - k1 + G3) +
				corner(hash(i2, j2, k2), x0 - i2 + 2 * G3, y0 - j2 + 2 * G3, z0 - k2 + 2 * G3) +
				corner(hash(1, 1, 1), x0 - 1 + 3 * G3, y0 - 1 + 3 * G3, z0 - 1 + 3 * G3))
		);
	};
};
