<template>
    <p
        v-if="artists.length"
        class="artists-links"
    >
        <RouterLink
            v-for="(artist, index) in artists"
            :key="artist.id"
            :to="{name: 'artist', params: {id: artist.id}}"
        >
            {{ useArtistName(artist, index, artists.length) }}
        </RouterLink>
    </p>
</template>

<script lang="ts" setup>
import useArtistName from '@/composables/useArtistName';
import { defineProps } from 'vue';
import TrackArtistInterface from '@/interfaces/TrackArtistInterface';
import ArtistInterface from '@/interfaces/ArtistInterface';

defineProps<{
    artists: Array<ArtistInterface> | Array<TrackArtistInterface>;
}>();
</script>

<style scoped lang="scss">
.artists-links {
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;

    a {
        font-size: inherit;
        color: inherit;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
