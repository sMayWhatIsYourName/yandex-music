import LyricsInfoInterface from '@/interfaces/LyricsInfoInterface';
import { SearchArtistInterface } from '@/interfaces/SearchArtistInterface';
import { SearchAlbumInterface } from '@/interfaces/SearchAlbumInterface';

export interface SearchTrackInterface {
    id: number;
    available: boolean;
    availableAsRbt: boolean;
    availableForPremiumUsers: boolean;
    lyricsAvailable: boolean;
    rememberPosition: boolean;
    trackSource: string;
    lyricsInfo: LyricsInfoInterface;
    trackSharingFlag: string;
    albums: Array<SearchAlbumInterface>;
    coverUri: string;
    type: string;
    durationMs: number;
    explicit: boolean;
    title: string;
    artists: Array<SearchArtistInterface>;
    regions: Array<string>;
};
