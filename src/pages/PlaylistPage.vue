<template>
    <main class="main">
        <div
            v-if="Object.keys(playlist).length"
            class="main-container main-container-scroller"
        >
            <BaseNavigation/>
            <div class="item-head">
                <BaseImage
                    :alt="playlist.title"
                    :height="200"
                    :src="playlist.ogImage"
                    :width="200"
                    type="playlist"
                />
                <div class="item-info">
                    <p class="info-type">
                        Плейлист
                    </p>
                    <h2>{{ playlist.title }}</h2>

                    <div class="info-row">
                        <h3
                            v-if="playlist.owner"
                            class="info-artists"
                        >
                            Составитель: {{ playlist.owner.name }}
                        </h3>
                        <img
                            alt="circle"
                            class="info-circle"
                            src="../assets/img/circle-white.svg"
                        >
                        <p
                            v-if="playlist.trackCount"
                            class="info-tracks-count"
                        >
                            {{ useTracksCount(playlist.trackCount) }}
                        </p>
                        <img
                            alt="circle"
                            class="info-circle"
                            src="../assets/img/circle-white.svg"
                        >
                        <p class="info-tracks-duration">
                            {{ useConvertDuration(playlist.durationMs, true) }}
                        </p>
                    </div>

                    <div class="item-controls">
                        <button
                            class="btn"
                            @click="usePlayShuffle(playlistTracks)"
                        >
                            <i class="fas fa-play fa-sm"/> Перемешать
                        </button>
                        <BaseLikeButton
                            :liked="playlist?.liked"
                            class="fa-lg"
                            @click="handleLike"
                        />
                        <BaseMenu>
                            <BaseMenuItem @click="usePlayShuffle(playlistTracks)">
                                Перемешать
                            </BaseMenuItem>
                            <BaseMenuItem @click="usePlayStation(`${playlist.uid}_${playlist.kind}`, 'playlist')">
                                Поток по плейлисту
                            </BaseMenuItem>
                            <BaseMenuItem @click="handleShare">
                                Поделится
                            </BaseMenuItem>
                        </BaseMenu>
                    </div>
                </div>
            </div>
            <TheTracksTable
                :filter-bar="true"
                :last-played-entity="{
                    tag: `${playlist.uid}_${playlist.kind}`,
                    type: 'playlist'
                }"
                :tracks="playlistTracks"
                :without-image="false"
            />
        </div>
        <BaseLoading v-else/>
    </main>
</template>

<script lang="ts" setup>
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import usePlaylist from '@/composables/usePlaylist';
import useTracksCount from '@/composables/useTracksCount';
import useConvertDuration from '@/composables/useConvertDuration';
import BaseNavigation from '@/components/ui/BaseNavigation.vue';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, Ref } from 'vue';
import TheTracksTable from '@/components/track/TracksTable.vue';
import BaseLoading from '@/components/ui/BaseLoading.vue';
import useUserFavoritePlaylist from '@/composables/useUserFavoritePlaylist';
import usePlayShuffle from '@/composables/usePlayShuffle';
import { LikesObjectTypesEnum } from '@/enums/LikesObjectTypesEnum';
import useLikeAction from '@/composables/useLikeAction';
import { useUserStore } from '@/store/user';
import BaseLikeButton from '@/components/ui/BaseLikeButton.vue';
import BaseMenu from '@/components/ui/BaseMenu.vue';
import BaseMenuItem from '@/components/ui/BaseMenuItem.vue';
import { useNotificationsStore } from '@/store/notifications';
import usePlayStation from '@/composables/usePlayStation';
import BaseImage from '@/components/ui/BaseImage.vue';

const userStore = useUserStore();
const notificationStore = useNotificationsStore();
const route = useRoute();
const playlist: Ref<PlaylistInterface> = ref({} as PlaylistInterface);

onMounted(async () => {
    if (Number(route.params.kind) === 3) {
        playlist.value = await useUserFavoritePlaylist();
    } else {
        playlist.value = await usePlaylist(Number(route.params.kind), Number(route.params.uid));
    }

    // fixme: ошибки типов надо бы пофиксить
    // if (!playlist.value.tracks[0]?.track) {
    //     const tracks = playlist.value.tracks.map(item => `${item.track.id}:${item.track.albumId}`);
    //     playlist.value.tracks = (await useTrack(tracks.flat())).map(item => ({ track: item }));
    // }

    playlist.value.liked = userStore.likes.playlists.findIndex(item =>
        item.playlist.uid === playlist.value.uid &&
        item.playlist.kind === playlist.value.kind) !== -1;
});

const playlistTracks = computed(() => playlist.value.tracks.map(item => item.track));

async function handleLike() {
    playlist.value.liked = await useLikeAction(
        LikesObjectTypesEnum.PLAYLIST,
        `${playlist.value.owner.uid}:${playlist.value.kind}`,
        playlist.value.liked
    );

    playlist.value.liked
        ? userStore.addPlaylistToLikes(playlist.value)
        : userStore.removePlaylistFromLikes(playlist.value);
}

function handleShare() {
    navigator.clipboard.writeText(`https://music.yandex.ru/users/${playlist.value.owner.name}/playlists/${playlist.value.kind}`);
    notificationStore.pushNotification('Ссылка скопирована');
}

// async function handleRecommended() {
//     const res = await request.get(`users/${playlist.value.uid}/playlists/${playlist.value.kind}/recommendations`);
//     console.log(res.data.result);
// }

</script>

<style scoped>
.item-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
}

.item-head img {
    width: 140px;
    height: 140px;
    margin-right: 20px;
    border-radius: 6px;
}

.item-info {
    display: flex;
    flex-direction: column;
}

.item-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.item-controls button i {
    margin-right: 5px;
}

.item-info-additional p:first-child {
    margin-right: 5px;
}

.info-type {
    font-weight: 400;
    font-size: 12.8px;
    line-height: 16px;
    color: #8E929C;
    margin-bottom: 10px;
}

.info-artists, .info-tracks-count, .info-tracks-duration {
    font-weight: 400;
    font-size: 12.8px;
    line-height: 16px;
    color: #8E929C;
}

.info-artists a:hover {
    text-decoration: underline;
}

.info-tracks-count {
    color: white;
}

.info-artists span {
    color: white;
}

.info-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 17px;
}

.info-circle {
    width: 3px !important;
    height: 3px !important;
    margin-inline: 10px !important;
}
</style>
