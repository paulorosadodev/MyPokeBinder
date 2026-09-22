"use client";

import { useRef, useState, useCallback, useEffect, type ReactNode, type MouseEvent } from "react";
import type { CardShineMode } from "@/types/binder";

interface Card3DTiltProps {
    children: ReactNode;
    className?: string;
    glareOpacity?: number;
    maxTilt?: number;
    scale?: number;
    perspective?: number;
    transitionDuration?: number;
    maxMove?: number;
    shineMode?: CardShineMode;
    /** When true, freezes tilt/glare so overlays (e.g. open selects) stay usable. */
    paused?: boolean;
    onClick?: () => void;
}

function resolveGlareOpacity(shineMode: CardShineMode, glareOpacity: number): number {
    if (shineMode === "prismatic") return Math.max(glareOpacity, 0.38);
    if (shineMode === "foil") return Math.max(glareOpacity, 0.32);
    return glareOpacity;
}

export function Card3DTilt({ children, className = "", glareOpacity = 0.25, maxTilt = 15, scale = 1.05, perspective = 800, transitionDuration = 400, maxMove = 0, shineMode = "none", paused = false, onClick }: Card3DTiltProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale3d(1,1,1)");
    const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: "" });
    const [isHovering, setIsHovering] = useState(false);
    const rafRef = useRef<number | null>(null);
    const effectiveGlare = resolveGlareOpacity(shineMode, glareOpacity);

    const resetTilt = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setIsHovering(false);
        setTransform("rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale3d(1,1,1)");
        setGlareStyle({ opacity: 0, background: "" });
    }, []);

    useEffect(() => {
        if (paused) {
            resetTilt();
        }
    }, [paused, resetTilt]);

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (paused) return;
            const el = containerRef.current;
            if (!el) return;

            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            rafRef.current = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * maxTilt;
                const rotateX = ((centerY - y) / centerY) * maxTilt;
                const moveX = maxMove ? ((x - centerX) / centerX) * maxMove : 0;
                const moveY = maxMove ? ((y - centerY) / centerY) * maxMove : 0;

                setTransform(`perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${moveX.toFixed(2)}px,${moveY.toFixed(2)}px,0) scale3d(${scale},${scale},${scale})`);

                const glareAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180;
                const glareDistance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
                const glareIntensity = Math.min(glareDistance / maxDistance, 1) * effectiveGlare;

                const background = shineMode === "prismatic" ? `linear-gradient(${glareAngle}deg, rgba(255,255,255,0.85) 0%, rgba(251,191,36,0.45) 18%, rgba(168,85,247,0.4) 32%, rgba(34,211,238,0.35) 48%, transparent 68%)` : shineMode === "foil" ? `linear-gradient(${glareAngle}deg, rgba(255,255,255,0.9) 0%, rgba(186,230,253,0.55) 22%, rgba(125,211,252,0.35) 40%, transparent 65%)` : `linear-gradient(${glareAngle}deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 60%)`;

                setGlareStyle({
                    opacity: glareIntensity,
                    background,
                });
            });
        },
        [maxTilt, scale, perspective, effectiveGlare, maxMove, shineMode, paused],
    );

    const handleMouseEnter = useCallback(() => {
        if (paused) return;
        setIsHovering(true);
    }, [paused]);

    const handleMouseLeave = useCallback(() => {
        resetTilt();
    }, [resetTilt]);

    const sheenClass = shineMode === "prismatic" ? "holo-sheen" : shineMode === "foil" ? "foil-sheen" : null;
    const activeHover = isHovering && !paused;

    return (
        <div
            ref={containerRef}
            className={`group ${className}`}
            style={{
                transform: paused ? "rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale3d(1,1,1)" : transform,
                transition: paused ? "none" : activeHover ? "transform 80ms ease-out" : `transform ${transitionDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
                transformStyle: "preserve-3d",
                willChange: paused ? "auto" : "transform",
                zIndex: activeHover ? 20 : "auto",
                pointerEvents: paused ? "none" : undefined,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {children}

            {sheenClass ? <div className={sheenClass} aria-hidden /> : null}

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    pointerEvents: "none",
                    opacity: paused ? 0 : glareStyle.opacity,
                    background: glareStyle.background,
                    transition: activeHover ? "opacity 80ms ease-out" : `opacity ${transitionDuration}ms ease`,
                    mixBlendMode: "overlay",
                    zIndex: 20,
                }}
            />
        </div>
    );
}
