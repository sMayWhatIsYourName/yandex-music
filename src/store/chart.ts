import { defineStore } from 'pinia';
import { Entity } from '@/interfaces/LandingBlocksInterface';

interface State {
    data: Array<Entity>;
}

export const useChartStore = defineStore('chart', {
    state: (): State => ({
        data: []
    }),
    actions: {
        setChart(data: Array<Entity>) {
            this.data = data;
        }
    }
});
