<template>
    <aside class="inspector">
        <p class="inspector__title">INSPECTOR</p>
    </aside>
</template>

<style scoped lang="scss">
.inspector {
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
