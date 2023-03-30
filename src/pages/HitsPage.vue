<template>
    <LayoutPage :loaded="newPlaylists.length > 0">
        <template #title>
            Хиты и новинки
        </template>
        <template #subtitle>
            Новая и популярная музыка для вас от нашей редакции
        </template>
        <template #body>
            <div class="main-body">
                <PlaylistCard
                    v-for="playlist in newPlaylists"
                    :key="playlist.uid"
                    :playlist="playlist"
                    :playlist-kind="playlist.kind"
                    :playlist-uid="playlist.uid"
                />
                />
            </div>
        </template>
    </LayoutPage>
</template>

<script lang="ts" setup>
import LayoutPage from '@/layouts/LayoutPage.vue';
import PlaylistCard from '@/components/playlist/PlaylistCard.vue';
import { onMounted, ref, Ref } from 'vue';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import useRequest from '@/composables/useRequest';
import PlaylistHitsInterface from '@/interfaces/PlaylistHitsInterface';

const request = useRequest();
const newPlaylists: Ref<Array<PlaylistInterface>> = ref([]);

onMounted(async () => {
    newPlaylists.value = await getNewPlaylistsData(await getNewPlaylists());
});

async function getNewPlaylists(): Promise<Array<PlaylistHitsInterface>> {
    const res = await request.get('landing3/new-playlists');
    return res.data.result.newPlaylists;
}

async function getNewPlaylistsData(ids: Array<PlaylistHitsInterface>) {
    const params = new URLSearchParams();
    params.append('playlistIds', ids.map(item => (`${item.uid}:${item.kind}`)).toString());

    const res = await request.post('/playlists/list', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return res.data.result;
}
</script>

<style scoped>
.main-body {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px 6px;
}

@media (min-width: 1001px) {
    .main-body {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>
