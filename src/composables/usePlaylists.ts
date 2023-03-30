import PlaylistInterface from '@/interfaces/PlaylistInterface';
import useRequest from '@/composables/useRequest';

export default async function usePlaylists(kinds: Array<number>, uid: number): Promise<Array<PlaylistInterface>> {
    const res = await useRequest().get(`/users/${uid}/playlists?kinds=${kinds.toString()}`);
    return res.data.result;
}
