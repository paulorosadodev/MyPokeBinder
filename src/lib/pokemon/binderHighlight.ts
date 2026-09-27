import { getPageForDexId, isElementFullyVisibleInViewport } from "@/lib/pokemon/constants";
import { getActiveCatalogPages } from "@/lib/pokemon/binderImageWindow";

export const BINDER_HIGHLIGHT_DURATION_MS = 3400;
export const FILLED_BINDER_SLOT_CELL_CLASS = "relative flex h-full min-h-0 w-full min-w-0 items-center justify-center binder-filled-slot [container-type:size] hover:z-30 focus-within:z-30";
export const FILLED_BINDER_SLOT_FRAME_CLASS = "relative aspect-[8/11] h-[min(100%,calc(100cqw*11/8))] w-[min(100%,calc(100cqh*8/11))] rounded-lg";

export function shouldResetBinderReadyForViewportChange(previousIsMobile: boolean | null, nextIsMobile: boolean): boolean {
    return previousIsMobile !== null && previousIsMobile !== nextIsMobile;
}

export function getBinderHighlightWaitDecision(options: { isPending: boolean; isReady: boolean }): "start" | "wait" | "cancel" {
    if (!options.isPending) return "cancel";
    return options.isReady ? "start" : "wait";
}

export function getBinderSlotHighlightClass(isHighlighted: boolean): string {
    return isHighlighted ? "slot-glow" : "";
}

export function shouldShowSlotGlow(isHighlighted: boolean, isPageBusy: boolean): boolean {
    return isHighlighted && !isPageBusy;
}

export function isHighlightTargetOnActivePages(targetDexId: number, activePages: readonly number[]): boolean {
    return activePages.includes(getPageForDexId(targetDexId));
}

export function canStartBinderHighlight(options: { targetDexId: number; activePages: readonly number[]; isBookReady: boolean; isFlipping: boolean; isSlotVisible: boolean }): boolean {
    if (!options.isBookReady || options.isFlipping || !options.isSlotVisible) {
        return false;
    }
    return isHighlightTargetOnActivePages(options.targetDexId, options.activePages);
}

export function shouldClearHighlightOnPageChange(options: { pendingDexId: number | null; nextPage: number; isMobile: boolean }): boolean {
    if (options.pendingDexId == null) {
        return true;
    }
    return !isHighlightTargetOnActivePages(options.pendingDexId, getActiveCatalogPages(options.nextPage, options.isMobile));
}

export function isBinderSlotPainted(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) {
        return false;
    }
    if (!isElementFullyVisibleInViewport(element)) {
        return false;
    }

    let node: Element | null = element;
    while (node) {
        const style = getComputedStyle(node);
        if (style.visibility === "hidden" || style.display === "none") {
            return false;
        }
        const opacity = Number.parseFloat(style.opacity);
        if (Number.isFinite(opacity) && opacity < 0.5) {
            return false;
        }
        if (node.classList.contains("binder-book-stage")) {
            break;
        }
        node = node.parentElement;
    }

    return true;
}
