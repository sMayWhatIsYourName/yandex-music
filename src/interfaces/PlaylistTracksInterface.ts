import TrackInterface from '@/interfaces/TrackInterface';

export default interface PlaylistTracksInterface {
    id: number;
    originalIndex: number;
    recent: boolean;
    timestamp: Date;
    track: TrackInterface; // fixme: может приходить массив с цифрами вместо объектов
};
