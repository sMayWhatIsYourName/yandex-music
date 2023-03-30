import { defineStore } from 'pinia';
import { AppStateEnum } from '@/enums/AppStateEnum';

interface State {
    appState: AppStateEnum;
}

export const useMainStore = defineStore('main', {
    state: (): State => ({
        appState: AppStateEnum.LOADING
    }),
    actions: {
        setAppState(value: AppStateEnum) {
            this.appState = value;
        }
    }
});
