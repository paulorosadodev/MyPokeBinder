import { describe, it, expect } from "bun:test";
import { getActiveCatalogPages, getAdjacentCatalogPages, getBinderImagePages, retainBinderImagePages } from "../src/lib/pokemon/binderImageWindow";

describe("Binder image window", () => {
    it("includes the open spread and neighboring pages, but not a distant sheet", () => {
        const current = getBinderImagePages({ currentPage: 1, isMobile: false });
        expect(current).toEqual([1, 2, 3]);
        expect(current).toContain(1);
        expect(current).toContain(2);
        expect(current).toContain(3);
        expect(current).not.toContain(10);

        const mobile = getBinderImagePages({ currentPage: 5, isMobile: true });
        expect(mobile).toEqual([4, 5, 6]);
        expect(mobile).not.toContain(17);
    });

    it("includes the jump destination spread and all intermediate pages before the flip animation", () => {
        const pages = getBinderImagePages({ currentPage: 1, isMobile: false, jumpTargetPage: 10 });
        expect(pages).toContain(1);
        expect(pages).toContain(2);
        expect(pages).toContain(3);
        expect(pages).toContain(10);
        expect(pages).toContain(11);
        expect(pages).toContain(5);
        expect(pages).toContain(8);
        expect(pages).not.toContain(14);
    });

    it("does not mount catalog images on the closed covers but mounts adjacent catalog pages for flip-back readiness", () => {
        expect(getActiveCatalogPages(0, false)).toEqual([]);
        expect(getAdjacentCatalogPages(0, false)).toEqual([1, 2]);
        expect(getBinderImagePages({ currentPage: 0, isMobile: false })).toEqual([1, 2]);

        expect(getActiveCatalogPages(18, false)).toEqual([]);
        expect(getAdjacentCatalogPages(18, false)).toEqual([16, 17]);
        expect(getBinderImagePages({ currentPage: 18, isMobile: false })).toEqual([16, 17]);
    });

    it("retains every requested mobile page after sequential navigation", () => {
        let retained: number[] = [];

        for (let currentPage = 1; currentPage <= 17; currentPage++) {
            retained = retainBinderImagePages(retained, getBinderImagePages({ currentPage, isMobile: true }));
        }

        expect(retained).toEqual(Array.from({ length: 17 }, (_, index) => index + 1));
    });
});
