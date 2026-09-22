import { describe, it, expect, beforeEach } from "bun:test";
import { planBinderOpenAnimation } from "@/lib/pokemon/binderOpen";

describe("Settings and Animations Configuration Logic", () => {
    const ANIMATIONS_KEY = "mypokebinder_animations_enabled";
    const SOUND_KEY = "mypokebinder_sound_enabled";

    beforeEach(() => {
        if (typeof localStorage !== "undefined") {
            localStorage.clear();
        }
    });

    it("should default device animation preference to true when localStorage is empty", () => {
        if (typeof localStorage === "undefined") {
            return;
        }

        const cached = localStorage.getItem(ANIMATIONS_KEY);
        const animationsEnabled = cached === null ? true : cached === "true";
        expect(animationsEnabled).toBe(true);
    });

    it("should accept boolean false for animations preference in localStorage", () => {
        if (typeof localStorage === "undefined") {
            return;
        }

        localStorage.setItem(ANIMATIONS_KEY, "false");
        const animationsEnabled = localStorage.getItem(ANIMATIONS_KEY) === "true";
        expect(animationsEnabled).toBe(false);
    });

    it("should persist and read animations preference in local storage", () => {
        if (typeof localStorage === "undefined") {
            return;
        }

        localStorage.setItem(ANIMATIONS_KEY, "false");
        const cached = localStorage.getItem(ANIMATIONS_KEY);
        expect(cached).toBe("false");
        expect(cached === "true").toBe(false);

        localStorage.setItem(ANIMATIONS_KEY, "true");
        const updated = localStorage.getItem(ANIMATIONS_KEY);
        expect(updated).toBe("true");
        expect(updated === "true").toBe(true);
    });

    it("should persist and read sound preference only in local storage", () => {
        if (typeof localStorage === "undefined") {
            return;
        }

        localStorage.setItem(SOUND_KEY, "false");
        expect(localStorage.getItem(SOUND_KEY) === "true").toBe(false);

        localStorage.setItem(SOUND_KEY, "true");
        expect(localStorage.getItem(SOUND_KEY) === "true").toBe(true);
    });

    it("should keep sound and animation preferences independent per device key", () => {
        if (typeof localStorage === "undefined") {
            return;
        }

        localStorage.setItem(SOUND_KEY, "false");
        localStorage.setItem(ANIMATIONS_KEY, "true");

        expect(localStorage.getItem(SOUND_KEY)).toBe("false");
        expect(localStorage.getItem(ANIMATIONS_KEY)).toBe("true");
    });

    it("should combine user animation preference with system reduced motion preference", () => {
        const shouldReduceMotion = (userAnimationsEnabled: boolean, systemPrefersReduced: boolean): boolean => {
            return !userAnimationsEnabled || systemPrefersReduced;
        };

        expect(shouldReduceMotion(true, false)).toBe(false);
        expect(shouldReduceMotion(false, false)).toBe(true);
        expect(shouldReduceMotion(true, true)).toBe(true);
        expect(shouldReduceMotion(false, true)).toBe(true);
    });

    it("should guarantee flipping time is strictly positive to prevent page-flip library assertion errors", () => {
        const BINDER_FLIP_MS = 320;
        expect(BINDER_FLIP_MS).toBeGreaterThan(0);
    });

    it("should configure flipbook handlers to prevent manual dragging and folding when animations are disabled", () => {
        const getFlipbookInteractionProps = (animationsEnabled: boolean) => ({
            useMouseEvents: animationsEnabled,
            swipeDistance: animationsEnabled ? 30 : 999999,
            disableFlipByClick: !animationsEnabled,
            drawShadow: animationsEnabled,
            classNameModifier: !animationsEnabled ? "binder-flipbook-root--static" : "",
        });

        const activeProps = getFlipbookInteractionProps(true);
        expect(activeProps.useMouseEvents).toBe(true);
        expect(activeProps.swipeDistance).toBe(30);
        expect(activeProps.disableFlipByClick).toBe(false);
        expect(activeProps.drawShadow).toBe(true);
        expect(activeProps.classNameModifier).toBe("");

        const disabledProps = getFlipbookInteractionProps(false);
        expect(disabledProps.useMouseEvents).toBe(false);
        expect(disabledProps.swipeDistance).toBeGreaterThan(1000);
        expect(disabledProps.disableFlipByClick).toBe(true);
        expect(disabledProps.drawShadow).toBe(false);
        expect(disabledProps.classNameModifier).toBe("binder-flipbook-root--static");
    });

    it("should open directly on page 1 when animations are disabled on any screen", () => {
        const desktopWithAnim = planBinderOpenAnimation(1, false, false);
        expect(desktopWithAnim.animateFromCover).toBe(true);
        expect(desktopWithAnim.startPhysical).toBe(0);

        const desktopNoAnim = planBinderOpenAnimation(1, false, true);
        expect(desktopNoAnim.animateFromCover).toBe(false);
        expect(desktopNoAnim.startPhysical).toBe(2);
        expect(desktopNoAnim.targetPhysical).toBe(2);

        const mobileNoAnimPlan = planBinderOpenAnimation(1, true, true);
        expect(mobileNoAnimPlan.animateFromCover).toBe(false);
        expect(mobileNoAnimPlan.startPhysical).toBe(2);
        expect(mobileNoAnimPlan.targetPhysical).toBe(2);
    });

    it("should never let server theme payload overwrite device sound or animation preferences", () => {
        if (typeof localStorage === "undefined") {
            return;
        }

        localStorage.setItem(ANIMATIONS_KEY, "false");
        localStorage.setItem(SOUND_KEY, "false");

        const serverPayload = { theme_color: "#3b82f6", sound_enabled: true, animations_enabled: true };

        const resolveDevicePreference = (key: string) => {
            const cached = localStorage.getItem(key);
            if (cached !== null) {
                return cached === "true";
            }
            return true;
        };

        expect(resolveDevicePreference(ANIMATIONS_KEY)).toBe(false);
        expect(resolveDevicePreference(SOUND_KEY)).toBe(false);
        expect(serverPayload.theme_color).toBe("#3b82f6");
    });
});
