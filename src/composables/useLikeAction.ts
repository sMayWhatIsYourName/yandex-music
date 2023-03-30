import useRequest from '@/composables/useRequest';
import { useUserStore } from '@/store/user';
import { LikesObjectTypesEnum } from '@/enums/LikesObjectTypesEnum';

export default async function useLikeAction(objectType: LikesObjectTypesEnum, objectIds: string | number | Array<number>, remove = false) {
    const action = remove ? 'remove' : 'add-multiple';

    const params = new URLSearchParams();
    params.append(`${objectType}Ids`, objectIds.toString());

    const res = await useRequest().post(`/users/${useUserStore().userId}/likes/${objectType}s/${action}`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // todo: сохранять ревизию и лайкнутые треки чтоб потом быстро обновлять а не загружать заново
    if (res.data.result === 'ok' && remove) {
        return false;
    }

    return objectType === LikesObjectTypesEnum.TRACK
        ? (remove ? false : res.data.result.revision > 0)
        : (res.data.result === 'ok');
}
