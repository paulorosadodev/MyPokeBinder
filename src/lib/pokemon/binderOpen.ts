import { catalogPageToPhysicalIndex, getSpreadLeftIndex, physicalIndexToCatalogPage } from "@/lib/pokemon/constants";

export const BINDER_FRONT_COVER_PHYSICAL = 0;
export const BINDER_OPEN_HOLD_MS = 0;
export const BINDER_FLIP_MS = 320;
export const BINDER_PAGE_MIN_WIDTH = 384;
export const BINDER_PAGE_MAX_WIDTH = 560;
// Proporção da folha: altura em que o cabeçalho mais a grade 3x3 de cartas 2.5/3.5 consomem a
// página inteira, sem sobra entre a última linha de cartas e a borda inferior.
export const BINDER_PAGE_WIDTH = 480;
export const BINDER_PAGE_HEIGHT = 676;
export const BINDER_MOBILE_STAGE_MAX_WIDTH = 420;
export const BINDER_PORTRAIT_MAX_VIEWPORT = 767;
export const BINDER_MIN_STAGE_WIDTH_TO_MOUNT = 160;

export function shouldUsePortraitBinder(viewportWidth: number): boolean {
    return viewportWidth > 0 && viewportWidth <= BINDER_PORTRAIT_MAX_VIEWPORT;
}

export function isPageFlipPortrait(blockWidth: number, usePortrait: boolean, minWidth = BINDER_PAGE_MIN_WIDTH): boolean {
    return usePortrait && blockWidth < minWidth * 2;
}

export function canMountBinderEngine(stageWidth: number): boolean {
    return stageWidth >= BINDER_MIN_STAGE_WIDTH_TO_MOUNT;
}

export interface BinderOpenPlan {
    startPhysical: number;
    targetPhysical: number;
    animateFromCover: boolean;
}

export function planBinderOpenAnimation(catalogPage: number, isPortrait: boolean): BinderOpenPlan {
    const targetPhysical = catalogPageToPhysicalIndex(catalogPage, isPortrait);
    const animateFromCover = catalogPage === 1;
    return {
        startPhysical: animateFromCover ? BINDER_FRONT_COVER_PHYSICAL : targetPhysical,
        targetPhysical,
        animateFromCover,
    };
}

export function shouldDeferBinderPageSync(hasOpened: boolean, isFlipping: boolean, animateFromCover: boolean): boolean {
    if (isFlipping) return true;
    if (animateFromCover && !hasOpened) return true;
    return false;
}

export function isBinderPageBusy(state: string): boolean {
    return state === "flipping" || state === "user_fold" || state === "fold_corner";
}

/**
 * StPageFlip only skips starting a fold when the *event target* is `button` or `a`.
 * Clicks on an inner `img` (filled binder slots) still call startUserTouch; mouseup on
 * window then flips if the point is in a page corner (`disableFlipByClick` does not help).
 */
export function pageFlipStartsUserTouch(targetTagName: string, clickEventForward: boolean): boolean {
    if (!clickEventForward) return true;
    return !["a", "button"].includes(targetTagName.toLowerCase());
}

export function pageFlipClickWillTurnPage(startsUserTouch: boolean, disableFlipByClick: boolean, isOnCorner: boolean): boolean {
    if (!startsUserTouch) return false;
    if (disableFlipByClick && !isOnCorner) return false;
    return true;
}

export type PageFlipBookRect = {
    left: number;
    top: number;
    width: number;
    height: number;
    pageWidth: number;
};

/**
 * StPageFlip portrait bounds keep a virtual left page off-screen
 * (`left = middle - pageWidth/2 - pageWidth`, `width = 2 * pageWidth`).
 * See `page-flip` Render.calculateBoundsRect.
 */
export function pageFlipPortraitBookRect(blockWidth: number, pageHeight: number): PageFlipBookRect {
    const pageWidth = blockWidth;
    const middleX = blockWidth / 2;
    return {
        left: middleX - pageWidth / 2 - pageWidth,
        top: 0,
        width: pageWidth * 2,
        height: pageHeight,
        pageWidth,
    };
}

export function pageFlipLandscapeBookRect(blockWidth: number, pageHeight: number): PageFlipBookRect {
    const pageWidth = blockWidth / 2;
    const middleX = blockWidth / 2;
    return {
        left: middleX - pageWidth,
        top: 0,
        width: pageWidth * 2,
        height: pageHeight,
        pageWidth,
    };
}

/** Mirrors StPageFlip Flip.isPointOnCorners. */
export function pageFlipIsPointOnCorners(globalPos: { x: number; y: number }, rect: PageFlipBookRect): boolean {
    const operatingDistance = Math.sqrt(rect.pageWidth ** 2 + rect.height ** 2) / 5;
    const bookPos = { x: globalPos.x - rect.left, y: globalPos.y - rect.top };
    return (
        bookPos.x > 0 &&
        bookPos.y > 0 &&
        bookPos.x < rect.width &&
        bookPos.y < rect.height &&
        (bookPos.x < operatingDistance || bookPos.x > rect.width - operatingDistance) &&
        (bookPos.y < operatingDistance || bookPos.y > rect.height - operatingDistance)
    );
}

/** Synthetic click points used by StPageFlip flipPrev / flipNext. */
export function pageFlipSyntheticFlipPoint(direction: "prev" | "next", rect: PageFlipBookRect, corner: "top" | "bottom" = "top"): { x: number; y: number } {
    const y = corner === "top" ? 1 : rect.height - 2;
    if (direction === "next") {
        return { x: rect.left + rect.pageWidth * 2 - 10, y };
    }
    // Hardcoded window x=10 — lands near the spine in portrait, not a corner.
    return { x: 10, y };
}

/**
 * Whether StPageFlip will honor flipPrev/flipNext under disableFlipByClick.
 * Portrait + disableFlipByClick blocks prev (and swipe-right) while next still works.
 */
export function pageFlipProgrammaticFlipAllowed(direction: "prev" | "next", disableFlipByClick: boolean, rect: PageFlipBookRect): boolean {
    if (!disableFlipByClick) return true;
    return pageFlipIsPointOnCorners(pageFlipSyntheticFlipPoint(direction, rect), rect);
}

/**
 * Portrait must keep click-flip unlocked so StPageFlip's flipPrev synthetic point
 * (and swipe-right) is not rejected by disableFlipByClick. Landscape keeps it locked
 * to avoid accidental turns when clicking near spread corners (ADR 0024).
 */
export function binderPageFlipDisableFlipByClick(isPortrait: boolean): boolean {
    return !isPortrait;
}

export function isBinderAlreadyOnTarget(currentPhysical: number, targetPhysical: number, isPortrait: boolean): boolean {
    // Em retrato as capas internas dividem a página de catálogo com a capa vizinha, então a
    // comparação precisa ser feita na página e não na folha física.
    if (isPortrait) return physicalIndexToCatalogPage(currentPhysical, true) === physicalIndexToCatalogPage(targetPhysical, true);
    return getSpreadLeftIndex(currentPhysical) === getSpreadLeftIndex(targetPhysical);
}
