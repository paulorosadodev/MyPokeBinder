import React, { useContext } from "react";
import { UserSettingsContext } from "@/lib/context/UserSettingsContext";
import { PokemonBallSvg, BallType } from "@/components/theme/PokemonBallSvg";

interface PokeballLoaderProps {
    size?: "sm" | "md" | "lg";
    message?: string;
    className?: string;
    ballType?: BallType;
}

export function PokeballLoader({ size = "md", message, className = "", ballType: propBallType }: PokeballLoaderProps) {
    const context = useContext(UserSettingsContext);
    const effectiveBallType = propBallType || context?.ballType || "pokeball";
    const effectiveColor = context?.themeColor || "var(--theme-primary, #38bdf8)";

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
