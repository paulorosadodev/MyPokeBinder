import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Themed scrollbar styles", () => {
    it("configures custom scrollbars linked to theme variables in globals.css", () => {
        const css = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");

        expect(css).toContain("::-webkit-scrollbar");
        expect(css).toContain("::-webkit-scrollbar-thumb");
        expect(css).toContain("::-webkit-scrollbar-track");
        expect(css).toContain("var(--theme-primary");
        expect(css).toContain("var(--theme-primary-glow");
        expect(css).toContain("scrollbar-color");
        expect(css).not.toContain("background: #242c3d;");
        expect(css).not.toContain("background: #37435c;");
    });

    it("includes hover and active interactive states with glow", () => {
        const css = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");

        expect(css).toContain("::-webkit-scrollbar-thumb:hover");
        expect(css).toContain("::-webkit-scrollbar-thumb:active");
        expect(css).toContain("box-shadow: 0 0 10px var(--theme-primary-glow");
        expect(css).toContain("box-shadow: 0 0 14px var(--theme-primary-glow");
    });
});
