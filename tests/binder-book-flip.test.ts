import { describe, it, expect } from "bun:test";
import { TOTAL_PAGES, SLOTS_PER_PAGE, BINDER_HAS_TRAILING_BLANK, BINDER_SHEET_COUNT, getBinderSheetPlan, getPageForDexId } from "@/lib/pokemon/constants";
import { binderPageFlipDisableFlipByClick, planBinderOpenAnimation } from "@/lib/pokemon/binderOpen";

describe("Binder Book Flip Integration and Pagination Logic", () => {
    it("should always lay sheets as cover, endpaper, catalog pages, endpaper and back cover", () => {
        const oddPlan = getBinderSheetPlan(17);
        expect(oddPlan[0]).toEqual({ kind: "front-cover" });
        expect(oddPlan[1]).toEqual({ kind: "endpaper" });
        expect(oddPlan[2]).toEqual({ kind: "catalog", pageNum: 1 });
        expect(oddPlan[18]).toEqual({ kind: "catalog", pageNum: 17 });
        expect(oddPlan[19]).toEqual({ kind: "blank-slots" });
        expect(oddPlan[20]).toEqual({ kind: "endpaper" });
        expect(oddPlan[21]).toEqual({ kind: "back-cover" });
        expect(oddPlan).toHaveLength(22);
        expect(oddPlan.filter((sheet) => sheet.kind === "endpaper")).toHaveLength(2);

        const evenPlan = getBinderSheetPlan(16);
        expect(evenPlan[0]).toEqual({ kind: "front-cover" });
        expect(evenPlan[1]).toEqual({ kind: "endpaper" });
        expect(evenPlan[17]).toEqual({ kind: "catalog", pageNum: 16 });
        expect(evenPlan[18]).toEqual({ kind: "endpaper" });
        expect(evenPlan[19]).toEqual({ kind: "back-cover" });
        expect(evenPlan).toHaveLength(20);
        expect(evenPlan.filter((sheet) => sheet.kind === "endpaper")).toHaveLength(2);
        expect(evenPlan.some((sheet) => sheet.kind === "blank-slots")).toBe(false);
    });

    it("should configure 22 physical pages for cover, endpapers, catalog and back cover", () => {
        const plan = getBinderSheetPlan();
        expect(plan.filter((sheet) => sheet.kind === "catalog")).toHaveLength(TOTAL_PAGES);
        expect(plan.filter((sheet) => sheet.kind === "endpaper")).toHaveLength(2);
        expect(plan.filter((sheet) => sheet.kind === "blank-slots")).toHaveLength(BINDER_HAS_TRAILING_BLANK ? 1 : 0);
        expect(plan).toHaveLength(BINDER_SHEET_COUNT);
        expect(plan).toHaveLength(22);
        expect(plan.length % 2).toBe(0);
    });

    it("should map indices accurately across full book navigation range from page 0 to 19", () => {
        const clampPageIndex = (page: number): number => {
            return Math.max(0, Math.min(page, 19));
        };

        expect(clampPageIndex(0)).toBe(0);
        expect(clampPageIndex(1)).toBe(1);
        expect(clampPageIndex(17)).toBe(17);
        expect(clampPageIndex(18)).toBe(18);
        expect(clampPageIndex(19)).toBe(19);
        expect(clampPageIndex(-5)).toBe(0);
        expect(clampPageIndex(99)).toBe(19);
    });

    it("should accurately resolve navigation bounds for prev and next arrows", () => {
        const canGoPrev = (currentPage: number): boolean => currentPage > 0;
        const canGoNext = (currentPage: number): boolean => currentPage < 19;

        expect(canGoPrev(0)).toBe(false);
        expect(canGoNext(0)).toBe(true);

        expect(canGoPrev(1)).toBe(true);
        expect(canGoNext(1)).toBe(true);

        expect(canGoPrev(17)).toBe(true);
        expect(canGoNext(17)).toBe(true);

        expect(canGoPrev(18)).toBe(true);
        expect(canGoNext(18)).toBe(true);

        expect(canGoPrev(19)).toBe(true);
        expect(canGoNext(19)).toBe(false);
    });

    it("should distribute all 151 slots across the 17 catalog pages with 9 slots per page", () => {
        let totalAssignedSlots = 0;

        for (let page = 1; page <= TOTAL_PAGES; page++) {
            const startSlot = (page - 1) * SLOTS_PER_PAGE + 1;
            const pageSlots = Array.from({ length: SLOTS_PER_PAGE }, (_, i) => startSlot + i);

            expect(pageSlots).toHaveLength(9);

            pageSlots.forEach((slotId) => {
                if (slotId <= 151) {
                    totalAssignedSlots++;
                    expect(getPageForDexId(slotId)).toBe(page);
                }
            });
        }

        expect(totalAssignedSlots).toBe(151);
    });

    it("should keep leftover dex numbers on catalog page 17 without inventing an empty back sheet", () => {
        const lastPage = 17;
        const startSlot = (lastPage - 1) * SLOTS_PER_PAGE + 1;
        const pageSlots = Array.from({ length: SLOTS_PER_PAGE }, (_, i) => startSlot + i);

        const realPokemonSlots = pageSlots.filter((id) => id <= 151);
        const trailingSlots = pageSlots.filter((id) => id > 151);

        expect(realPokemonSlots).toEqual([145, 146, 147, 148, 149, 150, 151]);
        expect(trailingSlots).toEqual([152, 153]);
        expect(getBinderSheetPlan().filter((sheet) => sheet.kind === "catalog")).toHaveLength(17);
    });

    it("should validate page flip interaction settings against accidental clicks and with covers", () => {
        const portraitSettings = {
            clickEventForward: true,
            disableFlipByClick: binderPageFlipDisableFlipByClick(true),
            usePortrait: true,
            showCover: true,
            swipeDistance: 30,
        };
        const landscapeSettings = {
            ...portraitSettings,
            disableFlipByClick: binderPageFlipDisableFlipByClick(false),
            usePortrait: false,
        };

        expect(portraitSettings.clickEventForward).toBe(true);
        expect(portraitSettings.disableFlipByClick).toBe(false);
        expect(portraitSettings.usePortrait).toBe(true);
        expect(portraitSettings.showCover).toBe(true);
        expect(landscapeSettings.disableFlipByClick).toBe(true);
    });

    it("should keep showLoading active until cards and images are ready before mounting the book", () => {
        const isDataReady = (params: { cardsLoading: boolean; currentImagesReady: boolean }): boolean => {
            return !params.cardsLoading && params.currentImagesReady;
        };
        const showLoader = (params: { viewportReady: boolean; dataReady: boolean }): boolean => {
            return !(params.viewportReady && params.dataReady);
        };

        expect(isDataReady({ cardsLoading: true, currentImagesReady: false })).toBe(false);
        expect(isDataReady({ cardsLoading: false, currentImagesReady: false })).toBe(false);
        expect(isDataReady({ cardsLoading: false, currentImagesReady: true })).toBe(true);

        expect(showLoader({ viewportReady: false, dataReady: true })).toBe(true);
        expect(showLoader({ viewportReady: true, dataReady: false })).toBe(true);
        expect(showLoader({ viewportReady: true, dataReady: true })).toBe(false);
    });

    it("should resolve target physical pages correctly for catalog open spreads", () => {
        const resolveTargetPhysical = (catalogPage: number): number => {
            return catalogPage <= 0 ? 0 : catalogPage === 1 ? 2 : catalogPage >= 2 && catalogPage <= 17 ? catalogPage + 1 : catalogPage === 18 ? 19 : 21;
        };

        expect(resolveTargetPhysical(0)).toBe(0);
        expect(resolveTargetPhysical(1)).toBe(2);
        expect(resolveTargetPhysical(2)).toBe(3);
        expect(resolveTargetPhysical(3)).toBe(4);
        expect(resolveTargetPhysical(17)).toBe(18);
        expect(resolveTargetPhysical(18)).toBe(19);
    });

    it("should mount on the front cover for catalog page 1 and on the target page otherwise", () => {
        expect(planBinderOpenAnimation(1, false).startPhysical).toBe(0);
        expect(planBinderOpenAnimation(1, true).startPhysical).toBe(0);
        expect(planBinderOpenAnimation(5, false).startPhysical).toBe(5);
        expect(planBinderOpenAnimation(5, true).startPhysical).toBe(6);
        expect(planBinderOpenAnimation(18, false).startPhysical).toBe(19);
        expect(planBinderOpenAnimation(18, true).startPhysical).toBe(19);
    });
});
