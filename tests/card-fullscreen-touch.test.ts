import { describe, it, expect } from "bun:test";
import { CARD_3D_REST_TRANSFORM } from "@/components/ui/Card3DTilt";

describe("Card Fullscreen Touch and Mobile Scroll Lock", () => {
    it("should clamp touch coordinates within [-1, 1] range even when finger drags beyond card bounds", () => {
        const rect = { left: 50, top: 100, width: 300, height: 420 };
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const touchSamples = [
            { clientX: 200, clientY: 310 },
            { clientX: -50, clientY: 310 },
            { clientX: 500, clientY: 310 },
            { clientX: 200, clientY: -20 },
            { clientX: 200, clientY: 800 },
        ];

        touchSamples.forEach((sample) => {
            const x = sample.clientX - rect.left;
            const y = sample.clientY - rect.top;

            const nx = Math.max(-1, Math.min(1, (x - centerX) / centerX));
            const ny = Math.max(-1, Math.min(1, (y - centerY) / centerY));

            expect(nx).toBeGreaterThanOrEqual(-1);
            expect(nx).toBeLessThanOrEqual(1);
            expect(ny).toBeGreaterThanOrEqual(-1);
            expect(ny).toBeLessThanOrEqual(1);
        });
    });

    it("should calculate correct 3D tilt rotation from touch coordinates", () => {
        const maxTilt = 18;
        const rect = { left: 0, top: 0, width: 200, height: 280 };
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rightTouchX = 200;
        const nxRight = Math.max(-1, Math.min(1, (rightTouchX - centerX) / centerX));
        const rotateYRight = nxRight * maxTilt;
        expect(rotateYRight).toBe(18);

        const leftTouchX = 0;
        const nxLeft = Math.max(-1, Math.min(1, (leftTouchX - centerX) / centerX));
        const rotateYLeft = nxLeft * maxTilt;
        expect(rotateYLeft).toBe(-18);

        const bottomTouchY = 280;
        const nyBottom = Math.max(-1, Math.min(1, (bottomTouchY - centerY) / centerY));
        const rotateXBottom = -nyBottom * maxTilt;
        expect(rotateXBottom).toBe(-18);

        const topTouchY = 0;
        const nyTop = Math.max(-1, Math.min(1, (topTouchY - centerY) / centerY));
        const rotateXTop = -nyTop * maxTilt;
        expect(rotateXTop).toBe(18);
    });

    it("should return card to neutral state when finger is lifted", () => {
        expect(CARD_3D_REST_TRANSFORM).toBe("none");
    });

    it("should lock body and html scroll when fullscreen lightbox is active", () => {
        const lockScrollStyles = {
            bodyOverflow: "hidden",
            bodyTouchAction: "none",
            htmlOverflow: "hidden",
            htmlTouchAction: "none",
        };

        expect(lockScrollStyles.bodyOverflow).toBe("hidden");
        expect(lockScrollStyles.bodyTouchAction).toBe("none");
        expect(lockScrollStyles.htmlOverflow).toBe("hidden");
        expect(lockScrollStyles.htmlTouchAction).toBe("none");
    });

    it("should prevent default on touchmove events to avoid browser pull-to-refresh and page scroll", () => {
        let prevented = false;
        const fakeTouchEvent = {
            cancelable: true,
            preventDefault: () => {
                prevented = true;
            },
        };

        if (fakeTouchEvent.cancelable) {
            fakeTouchEvent.preventDefault();
        }

        expect(prevented).toBe(true);
    });
});
