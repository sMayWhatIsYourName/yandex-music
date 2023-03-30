import TrackInterface from '@/interfaces/TrackInterface';
import { useQueueStore } from '@/store/queue';
import { usePlayerStore } from '@/store/player';

export default function usePlayShuffle(tracks: Array<TrackInterface>) {
    const queueStore = useQueueStore();
    const playerStore = usePlayerStore();

    playerStore.setShuffle(1);
    queueStore.setQueue(tracks);
    playerStore.setIsStation(false);
}
