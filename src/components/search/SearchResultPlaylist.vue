<template>
    <RouterLink
        :to="{name: 'playlist', params: {kind: playlist.kind, uid: playlist.owner.uid}}"
    >
        <div class="result-best-body">
            <BaseImage
                :alt="playlist.title"
                :height="200"
                :src="playlist.cover.uri || playlist.ogImage"
                :width="200"
                type="playlist"
            />
            <p class="result-best-name">
                {{ playlist.title }}
            </p>

            <div class="footer">
                <div class="result-best-artist">
                    От {{ playlist.owner.name }}
                </div>
                <p class="result-best-type">
                    Плейлист
                </p>
            </div>
        </div>
    </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import BaseImage from '@/components/ui/BaseImage.vue';

defineProps<{
    playlist: any;
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
    margin-top: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.result-best-body img {
    border-radius: 8px;
    margin-bottom: 20px;
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

.footer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.result-best-artist {
    margin-right: 10px;
}

.result-best-artist a {
    cursor: pointer;
    font-size: 14px;
}

.result-best-artist a:hover {
    text-decoration: underline;
}
</style>
