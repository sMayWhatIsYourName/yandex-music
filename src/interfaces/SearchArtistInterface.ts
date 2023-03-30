import CoverInterface from '@/interfaces/CoverInterface';

export interface SearchArtistInterface {
    id: number;
    name: string;
    cover?: CoverInterface;
    composer: boolean;
    various: boolean;
    counts: {
        tracks: number;
        directAlbums: number;
        alsoAlbums: number;
        alsoTracks: number;
    };
    genres: Array<string>;
    ticketsAvailable: boolean;
    regions: Array<string>;
}
