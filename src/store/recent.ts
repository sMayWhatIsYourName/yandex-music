import { defineStore } from 'pinia';
import { Entity } from '@/interfaces/LandingBlocksInterface';

interface State {
    data: Array<Entity>;
}

export const useRecentStore = defineStore('recent', {
    state: (): State => ({
        data: []
    }),
    actions: {
        setRecent(data: Array<Entity>) {
            this.data = data;
        }
    }
});
