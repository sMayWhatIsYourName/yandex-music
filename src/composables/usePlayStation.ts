import useSendStationFeedback from '@/composables/useSendStationFeedback';
import { StationFeedbackTypeEnum } from '@/enums/StationFeedbackTypeEnum';
import useStationTracks from '@/composables/useStationTracks';
import { useQueueStore } from '@/store/queue';
import { usePlayerStore } from '@/store/player';
import { useStationStore } from '@/store/station';
import useRequest from '@/composables/useRequest';

export default async function usePlayStation(tag: string, type: string) {
    const queueStore = useQueueStore();
    const stationStore = useStationStore();
    const playerStore = usePlayerStore();

    // Нам не нужно перемешивать треки в радио
    playerStore.resetShuffle();
    // Также не нужно повторять треки по умолчанию
    playerStore.resetRepeat();

    queueStore.clearQueue();
    usePlayerStore().setIsStation(true);
    stationStore.setCurrent({
        tag,
        type
    });

    const res = await useRequest().get(`rotor/station/${type}:${tag}/info`);
    stationStore.setCurrentInfo(res.data.result[0]);

    await useSendStationFeedback(StationFeedbackTypeEnum.RADIO_STARTED);

    queueStore.setQueue(await useStationTracks());
}
