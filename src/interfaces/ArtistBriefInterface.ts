import R128Interface from '@/interfaces/R128Interface';
import CoverInterface from '@/interfaces/CoverInterface';
import ArtistInterface from '@/interfaces/ArtistInterface';

interface Counts {
    tracks: number;
    directAlbums: number;
    alsoAlbums: number;
    alsoTracks: number;
}

interface Artist {
    id: number;
    name: string;
    various: boolean;
    composer: boolean;
    cover: CoverInterface;
    genres: any[];
}

interface Label {
    id: number;
    name: string;
}

interface Album {
    id: number;
    title: string;
    type: string;
    metaType: string;
    year: number;
    releaseDate: string;
    coverUri: string;
    ogImage: string;
    genre: string;
    buy: any[];
    trackCount: number;
    likesCount: number;
    recent: boolean;
    veryImportant: boolean;
    artists: Artist[];
    labels: Label[];
    available: boolean;
    availableForPremiumUsers: boolean;
    availableForMobile: boolean;
    availablePartially: boolean;
    bests: any[];
    contentWarning: string;
}

interface AlsoAlbum {
    id: number;
    title: string;
    metaType: string;
    contentWarning: string;
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
    artists: Artist[];
    labels: Label[];
    available: boolean;
    availableForPremiumUsers: boolean;
    availableForMobile: boolean;
    availablePartially: boolean;
    bests: number[];
}

interface Major {
    id: number;
    name: string;
}

interface TrackPosition {
    volume: number;
    index: number;
}

interface Album2 {
    id: number;
    title: string;
    type: string;
    metaType: string;
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
    artists: Artist[];
    labels: Label[];
    available: boolean;
    availableForPremiumUsers: boolean;
    availableForMobile: boolean;
    availablePartially: boolean;
    bests: any[];
    trackPosition: TrackPosition;
    contentWarning: string;
}

interface LyricsInfo {
    hasAvailableSyncLyrics: boolean;
    hasAvailableTextLyrics: boolean;
}

interface PopularTrack {
    id: string;
    realId: string;
    title: string;
    major: Major;
    available: boolean;
    availableForPremiumUsers: boolean;
    availableFullWithoutPermission: boolean;
    storageDir: string;
    durationMs: number;
    fileSize: number;
    r128: R128Interface;
    previewDurationMs: number;
    artists: Artist[];
    albums: Album2[];
    coverUri: string;
    ogImage: string;
    lyricsAvailable: boolean;
    type: string;
    rememberPosition: boolean;
    trackSharingFlag: string;
    lyricsInfo: LyricsInfo;
    trackSource: string;
    contentWarning: string;
}

export interface SimilarArtist {
    id: number;
    name: string;
    cover: CoverInterface;
    various: boolean;
    composer: boolean;
    available: boolean;
    genres: string[];
    counts: Counts;
    ticketsAvailable: boolean;
}

interface LastReleas {
    id: number;
    title: string;
    type: string;
    metaType: string;
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
    artists: Artist[];
    labels: Label[];
    available: boolean;
    availableForPremiumUsers: boolean;
    availableForMobile: boolean;
    availablePartially: boolean;
    bests: any[];
    contentWarning: string;
}

interface PlaylistId {
    uid: number;
    kind: number;
}

interface Playlist {
    uid: number;
    kind: number;
    title: string;
    description: string;
    descriptionFormatted: string;
    cover: CoverInterface;
    trackCount: number;
}

export default interface ArtistBriefInterface {
    artist: ArtistInterface;
    albums: Album[];
    alsoAlbums: AlsoAlbum[];
    lastReleaseIds: number[];
    popularTracks: PopularTrack[];
    similarArtists: SimilarArtist[];
    allCovers: CoverInterface[];
    concerts: any[];
    videos: any[];
    vinyls: any[];
    hasPromotions: boolean;
    lastReleases: LastReleas[];
    playlistIds: PlaylistId[];
    playlists: Playlist[];
};
