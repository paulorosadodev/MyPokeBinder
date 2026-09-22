import { describe, it, expect } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { PokeballLogo } from "../src/components/ui/PokeballLogo";
import { PublicHeader } from "../src/components/layout/PublicHeader";
import { PublicFooter } from "../src/components/layout/PublicFooter";

describe("Pokeball Color on Public and Institutional Pages", () => {
    it("should render red fill and red glow when color=#ef4444 is provided", () => {
        const html = renderToString(React.createElement(PokeballLogo, { color: "#ef4444", glow: "subtle" }));
        expect(html).toContain('fill="#ef4444"');
        expect(html).toContain("drop-shadow(0 0 6px color-mix(in srgb, #ef4444 40%, transparent))");
    });

    it("should fallback to theme variable when color is not passed in application context", () => {
        const html = renderToString(React.createElement(PokeballLogo, { glow: "subtle" }));
        expect(html).toContain('fill="var(--theme-primary, #ef4444)"');
        expect(html).toContain("var(--theme-primary-glow");
    });

    it("should ensure PublicHeader renders PokeballLogo with fixed red #ef4444", () => {
        const html = renderToString(React.createElement(PublicHeader));
        expect(html).toContain('fill="#ef4444"');
        expect(html).not.toContain('fill="var(--theme-primary');
    });

    it("should ensure PublicFooter renders PokeballLogo with fixed red #ef4444", () => {
        const html = renderToString(React.createElement(PublicFooter));
        expect(html).toContain('fill="#ef4444"');
        expect(html).not.toContain('fill="var(--theme-primary');
    });
});
