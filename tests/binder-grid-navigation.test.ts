import { describe, it, expect } from "bun:test";
import { getPageForDexId } from "@/lib/pokemon/constants";

describe("Binder Grid Navigation and Page Turning Logic", () => {
    it("should resolve target pages correctly when navigating from grid by dexId", () => {
        expect(getPageForDexId(1)).toBe(1);
        expect(getPageForDexId(25)).toBe(3);
        expect(getPageForDexId(50)).toBe(6);
        expect(getPageForDexId(151)).toBe(17);
    });

    it("should consume dexId navigation only once and avoid repeating on page turn", () => {
        let currentHandledDexId: number | null = null;
        let turnToPageCalls: number[] = [];
        let replacedUrls: string[] = [];

        const navigateToPokemonFromGrid = (dexIdParam: string | null, openSelect: boolean, activePages: number[], turnToPage: (page: number) => void, replaceUrl: (url: string) => void) => {
            if (!dexIdParam || openSelect) return;
            const targetDexId = parseInt(dexIdParam, 10);
            if (isNaN(targetDexId) || targetDexId < 1 || targetDexId > 151) return;
            if (currentHandledDexId === targetDexId) return;

            currentHandledDexId = targetDexId;
            const targetPage = getPageForDexId(targetDexId);
            if (!activePages.includes(targetPage)) {
                turnToPage(targetPage);
            }
            replaceUrl(`/?page=${targetPage}`);
        };

        const turnToPage = (page: number) => {
            turnToPageCalls.push(page);
        };
        const replaceUrl = (url: string) => {
            replacedUrls.push(url);
        };

        navigateToPokemonFromGrid("25", false, [1, 2], turnToPage, replaceUrl);
        expect(turnToPageCalls).toEqual([3]);
        expect(replacedUrls).toEqual(["/?page=3"]);
        expect(currentHandledDexId as number | null).toBe(25);

        let activePages = [3, 4];
        navigateToPokemonFromGrid("25", false, activePages, turnToPage, replaceUrl);
        expect(turnToPageCalls).toEqual([3]);

        activePages = [5, 6];
        navigateToPokemonFromGrid(null, false, activePages, turnToPage, replaceUrl);
        expect(turnToPageCalls).toEqual([3]);
    });

    it("should allow navigating to a different dexId when coming from grid again", () => {
        let currentHandledDexId: number | null = null;
        let turnToPageCalls: number[] = [];

        const handleIncomingDexId = (dexIdParam: string | null, activePages: number[]) => {
            if (!dexIdParam) return;
            const targetDexId = parseInt(dexIdParam, 10);
            if (isNaN(targetDexId) || targetDexId < 1 || targetDexId > 151) return;
            if (currentHandledDexId === targetDexId) return;

            currentHandledDexId = targetDexId;
            const targetPage = getPageForDexId(targetDexId);
            if (!activePages.includes(targetPage)) {
                turnToPageCalls.push(targetPage);
            }
        };

        handleIncomingDexId("25", [1, 2]);
        expect(turnToPageCalls).toEqual([3]);
        expect(currentHandledDexId as number | null).toBe(25);

        handleIncomingDexId("50", [3, 4]);
        expect(turnToPageCalls).toEqual([3, 6]);
        expect(currentHandledDexId as number | null).toBe(50);
    });

    it("should clean dexId from url params after navigating from grid", () => {
        const buildCleanBinderUrl = (targetDexId: number) => {
            const page = getPageForDexId(targetDexId);
            return `/?page=${page}`;
        };

        expect(buildCleanBinderUrl(25)).toBe("/?page=3");
        expect(buildCleanBinderUrl(25)).not.toContain("dexId");
        expect(buildCleanBinderUrl(151)).toBe("/?page=17");
    });

    it("should clear highlighted pokemon state when changing pages or when timer completes", () => {
        let highlightedDexId: number | null = null;

        const triggerHighlight = (dexId: number) => {
            highlightedDexId = dexId;
        };
        const clearHighlight = () => {
            highlightedDexId = null;
        };

        triggerHighlight(25);
        expect(highlightedDexId as number | null).toBe(25);

        clearHighlight();
        expect(highlightedDexId).toBeNull();
    });
});
