export default function useTracksCount(trackCount: number): string {
    switch (trackCount % 10) {
    case 1:
        return `${trackCount} трек`;
    case 2:
    case 3:
    case 4:
        return `${trackCount} трека`;
    default:
        return `${trackCount} треков`;
    }
}
