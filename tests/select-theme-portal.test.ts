import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("tema do Select renderizado em portal", () => {
    it("copia as variáveis de tema do gatilho para o menu no body", () => {
        const source = readFileSync(join(import.meta.dir, "../src/components/ui/Select.tsx"), "utf8");

        expect(source).toContain("getComputedStyle(trigger)");
        expect(source).toContain('"--theme-primary"');
        expect(source).toContain('"--color-poke-blue"');
        expect(source).toContain('"--theme-primary-hover"');
        expect(source).toContain('"--theme-primary-glow"');
        expect(source).toContain("...themeStyle");
        expect(source).toContain("if (next) {");
        expect(source).toContain("updateMenuPosition();");
        expect(source.indexOf("updateMenuPosition();")).toBeLessThan(source.indexOf("setIsOpen(next);"));
    });
});
