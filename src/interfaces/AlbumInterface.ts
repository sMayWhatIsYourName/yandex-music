import LabelInterface from '@/interfaces/LabelInterface';
import TrackPositionInterface from '@/interfaces/TrackPositionInterface';
import TrackArtistInterface from '@/interfaces/TrackArtistInterface';

export default interface AlbumInterface {
    id: number;
    storageDir?: string;
    title: string;
    type?: string,
    metaType?: string;
    contentWarning?: string;
    year: number;
    releaseDate: Date;
    coverUri: string;
    ogImage: string;
    genre: string;
    buy: Array<any>;
    trackCount: number;
    likesCount: number;
    recent: boolean;
    veryImportant: boolean;
    artists: Array<TrackArtistInterface>;
    labels: Array<LabelInterface>;
    available: boolean;
    availableForPremiumUsers: boolean;
    availableForMobile: boolean;
    availablePartially: boolean;
    bests: Array<number>;
    trackPosition?: TrackPositionInterface;
};
