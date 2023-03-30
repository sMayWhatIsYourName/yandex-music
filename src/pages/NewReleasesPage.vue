<template>
    <LayoutPage :loaded="newReleases.length > 0">
        <template #title>
            Новые релизы
        </template>

        <template #subtitle>
            Новые треки, альбомы и сборники
        </template>

        <template #body>
            <div class="main-body">
                <AlbumCard
                    v-for="release in newReleases"
                    :key="release.id"
                    :album="release"
                    :album-id="release.id"
                />
            </div>
        </template>
    </LayoutPage>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import useRequest from '@/composables/useRequest';
import LayoutPage from '@/layouts/LayoutPage.vue';
import AlbumCard from '@/components/album/AlbumCard.vue';
import useAlbums from '@/composables/useAlbums';
import AlbumInterface from '@/interfaces/AlbumInterface';

const request = useRequest();
const newReleases: Ref<Array<AlbumInterface>> = ref([]);

onMounted(async () => {
    newReleases.value = await useAlbums(await getNewReleases());
});

async function getNewReleases() {
    const res = await request.get('/landing3/new-releases');
    return res.data.result.newReleases;
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
