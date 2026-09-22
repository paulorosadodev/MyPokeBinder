import React, { useContext } from "react";
import { UserSettingsContext, getBallTypeForTheme } from "@/lib/context/UserSettingsContext";
import { BallType } from "@/components/theme/PokemonBallSvg";

interface PokeballLogoProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    animated?: boolean;
    glow?: "none" | "subtle" | "normal";
    color?: string;
    ballType?: BallType;
}

const sizeMap = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
};

export function PokeballLogo({ size = "sm", className = "", animated = false, glow = "normal", color, ballType: propBallType }: PokeballLogoProps) {
    const context = useContext(UserSettingsContext);
    const boxSize = sizeMap[size];
    const effectiveBallType = propBallType || (color ? getBallTypeForTheme(color) : context?.ballType || "pokeball");
    const fillColor = color || "var(--theme-primary, #ef4444)";

    const glowDropShadowSubtle = color ? `color-mix(in srgb, ${color} 40%, transparent)` : "var(--theme-primary-glow, rgba(239, 68, 68, 0.4))";
    const glowDropShadowNormal = color ? `color-mix(in srgb, ${color} 50%, transparent)` : "var(--theme-primary-glow, rgba(239, 68, 68, 0.5))";

    const glowStyle = glow === "subtle" ? { filter: `drop-shadow(0 0 6px ${glowDropShadowSubtle})` } : glow === "normal" ? { filter: `drop-shadow(0 0 12px ${glowDropShadowNormal})` } : undefined;

    const renderTopPattern = () => {
        switch (effectiveBallType) {
            case "greatball":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#3b82f6" />
                        <path d="M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z" fill="#ef4444" />
                        <path d="M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z" fill="#ef4444" />
                    </>
                );
            case "ultraball":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#1e293b" />
                        <path d="M 24 16 L 36 24 L 32 50 L 22 50 Z" fill="#f59e0b" />
                        <path d="M 76 16 L 64 24 L 68 50 L 78 50 Z" fill="#f59e0b" />
                        <path d="M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z" fill="#f59e0b" />
                    </>
                );
            case "masterball":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#8b5cf6" />
                        <ellipse cx="28" cy="30" rx="9" ry="8" fill="#ec4899" />
                        <ellipse cx="72" cy="30" rx="9" ry="8" fill="#ec4899" />
                        <path d="M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z" fill="#ffffff" />
                    </>
                );
            case "safariball":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#10b981" />
                        <path d="M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z" fill="#047857" opacity="0.8" />
                        <path d="M 58 14 Q 72 18 78 30 Q 66 32 58 24 Z" fill="#047857" opacity="0.8" />
                        <circle cx="50" cy="34" r="7" fill="#34d399" opacity="0.8" />
                    </>
                );
            case "loveball":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#ec4899" />
                        <path d="M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z" fill="#ffffff" />
                    </>
                );
            case "pokeball":
            default:
                return <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill={fillColor} />;
        }
    };

    return (
        <div className={`relative inline-flex items-center justify-center shrink-0 ${boxSize} ${className}`}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={glowStyle} className="overflow-visible">
                {renderTopPattern()}
                <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc" />
                <line x1="4" y1="50" x2="96" y2="50" stroke="#0f172a" strokeWidth="8" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#0f172a" strokeWidth="8" />
                <circle cx="50" cy="50" r="16" fill="#0f172a" />
                <circle cx="50" cy="50" r="10" fill="#f8fafc" />
                <circle cx="50" cy="50" r="5" fill={fillColor} className={animated ? "animate-pulse" : ""} />
            </svg>
        </div>
    );
}
