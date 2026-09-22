import React from "react";

export type BallType = "pokeball" | "greatball" | "ultraball" | "masterball" | "safariball" | "loveball" | "quickball" | "duskball" | "luxuryball" | "custom";

interface PokemonBallSvgProps {
    ballType?: BallType;
    customColor?: string;
    size?: number;
    className?: string;
    isActive?: boolean;
    style?: React.CSSProperties;
}

export function PokemonBallSvg({ ballType = "pokeball", customColor = "#ef4444", size = 40, className = "", isActive = false, style }: PokemonBallSvgProps) {
    const getTopDetails = () => {
        switch (ballType) {
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
            case "quickball":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#0ea5e9" />
                        <path d="M 50 6 L 56 22 L 68 22 L 58 32 L 64 48 L 50 38 L 36 48 L 42 32 L 32 22 L 44 22 Z" fill="#facc15" />
                    </>
                );
            case "duskball":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#1e293b" />
                        <circle cx="28" cy="30" r="9" fill="#14b8a6" />
                        <circle cx="72" cy="30" r="9" fill="#14b8a6" />
                        <circle cx="50" cy="22" r="7" fill="#f97316" />
                    </>
                );
            case "luxuryball":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#0f172a" />
                        <path d="M 20 20 Q 50 12 80 20 L 78 26 Q 50 18 22 26 Z" fill="#eab308" />
                        <path d="M 24 32 Q 50 24 76 32 L 74 38 Q 50 30 26 38 Z" fill="#f43f5e" />
                    </>
                );
            case "custom":
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill={customColor} />
                        <ellipse cx="32" cy="24" rx="14" ry="6" fill="#ffffff" opacity="0.3" transform="rotate(-20 32 24)" />
                    </>
                );
            case "pokeball":
            default:
                return (
                    <>
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill={customColor || "#ef4444"} />
                        <ellipse cx="32" cy="24" rx="14" ry="6" fill="#ffffff" opacity="0.3" transform="rotate(-20 32 24)" />
                    </>
                );
        }
    };

    const coreColor = ballType === "custom" ? customColor : ballType === "greatball" ? "#3b82f6" : ballType === "ultraball" ? "#f59e0b" : ballType === "masterball" ? "#ec4899" : ballType === "safariball" ? "#10b981" : ballType === "loveball" ? "#ec4899" : ballType === "quickball" ? "#0ea5e9" : ballType === "duskball" ? "#14b8a6" : ballType === "luxuryball" ? "#eab308" : customColor || "#ef4444";

    const baseFilter = isActive ? `drop-shadow(0 0 10px ${coreColor})` : "drop-shadow(0 2px 5px rgba(0,0,0,0.4))";

    return (
        <svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            className={`shrink-0 select-none overflow-visible ${className}`}
            style={{
                filter: baseFilter,
                ...style,
            }}
        >
            <defs>
                <linearGradient id={`grad-bottom-${ballType}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
            </defs>

            {getTopDetails()}

            <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill={`url(#grad-bottom-${ballType})`} />

            <line x1="4" y1="50" x2="96" y2="50" stroke="#0f172a" strokeWidth="7" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#0f172a" strokeWidth="6" />

            <circle cx="50" cy="50" r="16" fill="#0f172a" />
            <circle cx="50" cy="50" r="10" fill="#f8fafc" />
            <circle cx="50" cy="50" r="5" fill={coreColor} className={isActive ? "animate-pulse" : ""} />
        </svg>
    );
}
