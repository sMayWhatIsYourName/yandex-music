import { defineStore } from 'pinia';
import SearchResultInterface from '@/interfaces/SearchResultInterface';

interface State {
    response?: SearchResultInterface,
}

export const useSearchStore = defineStore('search', {
    state: (): State => ({
        response: undefined
    }),
    actions: {
        setSearchResponse(response?: SearchResultInterface) {
            this.response = response;
        }
    }
});
