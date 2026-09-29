"use client";

import { memo, useId } from "react";
import type { CardElementType } from "@/types/binder";

function ElementSymbol({ type }: { type: CardElementType }) {
    if (type === "Colorless") {
        return <path d="M12 3.5 14.1 9l5.4 3-5.4 3-2.1 5.5L9.9 15l-5.4-3 5.4-3L12 3.5Z" />;
    }
    if (type === "Darkness") {
        return <path d="M17.8 16.7A8 8 0 0 1 8.1 5.3a8.2 8.2 0 1 0 9.7 11.4Z" />;
    }
    if (type === "Dragon") {
        return (
            <g fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m5.5 18 5.8-13 2.2 7 5-3-3.2 9-4.2-3.3L5.5 18Z" />
                <circle cx="13.8" cy="9.1" r="1" fill="currentColor" stroke="none" />
            </g>
        );
    }
    if (type === "Fairy") {
        return (
            <g>
                <path d="M12 2.8c.8 5.8 2.3 7.3 8.2 8.2-5.9.9-7.4 2.4-8.2 8.2-.8-5.8-2.3-7.3-8.2-8.2 5.9-.9 7.4-2.4 8.2-8.2Z" />
                <circle cx="18.5" cy="5.5" r="1.4" />
            </g>
        );
    }
    if (type === "Fighting") {
        return <path d="M6.1 10.8V7.1a1.7 1.7 0 0 1 3.4 0V5.8a1.7 1.7 0 0 1 3.4 0v.7a1.7 1.7 0 0 1 3.4.2 1.7 1.7 0 0 1 2.9 1.2v5.8c0 4.3-2.8 7.1-7.2 7.1-3.8 0-6.9-2.5-7.3-6.3l-.3-2.9a1.7 1.7 0 0 1 1.7-.8Z" />;
    }
    if (type === "Fire") {
        return <path d="M13.2 2.8c.8 4.1-2.8 5.1-1.5 8.4.7-1.4 1.8-2.3 3.4-3.2 2.1 2 3.5 4.2 3.5 6.8 0 3.9-2.9 6.7-6.7 6.7s-6.7-2.7-6.7-6.5c0-4.1 3.1-6 4.9-8.8.3 1.8.1 3.1-.4 4.2 2.7-1.7 1.7-5.3 3.5-7.6Z" />;
    }
    if (type === "Grass") {
        return (
            <g fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19.7 4.2C12 4.5 6.1 7.4 5.5 13.1c-.4 4.1 2.8 6.6 6.4 5.4 4.5-1.6 6.7-7.3 7.8-14.3Z" />
                <path d="M5.1 20c2.5-4.5 5.9-7.6 10.6-10.1" />
            </g>
        );
    }
    if (type === "Lightning") {
        return <path d="m13.8 2.7-8 11h5.4l-1 7.6 8-11h-5.4l1-7.6Z" />;
    }
    if (type === "Metal") {
        return (
            <g fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m12 3.5 7.4 4.2v8.6L12 20.5l-7.4-4.2V7.7L12 3.5Z" />
                <circle cx="12" cy="12" r="3.1" />
            </g>
        );
    }
    if (type === "Psychic") {
        return (
            <g fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3.4 12s3.2-5.1 8.6-5.1 8.6 5.1 8.6 5.1-3.2 5.1-8.6 5.1S3.4 12 3.4 12Z" />
                <circle cx="12" cy="12" r="2.8" fill="currentColor" />
            </g>
        );
    }
    if (type === "Water") {
        return <path d="M12 2.8c2.7 4.2 6.1 8.3 6.1 12.1a6.1 6.1 0 0 1-12.2 0C5.9 11.1 9.3 7 12 2.8Z" />;
    }
    return null;
}

export const CardElementPattern = memo(function CardElementPattern({ type }: { type: CardElementType }) {
    const patternId = `card-element-${useId().replaceAll(":", "")}`;

    return (
        <svg className="card-element-pattern" viewBox="0 0 240 330" preserveAspectRatio="none" aria-hidden>
            <defs>
                <pattern id={patternId} width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
                    <g className="card-element-pattern__symbol" transform="translate(10 10) scale(.92)">
                        <ElementSymbol type={type} />
                    </g>
                    <g className="card-element-pattern__symbol card-element-pattern__symbol--soft" transform="translate(32 32) scale(.58)">
                        <ElementSymbol type={type} />
                    </g>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
    );
});
