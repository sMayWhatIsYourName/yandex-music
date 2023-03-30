<template>
    <main class="main">
        <h2 class="title">
            <slot name="title"/>
        </h2>
        <div
            v-if="loaded"
            class="container"
        >
            <slot name="body"/>
        </div>
        <BaseLoading v-else/>
    </main>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import BaseLoading from '@/components/ui/BaseLoading.vue';

defineProps<{
    loaded: boolean;
}>();

</script>

<style scoped>
.title {
    margin-bottom: 20px;
}

.container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px 7px;
}

@media (min-width: 1000px) {
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        grid-template-columns: unset;
    }
}
</style>
