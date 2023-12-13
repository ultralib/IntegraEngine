import * as THREE from "three";

import { EnvironmentOptions } from "../GameOptions";

export function createScene(environment: EnvironmentOptions): THREE.Scene {
    const scene = new THREE.Scene();

    // Gamma
    scene.background = new THREE.Color(environment.gamma);

    // Fog
    scene.fog = new THREE.Fog(environment.fogColor, environment.fogNear, environment.fogFar);

    return scene;
}
