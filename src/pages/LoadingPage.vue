<template>
    <LayoutSmall>
        <div class="loading-page">
            <BaseLoadingSpinner/>
            <p>Загрузка</p>
        </div>
    </LayoutSmall>
</template>

<script lang="ts" setup>
import LayoutSmall from '@/layouts/LayoutSmall.vue';
import BaseLoadingSpinner from '@/components/ui/BaseLoadingSpinner.vue';
</script>

<style scoped>
.loading-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
}
</style>
