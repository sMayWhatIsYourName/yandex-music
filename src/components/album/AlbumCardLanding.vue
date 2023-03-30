<template>
    <RouterLink
        v-if="album"
        :to="{name: 'album', params: {id: album.id}}"
        class="album-card-landing"
    >
        <BaseImage
            :alt="album.title"
            :height="150"
            :src="album.coverUri"
            :width="150"
            type="album"
            class="album-card-landing__image"
        />
        <h3 class="album-card-landing__title">
            {{ album.title }}
        </h3>
        <ArtistsLinks
            v-if="album.artists && album.type !== 'compilation'"
            :artists="album.artists"
            class="album-card-landing__author"
        />
        <div class="album-card-landing__footer">
            <p
                v-if="album.type"
                class="album-card-landing__type"
            >
                {{ type }}
            </p>
            <p
                v-if="album.year"
                class="album-card-landing__year"
            >
                {{ album.year }}
            </p>
        </div>
    </RouterLink>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { Data, Payload } from '@/interfaces/LandingBlocksInterface';
import ArtistsLinks from '@/components/artist/ArtistsLinks.vue';
import BaseImage from '@/components/ui/BaseImage.vue';

const props = defineProps<{
    album?: Data | Payload;
}>();

const type = computed(() => {
    switch (props.album?.type) {
    case 'compilation':
        return 'сборник';
    case 'playlist':
        return 'плейлист';
    case 'single':
        return 'сингл';
    default:
        return props.album?.type;
    }
});

</script>

<style scoped lang="scss">
.album-card-landing {
    background: #292C3B;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
    height: 235px;
    max-width: 160px;

    &__image {
        margin-bottom: 12px;
    }

    &__title {
        font-size: 13px;
        font-weight: 500;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        line-height: 16px;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__author {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #8E929C;
    }

    &__type {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #8E929C;
    }

    &__year {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #8E929C;
        margin-left: auto;
    }

    &__footer {
        display: flex;
        flex-direction: row;
        margin-top: auto;
    }
}
</style>
