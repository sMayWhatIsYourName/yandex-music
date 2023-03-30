import useRequest from '@/composables/useRequest';
import PlaylistInterface from '@/interfaces/PlaylistInterface';

export default async function usePlaylist(kind: number, uid: number): Promise<PlaylistInterface> {
    const res = await useRequest().get(`/users/${uid}/playlists/${kind}`);
    if (res.data.result.kind === 3) {
        res.data.result.title = 'Мне нравится';
        res.data.result.ogImage = 'music.yandex.ru/blocks/playlist-cover/playlist-cover_like.png';
    }
    return res.data.result;
}
