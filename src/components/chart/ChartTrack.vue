<template>
    <div
        class="chart-track"
        @click="() => playTrack()"
    >
        <div class="chart-track__info">
            <p class="chart-track__infoPosition">
                {{ item.chart.position }}
            </p>
            <i
                v-if="item.chart.progress === 'up'"
                class="fas fa-caret-up fa-xs"
            />
            <i
                v-else-if="item.chart.progress === 'down'"
                class="fas fa-caret-down fa-xs"
            />
            <i
                v-else
                class="far fa-horizontal-rule"
            />
        </div>
        <div class="chart-track__body">
            <div class="chart-track__image">
                <BaseImage
                    :alt="item.track.title"
                    :height="100"
                    :src="item.track.ogImage"
                    :width="100"
                    type="track"
                />
                <PlayingIcon
                    v-if="playerStore.trackIndex === Number(item.track.id)"
                />
            </div>

            <div class="chart-track__bodyInfo">
                <p class="chart-track__title">
                    {{ item.track.title }}
                </p>
                <ArtistsLinks
                    :artists="item.track.artists"
                    class="chart-track__links"
                />
            </div>
            <p class="chart-track__duration">
                {{ useConvertDuration(item.track.durationMs) }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import ArtistsLinks from '@/components/artist/ArtistsLinks.vue';
import useConvertDuration from '@/composables/useConvertDuration';
import PlayingIcon from '@/components/track/TrackPlayingIcon.vue';
import { Data } from '@/interfaces/LandingBlocksInterface';
import { useQueueStore } from '@/store/queue';
import { usePlayerStore } from '@/store/player';
import BaseImage from '@/components/ui/BaseImage.vue';

const queueStore = useQueueStore();
const playerStore = usePlayerStore();

const props = defineProps<{
    item: Data;
}>();

async function playTrack() {
    queueStore.unshiftToQueue(props.item.track);
}

</script>

<style scoped lang="scss">
.chart-track {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;

    img {
        width: 45px;
        height: 45px;
    }

    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 15px;

        &Position {
            font-size: 14px;
            font-weight: 300;
        }
    }

    &__body {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 4px;
        flex: 1;
        border-radius: 4px;
        overflow: hidden;

        &Info {
            display: flex;
            flex-direction: column;
            max-width: calc(100% - 100px);
            overflow-x: hidden;
        }
    }

    &__image {
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        margin-right: 10px;
    }

    &__title {
        line-height: 16px;
        font-size: 16px;
        font-weight: 400;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    &__links {
        font-size: 13px;
        line-height: 17px;
        color: #8E929C;
        font-weight: 400;
    }

    &__duration {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #8E929C;
        margin-left: auto;
    }
}

.fa-caret-up {
    color: lightgreen;
}

.fa-caret-down {
    color: lightcoral;
}

.fa-horizontal-rule {
    width: 8px;
    overflow: hidden;
}

</style>
