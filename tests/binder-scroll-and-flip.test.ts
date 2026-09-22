import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { isElementFullyVisibleInViewport, getPageForDexId, getDesktopSpreadPages, getSpreadLeftIndex, catalogPageToPhysicalIndex, physicalIndexToCatalogPage, getBinderSheetPlan, TOTAL_PAGES, BINDER_HAS_TRAILING_BLANK, BINDER_PHYSICAL_FRONT_COVER, BINDER_PHYSICAL_INSIDE_FRONT, BINDER_PHYSICAL_FIRST_PAGE, BINDER_PHYSICAL_INSIDE_BACK, BINDER_PHYSICAL_BACK_COVER, BINDER_SHEET_COUNT, BINDER_LAST_SPREAD_PAGE, BINDER_CLOSED_BACK_PAGE } from "@/lib/pokemon/constants";

describe("Binder Viewport and Flip Navigation Logic", () => {
    beforeEach(() => {
        (globalThis as any).window = {
            innerHeight: 800,
            innerWidth: 1200,
        };
        (globalThis as any).document = {
            documentElement: {
                clientHeight: 800,
                clientWidth: 1200,
            },
        };
    });

    afterEach(() => {
        delete (globalThis as any).window;
        delete (globalThis as any).document;
    });

    it("should return false when window is undefined", () => {
        delete (globalThis as any).window;
        const mockElement = {
            getBoundingClientRect: () => ({ top: 0, left: 0, bottom: 100, right: 100 }),
        } as unknown as Element;
        expect(isElementFullyVisibleInViewport(mockElement)).toBe(false);
    });

    it("should return true when element is 100% inside viewport bounds", () => {
        const mockElement = {
            getBoundingClientRect: () => ({
                top: 100,
                left: 200,
                bottom: 500,
                right: 700,
                width: 500,
                height: 400,
                x: 200,
                y: 100,
                toJSON: () => {},
            }),
        } as unknown as Element;

        expect(isElementFullyVisibleInViewport(mockElement)).toBe(true);
    });

    it("should return true when element touches exact edges of viewport", () => {
        const mockElement = {
            getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                bottom: 800,
                right: 1200,
                width: 1200,
                height: 800,
                x: 0,
                y: 0,
                toJSON: () => {},
            }),
        } as unknown as Element;

        expect(isElementFullyVisibleInViewport(mockElement)).toBe(true);
    });

    it("should return false when element top is scrolled above viewport", () => {
        const mockElement = {
            getBoundingClientRect: () => ({
                top: -10,
                left: 100,
                bottom: 400,
                right: 600,
                width: 500,
                height: 410,
                x: 100,
                y: -10,
                toJSON: () => {},
            }),
        } as unknown as Element;

        expect(isElementFullyVisibleInViewport(mockElement)).toBe(false);
    });

    it("should return false when element bottom extends past viewport bottom", () => {
        const mockElement = {
            getBoundingClientRect: () => ({
                top: 500,
                left: 100,
                bottom: 850,
                right: 600,
                width: 500,
                height: 350,
                x: 100,
                y: 500,
                toJSON: () => {},
            }),
        } as unknown as Element;

        expect(isElementFullyVisibleInViewport(mockElement)).toBe(false);
    });

    it("should return false when element is cut off on the left", () => {
        const mockElement = {
            getBoundingClientRect: () => ({
                top: 100,
                left: -20,
                bottom: 500,
                right: 400,
                width: 420,
                height: 400,
                x: -20,
                y: 100,
                toJSON: () => {},
            }),
        } as unknown as Element;

        expect(isElementFullyVisibleInViewport(mockElement)).toBe(false);
    });

    it("should return false when element extends beyond right edge", () => {
        const mockElement = {
            getBoundingClientRect: () => ({
                top: 100,
                left: 1000,
                bottom: 500,
                right: 1250,
                width: 250,
                height: 400,
                x: 1000,
                y: 100,
                toJSON: () => {},
            }),
        } as unknown as Element;

        expect(isElementFullyVisibleInViewport(mockElement)).toBe(false);
    });

    it("should correctly resolve page boundaries for dex IDs", () => {
        expect(getPageForDexId(1)).toBe(1);
        expect(getPageForDexId(9)).toBe(1);
        expect(getPageForDexId(10)).toBe(2);
        expect(getPageForDexId(25)).toBe(3);
        expect(getPageForDexId(151)).toBe(17);
    });

    it("should map desktop spread pages correctly for cover and internal spreads", () => {
        expect(getDesktopSpreadPages(1)).toEqual([1, null]);
        expect(getDesktopSpreadPages(2)).toEqual([2, 3]);
        expect(getDesktopSpreadPages(3)).toEqual([2, 3]);
        expect(getDesktopSpreadPages(4)).toEqual([4, 5]);
        expect(getDesktopSpreadPages(17)).toEqual([16, 17]);
    });

    it("should correctly calculate spread left index in landscape mode", () => {
        expect(getSpreadLeftIndex(0)).toBe(0);
        expect(getSpreadLeftIndex(1)).toBe(1);
        expect(getSpreadLeftIndex(2)).toBe(1);
        expect(getSpreadLeftIndex(3)).toBe(3);
        expect(getSpreadLeftIndex(4)).toBe(3);
        expect(getSpreadLeftIndex(17)).toBe(17);
        expect(getSpreadLeftIndex(18)).toBe(17);
        expect(getSpreadLeftIndex(19)).toBe(19);
        expect(getSpreadLeftIndex(20)).toBe(19);
        expect(getSpreadLeftIndex(21)).toBe(21);
    });

    it("should map catalog pages to physical indexes bidirectionally in landscape mode", () => {
        expect(catalogPageToPhysicalIndex(0, false)).toBe(0);
        expect(physicalIndexToCatalogPage(0, false)).toBe(0);

        expect(catalogPageToPhysicalIndex(1, false)).toBe(2);
        expect(physicalIndexToCatalogPage(1, false)).toBe(1);
        expect(physicalIndexToCatalogPage(2, false)).toBe(1);

        expect(catalogPageToPhysicalIndex(2, false)).toBe(3);
        expect(catalogPageToPhysicalIndex(3, false)).toBe(3);
        expect(physicalIndexToCatalogPage(3, false)).toBe(2);
        expect(physicalIndexToCatalogPage(4, false)).toBe(2);

        expect(catalogPageToPhysicalIndex(16, false)).toBe(17);
        expect(catalogPageToPhysicalIndex(17, false)).toBe(17);
        expect(physicalIndexToCatalogPage(17, false)).toBe(16);
        expect(physicalIndexToCatalogPage(18, false)).toBe(16);

        expect(catalogPageToPhysicalIndex(18, false)).toBe(19);
        expect(physicalIndexToCatalogPage(19, false)).toBe(18);
        expect(physicalIndexToCatalogPage(20, false)).toBe(18);

        expect(catalogPageToPhysicalIndex(19, false)).toBe(21);
        expect(physicalIndexToCatalogPage(21, false)).toBe(19);
    });

    it("should ensure spread left index never conflicts or triggers reverse flip on final spreads", () => {
        const testPages = [16, 17, 18, 19];
        for (const page of testPages) {
            const physical = catalogPageToPhysicalIndex(page, false);
            const spreadLeft = getSpreadLeftIndex(physical);
            const derivedCatalogPage = physicalIndexToCatalogPage(spreadLeft, false);
            const derivedPhysical = catalogPageToPhysicalIndex(derivedCatalogPage, false);
            const derivedSpreadLeft = getSpreadLeftIndex(derivedPhysical);
            expect(derivedSpreadLeft).toBe(spreadLeft);
        }
    });

    it("should map pages correctly in mobile portrait mode with the same sheets as landscape", () => {
        expect(catalogPageToPhysicalIndex(0, true)).toBe(0);
        expect(catalogPageToPhysicalIndex(1, true)).toBe(2);
        expect(catalogPageToPhysicalIndex(2, true)).toBe(3);
        expect(catalogPageToPhysicalIndex(17, true)).toBe(18);
        expect(catalogPageToPhysicalIndex(18, true)).toBe(19);
        expect(catalogPageToPhysicalIndex(19, true)).toBe(21);

        expect(physicalIndexToCatalogPage(0, true)).toBe(0);
        expect(physicalIndexToCatalogPage(1, true)).toBe(1);
        expect(physicalIndexToCatalogPage(2, true)).toBe(1);
        expect(physicalIndexToCatalogPage(3, true)).toBe(2);
        expect(physicalIndexToCatalogPage(18, true)).toBe(17);
        expect(physicalIndexToCatalogPage(19, true)).toBe(18);
        expect(physicalIndexToCatalogPage(20, true)).toBe(18);
        expect(physicalIndexToCatalogPage(21, true)).toBe(19);
    });

    it("should lay the sheets out as cover, endpaper, pages, endpaper and back cover", () => {
        expect(BINDER_PHYSICAL_FRONT_COVER).toBe(0);
        expect(BINDER_PHYSICAL_INSIDE_FRONT).toBe(1);
        expect(BINDER_PHYSICAL_FIRST_PAGE).toBe(2);
        expect(catalogPageToPhysicalIndex(TOTAL_PAGES, true)).toBe(BINDER_PHYSICAL_FIRST_PAGE + TOTAL_PAGES - 1);
        expect(BINDER_PHYSICAL_INSIDE_BACK).toBe(BINDER_PHYSICAL_BACK_COVER - 1);
        expect(BINDER_SHEET_COUNT).toBe(22);
        expect(BINDER_SHEET_COUNT % 2).toBe(0);
        expect(BINDER_HAS_TRAILING_BLANK).toBe(true);
        expect(BINDER_LAST_SPREAD_PAGE).toBe(18);
        expect(BINDER_CLOSED_BACK_PAGE).toBe(19);
        const plan = getBinderSheetPlan();
        expect(plan[0]?.kind).toBe("front-cover");
        expect(plan[1]?.kind).toBe("endpaper");
        expect(plan[plan.length - 2]?.kind).toBe("endpaper");
        expect(plan[plan.length - 1]?.kind).toBe("back-cover");
    });

    it("should keep landscape page 1 on spread 1 after a single cover flip from physical 0", () => {
        const coverPhysical = 0;
        const page1Physical = catalogPageToPhysicalIndex(1, false);
        expect(page1Physical).toBe(2);
        expect(getSpreadLeftIndex(coverPhysical)).toBe(0);
        expect(getSpreadLeftIndex(page1Physical)).toBe(1);
        expect(getSpreadLeftIndex(coverPhysical) === getSpreadLeftIndex(page1Physical)).toBe(false);
    });

    it("should ensure cover to page 1 transition moves strictly to spread 1 and not spread 2", () => {
        const coverSpreadIndex = 0;
        const nextSpreadIndex = coverSpreadIndex + 1;
        expect(nextSpreadIndex).toBe(1);

        const landscapeSpreads = [[0], [1, 2], [3, 4]];
        const spread1 = landscapeSpreads[nextSpreadIndex];
        expect(spread1).toEqual([1, 2]);

        const page1Derived = physicalIndexToCatalogPage(spread1[0], false);
        const page1DerivedFromRight = physicalIndexToCatalogPage(spread1[1], false);
        expect(page1Derived).toBe(1);
        expect(page1DerivedFromRight).toBe(1);
    });
});
