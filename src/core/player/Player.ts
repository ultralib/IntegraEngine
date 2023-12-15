import * as THREE from "three";
import { GameObject } from "../GameObject";

export class Player extends GameObject {
    constructor() {
        super("Player", new THREE.BoxGeometry(25, 50, 25), new THREE.MeshBasicMaterial({ color: "#fff" }));
        this.receiveShadow = true;
        this.castShadow = true;
    }
}
