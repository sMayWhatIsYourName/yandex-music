<template>
    <div
        v-click-outside="handleClose"
        class="menu-container"
    >
        <button
            class="menu-container-head"
            @click="handleClick"
        >
            <i class="far fa-ellipsis-h"/>
        </button>
        <div
            v-show="opened"
            class="menu-container-body"
        >
            <slot/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

const opened: Ref<boolean> = ref(false);

function handleClick() {
    opened.value = !opened.value;
}

function handleClose() {
    opened.value = false;
}

</script>

<style scoped>
.menu-container {
    display: flex;
    flex-direction: column;
    position: relative;
}

.menu-container-head {
    background: none;
    color: white;
}

.menu-container-body {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    background: #252c3e;
    padding: 5px;
    overflow: hidden;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
}
</style>
