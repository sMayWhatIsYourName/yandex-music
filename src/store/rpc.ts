import { defineStore } from 'pinia';

interface RpcTrackInterface {
    name: string;
    artists: string;
    image: string;
}

interface State {
    track: RpcTrackInterface;
}

export const useRpcStore = defineStore('rpc', {
    state: (): State => ({
        track: {
            name: '',
            artists: '',
            image: ''
        }
    }),
    actions: {
        setRpc(track: RpcTrackInterface) {
            this.track = track;
        }
    }
});
