<template>
    <RouterLink
        :to="{name: 'artist', params: {id: artist.id}}"
        class="artist-card"
    >
        <BaseImage
            :alt="artist.name"
            :height="200"
            :src="artist?.cover?.uri"
            :width="200"
            class="card-image"
            type="artist"
        />

        <h4>{{ artist.name }}</h4>
        <p
            v-if="artist?.counts?.tracks"
            class="tracks-count"
        >
            {{ artist?.counts?.tracks }} Треков
        </p>
    </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { SearchArtistInterface } from '@/interfaces/SearchArtistInterface';
import BaseImage from '@/components/ui/BaseImage.vue';

defineProps<{
    artist: SearchArtistInterface;
}>();

</script>

<style scoped>
.artist-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.card-image {
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
}

.tracks-count {
    font-weight: 400;
    font-size: 12px;
}

h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 7px;
}
</style>
