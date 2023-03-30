export default function useImage(url: string | undefined | null, width: number, height: number): string|null {
    if (!url || !url.length) {
        return null;
    }
    return `https://${url?.replace('%%', `${width}x${height}`)}`;
}
