import CoverInterface from '@/interfaces/CoverInterface';

export interface Counts {
    tracks: number;
    directAlbums: number;
    alsoAlbums: number;
    alsoTracks: number;
}

export interface Ratings {
    week: number;
    month: number;
    day: number;
}

export interface Link {
    title: string;
    href: string;
    type: string;
    socialNetwork: string;
}

export default interface ArtistInterface {
    id: string;
    name: string;
    various: boolean;
    composer: boolean;
    cover: CoverInterface;
    ogImage?: string;
    genres: Array<string>;
    counts: Counts;
    available: boolean;
    ratings?: Ratings;
    links?: Array<Link>;
    ticketsAvailable?: boolean;
    likesCount?: number;
    dbAliases?: any[];
    liked?: boolean;
};
