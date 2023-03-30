import ArtistInterface from '@/interfaces/TrackArtistInterface';
import PagerInterface from '@/interfaces/PagerInterface';
import TrackInterface from '@/interfaces/TrackInterface';

export default interface AlbumWithTracksInterface {
    id: number;
    title: string;
    type?: string,
    metaType?: string;
    year: number;
    releaseDate: Date;
    coverUri: string;
    ogImage: string;
    genre: string;
    buy: any[];
    trackCount: number;
    likesCount: number;
    recent: boolean;
    veryImportant: boolean;
    artists: Array<ArtistInterface>;
    labels: Array<{
        id: number;
        name: string;
    }>;
    available: boolean;
    availableForPremiumUsers: boolean;
    availableForMobile: boolean;
    availablePartially: boolean;
    bests: any[];
    sortOrder: string;
    volumes: Array<Array<TrackInterface>>;
    pager: PagerInterface;
};
