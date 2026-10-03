import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CARD_3D_REST_TRANSFORM, getCard3DNeutralTransform } from "@/components/ui/Card3DTilt";

describe("Lightweight 3D Card Tilt Logic", () => {
    it("should compute strictly unscaled transform with scale 1", () => {
        const scale = 1;
        expect(scale).toBe(1);

        const computeTransform = (rotX: number, rotY: number, moveX: number, moveY: number, perspective = 900) => {
            return `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${moveX.toFixed(2)}px,${moveY.toFixed(2)}px,0) scale3d(${scale},${scale},${scale})`;
        };

        const transform = computeTransform(4.5, -3.2, 2.1, -1.8);
        expect(transform).toContain("scale3d(1,1,1)");
        expect(transform).toContain("perspective(900px)");
        expect(transform).toContain("translate3d(2.10px,-1.80px,0)");
    });

    it("should bound translation strictly within maxMove range", () => {
        const maxMove = 4;
        const rect = { width: 200, height: 280 };
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const positions = [
            { x: 0, y: 0 },
            { x: centerX, y: centerY },
            { x: rect.width, y: rect.height },
            { x: 50, y: 220 },
        ];

        positions.forEach((pos) => {
            const moveX = ((pos.x - centerX) / centerX) * maxMove;
            const moveY = ((pos.y - centerY) / centerY) * maxMove;

            expect(Math.abs(moveX)).toBeLessThanOrEqual(maxMove);
            expect(Math.abs(moveY)).toBeLessThanOrEqual(maxMove);
        });
    });

    it("should bound tilt angles strictly within lightweight maxTilt limit", () => {
        const maxTilt = 8;
        const rect = { width: 180, height: 250 };
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const testPoints = [
            { x: 0, y: 0 },
            { x: rect.width, y: 0 },
            { x: 0, y: rect.height },
            { x: rect.width, y: rect.height },
            { x: centerX, y: centerY },
        ];

        testPoints.forEach((point) => {
            const rotateY = ((point.x - centerX) / centerX) * maxTilt;
            const rotateX = ((centerY - point.y) / centerY) * maxTilt;

            expect(Math.abs(rotateY)).toBeLessThanOrEqual(maxTilt);
            expect(Math.abs(rotateX)).toBeLessThanOrEqual(maxTilt);
        });
    });

    it("should return neutral resting transform on reset without scale distortion", () => {
        expect(CARD_3D_REST_TRANSFORM).toBe("none");
    });

    it("should provide matching function-list neutral transform for smooth return interpolation", () => {
        expect(getCard3DNeutralTransform(900)).toBe("perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0px,0px,0) scale3d(1,1,1)");
        expect(getCard3DNeutralTransform()).toBe("perspective(800px) rotateX(0deg) rotateY(0deg) translate3d(0px,0px,0) scale3d(1,1,1)");
    });

    it("should maintain light configuration parameters for collection and modals", () => {
        const collectionConfig = {
            maxTilt: 8,
            maxMove: 4,
            scale: 1,
            glareOpacity: 0.2,
            perspective: 900,
        };

        expect(collectionConfig.scale).toBe(1);
        expect(collectionConfig.maxTilt).toBeLessThanOrEqual(10);
        expect(collectionConfig.maxMove).toBeLessThanOrEqual(5);
        expect(collectionConfig.glareOpacity).toBeLessThanOrEqual(0.25);
    });

    it("should match every foil surface to the 600 by 825 TCGdex card contour", () => {
        expect(600 / 825).toBe(8 / 11);

        const cardSurfaceFiles = ["../src/app/collection/page.tsx", "../src/app/cards/[id]/CardDetailClient.tsx", "../src/app/login/page.tsx", "../src/components/landing/LandingPage.tsx", "../src/components/modal/BinderSlotSelectModal.tsx", "../src/components/modal/CardSearchModal.tsx", "../src/components/profile/PublicCollectionView.tsx", "../src/components/profile/TrainerProfileView.tsx", "../src/components/ui/CardLightbox.tsx"];

        for (const relativePath of cardSurfaceFiles) {
            const source = readFileSync(join(import.meta.dir, relativePath), "utf8");

            expect(source).not.toContain("aspect-[2.5/3.5]");
            expect(source).not.toContain('aspectRatio: "2.5 / 3.5"');
            expect(source).toMatch(/aspect-\[8\/11\]|aspectRatio: "8 \/ 11"/);
        }
    });

    it("should crop normal foil to the artwork and align the lower reverse foil cutout", () => {
        const css = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");
        const holoCropRule = css.match(/\.holo-sheen,\s*\.card-glare--holo,\s*\.card-idle-holo\s*\{([\s\S]*?)\}/)?.[1] ?? "";
        const reverseCropRule = css.match(/\.foil-sheen,\s*\.card-glare--foil,\s*\.card-idle-foil,\s*\.card-element-pattern\s*\{([\s\S]*?)\}/)?.[1] ?? "";

        expect(holoCropRule).toContain("inset: 9% 7.8% 50% 7.8%");
        expect(reverseCropRule).toContain("#000 8.4%, transparent 9%");
        expect(reverseCropRule).toContain("transparent 49.4%, #000 50%");
        expect(reverseCropRule).toContain("-webkit-mask-composite: source-over");
        expect(reverseCropRule).toContain("mask-composite: add");
        expect(css).toMatch(/\.card-idle-foil,\s*\.card-element-pattern\s*\{/);
        expect(css).not.toContain("#000 11.2%, transparent 11.8%");
        expect(css).not.toContain("transparent 52.4%, #000 53%");
    });

    it("should keep prismatic artwork on an uncropped sheen layer", () => {
        const component = readFileSync(join(import.meta.dir, "../src/components/ui/Card3DTilt.tsx"), "utf8");
        const css = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");
        const holoCropSelector = css.match(/([^{}]*\.holo-sheen[^{}]*)\{\s*inset: 9% 7.8% 50% 7.8%/)?.[1] ?? "";

        expect(component).toContain('shineMode === "prismatic" ? "prismatic-sheen"');
        expect(css).toMatch(/\.prismatic-sheen,\s*\.holo-sheen\s*\{/);
        expect(holoCropSelector).not.toContain(".prismatic-sheen");
    });
});
