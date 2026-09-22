"use client";

import { useRef, useState, useCallback, useEffect, useContext, type CSSProperties, type ReactNode, type MouseEvent } from "react";
import type { CardShineMode } from "@/types/binder";
import { UserSettingsContext } from "@/lib/context/UserSettingsContext";

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
    paused?: boolean;
    onClick?: () => void;
}

const REST_TRANSFORM = "rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale3d(1,1,1)";

function resolveGlareOpacity(shineMode: CardShineMode, glareOpacity: number): number {
    if (shineMode === "prismatic") return Math.max(glareOpacity, 0.52);
    if (shineMode === "foil") return Math.max(glareOpacity, 0.42);
    return glareOpacity;
}

function applyRestStyles(el: HTMLDivElement) {
    el.style.transform = REST_TRANSFORM;
    el.style.setProperty("--card-pointer-x", "50");
    el.style.setProperty("--card-pointer-y", "50");
    el.style.setProperty("--card-tilt", "0");
    el.style.setProperty("--card-shine-opacity", "0");
    el.style.setProperty("--card-glare-x", "50%");
    el.style.setProperty("--card-glare-y", "50%");
    el.style.setProperty("--card-glare-angle", "135deg");
}

export function Card3DTilt({ children, className = "", glareOpacity = 0.25, maxTilt = 15, scale = 1.05, perspective = 800, transitionDuration = 400, maxMove = 0, shineMode = "none", paused = false, onClick }: Card3DTiltProps) {
    const settings = useContext(UserSettingsContext);
    const animationsEnabled = settings ? settings.animationsEnabled : true;
    const isTiltDisabled = paused || !animationsEnabled;

    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const effectiveGlare = resolveGlareOpacity(shineMode, glareOpacity);

    const resetTilt = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        setIsHovering(false);
        const el = containerRef.current;
        if (el) applyRestStyles(el);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (el) applyRestStyles(el);
    }, []);

    useEffect(() => {
        if (isTiltDisabled) {
            resetTilt();
        }
    }, [isTiltDisabled, resetTilt]);

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (isTiltDisabled) return;
            const el = containerRef.current;
            if (!el) return;

            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            const clientX = e.clientX;
            const clientY = e.clientY;

            rafRef.current = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const nx = Math.max(-1, Math.min(1, (x - centerX) / centerX));
                const ny = Math.max(-1, Math.min(1, (y - centerY) / centerY));

                const rotateY = nx * maxTilt;
                const rotateX = -ny * maxTilt;
                const moveX = maxMove ? nx * maxMove : 0;
                const moveY = maxMove ? ny * maxMove : 0;

                const pointerX = ((nx + 1) / 2) * 100;
                const pointerY = ((ny + 1) / 2) * 100;
                const tiltAmount = Math.min(1, Math.hypot(nx, ny));
                const glareAngle = Math.atan2(ny, nx) * (180 / Math.PI) + 90;

                // Keep a visible base sheen on hover; boost toward the edges where foil catches light.
                const shineOpacity = (0.28 + tiltAmount * 0.72) * effectiveGlare;

                el.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${moveX.toFixed(2)}px,${moveY.toFixed(2)}px,0) scale3d(${scale},${scale},${scale})`;
                el.style.setProperty("--card-pointer-x", pointerX.toFixed(2));
                el.style.setProperty("--card-pointer-y", pointerY.toFixed(2));
                el.style.setProperty("--card-tilt", tiltAmount.toFixed(3));
                el.style.setProperty("--card-shine-opacity", shineOpacity.toFixed(3));
                el.style.setProperty("--card-glare-x", `${pointerX.toFixed(2)}%`);
                el.style.setProperty("--card-glare-y", `${pointerY.toFixed(2)}%`);
                el.style.setProperty("--card-glare-angle", `${glareAngle.toFixed(1)}deg`);
            });
        },
        [maxTilt, scale, perspective, effectiveGlare, maxMove, isTiltDisabled],
    );

    const handleMouseEnter = useCallback(() => {
        if (isTiltDisabled) return;
        setIsHovering(true);
    }, [isTiltDisabled]);

    const handleMouseLeave = useCallback(() => {
        resetTilt();
    }, [resetTilt]);

    const sheenClass = !isTiltDisabled && shineMode === "prismatic" ? "holo-sheen" : !isTiltDisabled && shineMode === "foil" ? "foil-sheen" : null;
    const glareClass = !isTiltDisabled && shineMode === "prismatic" ? "card-glare card-glare--prismatic" : !isTiltDisabled && shineMode === "foil" ? "card-glare card-glare--foil" : !isTiltDisabled ? "card-glare card-glare--soft" : null;
    const activeHover = isHovering && !isTiltDisabled;

    // Transform + shine CSS vars are written on the DOM during pointer move so React
    // re-renders never overwrite live values with stale style props.
    const shellStyle: CSSProperties = {
        transition: isTiltDisabled ? "none" : activeHover ? "transform 45ms linear" : `transform ${transitionDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
        transformStyle: "preserve-3d",
        willChange: isTiltDisabled ? "auto" : "transform",
        zIndex: activeHover ? 20 : "auto",
        pointerEvents: paused ? "none" : undefined,
    };

    return (
        <div ref={containerRef} className={`group ${className}`} style={shellStyle} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
            {children}

            {sheenClass ? <div className={sheenClass} aria-hidden /> : null}
            {glareClass ? <div className={glareClass} aria-hidden /> : null}
        </div>
    );
}
