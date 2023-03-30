<template>
    <div class="main-container">
        <div class="main-container-title">
            <h2>
                Новые релизы<br>
                <span class="main-container-subtitle">Новые треки, альбомы и сборники</span>
            </h2>
            <RouterLink
                :to="{name: 'new-releases'}"
                class="main-container-show-all"
            >
                Показать все
            </RouterLink>
        </div>
        <BaseFlickity
            v-if="newReleases.length"
            ref="flickity"
            :options="useFlickityDefaultOptions"
        >
            <div
                v-for="release in newReleases"
                :key="release.id"
                class="carousel-cell"
            >
                <PlaylistCardLanding
                    :playlist="release.data"
                    :show-tracks-count="false"
                />
            </div>
        </BaseFlickity>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useReleaseStore } from '@/store/release';
import BaseFlickity from '@/components/ui/BaseFlickity.vue';
import useFlickityDefaultOptions from '@/composables/useFlickityDefaultOptions';
import PlaylistCardLanding from '@/components/playlist/PlaylistCardLanding.vue';

const releaseStore = useReleaseStore();
const newReleases = computed(() => releaseStore.releases);
</script>

<style scoped>

</style>
