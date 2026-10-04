"use client";

import { useEffect, useRef, useState, useCallback, type RefCallback, type RefObject } from "react";

export interface UseInfiniteScrollOptions {
    hasMore: boolean;
    isLoading?: boolean;
    onLoadMore: () => void;
    rootMargin?: string;
    root?: Element | null;
    enabled?: boolean;
}

export type InfiniteScrollSentinelRef = RefCallback<HTMLDivElement> & RefObject<HTMLDivElement | null>;

export function useInfiniteScroll({ hasMore, isLoading = false, onLoadMore, rootMargin = "200px", root = null, enabled = true }: UseInfiniteScrollOptions): InfiniteScrollSentinelRef {
    const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const onLoadMoreRef = useRef(onLoadMore);
    onLoadMoreRef.current = onLoadMore;

    const callbackRef = useCallback((node: HTMLDivElement | null) => {
        sentinelRef.current = node;
        setSentinelNode(node);
    }, []) as InfiniteScrollSentinelRef;

    Object.defineProperty(callbackRef, "current", {
        get() {
            return sentinelRef.current;
        },
        set(node: HTMLDivElement | null) {
            sentinelRef.current = node;
            setSentinelNode(node);
        },
        configurable: true,
    });

    useEffect(() => {
        if (!enabled || !hasMore || isLoading || !sentinelNode) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    onLoadMoreRef.current();
                }
            },
            { root, rootMargin },
        );

        observer.observe(sentinelNode);
        return () => observer.disconnect();
    }, [hasMore, isLoading, root, rootMargin, enabled, sentinelNode]);

    useEffect(() => {
        if (!enabled || !hasMore || isLoading || !root) return;

        const scrollContainer = root;
        const handleScroll = () => {
            if (!hasMore || isLoading) return;
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            if (scrollHeight - scrollTop - clientHeight <= 350) {
                onLoadMoreRef.current();
            }
        };

        scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
        return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, [enabled, hasMore, isLoading, root]);

    return callbackRef;
}
