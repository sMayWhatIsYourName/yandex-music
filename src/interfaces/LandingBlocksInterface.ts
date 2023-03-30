import OwnerInterface from '@/interfaces/OwnerInterface';
import CoverInterface from '@/interfaces/CoverInterface';
import TrackInterface from '@/interfaces/TrackInterface';
import ArtistInterface, { Counts, Link, Ratings } from '@/interfaces/ArtistInterface';
import LabelInterface from '@/interfaces/LabelInterface';

export interface Payload {
    id: any;
    name: string;
    various: boolean;
    composer: boolean;
    cover: CoverInterface;
    ogImage: string;
    genres: string[];
    counts: Counts;
    available: boolean;
    ratings: Ratings;
    links: Link[];
    uid?: number;
    kind?: number;
    title: string;
    revision?: number;
    snapshot?: number;
    visibility: string;
    collective?: boolean;
    created?: Date;
    modified?: Date;
    isBanner?: boolean;
    isPremiere?: boolean;
    owner: OwnerInterface;
    trackCount?: number;
    likesCount?: number;
    topArtist: any[];
    type: string;
    metaType: string;
    year?: number;
    releaseDate?: Date;
    coverUri: string;
    genre: string;
    recent?: boolean;
    veryImportant?: boolean;
    artists: ArtistInterface[];
    labels: LabelInterface[];
    availableForPremiumUsers?: boolean;
    availableForMobile?: boolean;
    availablePartially?: boolean;
    bests: any[];
}

// todo: разделить на 3 интерфейса
// note: может я чего-то не понимаю но почему бы не отпрвалять данные все в 1 формате а не разные, почему я должен писать костыли
export interface Data {
    id: number;
    title: string;
    type: string;
    metaType: string;
    year: number;
    releaseDate: Date;
    coverUri: string;
    ogImage: string;
    genre: string;
    trackCount: number;
    likesCount: number;
    recent: boolean;
    veryImportant: boolean;
    artists: ArtistInterface[];
    labels: LabelInterface[];
    available: boolean;
    availableForPremiumUsers: boolean;
    availableForMobile: boolean;
    availablePartially: boolean;
    bests: number[];
    contentWarning: string;
    uid?: number;
    kind?: number;
    description: string;
    descriptionFormatted: string;
    revision?: number;
    snapshot?: number;
    visibility: string;
    collective?: boolean;
    created?: Date;
    modified?: Date;
    backgroundColor: string;
    textColor: string;
    image: string;
    isBanner?: boolean;
    isPremiere?: boolean;
    owner: OwnerInterface;
    cover: CoverInterface;
    topArtist: Array<{
        id: number;
        name: string;
        various: boolean;
        composer: boolean;
        cover: CoverInterface;
        genres: any[];
    }>;
    track: TrackInterface;
    chart: {
        position: number;
        progress: string;
        listeners: number;
        shift: number;
    };
    client: string;
    context: string;
    contextItem: string;
    payload: Payload;
    counts?: Counts;
    name?: string;
}

export interface Entity {
    id: string;
    type: string;
    data: Data;
}

export interface Block {
    id: string;
    type: string;
    typeForFrom: string;
    title: string;
    description: string;
    entities: Entity[];
}

export default interface LandingBlocksInterface {
    pumpkin: boolean;
    contentId: string;
    blocks: Block[];
};
