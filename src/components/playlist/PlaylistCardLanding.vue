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
        <p
            v-if="playlist.owner"
            class="author"
        >
            От {{ playlist.owner.name }}
        </p>
        <p
            v-if="showTracksCount"
            class="track-count"
        >
            {{ playlist.trackCount }} Треков
        </p>
    </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Data, Payload } from '@/interfaces/LandingBlocksInterface';
import BaseImage from '@/components/ui/BaseImage.vue';

defineProps<{
    playlist: Data | Payload;
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
    font-size: 12.8px;
    line-height: 16px;
}

.playlist-card-image {
    position: relative;
}

.playlist-card-image img {
    width: 100%;
    object-fit: cover;
}

.track-count {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
}

.author {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    margin-top: auto;
}
</style>
