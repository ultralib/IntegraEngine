<script setup lang="ts">
import * as THREE from "three";

import { Globals } from "./core/Globals";
import { Game } from "./core/Game";

import { Ref, onMounted, ref } from "vue";
import AppTree from "./components/AppTree.vue";
import AppNav from "./components/AppNav.vue";
import AppInspector from "./components/AppInspector.vue";

const nodes: Ref<THREE.Object3D<THREE.Object3DEventMap>[]> = ref([]);
onMounted(() => {
    Globals.game = new Game({
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
    });

    const { game } = Globals;
    game.start();

    nodes.value = game.scene.children;
});
</script>

<template>
    <main class="editor">
        <AppNav class="editor__nav" />
        <AppTree :nodes="nodes" class="editor__tree" />
        <div class="viewport"></div>
        <AppInspector class="editor__inspector" />
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
