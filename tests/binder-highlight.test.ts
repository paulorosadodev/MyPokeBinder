import { describe, it, expect } from "bun:test";
import { BINDER_HIGHLIGHT_DURATION_MS, FILLED_BINDER_SLOT_CELL_CLASS, FILLED_BINDER_SLOT_FRAME_CLASS, canStartBinderHighlight, getBinderHighlightWaitDecision, getBinderSlotHighlightClass, shouldClearHighlightOnPageChange, shouldResetBinderReadyForViewportChange, shouldShowSlotGlow } from "../src/lib/pokemon/binderHighlight";

describe("Binder slot highlight", () => {
    it("keeps the glow duration long enough for two full pulses", () => {
        expect(BINDER_HIGHLIGHT_DURATION_MS).toBe(3400);
    });

    it("does not start highlight until the target page is active, the book is ready, and the slot is painted", () => {
        const visibleMew = {
            targetDexId: 151,
            activePages: [16, 17],
            isBookReady: true,
            isFlipping: false,
            isSlotVisible: true,
        };

        expect(canStartBinderHighlight(visibleMew)).toBe(true);
        expect(canStartBinderHighlight({ ...visibleMew, activePages: [1, 2] })).toBe(false);
        expect(canStartBinderHighlight({ ...visibleMew, isFlipping: true })).toBe(false);
        expect(canStartBinderHighlight({ ...visibleMew, isBookReady: false })).toBe(false);
        expect(canStartBinderHighlight({ ...visibleMew, isSlotVisible: false })).toBe(false);
    });

    it("does not start highlight for a grid/search target whose page is still flipping in", () => {
        expect(
            canStartBinderHighlight({
                targetDexId: 25,
                activePages: [1, 2],
                isBookReady: true,
                isFlipping: false,
                isSlotVisible: true,
            }),
        ).toBe(false);
    });

    it("does not clear a pending highlight when the landing page still shows that pokemon", () => {
        expect(
            shouldClearHighlightOnPageChange({
                pendingDexId: 151,
                nextPage: 17,
                isMobile: false,
            }),
        ).toBe(false);
        expect(
            shouldClearHighlightOnPageChange({
                pendingDexId: 25,
                nextPage: 3,
                isMobile: false,
            }),
        ).toBe(false);
        expect(
            shouldClearHighlightOnPageChange({
                pendingDexId: 25,
                nextPage: 3,
                isMobile: true,
            }),
        ).toBe(false);
    });

    it("clears highlight when turning away from the pending pokemon or when nothing is pending", () => {
        expect(
            shouldClearHighlightOnPageChange({
                pendingDexId: 151,
                nextPage: 3,
                isMobile: false,
            }),
        ).toBe(true);
        expect(
            shouldClearHighlightOnPageChange({
                pendingDexId: null,
                nextPage: 17,
                isMobile: false,
            }),
        ).toBe(true);
    });

    it("defers the CSS glow until the page flip is idle so the animation starts on first paint", () => {
        expect(shouldShowSlotGlow(true, false)).toBe(true);
        expect(shouldShowSlotGlow(true, true)).toBe(false);
        expect(shouldShowSlotGlow(false, false)).toBe(false);
    });

    it("preserves the ready signal received during the initial grid navigation mount", () => {
        expect(shouldResetBinderReadyForViewportChange(null, false)).toBe(false);
        expect(shouldResetBinderReadyForViewportChange(null, true)).toBe(false);
        expect(shouldResetBinderReadyForViewportChange(false, false)).toBe(false);
        expect(shouldResetBinderReadyForViewportChange(false, true)).toBe(true);
    });

    it("keeps a distant-page highlight pending until the target is actually painted", () => {
        expect(getBinderHighlightWaitDecision({ isPending: true, isReady: false })).toBe("wait");
        expect(getBinderHighlightWaitDecision({ isPending: true, isReady: true })).toBe("start");
        expect(getBinderHighlightWaitDecision({ isPending: false, isReady: true })).toBe("cancel");
    });

    it("fits the filled-card ring to the TCG card frame instead of the taller slot cell", () => {
        expect(FILLED_BINDER_SLOT_CELL_CLASS).toContain("[container-type:size]");
        expect(FILLED_BINDER_SLOT_FRAME_CLASS).toContain("aspect-[8/11]");
        expect(FILLED_BINDER_SLOT_FRAME_CLASS).toContain("100cqw*11/8");
        expect(FILLED_BINDER_SLOT_FRAME_CLASS).toContain("100cqh*8/11");
        expect(FILLED_BINDER_SLOT_FRAME_CLASS).toContain("rounded-[5.5%/4%]");
        expect(getBinderSlotHighlightClass(true)).toBe("slot-glow");
        expect(getBinderSlotHighlightClass(true)).not.toContain("ring-2");
        expect(getBinderSlotHighlightClass(true)).not.toContain("border-black");
        expect(getBinderSlotHighlightClass(false)).toBe("");
    });
});
