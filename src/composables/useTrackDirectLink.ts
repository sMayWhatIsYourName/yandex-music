import useRequest from '@/composables/useRequest';
import { createHash } from 'crypto';

interface StorageInterface {
    path: string,
    s: string,
    ts: string,
    host: string,
}

export default async function useTrackDirectLink(trackId: number): Promise<string> {
    const request = useRequest();
    const res = await request.get(`tracks/${trackId}/download-info`);

    // загрузка данных xml
    const storage: StorageInterface = (await request.get(`${res.data.result[0].downloadInfoUrl}&format=json`)).data;

    const sign = createHash('MD5')
        .update(`XGRlBW9FXlekgbPrRHuSiA${storage.path.slice(1)}${storage.s}`)
        .digest('hex');

    return `https://${storage.host}/get-mp3/${sign}/${storage.ts}${storage.path}`;
}
