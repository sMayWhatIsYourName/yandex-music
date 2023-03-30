import TrackInterface from '@/interfaces/TrackInterface';

export interface Id {
    type: string;
    tag: string;
}

export interface TrackParameters {
    bpm: number;
    hue: number;
    energy: number;
}

export interface Sequence {
    type: string;
    track: TrackInterface;
    liked: boolean;
    trackParameters: TrackParameters;
}

export default interface StationTracksInterface {
    id: Id;
    sequence: Sequence[];
    batchId: string;
    pumpkin: boolean;
};
