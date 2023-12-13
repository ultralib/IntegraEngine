export interface EnvironmentOptions {
    gamma: string;

    fogColor: string;
    fogNear: number;
    fogFar: number;

    toneExposure: number;
}

export interface CameraOptions {
    fov: number;

    near: number;
    far: number;
}

export interface GameOptions {
    antialias: boolean;

    environment: EnvironmentOptions;

    editorCamera: CameraOptions;
    playerCamera: CameraOptions;
}
