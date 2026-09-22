export type RarityImpactTier = 0 | 1 | 2 | 3;

export function getRarityImpactTier(rarity?: string | null): RarityImpactTier {
    if (!rarity || typeof rarity !== "string") {
        return 0;
    }
    const lower = rarity.trim().toLowerCase();
    if (lower === "special illustration rare" || lower.includes("special illustration rare") || lower === "hyper rare" || lower.includes("hyper rare") || lower === "secret rare" || lower.includes("secret rare")) {
        return 3;
    }
    if (lower === "illustration rare" || lower.includes("illustration rare") || lower === "ultra rare" || lower.includes("ultra rare") || lower === "full art trainer" || lower.includes("full art trainer") || lower === "shiny ultra rare" || lower.includes("shiny ultra rare") || lower === "shiny rare vmax" || lower.includes("shiny rare vmax")) {
        return 2;
    }
    if (lower === "double rare" || lower.includes("double rare")) {
        return 1;
    }
    return 0;
}

export function isFullArtRarity(rarity?: string | null): boolean {
    if (!rarity || typeof rarity !== "string") {
        return false;
    }
    const lower = rarity.trim().toLowerCase();
    return (
        lower === "illustration rare" ||
        lower.includes("illustration rare") ||
        lower === "special illustration rare" ||
        lower.includes("special illustration rare") ||
        lower === "ultra rare" ||
        lower.includes("ultra rare") ||
        lower === "hyper rare" ||
        lower.includes("hyper rare") ||
        lower === "secret rare" ||
        lower.includes("secret rare") ||
        lower === "full art trainer" ||
        lower.includes("full art trainer") ||
        lower === "shiny ultra rare" ||
        lower.includes("shiny ultra rare") ||
        lower === "shiny rare vmax" ||
        lower.includes("shiny rare vmax")
    );
}

export interface RarityFilterOption {
    value: string;
    label: string;
}

export const RARITY_FILTER_OPTIONS: RarityFilterOption[] = [
    { value: "all", label: "Todas as raridades" },
    { value: "special illustration rare", label: "Special Illustration Rare" },
    { value: "illustration rare", label: "Illustration Rare" },
    { value: "hyper rare", label: "Hyper Rare" },
    { value: "secret rare", label: "Secret Rare" },
    { value: "ultra rare", label: "Ultra Rare" },
    { value: "double rare", label: "Double Rare" },
    { value: "holo rare", label: "Holo Rare" },
    { value: "rare", label: "Rare" },
    { value: "uncommon", label: "Incomum" },
    { value: "common", label: "Comum" },
];

export function formatRarityLabel(rarity?: string | null): string {
    if (!rarity || typeof rarity !== "string" || !rarity.trim()) {
        return "Comum";
    }
    const trimmed = rarity.trim();
    const lower = trimmed.toLowerCase();

    if (lower === "illustration rare") return "Illustration Rare";
    if (lower === "special illustration rare") return "Special Illustration Rare";
    if (lower === "ultra rare") return "Ultra Rare";
    if (lower === "hyper rare") return "Hyper Rare";
    if (lower === "secret rare") return "Secret Rare";
    if (lower === "double rare") return "Double Rare";
    if (lower === "holo rare" || lower === "rare holo") return "Holo Rare";
    if (lower === "rare") return "Rare";
    if (lower === "uncommon") return "Incomum";
    if (lower === "common") return "Comum";

    return trimmed;
}

export function getRarityBadgeStyle(rarity?: string | null): {
    badgeClasses: string;
    label: string;
    tier: RarityImpactTier;
    isFullArt: boolean;
} {
    const tier = getRarityImpactTier(rarity);
    const label = formatRarityLabel(rarity);
    const isFullArt = isFullArtRarity(rarity);
    const lower = (rarity || "").trim().toLowerCase();

    if (tier === 3) {
        return {
            badgeClasses: "border-amber-400/40 bg-amber-400/15 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]",
            label,
            tier,
            isFullArt,
        };
    }

    if (tier === 2) {
        return {
            badgeClasses: "border-cyan-400/40 bg-cyan-400/15 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.25)]",
            label,
            tier,
            isFullArt,
        };
    }

    if (tier === 1 || lower.includes("holo") || lower.includes("radiant") || lower.includes("amazing")) {
        return {
            badgeClasses: "border-purple-400/40 bg-purple-400/15 text-purple-300",
            label,
            tier,
            isFullArt,
        };
    }

    if (lower === "rare") {
        return {
            badgeClasses: "border-sky-400/30 bg-sky-400/10 text-sky-300",
            label,
            tier,
            isFullArt,
        };
    }

    if (lower === "uncommon") {
        return {
            badgeClasses: "border-slate-400/30 bg-slate-400/10 text-slate-300",
            label,
            tier,
            isFullArt,
        };
    }

    return {
        badgeClasses: "border-white/10 bg-white/5 text-slate-400",
        label,
        tier,
        isFullArt,
    };
}

export function getRarityScore(rarity?: string | null): number {
    if (!rarity || typeof rarity !== "string") return 0;
    const lower = rarity.trim().toLowerCase();
    if (lower.includes("special illustration rare")) return 100;
    if (lower.includes("hyper rare")) return 90;
    if (lower.includes("illustration rare")) return 80;
    if (lower.includes("shiny ultra rare") || lower.includes("shiny rare vmax")) return 75;
    if (lower.includes("secret rare")) return 70;
    if (lower.includes("ultra rare") || lower.includes("full art trainer")) return 65;
    if (lower.includes("radiant") || lower.includes("amazing")) return 50;
    if (lower.includes("double rare")) return 40;
    if (lower.includes("holo")) return 30;
    if (lower.includes("rare")) return 20;
    if (lower.includes("uncommon")) return 10;
    return 1;
}
