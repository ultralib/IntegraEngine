<script setup lang="ts">
import * as THREE from "three";

import { Globals } from "../core/Globals";

import { computed } from "vue";

const props = defineProps<{
    node: THREE.Object3D<THREE.Object3DEventMap>;
}>();

const isSelected = computed<boolean>(() => props.node.userData["@selected"] === true);
function selectNode() {
    const { game } = Globals;

    if (isSelected.value === true) {
        game?.unselectObject();
    } else {
        game?.selectObject(props.node);
    }
}
</script>

<template>
    <div class="tree-node" :data-selected="isSelected" @click="selectNode">
        <div class="tree-node__root">
            <svg
                class="tree-node__root_icon"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
            >
                <g clip-path="url(#clip0_21_27)">
                    <path
                        d="M21.2849 16.9523V8.95229C21.2846 8.60157 21.192 8.2571 21.0165 7.95346C20.8409 7.64981 20.5886 7.39766 20.2849 7.22229L13.2849 3.22229C12.9809 3.04676 12.636 2.95435 12.2849 2.95435C11.9338 2.95435 11.589 3.04676 11.2849 3.22229L4.28491 7.22229C3.98117 7.39766 3.72889 7.64981 3.55337 7.95346C3.37785 8.2571 3.28527 8.60157 3.28491 8.95229V16.9523C3.28527 17.303 3.37785 17.6475 3.55337 17.9511C3.72889 18.2548 3.98117 18.5069 4.28491 18.6823L11.2849 22.6823C11.589 22.8578 11.9338 22.9502 12.2849 22.9502C12.636 22.9502 12.9809 22.8578 13.2849 22.6823L20.2849 18.6823C20.5886 18.5069 20.8409 18.2548 21.0165 17.9511C21.192 17.6475 21.2846 17.303 21.2849 16.9523Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M3.55493 7.91223L12.2849 12.9622L21.0149 7.91223"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12.2849 23.0323V12.9523"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_21_27">
                        <rect width="24" height="24" fill="white" transform="translate(0.284912 0.952271)" />
                    </clipPath>
                </defs>
            </svg>
            <p class="tree-node__root_title">
                {{ node.name.length > 1 ? node.name : node.type }}
            </p>
        </div>
        <div class="tree-node__children">
            <AppTreeNode v-for="children in node.children" :key="children.uuid" :node="children" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.tree-node {
    --node-bg: #303030;
    --node-bg-hover: #2e2e47;
    --node-fg: #dddddd;
    --node-fg-2: #808080;

    margin-bottom: 2px;

    &[data-selected="true"] {
        --node-bg: #2869f6;
        --node-bg-hover: #1e53c4;
        --node-fg: white;
        --node-fg-2: white;
    }

    &__root {
        padding: 6px;

        display: flex;
        align-items: center;

        background: var(--node-bg);
        color: var(--node-fg);

        border-radius: 6px;

        cursor: pointer;

        transition: 0.2s ease-in-out background;

        &:hover {
            background: var(--node-bg-hover);
        }

        &_icon {
            margin-right: 4px;

            width: 18px;
            height: 18px;

            color: var(--node-fg-2);
        }
        &_title {
            font-size: 15px;
            font-weight: 460;
        }
    }

    &__children {
        padding-top: 4px;
        padding-left: 12px;
    }
}
</style>
