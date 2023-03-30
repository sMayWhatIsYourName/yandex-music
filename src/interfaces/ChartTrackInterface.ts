import TrackInterface from '@/interfaces/TrackInterface';

export default interface ChartTrackInterface {
    chart: {
        position: number;
        progress: string;
        listeners: number;
        shift: number;
        bgColor: string;
    },
    id: number;
    playCount: number;
    recent: boolean;
    timestamp: Date;
    track: TrackInterface;
};
