"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const LOADED_CARD_URLS = new Set<string>();

export function isCardImageCached(src?: string | null): boolean {
    if (!src) return false;
    return LOADED_CARD_URLS.has(src);
}

export function markCardImageCached(src?: string | null): void {
    if (!src) return;
    LOADED_CARD_URLS.add(src);
}

interface CardImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
    skeletonClassName?: string;
    unoptimized?: boolean;
    draggable?: boolean;
    onLoadingChange?: (loaded: boolean) => void;
}

export function CardImageSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`card-skeleton ${className}`}>
            <svg className="pointer-events-none h-7 w-7 animate-pulse select-none text-white/20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" fill="#131722" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
        </div>
    );
}

export function CardImage({ src, alt, fill = true, sizes, priority = false, className = "", skeletonClassName = "", unoptimized = true, draggable, onLoadingChange }: CardImageProps) {
    const isCached = isCardImageCached(src);
    const [loaded, setLoaded] = useState(isCached);
    const onLoadingChangeRef = useRef(onLoadingChange);
    const prevSrcRef = useRef(src);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        onLoadingChangeRef.current = onLoadingChange;
    }, [onLoadingChange]);

    const markLoaded = useCallback(() => {
        markCardImageCached(src);
        setLoaded(true);
        onLoadingChangeRef.current?.(true);
    }, [src]);

    useEffect(() => {
        if (prevSrcRef.current !== src) {
            prevSrcRef.current = src;
            const cached = isCardImageCached(src);
            setLoaded(cached);
            onLoadingChangeRef.current?.(cached);
        }
    }, [src]);

    useEffect(() => {
        if (isCardImageCached(src)) {
            setLoaded(true);
            onLoadingChangeRef.current?.(true);
            return;
        }
        if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
            markLoaded();
        }
    }, [src, markLoaded]);

    const handleRef = useCallback(
        (node: HTMLImageElement | null) => {
            imgRef.current = node;
            if (node && node.complete && node.naturalWidth > 0) {
                markLoaded();
            }
        },
        [markLoaded],
    );

    const handleLoad = useCallback(() => {
        markLoaded();
    }, [markLoaded]);

    const handleError = useCallback(() => {
        markLoaded();
    }, [markLoaded]);

    return (
        <>
            {!loaded ? <CardImageSkeleton className={skeletonClassName} /> : null}
            <Image ref={handleRef} src={src} alt={alt} fill={fill} sizes={sizes} priority={priority} className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0 pointer-events-none"}`} unoptimized={unoptimized} draggable={draggable} onLoad={handleLoad} onError={handleError} />
        </>
    );
}

export function useCardImageLoaded(cardId?: string | null, src?: string | null) {
    const isCached = isCardImageCached(src);
    const [loaded, setLoaded] = useState(isCached);

    useEffect(() => {
        if (src && isCardImageCached(src)) {
            setLoaded(true);
        } else {
            setLoaded(false);
        }
    }, [cardId, src]);

    return { loaded, setLoaded } as const;
}
