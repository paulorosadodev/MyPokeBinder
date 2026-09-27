import { TOTAL_PAGES, catalogPageToPhysicalIndex, getPageForDexId, getSpreadLeftIndex, physicalIndexToCatalogPage } from "@/lib/pokemon/constants";

export const BINDER_FRONT_COVER_PHYSICAL = 0;
export const BINDER_ENTRANCE_MS = 720;
export const BINDER_OPEN_HOLD_MS = 100;
export const BINDER_FLIP_MS = 650;
export const BINDER_MOBILE_MAX_SHADOW_OPACITY = 0.35;
export const BINDER_DESKTOP_MAX_SHADOW_OPACITY = 0.65;
export const BINDER_MULTI_FLIP_STEP_MS = 320;
export const BINDER_MULTI_FLIP_MIN_DELTA = 3;
export const BINDER_PAGE_MIN_WIDTH = 384;
export const BINDER_PAGE_MIN_WIDTH_MOBILE = 280;
export const BINDER_PAGE_MIN_HEIGHT_MOBILE = 280;
export const BINDER_PAGE_MAX_WIDTH = 560;
export const BINDER_PAGE_WIDTH = 480;
export const BINDER_PAGE_HEIGHT = 676;
export const BINDER_MOBILE_STAGE_MAX_WIDTH = 420;
export const BINDER_PORTRAIT_MAX_VIEWPORT = 767;
export const BINDER_MIN_STAGE_WIDTH_TO_MOUNT = 160;
export const BINDER_SWIPE_THRESHOLD_PX = 56;
export const BINDER_LIB_SWIPE_DISTANCE = 999999;
export const BINDER_USE_MOUSE_EVENTS = false;

export function shouldUsePortraitBinder(viewportWidth: number): boolean {
    return viewportWidth > 0 && viewportWidth <= BINDER_PORTRAIT_MAX_VIEWPORT;
}

export function isPageFlipPortrait(blockWidth: number, usePortrait: boolean, minWidth = BINDER_PAGE_MIN_WIDTH): boolean {
    return usePortrait && blockWidth < minWidth * 2;
}

export function canMountBinderEngine(stageWidth: number): boolean {
    return stageWidth >= BINDER_MIN_STAGE_WIDTH_TO_MOUNT;
}

export function binderPageFlipAutoSize(isPortrait: boolean): boolean {
    return !isPortrait;
}

export type BinderPageNavigationPlan = { mode: "direct"; targetPhysical: number } | { mode: "sequence"; targetPhysical: number; intermediatePhysicalTargets: number[] };

export function planBinderPageNavigation(currentPhysical: number, targetPhysical: number, isPortrait: boolean): BinderPageNavigationPlan {
    if (isPortrait) {
        return { mode: "direct", targetPhysical };
    }

    const currentSpread = getSpreadLeftIndex(currentPhysical);
    const targetSpread = getSpreadLeftIndex(targetPhysical);
    const spreadDelta = (targetSpread - currentSpread) / 2;
    const distance = Math.abs(spreadDelta);
    const intermediateSteps = distance >= 4 ? 2 : distance >= 2 ? 1 : 0;

    if (intermediateSteps === 0) {
        return { mode: "direct", targetPhysical };
    }

    const physicalStep = targetPhysical > currentPhysical ? 2 : -2;
    const intermediatePhysicalTargets = Array.from({ length: intermediateSteps }, (_, index) => currentPhysical + physicalStep * (index + 1));

    return {
        mode: "sequence",
        targetPhysical,
        intermediatePhysicalTargets,
    };
}

export function shouldRenderBinder(options: { viewportReady: boolean; isDataReady: boolean; hasMountedBinder: boolean }): boolean {
    return options.viewportReady && (options.isDataReady || options.hasMountedBinder);
}

export function canHandleBinderEntry(options: { viewportReady: boolean; isDataReady: boolean; hasMountedBinder: boolean; isBookReady: boolean }): boolean {
    return options.isBookReady && shouldRenderBinder(options);
}

export interface BinderOpenPlan {
    startPhysical: number;
    targetPhysical: number;
    animateFromCover: boolean;
}

export function resolveBinderEntryTargetPage(options: { pageParam: string | null; spreadParam: string | null; dexIdParam: string | null; openSelectParam: string | null }): number | null {
    const pageFromParam = options.pageParam ? Number.parseInt(options.pageParam, 10) : null;
    const spreadFromParam = options.spreadParam ? Number.parseInt(options.spreadParam, 10) : null;
    const dexId = options.dexIdParam ? Number.parseInt(options.dexIdParam, 10) : null;

    let page: number | null = null;
    if (pageFromParam !== null && Number.isFinite(pageFromParam)) {
        page = pageFromParam;
    } else if (spreadFromParam !== null && Number.isFinite(spreadFromParam)) {
        page = (spreadFromParam - 1) * 2 + 1;
    } else if (dexId !== null && dexId >= 1 && dexId <= 151) {
        page = getPageForDexId(dexId);
    }

    if (page === null) return null;
    return Math.min(Math.max(1, page), TOTAL_PAGES);
}

export function resolveBinderInitialPage(options: { pageParam: string | null; spreadParam: string | null; dexIdParam: string | null; openSelectParam: string | null }): number {
    if (options.pageParam !== null || options.spreadParam !== null) {
        return 1;
    }

    const dexId = options.dexIdParam ? Number.parseInt(options.dexIdParam, 10) : null;
    if (options.openSelectParam === "true" && dexId !== null && dexId >= 1 && dexId <= 151) {
        return getPageForDexId(dexId);
    }
    return 1;
}

export function shouldSignalBinderReady(options: { animateFromCover: boolean; hasAutoOpened: boolean; isBusy: boolean }): boolean {
    return !options.isBusy && (!options.animateFromCover || options.hasAutoOpened);
}

export function planBinderOpenAnimation(catalogPage: number, isPortrait: boolean, skipCoverAnimation = false): BinderOpenPlan {
    const targetPhysical = catalogPageToPhysicalIndex(catalogPage, isPortrait);
    const animateFromCover = !skipCoverAnimation && catalogPage === 1;
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

export function shouldApplyExternalBinderPageFlip(alreadyOnTarget: boolean, isFlipping: boolean): boolean {
    return !alreadyOnTarget && !isFlipping;
}

export type BinderSwipeDirection = "prev" | "next";

export function resolveBinderPageSwipe(params: { dx: number; dy: number; isBusy: boolean; threshold?: number }): BinderSwipeDirection | null {
    if (params.isBusy) return null;
    const threshold = params.threshold ?? BINDER_SWIPE_THRESHOLD_PX;
    const absX = Math.abs(params.dx);
    const absY = Math.abs(params.dy);
    if (absX < threshold || absX <= absY) return null;
    return params.dx < 0 ? "next" : "prev";
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
    return bookPos.x > 0 && bookPos.y > 0 && bookPos.x < rect.width && bookPos.y < rect.height && (bookPos.x < operatingDistance || bookPos.x > rect.width - operatingDistance) && (bookPos.y < operatingDistance || bookPos.y > rect.height - operatingDistance);
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
