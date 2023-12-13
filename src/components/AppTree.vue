<script setup lang="ts">
import * as THREE from "three";

import AppTreeNode from "./AppTreeNode.vue";

defineProps<{
    nodes: THREE.Object3D<THREE.Object3DEventMap>[];
}>();
</script>

<template>
    <aside class="tree">
        <p class="tree__title">SCENE</p>

        <template v-for="node in nodes" :key="node.uuid">
            <AppTreeNode v-if="node.userData['@editor'] !== true" :node="node" />
        </template>
    </aside>
</template>

<style scoped lang="scss">
.tree {
    width: 240px;

    padding: 8px 12px;

    display: flex;
    flex-direction: column;

    background: #212121;
    color: white;

    overflow: scroll;

    border-right: 1px solid #2e2e2e;

    &__title {
        margin-bottom: 8px;

        font-size: 14px;
        font-weight: 460;

        color: rgba(255, 255, 255, 0.4);
    }
}
</style>
