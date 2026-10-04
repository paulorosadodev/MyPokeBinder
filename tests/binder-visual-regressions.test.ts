import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CARD_3D_REST_TRANSFORM } from "@/components/ui/Card3DTilt";
import { truncateSearchPlaceholder } from "@/lib/ui/searchPlaceholder";

describe("Binder visual regressions", () => {
    it("keeps the resting card layer out of PageFlip transform composition", () => {
        expect(CARD_3D_REST_TRANSFORM).toBe("none");
    });

    it("truncates search placeholders at a complete word", () => {
        const measure = (value: string) => value.length;

        expect(truncateSearchPlaceholder("Buscar por Pokémon, número, coleção", 20, measure)).toBe("Buscar por Pokémon…");
        expect(truncateSearchPlaceholder("Buscar por Pokémon", 40, measure)).toBe("Buscar por Pokémon");
        expect(truncateSearchPlaceholder("Buscar", 1, measure)).toBe("…");
    });

    it("uses a smooth binder entrance and keeps a thin continuous ring while the card pulses", () => {
        const css = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");

        expect(css).toContain("@keyframes binder-stage-entrance");
        const binderEntranceKeyframes = css.match(/@keyframes binder-stage-entrance\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
        expect(binderEntranceKeyframes).toContain("opacity: 0;");
        expect(binderEntranceKeyframes).toContain("transform: translateY(10px) scale(0.992);");
        expect(binderEntranceKeyframes).not.toContain("rotate(");
        expect(binderEntranceKeyframes).not.toContain("translateY(-");
        expect(css).toContain("cubic-bezier(0.16, 1, 0.3, 1)");
        expect(css).toContain(".slot-glow::after");
        const glowContainerRule = css.match(/\.slot-glow\s*\{([\s\S]*?)\}/)?.[1] ?? "";
        const glowOverlayRule = css.match(/\.slot-glow::after\s*\{([\s\S]*?)\}/)?.[1] ?? "";
        const glowKeyframes = css.match(/@keyframes slot-glow-selection\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
        expect(glowContainerRule).toContain("animation: slot-glow-scale");
        expect(glowOverlayRule).toContain("inset: 0");
        expect(glowOverlayRule).toContain("border: 1px solid");
        expect(glowKeyframes.match(/opacity:\s*0;/g)).toHaveLength(1);
        expect(css).toContain(".binder-book-stage--portrait .stf__item");
    });

    it("uses a Pokémon-only placeholder in the binder search", () => {
        const controls = readFileSync(join(import.meta.dir, "../src/components/binder/BinderControls.tsx"), "utf8");

        expect(controls).toContain('placeholder="Buscar por nome ou pokédex..."');
        expect(controls).not.toContain("coleção ou pokédex");
    });

    it("ensures binder slot names do not clip descenders", () => {
        const css = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");
        const slotNameRule = css.match(/\.binder-slot-name\s+span\s*\{([\s\S]*?)\}/)?.[1] ?? "";

        expect(slotNameRule).not.toContain("height: 11px");
        expect(slotNameRule).not.toContain("line-height: 11px");
        expect(slotNameRule).toContain("line-height: 1.25");
        expect(slotNameRule).toContain("padding-bottom: 2px");
    });
});
