import PlaylistInterface from '@/interfaces/PlaylistInterface';

export default interface PlaylistLikeInterface {
    playlist: PlaylistInterface;
    timestamp?: Date;
};
