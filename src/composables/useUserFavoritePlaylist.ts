import usePlaylist from '@/composables/usePlaylist';
import { useUserStore } from '@/store/user';

export default async function useUserFavoritePlaylist() {
    // note: 3 - static kind for liked playlist in Y.M
    const res = await usePlaylist(3, useUserStore().userId);
    res.title = 'Мне нравится';
    res.ogImage = 'music.yandex.ru/blocks/playlist-cover/playlist-cover_like.png';
    return res;
}
