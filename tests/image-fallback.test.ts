import { describe, it, expect, mock } from "bun:test";
import { resolveCardImageFallback, CARD_IMAGE_FALLBACK_LANGUAGES } from "../src/lib/pokemon/imageFallback";

describe("imageFallback", () => {
    it("should define fallback languages in order pt, es, it", () => {
        expect(CARD_IMAGE_FALLBACK_LANGUAGES).toEqual(["pt", "es", "it"]);
    });

    it("should return null for empty or invalid card ids", async () => {
        expect(await resolveCardImageFallback("")).toBeNull();
        expect(await resolveCardImageFallback("   ")).toBeNull();
        expect(await resolveCardImageFallback(null)).toBeNull();
        expect(await resolveCardImageFallback(undefined)).toBeNull();
    });

    it("should resolve fallback image when pt has the image", async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = (async (url: string | URL | Request) => {
            const urlStr = url.toString();
            if (urlStr.includes("/pt/cards/test-card-1")) {
                return new Response(JSON.stringify({ image: "https://assets.tcgdex.net/pt/sm/sm3.5/1" }), { status: 200 });
            }
            return new Response(JSON.stringify({}), { status: 404 });
        }) as any;

        try {
            const result = await resolveCardImageFallback("test-card-1");
            expect(result).toBe("https://assets.tcgdex.net/pt/sm/sm3.5/1");
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it("should resolve fallback image when es has the image and pt does not", async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = (async (url: string | URL | Request) => {
            const urlStr = url.toString();
            if (urlStr.includes("/pt/cards/test-card-2")) {
                return new Response(JSON.stringify({ image: "" }), { status: 200 });
            }
            if (urlStr.includes("/es/cards/test-card-2")) {
                return new Response(JSON.stringify({ image: "https://assets.tcgdex.net/es/tk/tk-xy-latio/1" }), { status: 200 });
            }
            return new Response(JSON.stringify({}), { status: 404 });
        }) as any;

        try {
            const result = await resolveCardImageFallback("test-card-2");
            expect(result).toBe("https://assets.tcgdex.net/es/tk/tk-xy-latio/1");
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it("should resolve fallback image when it has the image and pt and es do not", async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = (async (url: string | URL | Request) => {
            const urlStr = url.toString();
            if (urlStr.includes("/it/cards/test-card-3")) {
                return new Response(JSON.stringify({ image: "https://assets.tcgdex.net/it/tk/tk-xy-p/1" }), { status: 200 });
            }
            return new Response(JSON.stringify({}), { status: 404 });
        }) as any;

        try {
            const result = await resolveCardImageFallback("test-card-3");
            expect(result).toBe("https://assets.tcgdex.net/it/tk/tk-xy-p/1");
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    it("should return null if none of the fallback languages have the image", async () => {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = (async () => {
            return new Response(JSON.stringify({}), { status: 404 });
        }) as any;

        try {
            const result = await resolveCardImageFallback("unknown-card-999");
            expect(result).toBeNull();
        } finally {
            globalThis.fetch = originalFetch;
        }
    });
});
