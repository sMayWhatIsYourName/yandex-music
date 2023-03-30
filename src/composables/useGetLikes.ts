import useRequest from '@/composables/useRequest';
import { useUserStore } from '@/store/user';
import { LikesObjectTypesEnum } from '@/enums/LikesObjectTypesEnum';

export default async function useGetLikes(objectType: LikesObjectTypesEnum) {
    const res = await useRequest().get(`/users/${useUserStore().userId}/likes/${objectType}s`);
    return objectType === LikesObjectTypesEnum.TRACK ? res.data.result.library.tracks : res.data.result;
}
