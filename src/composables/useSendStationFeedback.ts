import { useStationStore } from '@/store/station';
import { StationFeedbackTypeEnum } from '@/enums/StationFeedbackTypeEnum';
import useRequest from '@/composables/useRequest';

export default async function useSendStationFeedback(
    type: StationFeedbackTypeEnum,
    batchId?: boolean,
    totalPlayedSeconds?: number | null,
    trackId?: number,
    albumId?: number
): Promise<boolean> {
    const stationStore = useStationStore();
    const currentStation = stationStore.current;
    let url = `rotor/station/${stationStore.currentStation}/feedback?`;
    if (batchId) {
        url += `batchId=${currentStation?.batchId}`;
    }

    const data = {
        type,
        timestamp: new Date().toISOString(),
        trackId: `${trackId}:${albumId}`,
        totalPlayedSeconds: totalPlayedSeconds?.toFixed(2)
    };

    const dataFilled = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== null));

    const res = await useRequest().post(url, dataFilled);

    return res.data.result === 'ok';
}
