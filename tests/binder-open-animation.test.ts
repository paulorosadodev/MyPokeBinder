import { describe, it, expect } from "bun:test";
import { catalogPageToPhysicalIndex, physicalIndexToCatalogPage } from "@/lib/pokemon/constants";
import { planBinderOpenAnimation, shouldDeferBinderPageSync, isBinderAlreadyOnTarget, isBinderPageBusy, isPageFlipPortrait, pageFlipClickWillTurnPage, pageFlipStartsUserTouch, shouldUsePortraitBinder, canMountBinderEngine, binderPageFlipDisableFlipByClick, pageFlipProgrammaticFlipAllowed, pageFlipPortraitBookRect, pageFlipLandscapeBookRect, BINDER_FRONT_COVER_PHYSICAL, BINDER_OPEN_HOLD_MS, BINDER_FLIP_MS, BINDER_PAGE_MIN_WIDTH, BINDER_MOBILE_STAGE_MAX_WIDTH, BINDER_MIN_STAGE_WIDTH_TO_MOUNT } from "@/lib/pokemon/binderOpen";

describe("Binder cover open animation plan", () => {
    it("should start closed on the front cover and target catalog page 1 in landscape", () => {
        const plan = planBinderOpenAnimation(1, false);
        expect(plan.animateFromCover).toBe(true);
        expect(plan.startPhysical).toBe(BINDER_FRONT_COVER_PHYSICAL);
        expect(plan.startPhysical).toBe(0);
        expect(plan.targetPhysical).toBe(2);
        expect(catalogPageToPhysicalIndex(1, false)).toBe(2);
        expect(BINDER_OPEN_HOLD_MS).toBe(0);
        expect(BINDER_FLIP_MS).toBeLessThan(400);
        expect(BINDER_FLIP_MS).toBe(320);
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

    it("should skip the cover animation when landing on a deep-linked catalog page", () => {
        const landscape = planBinderOpenAnimation(5, false);
        expect(landscape.animateFromCover).toBe(false);
        expect(landscape.startPhysical).toBe(landscape.targetPhysical);
        expect(landscape.startPhysical).toBe(5);

        const portrait = planBinderOpenAnimation(5, true);
        expect(portrait.animateFromCover).toBe(false);
        expect(portrait.startPhysical).toBe(6);
        expect(portrait.targetPhysical).toBe(6);
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
});
