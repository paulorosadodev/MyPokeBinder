"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { COLLECTION_PAGE_SIZE } from "@/lib/collection/listCards";

export interface UseClientPagedWindowOptions {
    pageSize?: number;
    /** When this value changes, the window resets to the first page. */
    resetKey: string;
}

export interface ClientPagedWindowResult<T> {
    visibleItems: T[];
    hasMore: boolean;
    loadMore: () => void;
    visibleCount: number;
    totalCount: number;
}

export function useClientPagedWindow<T>(items: T[], { pageSize = COLLECTION_PAGE_SIZE, resetKey }: UseClientPagedWindowOptions): ClientPagedWindowResult<T> {
    const [visibleCount, setVisibleCount] = useState(pageSize);

    useEffect(() => {
        setVisibleCount(pageSize);
    }, [resetKey, pageSize]);

    const totalCount = items.length;
    const clampedCount = Math.min(visibleCount, totalCount);
    const hasMore = clampedCount < totalCount;

    const visibleItems = useMemo(() => items.slice(0, clampedCount), [items, clampedCount]);

    const loadMore = useCallback(() => {
        setVisibleCount((prev) => {
            if (prev >= items.length) return prev;
            return Math.min(prev + pageSize, items.length);
        });
    }, [items.length, pageSize]);

    return {
        visibleItems,
        hasMore,
        loadMore,
        visibleCount: clampedCount,
        totalCount,
    };
}
