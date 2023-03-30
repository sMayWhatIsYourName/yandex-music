import CoverInterface from '@/interfaces/CoverInterface';

export default interface TrackArtistInterface {
    id: number;
    name: string;
    various: boolean;
    composer: boolean;
    cover: CoverInterface;
    genres: any[];
};
