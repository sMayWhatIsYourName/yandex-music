<template>
    <LayoutItems :loaded="Object.keys(albums).length > 0">
        <template #title>
            Альбомы
        </template>
        <template #body>
            <AlbumCard
                v-for="album in albums"
                :key="album.id"
                :album-id="album.id"
            />
        </template>
    </LayoutItems>
</template>

<script lang="ts" setup>
import LayoutItems from '@/layouts/LayoutItems.vue';
import AlbumCard from '@/components/album/AlbumCard.vue';
import { onMounted, ref, Ref } from 'vue';
import AlbumInterface from '@/interfaces/AlbumInterface';
import useRequest from '@/composables/useRequest';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const request = useRequest();

const albums: Ref<Array<AlbumInterface>> = ref([]);

onMounted(async () => {
    const res = await request.get(`/users/${userStore.userId}/likes/albums`);
    const albumIds = res.data.result.map((item: AlbumInterface) => item.id);

    albums.value = (await request.get('/albums', {
        params: {
            albumIds: albumIds.toString()
        }
    })).data.result;
});
</script>

<style scoped>

</style>
