import type { NextConfig } from "next";

function buildContentSecurityPolicy(allowEval: boolean): string {
    const cardImagesOrigin = getCardImagesOrigin();
    return [
        "default-src 'self'",
        `script-src 'self' 'unsafe-inline'${allowEval ? " 'unsafe-eval'" : ""}`,
        "style-src 'self' 'unsafe-inline'",
        `img-src 'self' data: blob: https://assets.tcgdex.net https://raw.githubusercontent.com https://lh3.googleusercontent.com https://*.googleusercontent.com${cardImagesOrigin ? ` ${cardImagesOrigin}` : ""}`,
        "font-src 'self' data:",
        "connect-src 'self' ws: wss: https://cauuttzkxcmqwlsfoeib.supabase.co wss://cauuttzkxcmqwlsfoeib.supabase.co",
        "media-src 'self' blob: data:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
    ].join("; ");
}

function getCardImagesOrigin(): string | null {
    const configuredUrl = process.env.CARD_IMAGES_R2_PUBLIC_URL?.trim();
    if (!configuredUrl) {
        return null;
    }

    try {
        const url = new URL(configuredUrl);
        return url.protocol === "https:" ? url.origin : null;
    } catch {
        return null;
    }
}

export function contentSecurityPolicyForTesting(allowEval: boolean): string {
    return buildContentSecurityPolicy(allowEval);
}

const contentSecurityPolicy = buildContentSecurityPolicy(process.env.MYPOKEBINDER_CSP_ALLOW_EVAL === "1");

const securityHeaders = [
    { key: "Content-Security-Policy", value: contentSecurityPolicy },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        minimumCacheTTL: 2678400,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "assets.tcgdex.net",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
            {
                source: "/pokemon/:path*",
                headers: [
                    ...securityHeaders,
                    {
                        key: "Cache-Control",
                        value: "public, max-age=86400, stale-while-revalidate=604800",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
