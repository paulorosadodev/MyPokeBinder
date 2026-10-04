import { NextResponse } from "next/server";

interface Bucket {
    hits: number[];
}

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

const SWEEP_INTERVAL_MS = 60_000;

function sweep(now: number) {
    if (now - lastSweep < SWEEP_INTERVAL_MS) return;
    lastSweep = now;
    for (const [key, bucket] of buckets) {
        bucket.hits = bucket.hits.filter((at) => now - at < 3_600_000);
        if (bucket.hits.length === 0) buckets.delete(key);
    }
}

function clientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        const first = forwarded.split(",")[0]?.trim();
        if (first) return first;
    }
    return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "unknown";
}

export interface RateLimitRule {
    limit: number;
    windowMs: number;
}

export function rateLimitResponse(retryAfterSeconds: number): NextResponse {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em alguns instantes." }, { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil(retryAfterSeconds))) } });
}

export function enforceRateLimit(request: Request, scope: string, rule: RateLimitRule, subjectId?: string): NextResponse | null {
    const now = Date.now();
    sweep(now);

    const key = `${scope}|${subjectId ?? clientIp(request)}`;
    const bucket = buckets.get(key) ?? { hits: [] };

    bucket.hits = bucket.hits.filter((at) => now - at < rule.windowMs);

    if (bucket.hits.length >= rule.limit) {
        const oldest = bucket.hits[0] ?? now;
        buckets.set(key, bucket);
        return rateLimitResponse((oldest + rule.windowMs - now) / 1000);
    }

    bucket.hits.push(now);
    buckets.set(key, bucket);
    return null;
}
