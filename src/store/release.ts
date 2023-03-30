import { defineStore } from 'pinia';
import { Entity } from '@/interfaces/LandingBlocksInterface';

interface State {
    releases: Array<Entity>;
}

export const useReleaseStore = defineStore('release', {
    state: (): State => ({
        releases: []
    }),
    actions: {
        setReleases(releases: Array<Entity>) {
            this.releases = releases;
        }
    }
});
