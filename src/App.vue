<script setup lang="ts">
import * as THREE from "three";

import { Globals } from "./core/Globals";
import { Game } from "./core/Game";
import { GameObject } from "./core/GameObject";
import { GameOptions } from "./core/GameOptions";
import { Terrain } from "./core/objects/Terrain";
import { Player } from "./core/player/Player";

import { onMounted, ref, watch } from "vue";
import AppNav from "./components/AppNav.vue";
import AppTransformButtons from "./components/AppTransformButtons.vue";
import AppTree from "./components/AppTree.vue";
import AppInspector from "./components/AppInspector.vue";

const nodes = ref<THREE.Object3D<THREE.Object3DEventMap>[]>([]);

// Change transform mode
const transformMode = ref<"translate" | "rotate" | "scale">("translate");
watch(transformMode, (val) => {
    if (!Globals.game) return;

    Globals.game.transform.mode = val;
});

onMounted(() => {
    const gameConfig: GameOptions = {
        antialias: true,

        environment: {
            gamma: "#fff2cf",

            fogColor: "#9f8745",
            fogNear: 250,
            fogFar: 10 * 1000,

            toneExposure: 0.1,
        },

        editorCamera: {
            fov: 60,
            near: 10,
            far: 20000,
        },
        playerCamera: {
            fov: 60,
            near: 10,
            far: 20000,
        },
    };

    const gameScene: GameObject[] = [new Terrain(100, 100), new Player()];

    Globals.game = new Game(gameScene, gameConfig);

    const { game } = Globals;
    game.start();

    nodes.value = game.scene.children;
});
</script>

<template>
    <main class="editor">
        <AppNav class="editor__nav" />
        <AppTransformButtons v-model:model-value="transformMode" class="editor__transform-buttons" />
        <AppTree :nodes="nodes" class="editor__tree" />
        <AppInspector class="editor__inspector" />

        <div class="viewport"></div>
    </main>
</template>

<style scoped lang="scss">
.editor {
    width: 100vw;
    height: 100vh;

    position: relative;

    &__nav {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
    }
    &__transform-buttons {
        position: absolute;
        left: 50%;
        top: 46px; // 38px(nav) + 8px(margin)
        right: 0;

        transform: translateX(-50%);
    }
    &__tree {
        position: absolute;
        left: 0;
        top: 38px;
        bottom: 0;
    }
    &__inspector {
        position: absolute;
        right: 0;
        top: 38px;
        bottom: 0;
    }

    & > .viewport {
        width: 100vw;
        height: 100vh;
    }
}
</style>
