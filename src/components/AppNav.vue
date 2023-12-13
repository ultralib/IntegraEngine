<script setup lang="ts">
import { Globals } from "../core/Globals";

function play() {
    const { game } = Globals;
    game?.emulatePlay();
}
</script>
<template>
    <nav class="nav">
        <p class="nav__title">Integra</p>

        <div class="nav__row">
            <button class="nav__button" title="Play" @click="play">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 25 25" fill="none">
                    <path
                        d="M5.28491 3.95227L19.2849 12.9523L5.28491 21.9523V3.95227Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <span>Play</span>
            </button>
        </div>
    </nav>
</template>

<style scoped lang="scss">
.nav {
    width: 100vw;
    height: 38px;

    padding: 4px 12px;

    display: flex;
    align-items: center;

    background: #212121;
    color: white;

    border-bottom: 1px solid #2e2e2e;

    &__title {
        font-size: 18px;
    }

    &__row {
        margin-left: auto;

        display: flex;
    }

    &__button {
        padding: 4px 6px;

        display: flex;
        align-items: center;
        justify-content: center;

        background: #303030;

        outline: none;
        border: none;
        border-radius: 6px;

        font-size: 15px;

        cursor: pointer;

        & > svg {
            margin-right: 4px;

            opacity: 0.65;
        }
    }
}
</style>
