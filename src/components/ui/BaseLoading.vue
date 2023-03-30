<template>
    <div class="loading-container">
        <BaseLoadingSpinner/>
    </div>
</template>

<script lang="ts" setup>
import BaseLoadingSpinner from '@/components/ui/BaseLoadingSpinner.vue';
</script>

<style scoped>
.loading-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #1b202a;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 20px 0 0 0;
}
</style>
