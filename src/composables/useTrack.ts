import useRequest from '@/composables/useRequest';
import TrackInterface from '@/interfaces/TrackInterface';

export default async function useTrack(trackIds: Array<number>): Promise<Array<TrackInterface>> {
    const params = new URLSearchParams();
    params.append('trackIds', trackIds.toString());

    const res = await useRequest().post('/tracks', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return res.data.result;
}
