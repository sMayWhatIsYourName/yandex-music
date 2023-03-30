<template>
    <main
        v-if="tracks.length"
        class="main"
    >
        <div
            class="main-container"
            :style="{height: `calc(100% + ${offset}px)`}"
        >
            <h2 class="main-container-title">
                Треки
            </h2>
            <TheTracksTable
                v-if="tracks.length"
                :filter-bar="true"
                :tracks="tracks"
                :without-margin="true"
            />
        </div>
    </main>
    <BaseLoading v-else/>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, Ref } from 'vue';
import TheTracksTable from '@/components/track/TracksTable.vue';
import usePlaylists from '@/composables/usePlaylists';
import useUserPlaylists from '@/composables/useUserPlaylists';
import TrackInterface from '@/interfaces/TrackInterface';
import useTrack from '@/composables/useTrack';
import { useUserStore } from '@/store/user';
import BaseLoading from '@/components/ui/BaseLoading.vue';
import { useQueueStore } from '@/store/queue';

const userStore = useUserStore();
const queueStore = useQueueStore();
const tracks: Ref<Array<TrackInterface>> = ref([]);

onMounted(async () => {
    // todo: Promise.all
    const playlistsKinds = (await useUserPlaylists()).map(item => item.kind);
    playlistsKinds.push(3);
    const playlists = await usePlaylists(playlistsKinds, userStore.userId);
    const trackIds = playlists.map(item => item.tracks.map(item => item.id)).flat();

    tracks.value = await useTrack(trackIds);
});

const offset = computed(() => queueStore.queue.length ? 70 : 169);
</script>

<style scoped>
.main {
    overflow-y: hidden;
}
</style>
