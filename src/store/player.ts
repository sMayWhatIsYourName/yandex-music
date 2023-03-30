import { defineStore } from 'pinia';
import { ILastPlatedEntityInterface } from '@/interfaces/ILastPlatedEntityInterface';

interface State {
    shuffle: number;
    repeat: number;
    trackIndex: number;
    playing: boolean;
    isStation: boolean;
    lastPlayedType?: ILastPlatedEntityInterface;
}

export const usePlayerStore = defineStore('player', {
    state: (): State => ({
        shuffle: 0,
        repeat: 0,
        trackIndex: -1,
        playing: false,
        isStation: false,
        lastPlayedType: undefined
    }),
    actions: {
        setShuffle(payload: number) {
            this.shuffle = payload;
        },
        incrementShuffle() {
            this.shuffle = (this.shuffle + 1) % 3;
        },
        resetShuffle() {
            this.shuffle = 0;
        },
        setTrackIndex(payload: number) {
            this.trackIndex = payload;
        },
        setRepeat(payload: number) {
            this.repeat = payload;
        },
        setPlaying(payload: boolean) {
            this.playing = payload;
        },
        incrementRepeat() {
            this.repeat = (this.repeat + 1) % 3;
        },
        setIsStation(payload: boolean) {
            this.isStation = payload;
        },
        resetRepeat() {
            this.repeat = 0;
        },
        setVolume(payload: number) {
            localStorage.setItem('volume', payload.toString());
        },
        setLastPlayedType(payload: ILastPlatedEntityInterface) {
            this.lastPlayedType = payload;
        }
    },
    getters: {
        getVolume(): number {
            return Number(localStorage.getItem('volume')) || 20;
        }
    }
});
