<template>
    <div class="result-best-body">
        <BaseImage
            :alt="track.title"
            :height="150"
            :src="track.coverUri"
            :width="150"
            type="track"
        />
        <p class="result-best-name">
            {{ track.title }}
        </p>
        <div class="footer">
            <div class="result-best-artist">
                <ArtistsLinks :artists="track.artists"/>
            </div>
            <p class="result-best-type">
                Трек
            </p>
        </div>
        <button
            class="play-btn"
            @click="playTrack"
        >
            <i class="fas fa-play"/>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useQueueStore } from '@/store/queue';
import useTrack from '@/composables/useTrack';
import TrackInterface from '@/interfaces/TrackInterface';
import ArtistsLinks from '@/components/artist/ArtistsLinks.vue';
import BaseImage from '@/components/ui/BaseImage.vue';

const queueStore = useQueueStore();

const props = defineProps<{
    track: any;
}>();

async function playTrack() {
    const track = await useTrack([props.track.id]);
    queueStore.unshiftToQueue(track[0] as TrackInterface);
}

</script>

<style scoped>
.result-best-body {
    background: var(--background);
    border-radius: 6px;
    height: calc(100% - 45px);
    padding: 20px 80px 20px 20px;
    position: relative;
    overflow: hidden;
}

.result-best-name {
    font-size: 32px;
    font-weight: 600;
    margin-top: 20px;
}

.result-best-body:hover .play-btn {
    opacity: 1;
    transition: 0.2s;
    transform: translateY(0px);
}

img {
    border-radius: 8px;
    margin-bottom: 20px;
    width: 125px;
    height: 125px;
}

.result-best-name {
    font-size: 28px;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.result-best-type {
    background: #1b202a;
    border-radius: 20px;
    padding: 2px 10px;
    width: min-content;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
}

.footer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.result-best-artist {
    margin-right: 10px;
}

.result-best-artist a {
    cursor: pointer;
    font-size: 14px;
}

.result-best-artist a:hover {
    text-decoration: underline;
}

.play-btn {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    border-radius: 50%;
    background: var(--main-color);
    opacity: 0;
    transform: translateY(10px);
    transition: 0.2s;
}

.play-btn i {
    transform: translate(1px, 1px);
}
</style>
