<template>
    <div
        v-if="playlists.length"
        class="main-container"
    >
        <h2 class="main-container-title">
            Главное
        </h2>
        <div class="playlists-container">
            <PlaylistCardSmall
                v-for="playlist in playlists"
                :key="playlist.playlistUuid"
                :playlist="playlist"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { usePlaylistStore } from '@/store/playlist';
import PlaylistCardSmall from '@/components/playlist/PlaylistSmallCard.vue';

const playlistStore = usePlaylistStore(); // Берем плейлисты из списка личных плейлистов
const playlists = computed(() => playlistStore.all);
</script>

<style scoped>
.playlists-container {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
}

@media (max-width: 1000px) {
    .playlists-container .playlist-block:nth-child(n+7) {
        display: none;
    }
}

@media (min-width: 1001px) {
    .playlists-container {
        grid-template-columns: repeat(6, 1fr);
    }

    .playlists-container .playlist-block:nth-child(n+13) {
        display: none;
    }
}
</style>
