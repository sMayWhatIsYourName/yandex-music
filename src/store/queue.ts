import { defineStore } from 'pinia';
import TrackInterface from '@/interfaces/TrackInterface';

interface State {
    queue: Array<TrackInterface>,
    played: Array<TrackInterface>
}

export const useQueueStore = defineStore('queue', {
    state: (): State => ({
        queue: [],
        played: []
    }),
    actions: {
        addToQueue(track: TrackInterface | Array<TrackInterface>) {
            if (Array.isArray(track)) {
                this.queue = this.queue.concat(track);
            } else {
                this.queue.push(track);
            }
        },
        removeFromQueue(track: TrackInterface) {
            const index = this.queue.findIndex(item => item.id === track.id);
            if (index === -1) {
                return;
            }

            this.queue.splice(index, 1);
        },
        setQueue(queue: Array<TrackInterface>) {
            this.queue = queue;
        },
        clearQueue() {
            this.queue = [];
        },
        unshiftToQueue(track: TrackInterface) {
            this.queue.unshift(track);
        },
        addToPlayed(track: TrackInterface) {
            this.played.push(track);
        }
    }
});
