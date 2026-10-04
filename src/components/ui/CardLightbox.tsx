"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import type { CardElementType, CardShineMode } from "@/types/binder";

interface CardLightboxProps {
    src: string | null;
    alt?: string;
    shineMode?: CardShineMode;
    elementTypes?: CardElementType[];
    onClose: () => void;
}

export function CardLightbox({ src, alt = "Carta", shineMode = "none", elementTypes, onClose }: CardLightboxProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [displaySrc, setDisplaySrc] = useState(src);

    useDismissibleOverlay(Boolean(src), onClose);
    const { isPresent, state } = useOverlayPresence(Boolean(src));

    useEffect(() => {
        if (src) setDisplaySrc(src);
    }, [src]);

    useEffect(() => {
        if (!isPresent) return;
        const prevBodyOverflow = document.body.style.overflow;
        const prevBodyTouchAction = document.body.style.touchAction;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        const prevHtmlTouchAction = document.documentElement.style.touchAction;

        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.touchAction = "none";

        const preventTouchScroll = (e: TouchEvent) => {
            if (e.cancelable) {
                e.preventDefault();
            }
        };

        const dialogEl = dialogRef.current;
        if (dialogEl) {
            dialogEl.addEventListener("touchmove", preventTouchScroll, { passive: false });
        }

        return () => {
            document.body.style.overflow = prevBodyOverflow;
            document.body.style.touchAction = prevBodyTouchAction;
            document.documentElement.style.overflow = prevHtmlOverflow;
            document.documentElement.style.touchAction = prevHtmlTouchAction;
            if (dialogEl) {
                dialogEl.removeEventListener("touchmove", preventTouchScroll);
            }
        };
    }, [isPresent]);

    if (!isPresent || !displaySrc) return null;

    return (
        <div
            ref={dialogRef}
            className="modal-backdrop fixed inset-0 z-[100] flex select-none items-center justify-center bg-black/80 p-4 backdrop-blur-md touch-none overscroll-none"
            data-overlay-state={state}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <button type="button" onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 z-20 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6">
                <X size={20} strokeWidth={2.5} />
            </button>

            <div className="modal-surface relative aspect-[8/11] w-[88vw] max-w-[420px] select-none touch-none">
                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-2xl touch-none" maxTilt={18} scale={1.05} glareOpacity={0.35} perspective={1000} shineMode={shineMode} elementTypes={elementTypes} enableTouch>
                    <Image src={displaySrc} alt={alt} fill unoptimized priority sizes="(max-width: 768px) 90vw, 500px" className="pointer-events-none object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]" />
                </Card3DTilt>
            </div>
        </div>
    );
}
