<template>
  <TheLayout v-if="mainStore.appState === AppStateEnum.LOADED" />
  <LoadingPage v-else-if="mainStore.appState === AppStateEnum.LOADING" />
  <LoginPage v-else-if="mainStore.appState === AppStateEnum.LOGIN" />
</template>

<script lang="ts" setup>
// eslint-disable-file no-use-before-define
import TheLayout from '@/layouts/TheLayout.vue';
import LoadingPage from '@/pages/LoadingPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import { useMainStore } from '@/store';
import { AppStateEnum } from '@/enums/AppStateEnum';
import { onMounted, watch } from 'vue';
import useRequest from '@/composables/useRequest';
import { useUserStore } from '@/store/user';
import useUserFavoritePlaylist from '@/composables/useUserFavoritePlaylist';
import { usePlaylistStore } from '@/store/playlist';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import AccountStatusInterface from '@/interfaces/AccountStatusInterface';
import { useReleaseStore } from '@/store/release';
import { useChartStore } from '@/store/chart';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { LandingBlocksEnum } from '@/enums/LandingBlocksEnum';
import LandingBlocksInterface from '@/interfaces/LandingBlocksInterface';
import { useRecentStore } from '@/store/recent';
import useGetLikes from '@/composables/useGetLikes';
import { LikesObjectTypesEnum } from '@/enums/LikesObjectTypesEnum';
import { useRouter } from 'vue-router';

const mainStore = useMainStore(); // Хранилище статуса загрузки данных
const userStore = useUserStore(); // Хранилище информации о пользователе
const playlistStore = usePlaylistStore(); // Хранилище с плейлистами
const releasesStore = useReleaseStore(); // Хранилище с последними релизами
const chartStore = useChartStore(); // Хранилище с чартами
const recentStore = useRecentStore(); // Хранилище с последним прослушанным
const router = useRouter(); // Переадрисация
let request = useRequest(); // Функция для асинхронных запросов

onMounted(async () => {
    if (localStorage.getItem('token')) {
        await setStoreData();
        await router.push('/');
        mainStore.setAppState(AppStateEnum.LOADED);
    } else {
        return mainStore.setAppState(AppStateEnum.LOGIN);
    }

    cacheImages();
});

watch( // Наблюдаем за статусом загрузки - если данные загружены, то установим их в хранилища
    mainStore,
    async (value) => {
        if (value.appState === AppStateEnum.LOADING) {
            request = useRequest();
            await setStoreData();
        }
    },
    { deep: true }
);

async function setStoreData() { // Устанавливаем данные в хранилища
    userStore.setAccount(await getAccountStatus());
    const [playlists, landing, likesTracks, likesPlaylists, likesArtists] =
    await Promise.all([
        getPlaylists(),
        getLandingBlocks([
            LandingBlocksEnum.NEW_PLAYLISTS,
            LandingBlocksEnum.NEW_RELEASES,
            LandingBlocksEnum.CHART,
            LandingBlocksEnum.PLAY_CONTEXTS,
            LandingBlocksEnum.PERSONAL_PLAYLISTS
        ]),
        useGetLikes(LikesObjectTypesEnum.TRACK),
        useGetLikes(LikesObjectTypesEnum.PLAYLIST),
        useGetLikes(LikesObjectTypesEnum.ARTIST)
    ]);

    console.log(landing);

    await Promise.all([
        playlistStore.setPlaylists(playlists),
        playlistStore.setPersonal(landing.blocks[0].entities),
        playlistStore.setHits(landing.blocks[3].entities),
        releasesStore.setReleases(landing.blocks[2].entities),
        chartStore.setChart(landing.blocks[4].entities),
        recentStore.setRecent(landing.blocks[1].entities),
        userStore.setLikesTracks(likesTracks),
        userStore.setLikesPlaylist(likesPlaylists),
        userStore.setLikesArtists(likesArtists)
    ]);

    console.log(likesTracks);

    mainStore.setAppState(AppStateEnum.LOADED);
}

function cacheImages() {
    registerRoute(
    // Cache image files.
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        new CacheFirst({
            // Use a custom cache name.
            cacheName: 'image-cache',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds: 24 * 60 * 60
                })
            ]
        })
    );
}

async function getLandingBlocks(
    blocks: Array<LandingBlocksEnum>
): Promise<LandingBlocksInterface> {
    const res = await request.get(`/landing3?blocks=${blocks}`);
    return res.data.result;
}

async function getAccountStatus(): Promise<AccountStatusInterface> {
    const res = await request.get('account/status');
    return res.data.result;
}

async function getPlaylists(): Promise<Array<PlaylistInterface>> {
    const res = await request.get(`users/${userStore.userId}/playlists/list/`);
    return [await useUserFavoritePlaylist()].concat(res.data.result);
}
</script>

<style>
@import url("assets/css/reset.css");
@import url("assets/css/font.css");

:root {
  --background: #151a22;
  --main-color: #fcca00; /*old #F7F096*/
  --main-color-transperent: rgba(247, 240, 150, 0.03);
  --volume-width: 0px;
}

* {
  font-family: "Rubik", sans-serif;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

body {
  background: var(--background);
  overflow: hidden;
}

button,
input,
a {
  -webkit-app-region: no-drag;
  outline: none;
  border: none;
  text-decoration: none;
}

a {
  color: white;
  cursor: pointer;
}

button,
a {
  cursor: pointer;
}

.layout-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 65px);
}

.main {
  padding: 45px 54px 180px 54px;
  background: #1b202a;
  width: 100%;
  height: inherit;
  overflow-y: scroll;
  -webkit-app-region: no-drag;
  color: white;
  border-radius: 8px 0;
  position: relative;
}

.main-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
}

.main-container-scroller {
  height: 100%;
  margin-bottom: 0;
}

.main-container-title {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
}

.main-container-title h2 {
  font-weight: 500;
  font-size: 25px;
  line-height: 20px;
}

.main-container-show-all {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: var(--main-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.main-container-subtitle {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #8e929c;
}

.btn {
  color: var(--main-color);
  border-radius: 999px;
  padding: 7px 25px;
  background: none;
  border: 2px solid var(--main-color);
  font-size: 14px;
  transition: 0.2s;
}

.btn:hover {
  background: var(--main-color);
  color: black;
  transition: 0.2s;
}

*::-webkit-scrollbar {
  background: none;
  width: 4px;
}

*::-webkit-scrollbar-track {
  background: none;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--main-color);
  border-radius: 10px;
}

.flickity-viewport {
  height: 240px !important;
}

.flickity-button {
  background: none !important;
  width: 34px !important;
  height: 34px !important;
  color: rgba(255, 255, 255, 0.7) !important;
  transition: 0.2s;
}

.flickity-button.previous {
  transform: translate(-120%, -50%) !important;
}

.flickity-button.next {
  transform: translate(120%, -50%) !important;
}

.flickity-button:hover {
  transition: 0.2s;
  color: var(--main-color) !important;
}

.carousel-cell {
  margin-right: 7px;
  width: 160px;
  height: 240px;
}
</style>
