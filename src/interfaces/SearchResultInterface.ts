import { SearchAlbumInterface } from '@/interfaces/SearchAlbumInterface';
import { SearchArtistInterface } from '@/interfaces/SearchArtistInterface';
import { SearchPlaylistInterface } from '@/interfaces/SearchPlaylistInterface';
import { SearchTrackInterface } from '@/interfaces/SearchTrackInterface';

export default interface SearchResultInterface {
    misspellCorrected: boolean;
    nocorrect: boolean;
    searchRequestId: string;
    text: string;
    best?: {
        type: string;
        result: SearchArtistInterface | SearchAlbumInterface | SearchPlaylistInterface | SearchTrackInterface;
    };
    albums?: {
        total: number;
        perPage: number;
        order: number;
        results: Array<SearchAlbumInterface>;
    };
    artists?: {
        total: number;
        perPage: number;
        order: number;
        results: Array<SearchArtistInterface>
    };
    playlists?: {
        total: number;
        perPage: number;
        order: number;
        results: Array<SearchPlaylistInterface>
    };
    tracks?: {
        total: number;
        perPage: number;
        order: number;
        results: Array<SearchTrackInterface>
    };
};
