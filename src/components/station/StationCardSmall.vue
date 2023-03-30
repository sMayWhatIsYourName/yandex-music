<template>
    <div
        class="station-card-small"
        @click="usePlayStation(station.station.id.tag, station.station.id.type)"
    >
        <div
            :style="{background: station.station.icon.backgroundColor}"
            class="station-image-block"
        >
            <BaseImage
                :alt="station.station.name"
                :height="100"
                :src="station.station.icon.imageUrl"
                :width="100"
            />
            <div class="play-icon">
                <i class="fas fa-play"/>
            </div>
        </div>
        <p>{{ station.station.name }}</p>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import StationListInterface from '@/interfaces/StationListInterface';
import usePlayStation from '@/composables/usePlayStation';
import BaseImage from '@/components/ui/BaseImage.vue';

defineProps<{
    station: StationListInterface;
}>();

</script>

<style scoped>
.station-card-small {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}

.station-image-block {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 5px;
    margin-right: 10px;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
}

.play-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    transition: 0.2s;
    opacity: 0;
}

.station-card-small:hover .play-icon {
    opacity: 1;
    transition: 0.2s;
}
</style>
