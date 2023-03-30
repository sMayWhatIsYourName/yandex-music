<template>
    <RouterLink
        v-if="playlist"
        :to="{name: 'playlist', params: {kind: playlist.kind, uid: playlist.uid}}"
        class="playlist-card"
    >
        <div class="playlist-card-image">
            <BaseImage
                :alt="playlist.title"
                :height="200"
                :src="playlist.cover?.uri"
                :width="200"
                type="playlist"
            />
        </div>

        <h3 class="title">
            {{ playlist.title }}
        </h3>
        <p class="playlist-description">
            {{ playlist.description }}
        </p>
        <p
            class="track-count"
        >
            {{ playlist.trackCount }} Треков
        </p>
    </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import BaseImage from '@/components/ui/BaseImage.vue';
import { PlaylistInterface } from '@/interfaces/PersonalPlaylistsInterface';

defineProps<{
    playlist: PlaylistInterface;
    showTracksCount?: boolean;
}>();

</script>

<style scoped>
.playlist-card {
    background: #292C3B;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    max-width: 160px;
    width: 100%;
    height: 235px;
}

.playlist-card img {
    margin-bottom: 12px;
}

.title {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
}

.playlist-card-image {
    position: relative;
}

.playlist-card-image img {
    width: 100%;
    object-fit: cover;
}

.playlist-description {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    word-break: break-word;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #8E929C;
}

.track-count {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
    margin-left: auto;
    margin-top: auto;
}
</style>
