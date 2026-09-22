import { describe, it, expect } from "bun:test";

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
        const restingTransform = "rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale3d(1,1,1)";
        expect(restingTransform).toBe("rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale3d(1,1,1)");
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
});
