<template>
    <RecycleScroller
        v-if="tracks.length"
        :item-size="50"
        :items="tracks"
        class="scroller"
        key-field="id"
    >
        <template #default="{ item, index }">
            <div
                class="track"
                @click="playCurrent(item, index)"
            >
                <div
                    class="image"
                >
                    <BaseImage
                        :alt="item.title"
                        :height="100"
                        :src="item.coverUri"
                        :width="100"
                        type="track"
                    />
                    <PlayingIcon
                        v-if="playerStore.trackIndex === Number(item.id)"
                    />
                </div>
                <div class="title">
                    <p>{{ item.title }}</p>
                    <ArtistsLinks
                        :artists="item.artists"
                        class="title-artist"
                    />
                </div>
                <p class="duration">
                    {{ useConvertDuration(item.durationMs) }}
                </p>
            </div>
        </template>
    </RecycleScroller>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { SearchTrackInterface } from '@/interfaces/SearchTrackInterface';
import ArtistsLinks from '@/components/artist/ArtistsLinks.vue';
import PlayingIcon from '@/components/track/TrackPlayingIcon.vue';
import useConvertDuration from '@/composables/useConvertDuration';
import { usePlayerStore } from '@/store/player';
import TrackInterface from '@/interfaces/TrackInterface';
import { useQueueStore } from '@/store/queue';
import BaseImage from '@/components/ui/BaseImage.vue';

const playerStore = usePlayerStore();
const queueStore = useQueueStore();

const props = defineProps<{
    tracks: Array<SearchTrackInterface>;
}>();

function playCurrent(track: TrackInterface, index: number) {
    playerStore.setShuffle(0);

    let newQueue = props.tracks.slice(index, props.tracks.length);
    newQueue = newQueue.concat(props.tracks.slice(0, index));
    queueStore.setQueue(newQueue as unknown as TrackInterface[]);

    playerStore.setIsStation(false);
}

</script>

<style scoped>
.scroller {
    height: 100%;
    margin-top: 20px;
}

.track {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 40px 40fr 1fr;
}

.track {
    cursor: pointer;
}

.track:hover i {
    display: block;
}

.track:hover span {
    display: none;
}

.track:hover {
    background: #1E222D;
}

.image {
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
}

.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    font-size: 15px;
    line-height: 15px;
}

.title-artist {
    font-size: 13px;
    color: #8E929C;
}

.duration {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
    padding-right: 10px;
}
</style>
