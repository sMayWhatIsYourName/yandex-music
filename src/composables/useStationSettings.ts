import useRequest from '@/composables/useRequest';
import { useStationStore } from '@/store/station';

interface Data {
    diversity?: string;
    language?: string;
    moodEnergy?: string;
}

export default async function useStationSettings(diversity: string, language: string, moodEnergy: string) {
    const stationStore = useStationStore();

    const data: Data = {} as Data;

    if (diversity) {
        data.diversity = diversity;
    }
    if (language) {
        data.language = language;
    }
    if (moodEnergy) {
        data.moodEnergy = moodEnergy;
    }

    const res = await useRequest().post(`/rotor/station/${stationStore.current.type}:${stationStore.current.tag}/settings2`, data);

    return res.data.result === 'ok';
}
