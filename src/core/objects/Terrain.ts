import * as THREE from "three";
import { GameObject } from "../GameObject";
import { ImprovedNoise } from "three/examples/jsm/Addons.js";

const MAGIC_NUMBER = 100;
const FLATENESS = 1.75;
const HILLS = 5;

export class Terrain extends GameObject {
    constructor(width: number, depth: number) {
        // Generate heightmap
        const heightmap = generateHeightmap(width, depth);

        // Terrain: geometry
        const geometry = new THREE.PlaneGeometry(7500, 7500, width - 1, depth - 1);
        geometry.rotateX(-Math.PI / 2);
        const vertices = geometry.attributes.position.array;
        for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
            vertices[j + 1] = heightmap[i] * 10;
        }

        // Terrain: texture
        const texture = new THREE.CanvasTexture(generateTexture(heightmap, width, depth));
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;

        // Terrain
        super("Terrain", geometry, new THREE.MeshBasicMaterial({ map: texture, color: "#ffff9a" }));
        this.receiveShadow = true;
        this.castShadow = true;
    }
}

export type Heightmap = Uint8Array;
function generateHeightmap(width: number, height: number): Heightmap {
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

// Bakes lighting into texture
function generateTexture(data: Heightmap, width: number, height: number) {
    const vector3 = new THREE.Vector3(0, 0, 0);

    const sun = new THREE.Vector3(1, 1, 1);
    sun.normalize();

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    let context = canvas.getContext("2d");
    context!.fillStyle = "#f5e4a1";
    context!.fillRect(0, 0, width, height);

    let image = context!.getImageData(0, 0, canvas.width, canvas.height);
    let imageData = image.data;

    let shade;
    for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
        vector3.x = data[j - 2] - data[j + 2];
        vector3.y = 2;
        vector3.z = data[j - width * 2] - data[j + width * 2];
        vector3.normalize();

        shade = vector3.dot(sun);

        imageData[i] = (20 + shade * 50) * (0.5 + data[j] * 0.007);
        imageData[i + 1] = (10 + shade * 28) * (0.5 + data[j] * 0.007);
        imageData[i + 2] = shade * 28 * (0.5 + data[j] * 0.007);
    }

    context!.putImageData(image, 0, 0);

    // Scaled 4x
    const SCALE = 4;
    const canvasScaled = document.createElement("canvas");
    canvasScaled.width = width * SCALE;
    canvasScaled.height = height * SCALE;

    context = canvasScaled.getContext("2d");
    context!.scale(SCALE, SCALE);
    context!.drawImage(canvas, 0, 0);

    image = context!.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
    imageData = image.data;

    for (let i = 0, l = imageData.length; i < l; i += 4) {
        const v = ~~(Math.random() * 5);

        imageData[i] += v;
        imageData[i + 1] += v;
        imageData[i + 2] += v;
    }

    context!.putImageData(image, 0, 0);

    return canvasScaled;
}
