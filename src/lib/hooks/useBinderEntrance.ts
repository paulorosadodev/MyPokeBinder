"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const LOADER_DELAY_MS = 400;
const LOADER_MIN_VISIBLE_MS = 400;

export function useBinderEntrance(isReady: boolean, skip = false, showImmediately = false) {
    const [showLoader, setShowLoader] = useState(false);
    const [canReveal, setCanReveal] = useState(skip);
    const loaderShownAt = useRef<number | null>(null);

    useLayoutEffect(() => {
        if (showLoader && loaderShownAt.current === null) {
            loaderShownAt.current = performance.now();
        }
    }, [showLoader]);

    useEffect(() => {
        if (skip) {
            setShowLoader(false);
            setCanReveal(true);
            return;
        }

        if (canReveal) return;

        if (isReady) {
            if (showImmediately && !showLoader) {
                setShowLoader(true);
                return;
            }
            if (showLoader && loaderShownAt.current === null) return;
            const remaining = loaderShownAt.current === null ? 0 : Math.max(0, LOADER_MIN_VISIBLE_MS - (performance.now() - loaderShownAt.current));
            if (remaining === 0) {
                setShowLoader(false);
                setCanReveal(true);
                return;
            }
            const timer = window.setTimeout(() => {
                setShowLoader(false);
                setCanReveal(true);
            }, remaining);
            return () => window.clearTimeout(timer);
        }

        if (loaderShownAt.current !== null) return;
        if (showImmediately) {
            setShowLoader(true);
            return;
        }
        const timer = window.setTimeout(() => {
            loaderShownAt.current = performance.now();
            setShowLoader(true);
        }, LOADER_DELAY_MS);
        return () => window.clearTimeout(timer);
    }, [isReady, canReveal, skip, showImmediately, showLoader]);

    return { showLoader, canReveal };
}
