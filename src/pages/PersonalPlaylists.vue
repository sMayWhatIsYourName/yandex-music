<template>
    <div
        v-if="playlists.length"
        class="main-container"
    >
        <div class="main-container-title">
            <h2>
                Каждый день собираем для вас<br>
            </h2>
        </div>
        <BaseFlickity
            ref="flickity"
            :options="useFlickityDefaultOptions"
        >
            <div
                v-for="personal in playlists"
                :key="personal.data.data.uid"
                class="carousel-cell"
            >
                <PersonalPlaylistCard
                    :playlist="personal.data.data"
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
import PersonalPlaylistCard from '@/components/playlist/PlaylistPersonalCard.vue';

const playlistStore = usePlaylistStore();

const playlists = computed(() => playlistStore.personal);
</script>

<style scoped>

</style>
