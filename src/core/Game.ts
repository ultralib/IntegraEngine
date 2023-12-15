import * as THREE from "three";
import {
    BokehPass,
    EffectComposer,
    OrbitControls,
    OutlinePass,
    OutputPass,
    RenderPass,
    Sky,
    TransformControls,
} from "three/examples/jsm/Addons.js";

import { createSky } from "./sky/createSky";
import { GameOptions } from "./GameOptions";
import { createScene } from "./scene/createScene";
import { GameObject } from "./GameObject";

export class Game {
    public scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private controls: OrbitControls;
    public transform: TransformControls;
    private renderer: THREE.WebGLRenderer;
    private sky: Sky;
    private postprocessing: Record<string, any> = {};
    private clock = new THREE.Clock();

    private readonly raycaster = new THREE.Raycaster();
    private readonly pointer = new THREE.Vector2();

    private readonly opts: GameOptions;

    constructor(scene: GameObject[], options: GameOptions) {
        this.opts = options;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: this.opts.antialias });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMappingExposure = this.opts.environment.toneExposure;
        document.querySelector(".viewport")!.appendChild(this.renderer.domElement);

        // Scene
        this.scene = createScene(this.opts.environment);

        // Light
        const light = new THREE.HemisphereLight(0x8dc1de, 0x00668d, 1.5);
        light.position.set(2, 1, 1);
        light.userData["@editor"] = true;
        this.scene.add(light);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            this.opts.editorCamera.fov,
            window.innerWidth / window.innerHeight,
            this.opts.editorCamera.near,
            this.opts.editorCamera.far
        );

        // Orbit controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 10;
        this.controls.maxDistance = 10000;
        this.controls.maxPolarAngle = Math.PI / 2;
        // Camera position
        this.controls.target.y = 50;
        this.camera.position.y = this.controls.target.y + 2000;
        this.camera.position.x = 2000;

        // Transform controls
        this.transform = new TransformControls(this.camera, this.renderer.domElement);
        this.transform.addEventListener("dragging-changed", (event) => {
            // Disable camera when transforming
            this.controls.enabled = !event.value;
        });
        this.transform.userData["@editor"] = true;
        this.transform.mode = "translate";
        this.scene.add(this.transform);

        // Sky
        this.sky = createSky();
        this.sky.name = "Sky";
        this.sky.userData = { "@editor": true };
        this.scene.add(this.sky);

        // Scene objects
        for (const gameObject of scene) {
            this.scene.add(gameObject);

            gameObject.onCreate();
        }

        // Terrain
        // const terrain = createTerrain(100, 100);
        // terrain.name = "Terrain";
        // terrain.position.set(0, -810, 0);
        // this.scene.add(terrain);

        // Player
        // const player = createPlayer();
        // player.name = "Player";
        // this.scene.add(player);

        // Cursor
        // const cursorGeometry = new THREE.ConeGeometry(20, 100, 3);
        // cursorGeometry.translate(0, 50, 0);
        // cursorGeometry.rotateX(Math.PI / 2);
        // const cursor = new THREE.Mesh(cursorGeometry, new THREE.MeshNormalMaterial());
        // scene.add(cursor);
    }

    private _editorMode: boolean = true;
    public start() {
        this.controls.update();

        // Postprocessing
        this.initPostprocessing();

        // Resizing scren
        this.initResize();

        // Raycasting
        this.initRaycasting();

        this.render();
    }

    public toggleEmulatePlay() {
        this.unselectObject();

        this._editorMode = !this._editorMode;
    }

    //#region Initialization
    private initPostprocessing() {
        // 1. Render
        const renderPass = new RenderPass(this.scene, this.camera);

        // 2. Bokeh (Focus)
        /*const bokehPass = new BokehPass(this.scene, this.camera, {
            focus: 320,
            aperture: 0.05 * 0.00001,
            maxblur: 0.005,
        });*/

        // 3. Outline
        const outlinePass = new OutlinePass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            this.scene,
            this.camera
        );
        outlinePass.edgeStrength = 5;
        outlinePass.edgeGlow = 0.25;
        outlinePass.edgeThickness = 2;
        outlinePass.pulsePeriod = 0;
        outlinePass.visibleEdgeColor = new THREE.Color("#389fff");
        outlinePass.hiddenEdgeColor = new THREE.Color("#190a05");

        // 4. Output
        const outputPass = new OutputPass();

        // ... Compose
        const composer = new EffectComposer(this.renderer);
        composer.addPass(renderPass);
        //composer.addPass(bokehPass);
        composer.addPass(outlinePass);
        composer.addPass(outputPass);

        this.postprocessing.composer = composer;
        this.postprocessing.outline = outlinePass;
        //this.postprocessing.bokeh = bokehPass;
    }

    private initResize() {
        window.addEventListener("resize", () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(width, height);
            this.postprocessing.composer.setSize(width, height);
        });
    }

    private initRaycasting() {
        document.body.addEventListener("pointermove", (e) => {
            this.pointer.x = (e.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
            this.pointer.y = -(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.pointer, this.camera);

            return;

            /*
            const intersects = this.raycaster.intersectObject(this.scene, true);
            if (intersects.length > 0) {
                const selectedObject = intersects[0].object;

                if (selectedObject.type !== "TransformControlsPane") {
                    this.postprocessing.outline.selectedObjects = [selectedObject];
                }
            } else {
                this.postprocessing.outline.selectedObjects = [];
            }
			*/
        });
    }
    //#endregion

    //#region Selection
    private selectedObject: THREE.Object3D | null = null;
    public unselectObject() {
        if (this.selectedObject === null) return;

        // Make not selected
        delete this.selectedObject.userData["@selected"];

        // Unset selected
        this.selectedObject = null;

        // Remove outline
        this.postprocessing.outline.selectedObjects = [];

        // Remove transform gizmo
        this.transform.detach();
    }
    public selectObject(obj: THREE.Object3D) {
        this.unselectObject();

        // Make selected
        obj.userData["@selected"] = true;

        // Set selected
        this.selectedObject = obj;

        // Add outline
        this.postprocessing.outline.selectedObjects = [this.selectedObject];

        // Add transform gizmo
        this.transform.attach(obj);

        console.log(obj);

        this.render();
    }
    //#endregion

    private render() {
        this.update();

        // Render
        this.postprocessing.composer.render(0.1);

        // Next frame
        requestAnimationFrame(() => this.render());
    }

    private readonly STEPS_PER_FRAME: number = 5;
    private update() {
        const deltaTime = Math.min(0.05, this.clock.getDelta()) / this.STEPS_PER_FRAME;

        // we look for collisions in substeps to mitigate the risk of
        // an object traversing another too quickly for detection.
        for (let i = 0; i < this.STEPS_PER_FRAME; i++) {
            // controls(deltaTime);
            // updatePlayer(deltaTime);
            // updateSpheres(deltaTime);
            // teleportPlayerIfOob();
        }
    }
}
