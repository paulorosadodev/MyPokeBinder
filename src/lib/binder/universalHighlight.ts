interface UniversalSlotHighlightState {
    targetPage: number;
    currentPage: number;
    isMobile: boolean;
    isBusy: boolean;
    isPainted: boolean;
}

export function canRevealUniversalSlotHighlight({ targetPage, currentPage, isMobile, isBusy, isPainted }: UniversalSlotHighlightState): boolean {
    const isActivePage = targetPage === currentPage || (!isMobile && targetPage === currentPage + 1);
    return isActivePage && !isBusy && isPainted;
}
