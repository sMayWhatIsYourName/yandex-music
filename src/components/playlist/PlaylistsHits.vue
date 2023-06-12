<template>
    <div
        v-if="playlists.length"
        class="main-container"
    >
        <div class="main-container-title">
            <h2>
                Хиты и новинки<br>
                <span class="main-container-subtitle">Новая популярная музыка для вас от нашей редакции</span>
            </h2>
            <RouterLink
                :to="{name: 'new-hists'}"
                class="main-container-show-all"
            >
                Показать все
            </RouterLink>
        </div>
        <BaseFlickity
            ref="flickity"
            :options="useFlickityDefaultOptions"
        >
            <div
                v-for="hit in playlists"
                :key="hit.data.id"
                class="carousel-cell"
            >
                <AlbumCard
                    :album="hit.data"
                    :album-id="hit.data.id"
                />
            </div>
        </BaseFlickity>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseFlickity from '@/components/ui/BaseFlickity.vue';
import useFlickityDefaultOptions from '@/composables/useFlickityDefaultOptions';
import { usePlaylistStore } from '@/store/playlist';
import AlbumCard from '@/components/album/AlbumCard.vue';

const playlistStore = usePlaylistStore();

const playlists = computed(() => playlistStore.hits);
console.log(playlists.value, 'hiits');

</script>

<style scoped>

</style>
