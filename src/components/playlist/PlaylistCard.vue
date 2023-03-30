<template>
    <RouterLink
        v-if="playlist"
        :to="{name: 'playlist', params: {kind: props.playlistKind, uid: props.playlistUid}}"
        class="playlist-card"
    >
        <div class="playlist-card-image">
            <BaseImage
                :alt="playlist.title"
                :height="200"
                :src="playlist.ogImage"
                :width="200"
                type="playlist"
            />
        </div>

        <h3 class="title">
            {{ playlist.title }}
        </h3>
        <p
            v-if="playlist.owner"
            class="author"
        >
            От {{ playlist.owner.name }}
        </p>
    </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, Ref } from 'vue';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import usePlaylist from '@/composables/usePlaylist';
import BaseImage from '@/components/ui/BaseImage.vue';

const props = defineProps<{
    playlistUid: number;
    playlistKind: number;
    playlist?: PlaylistInterface;
}>();

const playlist: Ref<PlaylistInterface> = ref({} as PlaylistInterface);
onMounted(async () => {
    if (props.playlist) {
        playlist.value = props.playlist;
    } else {
        playlist.value = await usePlaylist(props.playlistKind, props.playlistUid);
    }
});
</script>

<style scoped>
.playlist-card {
    background: #292C3B;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    max-width: 160px;
    width: 100%;
    height: 235px;
}

.playlist-card img {
    margin-bottom: 12px;
}

.title {
    font-weight: 500;
    font-size: 12.8px;
    line-height: 16px;
}

.playlist-card-image {
    position: relative;
}

.playlist-card-image img {
    width: 100%;
    object-fit: cover;
}

.author {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    margin-top: auto;
}
</style>
