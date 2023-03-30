import CoverInterface from '@/interfaces/CoverInterface';
import OwnerInterface from '@/interfaces/OwnerInterface';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import ChartTrackInterface from '@/interfaces/ChartTrackInterface';

export default interface ChartInterface {
    chart: {
        available: boolean;
        collective: boolean;
        cover: CoverInterface;
        created: Date;
        description: string;
        descriptionFormatted: string;
        durationMs: number;
        isBanned: boolean;
        isPremiere: boolean;
        kind: number;
        likesCount: number;
        modified: Date;
        ogImage: string;
        owner: OwnerInterface;
        playlistUuid: string;
        revision: number;
        similarPlaylists: Array<PlaylistInterface>;
        snapshot: number;
        tags: Array<string>;
        title: string;
        trackCount: number;
        tracks: Array<ChartTrackInterface>;
        uid: number;
        visibility: string;
    };
    chartDescription: string;
    id: string;
    menu: {
        items: Array<{
            title: string;
            url: string;
            selected?: boolean;
        }>;
    };
    title: string;
    type: string;
    typeForForm: string;
};
