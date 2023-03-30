<template>
    <p
        v-if="albums.length"
        class="album-links"
    >
        <RouterLink
            v-for="(album, index) in albums"
            :key="album.id"
            :to="{name: 'album', params: {id: album.id}}"
        >
            {{ useAlbumName(album, index, albums.length) }}
        </RouterLink>
    </p>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import AlbumInterface from '@/interfaces/AlbumInterface';
import useAlbumName from '@/composables/useAlbumName';

defineProps<{
    albums: Array<AlbumInterface>;
}>();
</script>

<style scoped lang="scss">
.album-links {
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    margin: auto 0;

    a {
        font-size: inherit;
        color: inherit;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
