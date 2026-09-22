const inFlightRequests = new Map<string, Promise<unknown>>();

export async function coalesceRequest<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    const existing = inFlightRequests.get(key);
    if (existing) {
        return existing as Promise<T>;
    }

    const promise = fetchFn().finally(() => {
        inFlightRequests.delete(key);
    });

    inFlightRequests.set(key, promise);
    return promise;
}

interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();

export function getFromMemoryCache<T>(key: string): T | null {
    const entry = memoryCache.get(key);
    if (!entry) {
        return null;
    }

    if (Date.now() > entry.expiresAt) {
        memoryCache.delete(key);
        return null;
    }

    return entry.data as T;
}

export function setToMemoryCache<T>(key: string, data: T, ttlMs: number): void {
    memoryCache.set(key, {
        data,
        expiresAt: Date.now() + ttlMs,
    });
}
