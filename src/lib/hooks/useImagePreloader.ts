import { useState, useEffect } from "react";

interface UseImagePreloaderOptions {
    timeoutMs?: number;
    enabled?: boolean;
}

export function useImagePreloader(urls: string[], options: UseImagePreloaderOptions = {}) {
    const { timeoutMs = 5000, enabled = true } = options;
    const [allLoaded, setAllLoaded] = useState(false);
    const [timedOut, setTimedOut] = useState(false);

    const urlsKey = urls.filter(Boolean).sort().join("|");

    useEffect(() => {
        if (!enabled || typeof window === "undefined") {
            setAllLoaded(false);
            return;
        }

        const validUrls = Array.from(new Set(urlsKey ? urlsKey.split("|").filter(Boolean) : []));
        if (validUrls.length === 0) {
            setAllLoaded(true);
            return;
        }

        setAllLoaded(false);
        setTimedOut(false);

        let active = true;
        let loadedCount = 0;

        const timer = setTimeout(() => {
            if (!active) return;
            setTimedOut(true);
            setAllLoaded(true);
        }, timeoutMs);

        validUrls.forEach((url) => {
            const img = new window.Image();
            let isDone = false;
            const handleDone = () => {
                if (!active || isDone) return;
                isDone = true;
                loadedCount += 1;
                if (loadedCount >= validUrls.length) {
                    clearTimeout(timer);
                    setAllLoaded(true);
                }
            };
            img.onload = handleDone;
            img.onerror = handleDone;
            img.src = url;
            if (img.complete) {
                handleDone();
            }
        });

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [urlsKey, enabled, timeoutMs]);

    return { allLoaded, timedOut };
}

const preloadedUrlCache = new Set<string>();

export function preloadImages(urls: string[]) {
    if (typeof window === "undefined") return;
    const validUrls = Array.from(new Set(urls.filter(Boolean)));
    validUrls.forEach((url) => {
        if (preloadedUrlCache.has(url)) return;
        preloadedUrlCache.add(url);
        const img = new window.Image();
        img.src = url;
    });
}
