import AlbumInterface from '@/interfaces/AlbumInterface';

export default function useAlbumName(artist: AlbumInterface, index: number, length: number): string {
    if (length > 1) {
        return (length === index + 1 ? artist.title : `${artist.title}, `);
    } else {
        return artist.title;
    }
};
