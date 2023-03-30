<template>
    <main
        v-if="isLoaded"
        class="main"
    >
        <h2 class="title">
            Плейлисты
        </h2>
        <div
            class="container"
        >
            <PlaylistCard
                v-for="playlist in playlists"
                :key="playlist.uid"
                :playlist-kind="playlist.kind"
                :playlist-uid="playlist.uid"
            />
        </div>
        <h2
            v-if="userStore.likes.playlists.length > 0"
            class="title title-margin"
        >
            Вам так же понравились эти плейлисты
        </h2>
        <div
            class="container"
        >
            <PlaylistCard
                v-for="item in userStore.likes.playlists"
                :key="item.playlist.uid"
                :playlist="item.playlist"
                :playlist-kind="item.playlist.kind"
                :playlist-uid="item.playlist.uid"
            />
        </div>
    </main>
    <BaseLoading v-else/>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import useUserPlaylists from '@/composables/useUserPlaylists';
import useUserFavoritePlaylist from '@/composables/useUserFavoritePlaylist';
import PlaylistWithOutTracksInterface from '@/interfaces/PlaylistWithOutTracksInterface';
import PlaylistCard from '@/components/playlist/PlaylistCard.vue';
import BaseLoading from '@/components/ui/BaseLoading.vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const isLoaded = ref(false);
const playlists: Ref<Array<PlaylistInterface | PlaylistWithOutTracksInterface>> = ref([]);

onMounted(async () => {
    playlists.value = await useUserPlaylists();
    playlists.value.push(await useUserFavoritePlaylist());
    isLoaded.value = true;
});

</script>

<style scoped>
.title {
    margin-bottom: 20px;
}

.title-margin {
    margin-top: 20px;
}

.container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
}

@media (min-width: 1001px) {
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>
