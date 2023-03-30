<template>
    <div class="layout-small-container">
        <img
            alt="logo"
            class="image"
            src="@/assets/img/yandex-official-logo.svg"
        >
        <slot/>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.layout-small-container {
    display: flex;
    flex-direction: column;
    padding: 60px;
    color: white;
    justify-content: center;
    align-items: center;
    height: 100%;
    --webkit-app-region: no-drag;
}

.image {
    height: 60px;
    margin: 0 auto;
}
</style>
