import CoverInterface from '@/interfaces/CoverInterface';

export interface SearchAlbumInterface {
    id: number;
    storageDir: string;
    originalReleaseYear: number;
    year: number;
    artists: Array<{
        id: number;
        name: string;
        cover: CoverInterface;
        composer: boolean;
        various: boolean;
        decomposed: Array<any>;
    }>;
    coverUri: string;
    trackCount: number;
    likesCount: number;
    genre: string;
    available: boolean;
    contentWarning: string;
    availableForPremiumUsers: boolean;
    type: string;
    title: string;
    availableRegions: Array<string>;
    labels: Array<string>;
    regions: Array<string>;
}
