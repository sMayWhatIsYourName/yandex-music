import { useUserStore } from '@/store/user';
import useRequest from '@/composables/useRequest';
import PlaylistWithOutTracksInterface from '@/interfaces/PlaylistWithOutTracksInterface';

export default async function useUserPlaylists(): Promise<Array<PlaylistWithOutTracksInterface>> {
    const userStore = useUserStore();
    const res = await useRequest().get(`users/${userStore.userId}/playlists/list/`);
    return res.data.result;
}
