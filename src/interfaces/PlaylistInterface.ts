import PlaylistTracksInterface from '@/interfaces/PlaylistTracksInterface';
import OwnerInterface from '@/interfaces/OwnerInterface';

export default interface PlaylistInterface {
    owner: OwnerInterface;
    playlistUuid: string;
    available: boolean;
    uid: number;
    kind: number;
    title: string;
    revision: number;
    snapshot: number;
    trackCount: number;
    visibility: string;
    collective: boolean;
    created: string;
    modified: string;
    isBanner: boolean;
    isPremiere: boolean;
    durationMs: number;
    cover: {
        type: string;
        itemsUri: Array<string>;
        custom: false;
    };
    ogImage: string;
    tracks: Array<PlaylistTracksInterface>;
    liked?: boolean;
};
