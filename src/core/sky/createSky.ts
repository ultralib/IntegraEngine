import * as THREE from "three";

import { Sky } from "three/examples/jsm/Addons.js";

export function createSky(): Sky {
    const sky = new Sky();
    sky.scale.setScalar(450 * 1000);
    let sun = new THREE.Vector3();
    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = 10;
    uniforms["rayleigh"].value = 3;
    uniforms["mieCoefficient"].value = 0.005;
    uniforms["mieDirectionalG"].value = 0.7;

    let elevation = 2;
    let azimuth = 180;

    const phi = THREE.MathUtils.degToRad(90 - elevation);
    const theta = THREE.MathUtils.degToRad(azimuth);
    sun.setFromSphericalCoords(1, phi, theta);

    uniforms["sunPosition"].value.copy(sun);

    return sky;
}
