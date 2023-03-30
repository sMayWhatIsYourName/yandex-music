<template>
    <RouterLink
        :to="{name: 'playlist', params: {kind: playlist.kind, uid: playlist.uid}}"
        class="playlist-block"
    >
        <BaseImage
            :alt="playlist.title"
            :height="100"
            :src="playlist.ogImage"
            :width="100"
            type="playlist"
        />
        <h4>{{ playlist.title }}</h4>
    </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import BaseImage from '@/components/ui/BaseImage.vue';
import PlaylistInterface from '@/interfaces/PlaylistInterface';

defineProps<{
    playlist: PlaylistInterface
}>();

</script>

<style scoped>
.playlist-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 56px;
    overflow: hidden;
    padding: 3px 20px 3px 3px;
    border-radius: 4px;
    background: #292D39;
    -webkit-app-region: no-drag;
    cursor: pointer;
}

.playlist-block img {
    width: 50px;
    height: 50px;
    margin-right: 24px;
    border-radius: 2px;
}

.playlist-block h4 {
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
