import * as THREE from "three";

export abstract class GameObject extends THREE.Mesh {
    constructor(defaultName: string, geometry?: THREE.BufferGeometry, material?: THREE.Material) {
        super(geometry, material);

        this.name = defaultName;
    }

    public onCreate() {}
    public onUpdate() {}
    public onDispose() {}
}
