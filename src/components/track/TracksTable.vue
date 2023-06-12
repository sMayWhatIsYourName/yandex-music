<template>
    <div class="tracks-table">
        <TheFilter
            v-if="filterBar"
            :data="tracks"
            :filter-func="filterFunc"
            @filtered="onFiltered"
        />
        <RecycleScroller
            :item-size="50"
            :items="filteredTracks"
            class="scroller"
            key-field="id"
        >
            <template #before>
                <div
                    :class="{'withOutImage': withoutImage}"
                    class="scroller-before"
                >
                    <p class="scroller-before-number">
                        #
                    </p>
                    <p class="image-th"/>
                    <p class="scroller-before-name">
                        Название
                    </p>
                    <p>Альбом</p>
                    <p/>
                    <i class="fal fa-clock fa-sm"/>
                </div>
            </template>
            <template #default="{ item, index }">
                <div
                    :class="{'withOutImage': withoutImage, 'playing': isPlaying(item) && playerStore.playing}"
                    class="track"
                >
                    <div
                        class="track-back"
                        @click="playCurrent(item, index)"
                    />
                    <div class="index">
                        <span>{{ index + 1 }}</span>
                        <i
                            class="fas"
                            :class="isPlaying(item) && playerStore.playing ? 'fa-pause' : 'fa-play'"
                        />
                    </div>
                    <div
                        class="image"
                    >
                        <BaseImage
                            :alt="item.title"
                            :height="100"
                            :src="item.ogImage"
                            :width="100"
                            type="track"
                        />
                        <PlayingIcon
                            v-if="isPlaying(item)"
                        />
                    </div>
                    <p class="title">
                        <span class="title-text">
                            {{ item.title }}
                            <span v-if="item.version">
                                ({{ item.version }})
                            </span>
                        </span>
                        <span class="title-body">
                            <ContentWarning
                                v-if="item.contentWarning"
                                :content-warning="item.contentWarning"
                            />
                            <ArtistsLinks
                                :artists="item.artists"
                                class="title-artists"
                            />
                        </span>
                    </p>
                    <AlbumLinks
                        :albums="item.albums"
                        class="albums"
                    />
                    <BaseLikeButton
                        :liked="item.liked"
                        class="like"
                        @click="handleLike(item)"
                    />
                    <p class="duration">
                        {{ useConvertDuration(item.durationMs) }}
                    </p>
                </div>
            </template>
            <template
                v-if="!withoutMargin && queueStore.queue.length"
                #after
            >
                <div class="track-template"/>
                <div class="track-template"/>
            </template>
        </RecycleScroller>
    </div>
</template>

<script lang="ts" setup>
import TrackInterface from '@/interfaces/TrackInterface';
import ArtistInterface from '@/interfaces/TrackArtistInterface';
import TheFilter from '@/components/ui/BaseFilter.vue';
import PlayingIcon from '@/components/track/TrackPlayingIcon.vue';
import ArtistsLinks from '@/components/artist/ArtistsLinks.vue';
import useConvertDuration from '@/composables/useConvertDuration';
import { defineProps, onMounted, reactive, ref, Ref } from 'vue';
import { usePlayerStore } from '@/store/player';
import { useQueueStore } from '@/store/queue';
import BaseLikeButton from '@/components/ui/BaseLikeButton.vue';
import { useUserStore } from '@/store/user';
import useLikeAction from '@/composables/useLikeAction';
import { LikesObjectTypesEnum } from '@/enums/LikesObjectTypesEnum';
import TrackLikeInterface from '@/interfaces/TrackLikeInterface';
import AlbumLinks from '@/components/album/AlbumLinks.vue';
import ContentWarning from '@/components/ui/ContentWarning.vue';
import BaseImage from '@/components/ui/BaseImage.vue';
import { ILastPlatedEntityInterface } from '@/interfaces/ILastPlatedEntityInterface';

const playerStore = usePlayerStore();
const queueStore = useQueueStore();
const userStore = useUserStore();

const props = defineProps<{
    filterBar?: boolean;
    withoutImage?: boolean;
    tracks: Array<TrackInterface>;
    withoutMargin?: boolean;
    lastPlayedEntity?: ILastPlatedEntityInterface;
}>();

const filterFunc = reactive([
    compareName,
    compareArtists,
    compareDuration
]);

const filteredTracks: Ref<Array<TrackInterface>> = ref([]);

onMounted(() => {
    filteredTracks.value = props.tracks
        .filter(item => item.available)
        .map(item => {
            item.liked = userStore.likes.tracks.findIndex(track => track.id === item.id) !== -1;
            return item;
        });
});

function getArtistMappingName(artists: Array<ArtistInterface>) {
    return artists.map(item => item.name[0]).toString();
}

function compareName(a: TrackInterface, b: TrackInterface) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}

function compareArtists(a: TrackInterface, b: TrackInterface) {
    if (getArtistMappingName(a.artists) > getArtistMappingName(b.artists)) {
        return 1;
    }

    if (getArtistMappingName(a.artists) < getArtistMappingName(b.artists)) {
        return -1;
    }

    return 0;
}

function compareDuration(a: TrackInterface, b: TrackInterface) {
    if (a.durationMs > b.durationMs) {
        return 1;
    }

    if (a.durationMs < b.durationMs) {
        return -1;
    }

    return 0;
}

function onFiltered(data: Array<TrackInterface>) {
    filteredTracks.value = data;
}

function playCurrent(track: TrackInterface, index: number) {
    playerStore.setShuffle(0);

    let newQueue = filteredTracks.value.slice(index, filteredTracks.value.length);
    newQueue = newQueue.concat(filteredTracks.value.slice(0, index));
    queueStore.setQueue(newQueue);

    playerStore.setIsStation(false);
    if (props.lastPlayedEntity && props.lastPlayedEntity.tag !== playerStore.lastPlayedType?.tag) {
        playerStore.setLastPlayedType(props.lastPlayedEntity);
    }
}

async function handleLike(track: TrackInterface) {
    track.liked = await useLikeAction(
        LikesObjectTypesEnum.TRACK,
        Number(track.id),
        track.liked
    );

    const trackObject: TrackLikeInterface = {
        id: track.id,
        albumId: String(track.albums[0].id)
    };

    track.liked
        ? userStore.addTrackToLikes(trackObject)
        : userStore.removeTrackFromLikes(trackObject);
}

function isPlaying(track: TrackInterface) {
    return playerStore.trackIndex === Number(track.id);
}

</script>

<style scoped lang="scss">
.tracks-table {
    height: calc(100% - 175px);
}

.scroller {
    height: 100%;
    margin-top: 20px;
}

.scroller-before, .track {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 40px 40px 40fr 16fr 45px 45px;
}

.withOutImage.track, .withOutImage.scroller-before {
    grid-template-columns: 40px 40fr 16fr 45px 45px;
}

.track {
    position: relative;

    &:hover {
        background: #1E222D;

        .like {
            opacity: 1;
            transition: 0.2s;
        }

        .index {
            i {
                display: block;
            }

            span {
                display: none;
            }
        }

        .albums {
            transition: 0.2s;
            color: white;
        }
    }
}

.track-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
}

.scroller-before {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    color: #8E929C;
    text-align: left;
    margin-bottom: 15px;

    i {
        text-align: center;
    }
}

.withOutImage {
    > .image-th, > .image {
        display: none;
    }

    &.playing {
        .index {
            span {
                display: none;
            }

            i {
                display: block;
            }
        }
    }
}

.scroller-before-number {
    text-align: center;
}

.scroller-before-name {
    margin-left: 20px;
}

.track, .track-template {
    height: 50px;
    padding: 5px 0;
    font-size: 14px;
    cursor: pointer;
}

.like {
    opacity: 0;
    transition: 0.2s;
}

.track-template {
    cursor: default;
}

.index {
    width: 100%;
    position: relative;

    span, i {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: right;
    }

    i {
        display: none;
        font-size: 10px;
    }
}

.image {
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    z-index: 20;
}

.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    overflow: hidden;
    padding-right: 10px;
}

.title-body {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title-text {
    font-size: 15px;
    line-height: 15px;
    width: max-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.title-artists {
    font-size: 12px;
    color: #8E929C;
    width: max-content;
    z-index: 20;
}

.albums {
    transition: 0.2s;
    color: #8E929C;
    z-index: 20;
}

.duration {
    font-size: 12px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 20;
}

</style>
