import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Local Pokémon HTTP cache", () => {
    it("sets a long Cache-Control header only for /pokemon/:path*", async () => {
        const { default: nextConfig } = await import("../next.config");
        const headers = await nextConfig.headers?.();

        expect(headers).toEqual([
            {
                source: "/pokemon/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=86400, stale-while-revalidate=604800",
                    },
                ],
            },
        ]);

        const source = readFileSync(join(import.meta.dir, "../next.config.ts"), "utf8");
        expect(source).not.toContain('source: "/api');
        expect(source).toContain("unoptimized: true");
    });
});
