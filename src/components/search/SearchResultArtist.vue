<template>
    <RouterLink
        :to="{name: 'artist', params: {id: artist.id}}"
    >
        <div class="result-best-body">
            <BaseImage
                :alt="artist.name"
                :height="200"
                :src="artist.cover.uri"
                :width="200"
                type="artist"
            />
            <p class="result-best-name">
                {{ artist.name }}
            </p>

            <p class="result-best-type">
                Артист
            </p>
        </div>
    </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import BaseImage from '@/components/ui/BaseImage.vue';

defineProps<{
    artist: any;
}>();
</script>

<style scoped>
.result-best-body {
    background: var(--background);
    border-radius: 6px;
    height: calc(100% - 45px);
    padding: 20px 80px 20px 20px;
    position: relative;
    overflow: hidden;
}

.result-best-name {
    font-size: 28px;
    font-weight: 600;
}

.result-best-body img {
    margin-bottom: 20px;
    border-radius: 50%;
    width: 125px;
    height: 125px;
}

.result-best-type {
    background: #1b202a;
    border-radius: 20px;
    padding: 2px 10px;
    width: min-content;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
}
</style>
