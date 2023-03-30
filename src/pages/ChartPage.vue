<template>
    <LayoutPage :loaded="chartTracks.length > 0">
        <template #title>
            Чарт Яндекс.Музыки
        </template>
        <template #subtitle>
            Треки, популярные на Яндекс.Музыке прямо сейчас
        </template>
        <template #body>
            <div class="main-body">
                <TheTracksTable :tracks="chartTracks"/>
            </div>
        </template>
    </LayoutPage>
</template>

<script lang="ts" setup>
import LayoutPage from '@/layouts/LayoutPage.vue';
import TheTracksTable from '@/components/track/TracksTable.vue';
import { onMounted, ref, Ref } from 'vue';
import TrackInterface from '@/interfaces/TrackInterface';
import useRequest from '@/composables/useRequest';
import PlaylistTracksInterface from '@/interfaces/PlaylistTracksInterface';

const request = useRequest();
const chartTracks: Ref<Array<TrackInterface>> = ref([]);

onMounted(async () => {
    chartTracks.value = await getChartTracks();
});

async function getChartTracks() {
    const res = await request.get('/landing3/chart');
    return res.data.result.chart.tracks.map((track: PlaylistTracksInterface) => (track.track));
}
</script>

<style scoped>

</style>
