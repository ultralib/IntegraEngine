import * as THREE from "three";

import { generateHeightmap } from "./generateHeightmap";
import { generateTexture } from "./generateTexture";

export function createTerrain(width: number, depth: number) {
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
    const terrain = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture, color: "#dfbc5b" }));
    terrain.receiveShadow = true;
    terrain.castShadow = true;

    return terrain;
}
