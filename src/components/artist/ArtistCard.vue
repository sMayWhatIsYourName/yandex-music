<template>
    <RouterLink
        :to="{name: 'artist', params: {id: artist.id}}"
        class="artist-card"
    >
        <div class="artist-card__image">
            <BaseImage
                :alt="artist.name"
                :height="200"
                :src="artist?.cover?.uri"
                :width="200"
                type="artist"
            />
        </div>
        <h4 class="artist-card__title">
            {{ artist.name }}
        </h4>
        <p
            v-if="artist?.counts?.tracks"
            class="artist-card__track-count"
        >
            {{ artist?.counts?.tracks }} Треков
        </p>
    </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import ArtistInterface from '@/interfaces/ArtistInterface';
import { SimilarArtist } from '@/interfaces/ArtistBriefInterface';
import { Data } from '@/interfaces/LandingBlocksInterface';
import { SearchArtistInterface } from '@/interfaces/SearchArtistInterface';
import BaseImage from '@/components/ui/BaseImage.vue';

defineProps<{
    artist: ArtistInterface | SimilarArtist | Data | SearchArtistInterface;
}>();

</script>

<style lang="scss" scoped>
.artist-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &__title {
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 7px;
    }

    &__image {
        width: 100%;
        max-width: 100%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 20px;
        overflow: hidden;
    }

    &__tracks-count {
        font-weight: 400;
        font-size: 12px;
    }

    @media (min-width: 1000px) {
        &__image {
            width: 200px;
        }
    }
}
</style>
