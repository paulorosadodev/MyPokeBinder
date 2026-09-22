"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import type { CardShineMode } from "@/types/binder";

interface CardLightboxProps {
    src: string | null;
    alt?: string;
    shineMode?: CardShineMode;
    onClose: () => void;
}

export function CardLightbox({ src, alt = "Carta", shineMode = "none", onClose }: CardLightboxProps) {
    useEffect(() => {
        if (!src) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [src, onClose]);

    if (!src) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <button type="button" onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6">
                <X size={20} strokeWidth={2.5} />
            </button>

            <div
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onClose();
                }}
                className="relative aspect-[2.5/3.5] w-[88vw] max-w-[420px] cursor-pointer select-none"
            >
                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-2xl" maxTilt={16} scale={1.05} glareOpacity={0.35} perspective={1000} shineMode={shineMode}>
                    <Image src={src} alt={alt} fill unoptimized priority sizes="(max-width: 768px) 90vw, 500px" className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]" />
                </Card3DTilt>
            </div>
        </div>
    );
}
