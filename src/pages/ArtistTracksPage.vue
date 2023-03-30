<template>
    <LayoutPage :loaded="tracks.length > 0">
        <template #title>
            {{ route.query.artist_name }}
        </template>
        <template #subtitle>
            Все треки
        </template>
        <template #body>
            <TheTracksTable
                :tracks="tracks"
                :without-margin="true"
                :style="{height: `calc(100% + ${offset}px)`}"
            />
        </template>
    </LayoutPage>
</template>

<script lang="ts" setup>
import LayoutPage from '@/layouts/LayoutPage.vue';
import TheTracksTable from '@/components/track/TracksTable.vue';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, Ref } from 'vue';
import useRequest from '@/composables/useRequest';
import TrackInterface from '@/interfaces/TrackInterface';
import { useQueueStore } from '@/store/queue';

const queueStore = useQueueStore();
const route = useRoute();
const request = useRequest();
const tracks: Ref<Array<TrackInterface>> = ref([]);

onMounted(async () => {
    tracks.value = await getTracksData(await getTracks());
});

async function getTracksData(ids: Array<number>) {
    const params = new URLSearchParams();
    params.append('trackIds', ids.toString());

    const res = await request.post('/tracks', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return res.data.result;
}

async function getTracks() {
    const res = await request.get(`/artists/${route.params.id}/track-ids-by-rating`);
    return res.data.result.tracks;
}

const offset = computed(() => queueStore.queue.length ? -110 : 0);
</script>
