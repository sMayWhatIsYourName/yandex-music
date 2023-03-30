import ArtistInterface from '@/interfaces/ArtistInterface';
import TrackArtistInterface from '@/interfaces/TrackArtistInterface';

export default function useArtistName(artist: ArtistInterface | TrackArtistInterface, index: number, length: number): string {
    if (length > 1) {
        return (length === index + 1 ? artist.name : `${artist.name}, `);
    } else {
        return artist.name;
    }
};
