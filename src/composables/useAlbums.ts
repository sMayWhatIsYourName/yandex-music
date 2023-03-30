import useRequest from '@/composables/useRequest';
import AlbumInterface from '@/interfaces/AlbumInterface';

export default async function useAlbums(ids: Array<number>): Promise<Array<AlbumInterface>> {
    const params = new URLSearchParams();
    params.append('albumIds', ids.toString());

    const res = await useRequest().post('/albums', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return res.data.result;
}
