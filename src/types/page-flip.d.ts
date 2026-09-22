declare module "page-flip" {
    export interface PageFlipSettings {
        startPage?: number;
        size?: "fixed" | "stretch";
        width: number;
        height: number;
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
        drawShadow?: boolean;
        flippingTime?: number;
        usePortrait?: boolean;
        startZIndex?: number;
        autoSize?: boolean;
        maxShadowOpacity?: number;
        showCover?: boolean;
        mobileScrollSupport?: boolean;
        swipeDistance?: number;
        clickEventForward?: boolean;
        useMouseEvents?: boolean;
        showPageCorners?: boolean;
        disableFlipByClick?: boolean;
    }

    export interface PageFlipEvent {
        data: number | string | Record<string, unknown>;
        object: PageFlip;
    }

    export class PageFlip {
        constructor(element: HTMLElement, settings: PageFlipSettings);
        destroy(): void;
        update(): void;
        loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
        loadFromImages(imagesHref: string[]): void;
        updateFromHtml(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
        updateFromImages(imagesHref: string[]): void;
        clear(): void;
        turnToPrevPage(): void;
        turnToNextPage(): void;
        turnToPage(pageNum: number): void;
        flipNext(corner?: "top" | "bottom"): void;
        flipPrev(corner?: "top" | "bottom"): void;
        flip(pageNum: number, corner?: "top" | "bottom"): void;
        getPageCount(): number;
        getCurrentPageIndex(): number;
        getOrientation(): "portrait" | "landscape";
        on(event: string, callback: (e: PageFlipEvent) => void): PageFlip;
        off(event: string): void;
    }
}
