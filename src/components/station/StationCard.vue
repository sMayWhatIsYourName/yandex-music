<template>
    <div
        class="station-card"
        @click="usePlayStation(station.station.id.tag, station.station.id.type)"
    >
        <div
            :style="{background: station.station.icon.backgroundColor}"
            class="station-image-block"
        >
            <BaseImage
                :alt="station.station.name"
                :height="200"
                :src="station.station.icon.imageUrl"
                :width="200"
            />

            <div class="play-icon">
                <i class="fas fa-play"/>
            </div>
        </div>
        <p class="station-card-name">
            {{ station.station.name }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Station } from '@/interfaces/StationDashboardInterface';
import usePlayStation from '@/composables/usePlayStation';
import BaseImage from '@/components/ui/BaseImage.vue';

defineProps<{
    station: Station
}>();

</script>

<style scoped>
.station-image-block {
    width: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;
}

.station-image-block img {
    width: 50%;
    height: 50%;
}

.play-icon {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.2s;
    border-radius: 4px;
}

.station-card:hover .play-icon {
    transition: 0.2s;
    opacity: 1;
}

.fa-play {
    padding: 12px;
    font-size: 14px;
    background: var(--main-color);
    color: black;
    border-radius: 25px;
}

.station-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: #292C3B;
    border-radius: 6px;
    padding: 13px 13px 21px 13px;
}

.station-card-name {
    text-align: center;
    margin-top: auto;
}

@media (min-width: 1001px) {
    .fa-play {
        font-size: 24px;
        border-radius: 30px;
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
}
</style>
