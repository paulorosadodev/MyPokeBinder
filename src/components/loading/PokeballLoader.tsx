"use client";

import React, { useContext } from "react";
import { UserSettingsContext, getBallTypeForTheme } from "@/lib/context/UserSettingsContext";
import { PokemonBallSvg, BallType } from "@/components/theme/PokemonBallSvg";

interface PokeballLoaderProps {
    size?: "sm" | "md" | "lg";
    message?: string;
    className?: string;
    ballType?: BallType;
    color?: string;
}

export function PokeballLoader({ size = "md", message, className = "", ballType: propBallType, color }: PokeballLoaderProps) {
    const context = useContext(UserSettingsContext);
    const effectiveColor = color || context?.themeColor || "var(--theme-primary, #ef4444)";
    const effectiveBallType = propBallType || (color ? getBallTypeForTheme(color) : context?.ballType || "pokeball");

    const sizeMap = {
        sm: { box: "w-8 h-8", px: 32 },
        md: { box: "w-16 h-16", px: 64 },
        lg: { box: "w-24 h-24", px: 96 },
    };

    const currentSize = sizeMap[size];

    return (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div className={`relative ${currentSize.box} animate-pokeball-spin`}>
                <PokemonBallSvg ballType={effectiveBallType} customColor={effectiveColor} size={currentSize.px} style={{ filter: "drop-shadow(0 0 14px var(--theme-primary-glow))" }} className="overflow-visible" />
            </div>
            {message && <p className="text-sm font-medium tracking-wide text-slate-300 animate-pulse">{message}</p>}
        </div>
    );
}
