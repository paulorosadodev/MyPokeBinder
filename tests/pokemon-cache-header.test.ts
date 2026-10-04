import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

type HeaderRule = { source: string; headers: Array<{ key: string; value: string }> };

function headersFor(rules: HeaderRule[], source: string): Array<{ key: string; value: string }> {
    const matching = rules.filter((rule) => rule.source === source);
    return matching.flatMap((rule) => rule.headers);
}

describe("Local Pokémon HTTP cache", () => {
    it("sets a long Cache-Control header only for /pokemon/:path*", async () => {
        const { default: nextConfig } = await import("../next.config");
        const rules = (await nextConfig.headers?.()) as HeaderRule[];

        expect(headersFor(rules, "/pokemon/:path*")).toContainEqual({
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
        });

        const longCache = (headers: Array<{ key: string; value: string }>) => headers.find((h) => h.key === "Cache-Control" && h.value.startsWith("public, max-age=86400"));
        expect(rules.filter((rule) => longCache(rule.headers))).toHaveLength(1);

        const source = readFileSync(join(import.meta.dir, "../next.config.ts"), "utf8");
        expect(source).not.toContain('source: "/api');
        expect(source).toContain("unoptimized: true");
    });
});

describe("Security headers", () => {
    it("applies hardening headers to every route", async () => {
        const { default: nextConfig } = await import("../next.config");
        const rules = (await nextConfig.headers?.()) as HeaderRule[];

        expect(rules.some((rule) => rule.source === "/:path*")).toBe(true);

        const global = headersFor(rules, "/:path*");
        const keys = global.map((h) => h.key);

        for (const expected of ["Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) {
            expect(keys).toContain(expected);
        }

        const csp = global.find((h) => h.key === "Content-Security-Policy")?.value ?? "";
        expect(csp).toContain("frame-ancestors 'none'");
        expect(csp).toContain("object-src 'none'");
        expect(csp).toContain("base-uri 'self'");
    });

    it("only allows unsafe-eval when explicitly opted in", async () => {
        const { contentSecurityPolicyForTesting } = await import("../next.config");
        expect(contentSecurityPolicyForTesting(false)).not.toContain("unsafe-eval");
        expect(contentSecurityPolicyForTesting(true)).toContain("unsafe-eval");
    });
});
