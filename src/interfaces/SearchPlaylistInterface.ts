import CoverInterface from '@/interfaces/CoverInterface';
import OwnerInterface from '@/interfaces/OwnerInterface';

export interface SearchPlaylistInterface {
    uid: number;
    kind: number;
    trackCount: number;
    title: string;
    playlistUuid: string;
    owner: OwnerInterface;
    available: boolean;
    cover: CoverInterface;
    ogImage: string;
    tags: any[];
    regions: string[];
};
