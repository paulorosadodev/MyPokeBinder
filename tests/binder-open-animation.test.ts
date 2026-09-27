import { describe, it, expect } from "bun:test";
import { catalogPageToPhysicalIndex, physicalIndexToCatalogPage } from "@/lib/pokemon/constants";
import {
    planBinderOpenAnimation,
    shouldDeferBinderPageSync,
    isBinderAlreadyOnTarget,
    isBinderPageBusy,
    isPageFlipPortrait,
    pageFlipClickWillTurnPage,
    pageFlipStartsUserTouch,
    shouldUsePortraitBinder,
    canMountBinderEngine,
    binderPageFlipDisableFlipByClick,
    pageFlipProgrammaticFlipAllowed,
    pageFlipPortraitBookRect,
    pageFlipLandscapeBookRect,
    BINDER_FRONT_COVER_PHYSICAL,
    BINDER_ENTRANCE_MS,
    BINDER_OPEN_HOLD_MS,
    BINDER_FLIP_MS,
    BINDER_MULTI_FLIP_STEP_MS,
    BINDER_SWIPE_THRESHOLD_PX,
    BINDER_LIB_SWIPE_DISTANCE,
    BINDER_USE_MOUSE_EVENTS,
    resolveBinderPageSwipe,
    shouldApplyExternalBinderPageFlip,
    BINDER_PAGE_MIN_WIDTH,
    BINDER_MOBILE_STAGE_MAX_WIDTH,
    BINDER_MIN_STAGE_WIDTH_TO_MOUNT,
    binderPageFlipAutoSize,
    planBinderPageNavigation,
    shouldRenderBinder,
    isBinderDataReady,
    resolveBinderInitialPage,
    shouldSignalBinderReady,
    canHandleBinderEntry,
    resolveBinderEntryTargetPage,
} from "@/lib/pokemon/binderOpen";

describe("Binder cover open animation plan", () => {
    it("should start closed on the front cover and target catalog page 1 in landscape", () => {
        const plan = planBinderOpenAnimation(1, false);
        expect(plan.animateFromCover).toBe(true);
        expect(plan.startPhysical).toBe(BINDER_FRONT_COVER_PHYSICAL);
        expect(plan.startPhysical).toBe(0);
        expect(plan.targetPhysical).toBe(2);
        expect(catalogPageToPhysicalIndex(1, false)).toBe(2);
        expect(BINDER_ENTRANCE_MS).toBe(720);
        expect(BINDER_OPEN_HOLD_MS).toBe(100);
        expect(BINDER_ENTRANCE_MS + BINDER_OPEN_HOLD_MS).toBeLessThan(1000);
        expect(BINDER_FLIP_MS).toBeGreaterThanOrEqual(600);
        expect(BINDER_FLIP_MS).toBe(650);
    });

    it("should keep a mobile-width stage in portrait so only one page is visible", () => {
        expect(shouldUsePortraitBinder(390)).toBe(true);
        expect(shouldUsePortraitBinder(767)).toBe(true);
        expect(shouldUsePortraitBinder(768)).toBe(false);
        expect(isPageFlipPortrait(BINDER_MOBILE_STAGE_MAX_WIDTH, true)).toBe(true);
        expect(isPageFlipPortrait(390, true)).toBe(true);
        expect(isPageFlipPortrait(900, false)).toBe(false);
        expect(isPageFlipPortrait(0, false)).toBe(false);
        expect(canMountBinderEngine(0)).toBe(false);
        expect(canMountBinderEngine(BINDER_MIN_STAGE_WIDTH_TO_MOUNT)).toBe(true);
        expect(BINDER_MOBILE_STAGE_MAX_WIDTH).toBeLessThan(BINDER_PAGE_MIN_WIDTH * 2);
    });

    it("should start closed on the front cover and open past the inside cover to catalog page 1 in portrait", () => {
        const plan = planBinderOpenAnimation(1, true);
        expect(plan.animateFromCover).toBe(true);
        expect(plan.startPhysical).toBe(0);
        expect(plan.targetPhysical).toBe(2);
        expect(catalogPageToPhysicalIndex(1, true)).toBe(2);
        expect(physicalIndexToCatalogPage(2, true)).toBe(1);
        expect(physicalIndexToCatalogPage(1, true)).toBe(1);
        expect(physicalIndexToCatalogPage(0, true)).toBe(0);
    });

    it("should open from the cover before navigating to a Pokémon received from the grid", () => {
        const initialPage = resolveBinderInitialPage({
            pageParam: null,
            spreadParam: null,
            dexIdParam: "50",
            openSelectParam: null,
        });
        const plan = planBinderOpenAnimation(initialPage, false);

        expect(initialPage).toBe(1);
        expect(plan.animateFromCover).toBe(true);
        expect(plan.startPhysical).toBe(BINDER_FRONT_COVER_PHYSICAL);
        expect(catalogPageToPhysicalIndex(6, false)).toBe(7);
    });

    it("should open from the cover and then navigate to every page received by URL", () => {
        const options = { pageParam: "5", spreadParam: null, dexIdParam: null, openSelectParam: null };
        const initialPage = resolveBinderInitialPage(options);
        const targetPage = resolveBinderEntryTargetPage(options);
        const landscape = planBinderOpenAnimation(initialPage, false);
        const portrait = planBinderOpenAnimation(initialPage, true);

        expect(initialPage).toBe(1);
        expect(targetPage).toBe(5);
        expect(landscape.animateFromCover).toBe(true);
        expect(landscape.startPhysical).toBe(BINDER_FRONT_COVER_PHYSICAL);
        expect(portrait.animateFromCover).toBe(true);
        expect(portrait.startPhysical).toBe(BINDER_FRONT_COVER_PHYSICAL);
        expect(resolveBinderEntryTargetPage({ pageParam: null, spreadParam: "4", dexIdParam: null, openSelectParam: null })).toBe(7);
        expect(resolveBinderInitialPage({ pageParam: "5", spreadParam: null, dexIdParam: "50", openSelectParam: "true" })).toBe(1);
    });

    it("should keep direct opening for binder selector returns without cover animation or page flips", () => {
        expect(resolveBinderInitialPage({ pageParam: null, spreadParam: null, dexIdParam: "50", openSelectParam: "true" })).toBe(6);
        expect(resolveBinderEntryTargetPage({ pageParam: null, spreadParam: null, dexIdParam: "50", openSelectParam: "true" })).toBe(6);

        const openPlanDirect = planBinderOpenAnimation(1, false, true);
        expect(openPlanDirect.animateFromCover).toBe(false);
        expect(openPlanDirect.startPhysical).toBe(catalogPageToPhysicalIndex(1, false));

        const openPlanPage6 = planBinderOpenAnimation(6, false, true);
        expect(openPlanPage6.animateFromCover).toBe(false);
        expect(openPlanPage6.startPhysical).toBe(catalogPageToPhysicalIndex(6, false));
    });

    it("should signal readiness only after an animated cover has settled", () => {
        expect(shouldSignalBinderReady({ animateFromCover: true, hasAutoOpened: false, isBusy: false })).toBe(false);
        expect(shouldSignalBinderReady({ animateFromCover: true, hasAutoOpened: true, isBusy: true })).toBe(false);
        expect(shouldSignalBinderReady({ animateFromCover: true, hasAutoOpened: true, isBusy: false })).toBe(true);
        expect(shouldSignalBinderReady({ animateFromCover: false, hasAutoOpened: true, isBusy: false })).toBe(true);
    });

    it("should defer page sync until the cover has opened so a second flip cannot skip to page 2", () => {
        expect(shouldDeferBinderPageSync(false, false, true)).toBe(true);
        expect(shouldDeferBinderPageSync(false, true, true)).toBe(true);
        expect(shouldDeferBinderPageSync(true, true, true)).toBe(true);
        expect(shouldDeferBinderPageSync(true, false, true)).toBe(false);
        expect(shouldDeferBinderPageSync(false, false, false)).toBe(false);
    });

    it("should treat fold and flip states as a busy page so card tilt stays frozen", () => {
        expect(isBinderPageBusy("user_fold")).toBe(true);
        expect(isBinderPageBusy("fold_corner")).toBe(true);
        expect(isBinderPageBusy("flipping")).toBe(true);
        expect(isBinderPageBusy("read")).toBe(false);
    });

    it("should flip a filled corner card when the click target is the inner image", () => {
        expect(pageFlipStartsUserTouch("img", true)).toBe(true);
        expect(pageFlipStartsUserTouch("div", true)).toBe(true);
        expect(pageFlipStartsUserTouch("button", true)).toBe(false);
        expect(pageFlipStartsUserTouch("a", true)).toBe(false);
        expect(pageFlipClickWillTurnPage(true, true, true)).toBe(true);
        expect(pageFlipClickWillTurnPage(true, true, false)).toBe(false);
        expect(pageFlipClickWillTurnPage(false, true, true)).toBe(false);
    });

    it("documents that StPageFlip flipPrev is a no-op in portrait when disableFlipByClick is true", () => {
        const portrait = pageFlipPortraitBookRect(390, 550);
        const landscape = pageFlipLandscapeBookRect(960, 676);

        expect(pageFlipProgrammaticFlipAllowed("prev", true, portrait)).toBe(false);
        expect(pageFlipProgrammaticFlipAllowed("next", true, portrait)).toBe(true);
        expect(pageFlipProgrammaticFlipAllowed("prev", true, landscape)).toBe(true);
        expect(pageFlipProgrammaticFlipAllowed("next", true, landscape)).toBe(true);
    });

    it("should unlock click-flip in portrait so mobile prev and swipe-right work", () => {
        const portrait = pageFlipPortraitBookRect(390, 550);

        expect(binderPageFlipDisableFlipByClick(true)).toBe(false);
        expect(binderPageFlipDisableFlipByClick(false)).toBe(true);

        expect(pageFlipProgrammaticFlipAllowed("prev", binderPageFlipDisableFlipByClick(true), portrait)).toBe(true);
        expect(pageFlipProgrammaticFlipAllowed("next", binderPageFlipDisableFlipByClick(true), portrait)).toBe(true);
        expect(pageFlipProgrammaticFlipAllowed("prev", binderPageFlipDisableFlipByClick(false), pageFlipLandscapeBookRect(960, 676))).toBe(true);
    });

    it("should treat the first landscape spread as already on page 1 after a single cover flip", () => {
        expect(isBinderAlreadyOnTarget(0, 2, false)).toBe(false);
        expect(isBinderAlreadyOnTarget(1, 2, false)).toBe(true);
        expect(isBinderAlreadyOnTarget(2, 2, false)).toBe(true);
    });

    it("should group the portrait inside covers with their catalog page so neither forces a flip back", () => {
        expect(isBinderAlreadyOnTarget(0, 2, true)).toBe(false);
        expect(isBinderAlreadyOnTarget(1, 2, true)).toBe(true);
        expect(isBinderAlreadyOnTarget(2, 2, true)).toBe(true);
        expect(isBinderAlreadyOnTarget(1, 0, true)).toBe(false);
        expect(isBinderAlreadyOnTarget(20, 19, true)).toBe(true);
        expect(isBinderAlreadyOnTarget(21, 19, true)).toBe(false);
    });

    it("classifies a horizontal finger swipe as a single page turn and ignores vertical or busy gestures", () => {
        expect(BINDER_SWIPE_THRESHOLD_PX).toBe(56);
        expect(BINDER_USE_MOUSE_EVENTS).toBe(false);
        expect(BINDER_LIB_SWIPE_DISTANCE).toBeGreaterThan(1000);
        expect(BINDER_MULTI_FLIP_STEP_MS).toBe(320);
        expect(BINDER_MULTI_FLIP_STEP_MS).toBeLessThan(BINDER_FLIP_MS);

        expect(resolveBinderPageSwipe({ dx: -80, dy: 10, isBusy: false })).toBe("next");
        expect(resolveBinderPageSwipe({ dx: 80, dy: -8, isBusy: false })).toBe("prev");
        expect(resolveBinderPageSwipe({ dx: -80, dy: 10, isBusy: true })).toBeNull();
        expect(resolveBinderPageSwipe({ dx: -40, dy: 4, isBusy: false })).toBeNull();
        expect(resolveBinderPageSwipe({ dx: -80, dy: 90, isBusy: false })).toBeNull();
    });

    it("does not apply an external page flip while the book is already turning or already on target", () => {
        expect(shouldApplyExternalBinderPageFlip(true, false)).toBe(false);
        expect(shouldApplyExternalBinderPageFlip(false, true)).toBe(false);
        expect(shouldApplyExternalBinderPageFlip(false, false)).toBe(true);
    });

    it("uses one stable direct turn for mobile jumps in both directions", () => {
        expect(planBinderPageNavigation(2, 18, true)).toEqual({ mode: "direct", targetPhysical: 18 });
        expect(planBinderPageNavigation(18, 2, true)).toEqual({ mode: "direct", targetPhysical: 2 });
        expect(planBinderPageNavigation(2, 18, false)).toEqual({ mode: "sequence", targetPhysical: 18, intermediatePhysicalTargets: [4, 6] });
        expect(planBinderPageNavigation(18, 2, false)).toEqual({ mode: "sequence", targetPhysical: 2, intermediatePhysicalTargets: [16, 14] });
        expect(binderPageFlipAutoSize(true)).toBe(false);
        expect(binderPageFlipAutoSize(false)).toBe(true);
    });

    it("never replaces an already mounted binder with the opening loader", () => {
        expect(shouldRenderBinder({ viewportReady: true, isDataReady: true, hasMountedBinder: false })).toBe(true);
        expect(shouldRenderBinder({ viewportReady: true, isDataReady: false, hasMountedBinder: true })).toBe(true);
        expect(shouldRenderBinder({ viewportReady: true, isDataReady: false, hasMountedBinder: false })).toBe(false);
    });

    it("handles the pending grid destination after preload readiness resets", () => {
        expect(
            canHandleBinderEntry({
                viewportReady: true,
                isDataReady: false,
                hasMountedBinder: true,
                isBookReady: true,
            }),
        ).toBe(true);
        expect(
            canHandleBinderEntry({
                viewportReady: true,
                isDataReady: true,
                hasMountedBinder: false,
                isBookReady: false,
            }),
        ).toBe(false);
    });

    it("aguarda as imagens iniciais mesmo quando a abertura começa pela capa", () => {
        expect(
            isBinderDataReady({
                cardsLoading: true,
                currentImagesReady: false,
                skipEntranceAnimation: false,
            }),
        ).toBe(false);
        expect(
            isBinderDataReady({
                cardsLoading: false,
                currentImagesReady: false,
                skipEntranceAnimation: false,
            }),
        ).toBe(false);
        expect(
            isBinderDataReady({
                cardsLoading: false,
                currentImagesReady: true,
                skipEntranceAnimation: false,
            }),
        ).toBe(true);
        expect(
            isBinderDataReady({
                cardsLoading: false,
                currentImagesReady: false,
                skipEntranceAnimation: true,
            }),
        ).toBe(true);
    });
});
