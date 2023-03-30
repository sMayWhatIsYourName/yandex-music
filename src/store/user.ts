import { defineStore } from 'pinia';
import AccountStatusInterface from '@/interfaces/AccountStatusInterface';
import TrackInterface from '@/interfaces/TrackInterface';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import TrackLikeInterface from '@/interfaces/TrackLikeInterface';
import PlaylistLikeInterface from '@/interfaces/PlaylistLikeInterface';
import ArtistLikeInterface from '@/interfaces/ArtistLikeInterface';

interface State {
    token: string;
    status: AccountStatusInterface;
    tracks: Array<TrackInterface>,
    likes: {
        tracks: Array<TrackLikeInterface>,
        playlists: Array<PlaylistLikeInterface>,
        artists: Array<ArtistLikeInterface>,
        albums: Array<any>,
    }
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        token: '',
        status: {} as AccountStatusInterface,
        tracks: [],
        likes: {
            tracks: [],
            playlists: [],
            artists: [],
            albums: []
        }
    }),
    actions: {
        setAccount(status: AccountStatusInterface) {
            this.status = status;
        },
        setLikesTracks(tracks: Array<TrackLikeInterface>) {
            this.likes.tracks = tracks;
        },
        addTrackToLikes(track: TrackLikeInterface) {
            this.likes.tracks.push(track);
        },
        removeTrackFromLikes(track: TrackLikeInterface) {
            this.likes.tracks = this.likes.tracks.filter(t => t.id !== track.id);
        },
        setLikesPlaylist(playlists: Array<PlaylistLikeInterface>) {
            this.likes.playlists = playlists;
        },
        addPlaylistToLikes(playlist: PlaylistInterface) {
            this.likes.playlists.push({
                playlist
            });
        },
        removePlaylistFromLikes(playlist: PlaylistInterface) {
            this.likes.playlists = this.likes.playlists.filter(p => p.playlist.uid !== playlist.uid);
        },
        setLikesArtists(artists: Array<ArtistLikeInterface>) {
            this.likes.artists = artists;
        },
        addLikesArtists(artist: ArtistLikeInterface) {
            this.likes.artists.push(artist);
        },
        removeLikesArtists(artist: ArtistLikeInterface) {
            this.likes.artists = this.likes.artists.filter(a => a.id !== artist.id);
        }
    },
    getters: {
        userId(): number {
            return this.status.account.uid;
        }
    }
});
