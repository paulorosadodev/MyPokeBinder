"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { CardElementType, CardShineMode } from "@/types/binder";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { CardImage, isCardImageCached } from "@/components/ui/CardImage";
import { CARD_FRAME_IMAGE_CLASS, CARD_FRAME_RADIUS_CLASS, CARD_FRAME_SHADOW_CLASS } from "@/lib/pokemon/cardFrame";

interface CardArtworkProps {
    src: string;
    alt: string;
    sizes: string;
    shineMode: CardShineMode;
    elementTypes?: readonly CardElementType[] | null;
    priority?: boolean;
    enableTouch?: boolean;
    maxTilt?: number;
    maxMove?: number;
    scale?: number;
    glareOpacity?: number;
    perspective?: number;
    transitionDuration?: number;
    imageClassName?: string;
    onImageLoaded?: () => void;
    children?: ReactNode;
}

export function CardArtwork({ src, alt, sizes, shineMode, elementTypes, priority = false, enableTouch = false, maxTilt = 8, maxMove = 3, scale = 1, glareOpacity = 0.2, perspective = 900, transitionDuration, imageClassName = CARD_FRAME_IMAGE_CLASS, onImageLoaded, children }: CardArtworkProps) {
    const [loaded, setLoaded] = useState(() => isCardImageCached(src));
    const onImageLoadedRef = useRef(onImageLoaded);

    useEffect(() => {
        onImageLoadedRef.current = onImageLoaded;
        if (loaded) onImageLoadedRef.current?.();
    }, [loaded, onImageLoaded]);

    useEffect(() => {
        if (isCardImageCached(src)) {
            setLoaded(true);
        }
    }, [src]);

    return (
        <Card3DTilt className={`relative h-full w-full overflow-hidden ${CARD_FRAME_RADIUS_CLASS} ${CARD_FRAME_SHADOW_CLASS}`} maxTilt={maxTilt} maxMove={maxMove} scale={scale} glareOpacity={glareOpacity} perspective={perspective} transitionDuration={transitionDuration} shineMode={shineMode} elementTypes={elementTypes} enableTouch={enableTouch} isLoading={!loaded}>
            <CardImage src={src} alt={alt} sizes={sizes} className={imageClassName} priority={priority} onLoadingChange={setLoaded} />
            {children}
        </Card3DTilt>
    );
}
