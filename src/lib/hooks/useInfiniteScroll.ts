"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface UseInfiniteScrollOptions {
    hasMore: boolean;
    isLoading?: boolean;
    onLoadMore: () => void;
    rootMargin?: string;
    /** Scroll container; defaults to the viewport. */
    root?: Element | null;
    enabled?: boolean;
}

export function useInfiniteScroll({ hasMore, isLoading = false, onLoadMore, rootMargin = "200px", root = null, enabled = true }: UseInfiniteScrollOptions): RefObject<HTMLDivElement | null> {
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const onLoadMoreRef = useRef(onLoadMore);
    onLoadMoreRef.current = onLoadMore;

    useEffect(() => {
        if (!enabled || !hasMore || isLoading) return;

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    onLoadMoreRef.current();
                }
            },
            { root, rootMargin },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, isLoading, root, rootMargin, enabled]);

    return sentinelRef;
}
