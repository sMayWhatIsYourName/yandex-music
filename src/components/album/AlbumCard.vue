<template>
    <RouterLink
        v-if="album"
        :to="{name: 'album', params: {id: props.albumId}}"
        class="album-card"
    >
        <BaseImage
            :alt="album.title"
            :height="200"
            :src="album.ogImage"
            :width="200"
            class="album-card__image"
        />

        <h3 class="album-card__title">
            {{ album.title }}
        </h3>
        <ArtistsLinks
            v-if="album.artists && album.type !== 'compilation'"
            :artists="album.artists"
            class="album-card__author"
        />
        <div class="album-card__footer">
            <p
                v-if="album.type"
                class="album-card__type"
            >
                {{ type }}
            </p>
            <p
                v-if="album.year"
                class="album-card__year"
            >
                {{ album.year }}
            </p>
        </div>
    </RouterLink>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from 'vue';
import AlbumInterface from '@/interfaces/AlbumInterface';
import useAlbum from '@/composables/useAlbum';
import { Data, Payload } from '@/interfaces/LandingBlocksInterface';
import ArtistsLinks from '@/components/artist/ArtistsLinks.vue';
import BaseImage from '@/components/ui/BaseImage.vue';

type AlbumType = AlbumInterface | Data | Payload;

const props = defineProps<{
    albumId: number;
    album?: AlbumType;
}>();

const album = ref<AlbumType | null>(null);

onMounted(async () => {
    if (props.album) {
        album.value = props.album;
    } else {
        album.value = await useAlbum(props.albumId);
    }
});

const type = computed(() => {
    if (!album.value) {
        return;
    }

    switch (album.value?.type) {
    case 'compilation':
        return 'сборник';
    case 'playlist':
        return 'плейлист';
    case 'single':
        return 'сингл';
    case 'podcast':
        return 'подкаст';
    default:
        return album.value.type;
    }
});

</script>

<style scoped lang="scss">
.album-card {
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
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        align-items: center;
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

    &:hover {
        &__image button {
            opacity: 1;
            transition: 0.2s;
        }
    }
}
</style>
