"use client";

import { useEffect } from "react";
import { PokemonType } from "@/lib/pokemon/constants";
import { playCardDropSound } from "@/lib/audio/cardSounds";
import { getRarityImpactTier, RarityImpactTier } from "@/lib/pokemon/rarity";

interface CardImpactBurstProps {
    pokemonType: PokemonType;
    rarity?: string | null;
    tier?: RarityImpactTier;
}

interface ParticleConfig {
    x: number;
    y: number;
    rot: number;
    delay: number;
    duration: number;
    size: number;
    color: string;
    shape: "leaf" | "droplet" | "ember" | "bolt" | "shard" | "orb" | "star" | "diamond";
}

const TYPE_CONFIGS: Record<
    PokemonType,
    {
        ringColor: string;
        ringGlow: string;
        palette: string[];
        shapes: ("leaf" | "droplet" | "ember" | "bolt" | "shard" | "orb" | "star" | "diamond")[];
    }
> = {
    grass: {
        ringColor: "#22c55e",
        ringGlow: "rgba(34, 197, 94, 0.6)",
        palette: ["#22c55e", "#16a34a", "#86efac", "#4ade80", "#a3e635"],
        shapes: ["leaf", "orb", "leaf", "star"],
    },
    fire: {
        ringColor: "#f97316",
        ringGlow: "rgba(249, 115, 22, 0.7)",
        palette: ["#f97316", "#ef4444", "#fbbf24", "#ea580c", "#fed7aa"],
        shapes: ["ember", "shard", "ember", "star"],
    },
    water: {
        ringColor: "#38bdf8",
        ringGlow: "rgba(56, 189, 248, 0.7)",
        palette: ["#38bdf8", "#0284c7", "#67e8f9", "#0ea5e9", "#e0f2fe"],
        shapes: ["droplet", "orb", "droplet", "diamond"],
    },
    electric: {
        ringColor: "#eab308",
        ringGlow: "rgba(234, 179, 8, 0.8)",
        palette: ["#eab308", "#facc15", "#fef08a", "#f59e0b", "#ffffff"],
        shapes: ["bolt", "shard", "bolt", "star"],
    },
    bug: {
        ringColor: "#84cc16",
        ringGlow: "rgba(132, 204, 22, 0.6)",
        palette: ["#84cc16", "#a3e635", "#65a30d", "#bef264", "#ecfccb"],
        shapes: ["leaf", "orb", "shard", "leaf"],
    },
    normal: {
        ringColor: "#e2e8f0",
        ringGlow: "rgba(226, 232, 240, 0.6)",
        palette: ["#e2e8f0", "#cbd5e1", "#ffffff", "#94a3b8", "#f8fafc"],
        shapes: ["star", "shard", "orb", "diamond"],
    },
    poison: {
        ringColor: "#a855f7",
        ringGlow: "rgba(168, 85, 247, 0.7)",
        palette: ["#a855f7", "#9333ea", "#d8b4fe", "#c084fc", "#4ade80"],
        shapes: ["droplet", "orb", "droplet", "shard"],
    },
    ground: {
        ringColor: "#d97706",
        ringGlow: "rgba(217, 119, 6, 0.7)",
        palette: ["#d97706", "#b45309", "#fcd34d", "#78350f", "#fef3c7"],
        shapes: ["shard", "orb", "shard", "diamond"],
    },
    rock: {
        ringColor: "#b45309",
        ringGlow: "rgba(180, 83, 9, 0.7)",
        palette: ["#b45309", "#92400e", "#78716c", "#d6d3d1", "#a8a29e"],
        shapes: ["shard", "diamond", "shard", "orb"],
    },
    fighting: {
        ringColor: "#ef4444",
        ringGlow: "rgba(239, 68, 68, 0.7)",
        palette: ["#ef4444", "#dc2626", "#f87171", "#fb923c", "#fca5a5"],
        shapes: ["shard", "star", "shard", "diamond"],
    },
    psychic: {
        ringColor: "#ec4899",
        ringGlow: "rgba(236, 72, 153, 0.7)",
        palette: ["#ec4899", "#d946ef", "#f472b6", "#c084fc", "#fdf2f8"],
        shapes: ["orb", "star", "diamond", "orb"],
    },
    ghost: {
        ringColor: "#8b5cf6",
        ringGlow: "rgba(139, 92, 246, 0.7)",
        palette: ["#8b5cf6", "#7c3aed", "#c084fc", "#38bdf8", "#ddd6fe"],
        shapes: ["ember", "orb", "star", "ember"],
    },
    ice: {
        ringColor: "#06b6d4",
        ringGlow: "rgba(6, 182, 212, 0.7)",
        palette: ["#06b6d4", "#67e8f9", "#e0f2fe", "#ffffff", "#a5f3fc"],
        shapes: ["diamond", "shard", "star", "diamond"],
    },
    dragon: {
        ringColor: "#6366f1",
        ringGlow: "rgba(99, 102, 241, 0.7)",
        palette: ["#6366f1", "#4f46e5", "#818cf8", "#f43f5e", "#c7d2fe"],
        shapes: ["orb", "star", "shard", "ember"],
    },
    fairy: {
        ringColor: "#f472b6",
        ringGlow: "rgba(244, 114, 182, 0.7)",
        palette: ["#f472b6", "#f9a8d4", "#fdf2f8", "#e879f9", "#ffffff"],
        shapes: ["star", "orb", "star", "diamond"],
    },
};

const RAINBOW_PALETTE = ["#ff4b4b", "#ff8c00", "#ffd700", "#22c55e", "#00f0ff", "#6366f1", "#a855f7", "#ff3b94"];
const MYTHIC_PALETTE = ["#ffd700", "#f59e0b", "#fbbf24", "#ffffff", "#00f0ff", "#a855f7", "#ff3b94", "#38bdf8"];

const PARTICLE_VECTORS: Array<{ angle: number; dist: number; rot: number; size: number }> = [
    { angle: 0, dist: 52, rot: 180, size: 12 },
    { angle: 24, dist: 46, rot: -140, size: 10 },
    { angle: 48, dist: 56, rot: 210, size: 14 },
    { angle: 75, dist: 48, rot: -90, size: 10 },
    { angle: 102, dist: 50, rot: 160, size: 11 },
    { angle: 128, dist: 54, rot: -220, size: 13 },
    { angle: 154, dist: 46, rot: 130, size: 10 },
    { angle: 180, dist: 52, rot: -180, size: 12 },
    { angle: 206, dist: 44, rot: 150, size: 10 },
    { angle: 232, dist: 58, rot: -240, size: 14 },
    { angle: 258, dist: 50, rot: 110, size: 11 },
    { angle: 284, dist: 52, rot: -170, size: 12 },
    { angle: 310, dist: 56, rot: 200, size: 13 },
    { angle: 336, dist: 46, rot: -120, size: 10 },
    { angle: 60, dist: 60, rot: 270, size: 15 },
    { angle: 240, dist: 58, rot: -280, size: 14 },
    { angle: 15, dist: 62, rot: 190, size: 13 },
    { angle: 90, dist: 64, rot: -160, size: 12 },
    { angle: 165, dist: 60, rot: 230, size: 14 },
    { angle: 270, dist: 62, rot: -190, size: 13 },
    { angle: 35, dist: 68, rot: 310, size: 15 },
    { angle: 115, dist: 66, rot: -250, size: 14 },
    { angle: 195, dist: 70, rot: 280, size: 16 },
    { angle: 300, dist: 68, rot: -300, size: 15 },
    { angle: 10, dist: 74, rot: 340, size: 16 },
    { angle: 80, dist: 72, rot: -320, size: 15 },
    { angle: 140, dist: 76, rot: 360, size: 17 },
    { angle: 215, dist: 74, rot: -340, size: 16 },
    { angle: 260, dist: 72, rot: 320, size: 15 },
    { angle: 325, dist: 75, rot: -350, size: 17 },
    { angle: 45, dist: 78, rot: 380, size: 18 },
    { angle: 225, dist: 78, rot: -380, size: 18 },
];

function renderParticleShape(shape: ParticleConfig["shape"], color: string, isSparkle: boolean) {
    if (shape === "leaf") {
        return (
            <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
                <path d="M17 3C10 3 5 8 5 15C5 18 7 20 9 20C16 20 21 15 21 8C21 5 19 3 17 3ZM15.5 8.5C13.5 10.5 10.5 13.5 8 16" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            </svg>
        );
    }
    if (shape === "droplet") {
        return (
            <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
        );
    }
    if (shape === "ember") {
        return (
            <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
                <path d="M12 2C11 7 7 9 7 14C7 17.87 10.13 21 14 21C16.8 21 19.2 19.36 20.3 17C18 17 16 15 16 13C16 10.5 17.5 8.5 18.5 7C16 8 13.5 5 12 2Z" />
            </svg>
        );
    }
    if (shape === "bolt") {
        return (
            <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        );
    }
    if (shape === "star" || isSparkle) {
        return (
            <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
                <path d="M12 0L14.4 8.6L23 11L14.4 13.4L12 22L9.6 13.4L1 11L9.6 8.6Z" />
            </svg>
        );
    }
    if (shape === "diamond") {
        return (
            <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
                <polygon points="12 2 22 12 12 22 2 12" />
            </svg>
        );
    }
    if (shape === "shard") {
        return (
            <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
                <polygon points="12 2 20 9 16 22 6 18 4 8" />
            </svg>
        );
    }
    return (
        <div
            className="h-full w-full rounded-full"
            style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
            }}
        />
    );
}

export function CardImpactBurst({ pokemonType, rarity, tier }: CardImpactBurstProps) {
    const config = TYPE_CONFIGS[pokemonType] || TYPE_CONFIGS.normal;
    const resolvedTier: RarityImpactTier = tier !== undefined ? tier : getRarityImpactTier(rarity);

    useEffect(() => {
        const timer = setTimeout(() => {
            playCardDropSound(resolvedTier);
        }, 360);
        return () => clearTimeout(timer);
    }, [resolvedTier]);

    const particleCount = resolvedTier === 3 ? 32 : resolvedTier === 2 ? 24 : resolvedTier === 1 ? 20 : 16;
    const isSparkle = resolvedTier >= 2;

    const particles: ParticleConfig[] = PARTICLE_VECTORS.slice(0, particleCount).map((v, i) => {
        const rad = (v.angle * Math.PI) / 180;
        const x = Math.round(Math.cos(rad) * v.dist);
        const y = Math.round(Math.sin(rad) * v.dist);

        let color: string;
        let shape: ParticleConfig["shape"];

        if (resolvedTier === 3) {
            color = MYTHIC_PALETTE[i % MYTHIC_PALETTE.length];
            shape = i % 2 === 0 ? "star" : "diamond";
        } else if (resolvedTier === 2) {
            color = RAINBOW_PALETTE[i % RAINBOW_PALETTE.length];
            shape = i % 3 === 0 ? "star" : i % 3 === 1 ? "diamond" : "shard";
        } else if (resolvedTier === 1) {
            const extended = [...config.palette, "#c084fc", "#e879f9"];
            color = extended[i % extended.length];
            shape = i % 4 === 0 ? "diamond" : config.shapes[i % config.shapes.length];
        } else {
            color = config.palette[i % config.palette.length];
            shape = config.shapes[i % config.shapes.length];
        }

        const sizeMultiplier = resolvedTier === 3 ? 1.25 : resolvedTier === 2 ? 1.15 : resolvedTier === 1 ? 1.06 : 1.0;
        const duration = resolvedTier === 3 ? 1.05 : resolvedTier === 2 ? 0.95 : resolvedTier === 1 ? 0.88 : 0.82;

        return {
            x,
            y,
            rot: v.rot,
            delay: 0.36 + (i % 4) * 0.02,
            duration,
            size: Math.round(v.size * sizeMultiplier),
            color,
            shape,
        };
    });

    return (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-visible">
            {resolvedTier >= 2 ? (
                <>
                    <div className="fullart-impact-shockwave absolute -inset-2 rounded-xl" />
                    <div className="fullart-impact-glow absolute -inset-3 rounded-full" />
                </>
            ) : resolvedTier === 1 ? (
                <>
                    <div
                        className="card-impact-shockwave absolute -inset-2 rounded-xl"
                        style={{
                            borderColor: config.ringColor,
                            boxShadow: `0 0 20px ${config.ringGlow}, 0 0 30px #c084fc, inset 0 0 14px ${config.ringGlow}`,
                        }}
                    />
                </>
            ) : (
                <div
                    className="card-impact-shockwave absolute -inset-2 rounded-xl"
                    style={{
                        borderColor: config.ringColor,
                        boxShadow: `0 0 16px ${config.ringGlow}, inset 0 0 12px ${config.ringGlow}`,
                    }}
                />
            )}

            {particles.map((p, idx) => {
                const particleStyle = {
                    "--particle-x": `${p.x}px`,
                    "--particle-y": `${p.y}px`,
                    "--particle-rot": `${p.rot}deg`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                    filter: isSparkle ? `drop-shadow(0 0 6px ${p.color}) drop-shadow(0 0 12px #ffffff)` : `drop-shadow(0 0 4px ${p.color})`,
                } as React.CSSProperties;

                return (
                    <div key={idx} style={particleStyle} className={`absolute flex items-center justify-center opacity-0 ${isSparkle ? "fullart-sparkle-particle" : "card-impact-particle"}`}>
                        {renderParticleShape(p.shape, p.color, isSparkle)}
                    </div>
                );
            })}
        </div>
    );
}
