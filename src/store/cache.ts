import { defineStore } from 'pinia';
import AlbumInterface from '@/interfaces/AlbumInterface';

interface State {
    albums: {
        [key: number]: AlbumInterface,
    };
}

export const useCacheStore = defineStore('cache', {
    state: (): State => ({
        albums: {}
    }),
    actions: {}
});
