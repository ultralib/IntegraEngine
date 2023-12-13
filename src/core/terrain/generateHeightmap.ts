import { ImprovedNoise } from "three/examples/jsm/Addons.js";

export type Heightmap = Uint8Array;

const MAGIC_NUMBER = 100;
const FLATENESS = 1.75;
const HILLS = 5;

export function generateHeightmap(width: number, height: number): Heightmap {
    const size = width * height,
        data = new Uint8Array(size),
        perlin = new ImprovedNoise(),
        z = Math.random() * MAGIC_NUMBER;

    let quality = 1;

    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < size; i++) {
            const x = i % width,
                y = ~~(i / width);
            data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * FLATENESS);
        }

        quality *= HILLS;
    }

    return data;
}
