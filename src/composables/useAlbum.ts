import useRequest from '@/composables/useRequest';
import AlbumInterface from '@/interfaces/AlbumInterface';

export default async function useAlbum(id: number): Promise<AlbumInterface> {
    const res = await useRequest().get(`/albums/${id}`);
    return res.data.result;
}
