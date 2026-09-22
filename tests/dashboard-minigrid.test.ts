import { describe, it, expect } from "bun:test";
import { getPokemonSilhouetteUrl } from "../src/lib/pokemon/constants";

describe("Dashboard Minigrid Slot Logic", () => {
    it("should resolve official pokemon artwork for all 151 slots", () => {
        for (let dexId = 1; dexId <= 151; dexId++) {
            const url = getPokemonSilhouetteUrl(dexId);
            expect(url).toBe(`/pokemon/gen1/${dexId}.png`);
        }
    });

    it("should apply subtle scale-[1.02] on hover to avoid excessive expansion", () => {
        const getScaleClass = (isHovered: boolean) => (isHovered ? "scale-[1.02] z-10" : "z-1");
        expect(getScaleClass(true)).toBe("scale-[1.02] z-10");
        expect(getScaleClass(false)).toBe("z-1");
        expect(getScaleClass(true)).not.toContain("scale-110");
        expect(getScaleClass(true)).not.toContain("scale-105");
    });

    it("should generate theme glow and border for filled slots on hover", () => {
        const getSlotStyleClasses = (slot: { is_filled: boolean }, isHovered: boolean) => {
            if (slot.is_filled) {
                return isHovered ? "border border-poke-blue bg-poke-blue/25 shadow-[0_0_15px_var(--theme-primary-glow)]" : "border border-poke-blue bg-poke-blue/15 shadow-[0_0_6px_var(--theme-primary-glow)]";
            }
            return isHovered ? "border border-white/30 bg-white/[0.05] shadow-[0_0_8px_rgba(255,255,255,0.12)]" : "border border-white/10 bg-white/[0.02]";
        };

        const filledHover = getSlotStyleClasses({ is_filled: true }, true);
        expect(filledHover).toContain("border-poke-blue");
        expect(filledHover).toContain("shadow-[0_0_15px_var(--theme-primary-glow)]");

        const filledIdle = getSlotStyleClasses({ is_filled: true }, false);
        expect(filledIdle).toContain("border-poke-blue");
        expect(filledIdle).toContain("shadow-[0_0_6px_var(--theme-primary-glow)]");
    });

    it("should distinguish filled colorful image from unfilled silhouette", () => {
        const getImageClasses = (isFilled: boolean, isImageLoaded: boolean) => {
            if (isFilled) {
                return `object-contain transition-all duration-300 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] ${isImageLoaded ? "opacity-100" : "opacity-0"}`;
            }
            return `silhouette-img object-contain transition-opacity duration-300 ${isImageLoaded ? "opacity-30" : "opacity-0"}`;
        };

        const filledLoaded = getImageClasses(true, true);
        expect(filledLoaded).toContain("opacity-100");
        expect(filledLoaded).toContain("drop-shadow");
        expect(filledLoaded).not.toContain("silhouette-img");

        const unfilledLoaded = getImageClasses(false, true);
        expect(unfilledLoaded).toContain("silhouette-img");
        expect(unfilledLoaded).toContain("opacity-30");
        expect(unfilledLoaded).not.toContain("drop-shadow");
    });

    it("should provide pure CSS hover classes for GPU transition without react state", () => {
        const getStaticSlotClasses = (slot: { is_filled: boolean }) => {
            if (slot.is_filled) {
                return "border border-poke-blue bg-poke-blue/15 shadow-[0_0_6px_var(--theme-primary-glow)] hover:border-poke-blue hover:bg-poke-blue/25 hover:shadow-[0_0_15px_var(--theme-primary-glow)]";
            }
            return "border border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05] hover:shadow-[0_0_8px_rgba(255,255,255,0.12)]";
        };

        const filledClasses = getStaticSlotClasses({ is_filled: true });
        expect(filledClasses).toContain("hover:border-poke-blue");
        expect(filledClasses).toContain("hover:shadow-[0_0_15px_var(--theme-primary-glow)]");

        const emptyClasses = getStaticSlotClasses({ is_filled: false });
        expect(emptyClasses).toContain("hover:border-white/30");
        expect(emptyClasses).toContain("hover:shadow-[0_0_8px_rgba(255,255,255,0.12)]");
    });
});
