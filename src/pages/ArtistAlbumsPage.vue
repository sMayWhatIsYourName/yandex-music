<template>
    <LayoutPage :loaded="albums.length > 0">
        <template #title>
            {{ route.query.artist_name }}
        </template>
        <template #subtitle>
            Все альбомы
        </template>
        <template #body>
            <div class="container">
                <AlbumCard
                    v-for="album in albums"
                    :key="album.id"
                    :album-id="album.id"
                />
            </div>
        </template>
    </LayoutPage>
</template>

<script lang="ts" setup>
import LayoutPage from '@/layouts/LayoutPage.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import useRequest from '@/composables/useRequest';
import AlbumInterface from '@/interfaces/AlbumInterface';
import AlbumCard from '@/components/album/AlbumCard.vue';

const route = useRoute();
const request = useRequest();
const albums = ref<AlbumInterface[]>([]);

onMounted(async () => {
    const res = await request.get(`/artists/${route.params.id}/direct-albums`);
    albums.value = res.data.result.albums;
});
</script>

<style scoped>
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
