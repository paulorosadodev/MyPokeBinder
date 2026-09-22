import { describe, it, expect } from "bun:test";
import { TOTAL_PAGES, SLOTS_PER_PAGE, getPageForDexId, getDesktopSpreadPages } from "../src/lib/pokemon/constants";

describe("Binder Real Page Numbering and Navigation Logic", () => {
    it("should always have exactly 17 real pages in the binder", () => {
        expect(TOTAL_PAGES).toBe(17);
        expect(SLOTS_PER_PAGE).toBe(9);
    });

    it("should accurately map all 151 slots to their real binder page", () => {
        for (let dex = 1; dex <= 151; dex++) {
            const page = getPageForDexId(dex);
            const expected = Math.floor((dex - 1) / 9) + 1;
            expect(page).toBe(expected);
            expect(page).toBeGreaterThanOrEqual(1);
            expect(page).toBeLessThanOrEqual(17);
        }
    });

    it("should correctly handle boundaries between pages", () => {
        expect(getPageForDexId(9)).toBe(1);
        expect(getPageForDexId(10)).toBe(2);

        expect(getPageForDexId(18)).toBe(2);
        expect(getPageForDexId(19)).toBe(3);

        expect(getPageForDexId(144)).toBe(16);
        expect(getPageForDexId(145)).toBe(17);
        expect(getPageForDexId(151)).toBe(17);
    });

    it("should clamp values out of bounds safely", () => {
        expect(getPageForDexId(0)).toBe(1);
        expect(getPageForDexId(200)).toBe(17);
    });

    it("should pair pages for desktop spreads with real page numbers", () => {
        const [left1, right1] = getDesktopSpreadPages(1);
        expect(left1).toBe(1);
        expect(right1).toBeNull();

        const [left2, right2] = getDesktopSpreadPages(2);
        expect(left2).toBe(2);
        expect(right2).toBe(3);

        const [left16, right16] = getDesktopSpreadPages(16);
        expect(left16).toBe(16);
        expect(right16).toBe(17);

        const [left17, right17] = getDesktopSpreadPages(17);
        expect(left17).toBe(16);
        expect(right17).toBe(17);
    });

    it("should calculate correct slot count for page 17", () => {
        const startSlot = (17 - 1) * SLOTS_PER_PAGE + 1;
        const endSlot = Math.min(17 * SLOTS_PER_PAGE, 151);
        const actualPokemonCount = endSlot - startSlot + 1;
        expect(startSlot).toBe(145);
        expect(endSlot).toBe(151);
        expect(actualPokemonCount).toBe(7);
    });

    it("should calculate correct adjacent spreads for preloading", () => {
        const [left1, right1] = getDesktopSpreadPages(1);
        const nextSpreadPages: number[] = [];
        const lastPageInSpread1 = right1 ?? left1;
        if (lastPageInSpread1 < TOTAL_PAGES) {
            const [nextLeft, nextRight] = getDesktopSpreadPages(lastPageInSpread1 + 1);
            nextSpreadPages.push(nextLeft);
            if (nextRight) nextSpreadPages.push(nextRight);
        }
        expect(nextSpreadPages).toEqual([2, 3]);

        const [left2, right2] = getDesktopSpreadPages(3);
        const prevSpreadPages: number[] = [];
        if (left2 > 1) {
            const [prevLeft, prevRight] = getDesktopSpreadPages(left2 - 1);
            prevSpreadPages.push(prevLeft);
            if (prevRight) prevSpreadPages.push(prevRight);
        }
        expect(prevSpreadPages).toEqual([1]);
    });
});
