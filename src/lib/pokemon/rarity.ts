export type RarityImpactTier = 0 | 1 | 2 | 3;

export function getRarityImpactTier(rarity?: string | null): RarityImpactTier {
    if (!rarity || typeof rarity !== "string") {
        return 0;
    }
    const lower = rarity.trim().toLowerCase();
    if (lower === "special illustration rare" || lower.includes("special illustration rare") || lower.includes("ilustração rara especial") || lower === "hyper rare" || lower.includes("hyper rare") || lower.includes("hiper-rara") || lower.includes("rara hiper") || lower === "secret rare" || lower.includes("secret rare") || lower.includes("rara secreta")) {
        return 3;
    }
    if (lower === "illustration rare" || lower.includes("illustration rare") || lower.includes("ilustração rara") || lower === "ultra rare" || lower.includes("ultra rare") || lower.includes("rara ultra") || lower === "full art trainer" || lower.includes("full art trainer") || lower === "shiny ultra rare" || lower.includes("shiny ultra rare") || lower.includes("rara ultra brilhante") || lower.includes("brilhante rara ultra") || lower === "shiny rare vmax" || lower.includes("shiny rare vmax")) {
        return 2;
    }
    if (lower === "double rare" || lower.includes("double rare") || lower.includes("rara dupla")) {
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
        lower.includes("illustration rare") ||
        lower.includes("ilustração rara") ||
        lower.includes("ultra rare") ||
        lower.includes("rara ultra") ||
        lower.includes("hyper rare") ||
        lower.includes("hiper-rara") ||
        lower.includes("rara hiper") ||
        lower.includes("secret rare") ||
        lower.includes("rara secreta") ||
        lower.includes("full art trainer") ||
        lower.includes("shiny ultra rare") ||
        lower.includes("rara ultra brilhante") ||
        lower.includes("brilhante rara ultra") ||
        lower.includes("shiny rare vmax")
    );
}

export interface RarityFilterOption {
    value: string;
    label: string;
}

/** Labels oficiais PT-BR (Pokémon Estampas Ilustradas / pokemon.com/br). */
export const RARITY_FILTER_OPTIONS: RarityFilterOption[] = [
    { value: "all", label: "Todas as raridades" },
    { value: "special illustration rare", label: "Ilustração Rara Especial" },
    { value: "illustration rare", label: "Ilustração Rara" },
    { value: "hyper rare", label: "Hiper-rara" },
    { value: "secret rare", label: "Rara Secreta" },
    { value: "ultra rare", label: "Rara Ultra" },
    { value: "shiny ultra rare", label: "Rara Ultra Brilhante" },
    { value: "shiny rare", label: "Rara Brilhante" },
    { value: "double rare", label: "Rara Dupla" },
    { value: "radiant rare", label: "Rara Radiante" },
    { value: "amazing rare", label: "Rara Incrível" },
    { value: "holo rare", label: "Rara Holográfica" },
    { value: "rare", label: "Rara" },
    { value: "uncommon", label: "Incomum" },
    { value: "common", label: "Comum" },
    { value: "promo", label: "Promocional" },
];

/**
 * Traduz raridades TCGdex/EN para o nome oficial em português (Brasil).
 * Fonte: arquivo de cartas pokemon.com/br (Pokémon Estampas Ilustradas).
 */
export function formatRarityLabel(rarity?: string | null): string {
    if (!rarity || typeof rarity !== "string" || !rarity.trim()) {
        return "Comum";
    }
    const trimmed = rarity.trim();
    const lower = trimmed.toLowerCase();

    if (lower.includes("special illustration rare") || lower === "ilustração rara especial") return "Ilustração Rara Especial";
    if (lower.includes("illustration rare") || lower === "ilustração rara") return "Ilustração Rara";
    if (lower.includes("shiny ultra rare") || lower === "rara ultra brilhante" || lower === "brilhante rara ultra") return "Rara Ultra Brilhante";
    if (lower.includes("shiny rare vmax") || lower === "rara brilhante vmax") return "Rara Brilhante VMAX";
    if ((lower.includes("shiny rare") || lower === "rara brilhante" || lower === "brilhante rara") && !lower.includes("ultra")) return "Rara Brilhante";
    if (lower.includes("hyper rare") || lower === "hiper-rara" || lower === "rara hiper") return "Hiper-rara";
    if (lower.includes("secret rare") || lower === "rara secreta") return "Rara Secreta";
    if (lower.includes("full art trainer") || lower === "treinador arte completa") return "Treinador Arte Expandida";
    if (lower.includes("ultra rare") || lower === "rara ultra") return "Rara Ultra";
    if (lower.includes("double rare") || lower === "rara dupla") return "Rara Dupla";
    if (lower.includes("radiant") || lower === "rara radiante") return "Rara Radiante";
    if (lower.includes("amazing") || lower === "rara incrível" || lower === "incrível") return "Rara Incrível";
    if (lower.includes("ace spec") || lower === "rara ace spec") return "Rara ACE SPEC";
    if (lower === "holo rare" || lower === "rare holo" || lower.includes("rara holográfica") || lower.includes("rara holografica")) return "Rara Holográfica";
    if (lower === "rare" || lower === "rara") return "Rara";
    if (lower === "uncommon" || lower === "incomum") return "Incomum";
    if (lower === "common" || lower === "comum") return "Comum";
    if (lower === "promo" || lower.includes("promotional") || lower === "promocional") return "Promocional";

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

    if (tier === 1 || lower.includes("holo") || lower.includes("holográfic") || lower.includes("holografic") || lower.includes("radiant") || lower.includes("radiante") || lower.includes("amazing") || lower.includes("incrível") || lower.includes("incrivel")) {
        return {
            badgeClasses: "border-purple-400/40 bg-purple-400/15 text-purple-300",
            label,
            tier,
            isFullArt,
        };
    }

    if (lower === "rare" || lower === "rara") {
        return {
            badgeClasses: "border-sky-400/30 bg-sky-400/10 text-sky-300",
            label,
            tier,
            isFullArt,
        };
    }

    if (lower === "uncommon" || lower === "incomum") {
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
    if (lower.includes("special illustration rare") || lower.includes("ilustração rara especial")) return 100;
    if (lower.includes("hyper rare") || lower.includes("hiper-rara") || lower.includes("rara hiper")) return 90;
    if (lower.includes("illustration rare") || lower.includes("ilustração rara")) return 80;
    if (lower.includes("shiny ultra rare") || lower.includes("rara ultra brilhante") || lower.includes("brilhante rara ultra") || lower.includes("shiny rare vmax")) return 75;
    if (lower.includes("secret rare") || lower.includes("rara secreta")) return 70;
    if (lower.includes("ultra rare") || lower.includes("rara ultra") || lower.includes("full art trainer")) return 65;
    if (lower.includes("radiant") || lower.includes("radiante") || lower.includes("amazing") || lower.includes("incrível") || lower.includes("incrivel")) return 50;
    if (lower.includes("double rare") || lower.includes("rara dupla")) return 40;
    if (lower.includes("holo") || lower.includes("holográfic") || lower.includes("holografic")) return 30;
    if (lower.includes("rare") || lower === "rara") return 20;
    if (lower.includes("uncommon") || lower.includes("incomum")) return 10;
    return 1;
}
