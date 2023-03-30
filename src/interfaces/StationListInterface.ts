import ArtistInterface from '@/interfaces/ArtistInterface';
import { Station2 } from '@/interfaces/StationDashboardInterface';

export default interface StationListInterface {
    station: Station2;
    data: {
        title: string;
        description: string;
        imageUrl: string;
        artists: Array<ArtistInterface>;
    };
    settings: {
        language: string;
        mood: number;
        energy: number;
        diversity: string;
    };
    settings2: {
        language: string;
        moodEnergy: string;
        diversity: string;
    };
    adParams: {
        partnerId: string;
        categoryId: string;
        pageRef: string;
        targetRef: string;
        genreId: number;
        genreName: string;
        otherParams: string;
        adVolume: number;
    };
    rupTitle: string;
    rupDescription: string;
};
