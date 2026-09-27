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
    enableTouch?: boolean;
}

export const CARD_3D_REST_TRANSFORM = "none";

export function getCard3DNeutralTransform(perspective = 800): string {
    return `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translate3d(0px,0px,0) scale3d(1,1,1)`;
}

function resolveGlareOpacity(shineMode: CardShineMode, glareOpacity: number): number {
    if (shineMode === "prismatic") return Math.max(glareOpacity, 0.52);
    if (shineMode === "holo") return Math.max(glareOpacity, 0.46);
    if (shineMode === "foil") return Math.max(glareOpacity, 0.42);
    return glareOpacity;
}

function applyRestStyles(el: HTMLDivElement) {
    el.style.transform = CARD_3D_REST_TRANSFORM;
    el.style.removeProperty("--card-return-duration");
    el.style.setProperty("--card-pointer-x", "50");
    el.style.setProperty("--card-pointer-y", "50");
    el.style.setProperty("--card-tilt", "0");
    el.style.setProperty("--card-shine-opacity", "0");
    el.style.setProperty("--card-glare-x", "50%");
    el.style.setProperty("--card-glare-y", "50%");
    el.style.setProperty("--card-glare-angle", "135deg");
}

export function Card3DTilt({ children, className = "", glareOpacity = 0.25, maxTilt = 15, scale = 1.05, perspective = 800, transitionDuration = 500, maxMove = 0, shineMode = "none", paused = false, onClick, enableTouch = false }: Card3DTiltProps) {
    const settings = useContext(UserSettingsContext);
    const animationsEnabled = settings ? settings.animationsEnabled : true;
    const isTiltDisabled = paused || !animationsEnabled;

    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const effectiveGlare = resolveGlareOpacity(shineMode, glareOpacity);

    const resetTilt = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
        setIsHovering(false);

        const el = containerRef.current;
        if (!el) return;

        if (isTiltDisabled) {
            el.style.transition = "none";
            applyRestStyles(el);
            return;
        }

        el.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.23, 1, 0.32, 1), z-index 0s linear ${transitionDuration}ms`;
        el.style.setProperty("--card-return-duration", `${transitionDuration}ms`);
        el.style.transform = getCard3DNeutralTransform(perspective);
        el.style.setProperty("--card-pointer-x", "50");
        el.style.setProperty("--card-pointer-y", "50");
        el.style.setProperty("--card-tilt", "0");
        el.style.setProperty("--card-shine-opacity", "0");
        el.style.setProperty("--card-glare-x", "50%");
        el.style.setProperty("--card-glare-y", "50%");
        el.style.setProperty("--card-glare-angle", "135deg");

        resetTimerRef.current = setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.style.transform = CARD_3D_REST_TRANSFORM;
            }
            resetTimerRef.current = null;
        }, transitionDuration);
    }, [isTiltDisabled, perspective, transitionDuration]);

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
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        };
    }, []);

    const updateTiltAt = useCallback(
        (clientX: number, clientY: number) => {
            if (isTiltDisabled) return;
            const el = containerRef.current;
            if (!el) return;

            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
                resetTimerRef.current = null;
            }

            if (rafRef.current) cancelAnimationFrame(rafRef.current);

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

                const shineOpacity = (0.28 + tiltAmount * 0.72) * effectiveGlare;

                el.style.transition = "transform 45ms linear";
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

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            updateTiltAt(e.clientX, e.clientY);
        },
        [updateTiltAt],
    );

    const handleMouseEnter = useCallback(() => {
        if (isTiltDisabled) return;
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
        }
        setIsHovering(true);
    }, [isTiltDisabled]);

    const handleMouseLeave = useCallback(() => {
        resetTilt();
    }, [resetTilt]);

    const handleTouchStart = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            if (isTiltDisabled || !enableTouch) return;
            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
                resetTimerRef.current = null;
            }
            const touch = e.touches[0];
            if (!touch) return;
            setIsHovering(true);
            updateTiltAt(touch.clientX, touch.clientY);
        },
        [isTiltDisabled, enableTouch, updateTiltAt],
    );

    const handleTouchMove = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            if (isTiltDisabled || !enableTouch) return;
            const touch = e.touches[0];
            if (!touch) return;
            updateTiltAt(touch.clientX, touch.clientY);
        },
        [isTiltDisabled, enableTouch, updateTiltAt],
    );

    const handleTouchEnd = useCallback(() => {
        if (!enableTouch) return;
        resetTilt();
    }, [enableTouch, resetTilt]);

    const handleTouchCancel = useCallback(() => {
        if (!enableTouch) return;
        resetTilt();
    }, [enableTouch, resetTilt]);

    const sheenClass = !isTiltDisabled && shineMode === "prismatic" ? "holo-sheen" : !isTiltDisabled && shineMode === "holo" ? "holo-sheen" : !isTiltDisabled && shineMode === "foil" ? "foil-sheen" : null;
    const glareClass = !isTiltDisabled && shineMode === "prismatic" ? "card-glare card-glare--prismatic" : !isTiltDisabled && shineMode === "holo" ? "card-glare card-glare--holo" : !isTiltDisabled && shineMode === "foil" ? "card-glare card-glare--foil" : !isTiltDisabled ? "card-glare card-glare--soft" : null;
    const idleClass = !animationsEnabled ? null : shineMode === "prismatic" ? "card-idle-prismatic" : shineMode === "holo" ? "card-idle-holo" : shineMode === "foil" ? "card-idle-foil" : null;
    const activeHover = isHovering && !isTiltDisabled;

    const shellStyle: CSSProperties = {
        transition: isTiltDisabled ? "none" : activeHover ? "transform 45ms linear" : `transform ${transitionDuration}ms cubic-bezier(0.23, 1, 0.32, 1), z-index 0s linear ${transitionDuration}ms`,
        transformStyle: "preserve-3d",
        willChange: isTiltDisabled ? "auto" : "transform",
        zIndex: activeHover ? 20 : "auto",
        pointerEvents: paused ? "none" : undefined,
    };

    return (
        <div ref={containerRef} className={`card-3d-tilt group ${className}`} data-hovering={activeHover ? "true" : undefined} style={shellStyle} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={enableTouch ? handleTouchStart : undefined} onTouchMove={enableTouch ? handleTouchMove : undefined} onTouchEnd={enableTouch ? handleTouchEnd : undefined} onTouchCancel={enableTouch ? handleTouchCancel : undefined} onClick={onClick}>
            {children}

            {idleClass ? <div className={idleClass} aria-hidden /> : null}
            {sheenClass ? <div className={sheenClass} aria-hidden /> : null}
            {glareClass ? <div className={glareClass} aria-hidden /> : null}
        </div>
    );
}
