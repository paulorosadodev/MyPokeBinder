import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildCardBadgeItems } from "@/components/ui/CardBadgeStack";

describe("Pilha editorial de indicadores da carta", () => {
    it("mantém condição, idioma e quantidade nessa ordem", () => {
        expect(
            buildCardBadgeItems({
                condition: "NM",
                count: 3,
                language: "pt-br",
            }),
        ).toEqual([
            { kind: "condition", label: "NM", ariaLabel: "Near Mint" },
            { kind: "language", label: "PT-BR", ariaLabel: "Idioma PT-BR" },
            { kind: "count", label: "x3", ariaLabel: "3 cópias idênticas" },
        ]);
    });

    it("limita o rótulo visível de quantidade a +9", () => {
        expect(buildCardBadgeItems({ count: 10, includeCondition: false, includeLanguage: false })).toEqual([{ kind: "count", label: "+9", ariaLabel: "10 cópias idênticas" }]);
    });

    it("omite quantidade unitária e preserva o idioma", () => {
        expect(
            buildCardBadgeItems({
                condition: "D",
                count: 1,
                language: "ja",
            }),
        ).toEqual([
            { kind: "condition", label: "D", ariaLabel: "Damaged" },
            { kind: "language", label: "JA", ariaLabel: "Idioma JA" },
        ]);
    });

    it("permite a variante de catálogo sem repetir condição ou idioma", () => {
        expect(buildCardBadgeItems({ count: 2, language: "en", includeLanguage: false, includeCondition: false })).toEqual([{ kind: "count", label: "x2", ariaLabel: "2 cópias idênticas" }]);
    });

    it("mantém a bandeira sem superfície escura e remove sombra do ícone", () => {
        const badgeStack = readFileSync(join(import.meta.dir, "../src/components/ui/CardBadgeStack.tsx"), "utf8");
        const flagIcon = readFileSync(join(import.meta.dir, "../src/components/ui/FlagIcon.tsx"), "utf8");

        expect(badgeStack).toContain('language === "pt-br" ? "border-transparent bg-[#009c3b]"');
        expect(badgeStack).toContain('className="h-[14px] w-5 !rounded-[2px] !shadow-none"');
        expect(flagIcon).not.toContain("shadow-xs");
    });
});
