declare module 'flickity' {
    import FlickityOptionsInterface from '@/interfaces/components/FlickityOptionsInterface';
    const Flickity: {
        new(el: string | HTMLElement, options?: FlickityOptionsInterface): this
        append(element: HTMLElement)
        destroy()
        select(id: string | number)
    };
    export = Flickity
}
