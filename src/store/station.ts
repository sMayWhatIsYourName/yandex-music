import { defineStore } from 'pinia';
import StationListInterface from '@/interfaces/StationListInterface';
import StationDashboardInterface, { Station } from '@/interfaces/StationDashboardInterface';
import StationListMapInterface from '@/interfaces/StationListMapInterface';

export interface StationCurrentInterface {
    tag: string;
    type: string;
    batchId?: number;
}

interface State {
    dashboard: StationDashboardInterface;
    listKeys: Array<string>;
    list: StationListMapInterface;
    current: StationCurrentInterface;
    currentInfo: Station;
}

export const useStationStore = defineStore('station', {
    state: (): State => ({
        dashboard: {} as StationDashboardInterface,
        listKeys: [],
        list: {} as StationListMapInterface,
        current: {} as StationCurrentInterface,
        currentInfo: {} as Station
    }),
    actions: {
        setList(list: Array<StationListInterface>) {
            const output: StationListMapInterface = {} as StationListMapInterface;

            for (const item of list) {
                if (output[item.station.id.type]) {
                    output[item.station.id.type].push(item);
                } else {
                    output[item.station.id.type] = [item];
                    this.listKeys.push(item.station.id.type);
                }
            }

            this.list = output;
        },
        setDashboard(dashboard: StationDashboardInterface) {
            this.dashboard = dashboard;
        },
        setCurrent(station: StationCurrentInterface) {
            this.current = station;
        },
        setCurrentBatchId(batchId: number) {
            this.current.batchId = batchId;
        },
        setCurrentInfo(info: Station) {
            this.currentInfo = info;
        }
    },
    getters: {
        currentStation(): string {
            return `${this.current?.type}:${this.current?.tag}`;
        }
    }
});
