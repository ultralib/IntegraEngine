<script setup lang="ts">
type Mode = "translate" | "rotate" | "scale";

defineProps<{
    modelValue: Mode;
}>();

const emit = defineEmits<{
    (event: "update:modelValue", val: Mode): void;
}>();

function setMode(mode: Mode) {
    emit("update:modelValue", mode);
}
</script>
<template>
    <div class="transform-buttons">
        <button
            @click="setMode('translate')"
            :data-active="modelValue === 'translate'"
            type="button"
            title="Transform"
            class="transform-buttons__btn"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.7553 24.7554C12.1458 24.3649 12.779 24.3649 13.1695 24.7554L15.9999 27.5858L18.8303 24.7554C19.2208 24.3649 19.854 24.3649 20.2445 24.7554C20.635 25.1459 20.635 25.7791 20.2445 26.1696L16.707 29.7071C16.3165 30.0977 15.6833 30.0977 15.2928 29.7071L11.7553 26.1696C11.3648 25.7791 11.3648 25.1459 11.7553 24.7554Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 19C16.5523 19 17 19.4477 17 20V29C17 29.5523 16.5523 30 16 30C15.4477 30 15 29.5523 15 29V20C15 19.4477 15.4477 19 16 19Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.2928 2.29289C15.6833 1.90237 16.3165 1.90237 16.707 2.29289L20.2445 5.83039C20.635 6.22092 20.635 6.85408 20.2445 7.24461C19.854 7.63513 19.2208 7.63513 18.8303 7.24461L15.9999 4.41421L13.1695 7.24461C12.779 7.63513 12.1458 7.63513 11.7553 7.24461C11.3648 6.85408 11.3648 6.22092 11.7553 5.83039L15.2928 2.29289Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 2C16.5523 2 17 2.44772 17 3V12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12V3C15 2.44772 15.4477 2 16 2Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.24461 11.7554C7.63513 12.1459 7.63513 12.7791 7.24461 13.1696L4.41421 16L7.24461 18.8304C7.63513 19.2209 7.63513 19.8541 7.24461 20.2446C6.85408 20.6352 6.22092 20.6352 5.83039 20.2446L2.29289 16.7071C1.90237 16.3166 1.90237 15.6834 2.29289 15.2929L5.83039 11.7554C6.22092 11.3649 6.85408 11.3649 7.24461 11.7554Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 16C2 15.4477 2.44772 15 3 15H12C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17H3C2.44772 17 2 16.5523 2 16Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24.7553 11.7554C25.1458 11.3649 25.779 11.3649 26.1695 11.7554L29.707 15.2929C30.0975 15.6834 30.0975 16.3166 29.707 16.7071L26.1695 20.2446C25.779 20.6352 25.1458 20.6352 24.7553 20.2446C24.3648 19.8541 24.3648 19.2209 24.7553 18.8304L27.5857 16L24.7553 13.1696C24.3648 12.7791 24.3648 12.1459 24.7553 11.7554Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19 16C19 15.4477 19.4477 15 20 15H29C29.5523 15 30 15.4477 30 16C30 16.5523 29.5523 17 29 17H20C19.4477 17 19 16.5523 19 16Z"
                    fill="currentColor"
                />
            </svg>
        </button>
        <button
            @click="setMode('rotate')"
            :data-active="modelValue === 'rotate'"
            type="button"
            title="Rotate"
            class="transform-buttons__btn"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M28.0249 5.46252C28.5772 5.46252 29.0249 5.91024 29.0249 6.46252V12.4625C29.0249 13.0148 28.5772 13.4625 28.0249 13.4625H22.0249C21.4726 13.4625 21.0249 13.0148 21.0249 12.4625C21.0249 11.9102 21.4726 11.4625 22.0249 11.4625H27.0249V6.46252C27.0249 5.91024 27.4726 5.46252 28.0249 5.46252Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.0001 6.00122C14.6873 6.00122 13.3874 6.26004 12.1747 6.76287C10.962 7.2657 9.86033 8.00268 8.93272 8.93164C8.54248 9.32245 7.90932 9.32292 7.51851 8.93268C7.1277 8.54244 7.12724 7.90927 7.51748 7.51846C8.63084 6.40347 9.95311 5.51891 11.4086 4.91539C12.8642 4.31187 14.4244 4.00122 16.0001 4.00122C17.5758 4.00122 19.136 4.31187 20.5916 4.91539C22.0468 5.51879 23.3688 6.40311 24.482 7.51779L28.7312 11.7544C29.1223 12.1444 29.1232 12.7775 28.7332 13.1686C28.3433 13.5597 27.7101 13.5606 27.319 13.1707L23.0675 8.93164C22.1399 8.00268 21.0382 7.2657 19.8255 6.76287C18.6128 6.26004 17.3129 6.00122 16.0001 6.00122Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.9751 19.5375C2.9751 18.9852 3.42281 18.5375 3.9751 18.5375H9.9751C10.5274 18.5375 10.9751 18.9852 10.9751 19.5375C10.9751 20.0898 10.5274 20.5375 9.9751 20.5375H4.9751V25.5375C4.9751 26.0898 4.52738 26.5375 3.9751 26.5375C3.42281 26.5375 2.9751 26.0898 2.9751 25.5375V19.5375Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.26695 18.8314C3.6569 18.4403 4.29006 18.4394 4.68116 18.8293L8.93272 23.0684C9.86034 23.9974 10.962 24.7343 12.1747 25.2372C13.3874 25.74 14.6873 25.9988 16.0001 25.9988C17.3129 25.9988 18.6128 25.74 19.8255 25.2372C21.0382 24.7343 22.1399 23.9974 23.0675 23.0684C23.4577 22.6776 24.0909 22.6771 24.4817 23.0674C24.8725 23.4576 24.873 24.0908 24.4827 24.4816C23.3693 25.5966 22.0471 26.4811 20.5916 27.0846C19.136 27.6882 17.5758 27.9988 16.0001 27.9988C14.4244 27.9988 12.8642 27.6882 11.4086 27.0846C9.95348 26.4813 8.63151 25.597 7.51832 24.4824L7.51748 24.4816L3.26903 20.2456C2.87793 19.8557 2.877 19.2225 3.26695 18.8314Z"
                    fill="currentColor"
                />
            </svg>
        </button>
        <button
            @click="setMode('scale')"
            :data-active="modelValue === 'scale'"
            type="button"
            title="Scale"
            class="transform-buttons__btn"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19 6C19 5.44772 19.4477 5 20 5H26C26.5523 5 27 5.44772 27 6V12C27 12.5523 26.5523 13 26 13C25.4477 13 25 12.5523 25 12V7H20C19.4477 7 19 6.55228 19 6Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26.7071 5.29289C27.0976 5.68342 27.0976 6.31658 26.7071 6.70711L19.7071 13.7071C19.3166 14.0976 18.6834 14.0976 18.2929 13.7071C17.9024 13.3166 17.9024 12.6834 18.2929 12.2929L25.2929 5.29289C25.6834 4.90237 26.3166 4.90237 26.7071 5.29289Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 19C6.55228 19 7 19.4477 7 20V25H12C12.5523 25 13 25.4477 13 26C13 26.5523 12.5523 27 12 27H6C5.44772 27 5 26.5523 5 26V20C5 19.4477 5.44772 19 6 19Z"
                    fill="currentColor"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.7071 18.2929C14.0976 18.6834 14.0976 19.3166 13.7071 19.7071L6.70711 26.7071C6.31658 27.0976 5.68342 27.0976 5.29289 26.7071C4.90237 26.3166 4.90237 25.6834 5.29289 25.2929L12.2929 18.2929C12.6834 17.9024 13.3166 17.9024 13.7071 18.2929Z"
                    fill="currentColor"
                />
            </svg>
        </button>
    </div>
</template>

<style scoped lang="scss">
.transform-buttons {
    width: max-content;

    display: flex;

    &__btn {
        width: 40px;
        height: 40px;

        margin-right: 8px;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        background: #212121;
        color: #808080;

        outline: none;
        border: none;
        border-radius: 10px;

        transition: 0.3s ease-in-out background;

        &[data-active="true"] {
            background: #2869f6 !important;
            color: white;
        }
        &:hover {
            background: #303030;
        }
        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
