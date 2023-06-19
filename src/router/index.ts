import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import PlaylistPage from '@/pages/PlaylistPage.vue';
import ArtistPage from '@/pages/ArtistPage.vue';
import AlbumPage from '@/pages/AlbumPage.vue';
import NewReleasesPage from '@/pages/NewReleasesPage.vue';
import StationsPage from '@/pages/StationsPage.vue';
import TracksPage from '@/pages/TracksPage.vue';
import ArtistsPage from '@/pages/ArtistsPage.vue';
import ArtistTracksPage from '@/pages/ArtistTracksPage.vue';
import ArtistAlbumsPage from '@/pages/ArtistAlbumsPage.vue';
import AlbumsPage from '@/pages/AlbumsPage.vue';
import PlaylistsPage from '@/pages/PlaylistsPage.vue';
import HitsPage from '@/pages/HitsPage.vue';
import ChartPage from '@/pages/ChartPage.vue';
import SearchPage from '@/pages/SearchPage.vue';
import LoginPage from '@/pages/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/station',
        name: 'station',
        component: StationsPage
    },
    {
        path: '/tracks',
        name: 'tracks',
        component: TracksPage
    },
    {
        path: '/artists',
        name: 'artists',
        component: ArtistsPage
    },
    {
        path: '/albums',
        name: 'albums',
        component: AlbumsPage
    },
    {
        path: '/playlists',
        name: 'playlists',
        component: PlaylistsPage
    },
    {
        path: '/playlist/:kind/:uid',
        name: 'playlist',
        component: PlaylistPage
    },
    {
        path: '/artist/:id',
        name: 'artist',
        component: ArtistPage
    },
    {
        path: '/artist/:id/tracks',
        name: 'artist-tracks',
        component: ArtistTracksPage
    },
    {
        path: '/artist/:id/albums',
        name: 'artist-albums',
        component: ArtistAlbumsPage
    },
    {
        path: '/album/:id',
        name: 'album',
        component: AlbumPage
    },
    {
        path: '/new-releases',
        name: 'new-releases',
        component: NewReleasesPage
    },
    {
        path: '/new-hists',
        name: 'new-hists',
        component: HitsPage
    },
    {
        path: '/chart',
        name: 'chart',
        component: ChartPage
    },
    {
        path: '/search',
        name: 'search',
        component: SearchPage
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
