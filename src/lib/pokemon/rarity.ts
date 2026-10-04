export type RarityImpactTier = 0 | 1 | 2 | 3;

export function getRarityImpactTier(rarity?: string | null, cardName?: string | null): RarityImpactTier {
    const hasRarity = Boolean(rarity && typeof rarity === "string" && rarity.trim());
    const hasName = Boolean(cardName && typeof cardName === "string" && cardName.trim());
    if (!hasRarity && !hasName) {
        return 0;
    }
    const lowerRarity = hasRarity ? (rarity as string).trim().toLowerCase() : "";
    const lowerName = hasName ? (cardName as string).trim().toLowerCase() : "";

    if (lowerRarity.includes("special illustration rare") || lowerRarity.includes("ilustração rara especial") || lowerRarity.includes("hyper rare") || lowerRarity.includes("hiper-rara") || lowerRarity.includes("rara hiper") || lowerRarity.includes("secret rare") || lowerRarity.includes("rara secreta")) {
        return 3;
    }
    if (
        lowerRarity.includes("illustration rare") ||
        lowerRarity.includes("ilustração rara") ||
        lowerRarity.includes("ultra rare") ||
        lowerRarity.includes("rara ultra") ||
        lowerRarity.includes("full art trainer") ||
        lowerRarity.includes("shiny ultra rare") ||
        lowerRarity.includes("rara ultra brilhante") ||
        lowerRarity.includes("shiny rare vmax") ||
        lowerRarity.includes("vmax") ||
        lowerRarity.includes("vstar") ||
        lowerRarity.includes("v-union") ||
        lowerRarity.includes("vunion") ||
        lowerRarity.includes("rare holo v") ||
        lowerRarity.includes("rare v") ||
        lowerRarity.includes("rara v") ||
        lowerRarity.includes("rara holo v") ||
        lowerRarity.includes("holo v") ||
        /\b(ex|gx|v|vmax|vstar|v-union|vunion)\b/i.test(lowerRarity) ||
        (hasName && /\b(ex|gx|v|vmax|vstar|v-union|vunion)\b/i.test(lowerName))
    ) {
        return 2;
    }
    if (lowerRarity.includes("double rare") || lowerRarity.includes("rara dupla")) {
        return 1;
    }
    return 0;
}

export function isFullArtRarity(rarity?: string | null, cardName?: string | null): boolean {
    const hasRarity = Boolean(rarity && typeof rarity === "string" && rarity.trim());
    const hasName = Boolean(cardName && typeof cardName === "string" && cardName.trim());

    if (!hasRarity && !hasName) {
        return false;
    }

    const lowerRarity = hasRarity ? (rarity as string).trim().toLowerCase() : "";
    const lowerName = hasName ? (cardName as string).trim().toLowerCase() : "";

    if (hasRarity) {
        if (
            lowerRarity.includes("illustration rare") ||
            lowerRarity.includes("ilustração rara") ||
            lowerRarity.includes("ultra rare") ||
            lowerRarity.includes("rara ultra") ||
            lowerRarity.includes("rare ultra") ||
            lowerRarity.includes("double rare") ||
            lowerRarity.includes("rara dupla") ||
            lowerRarity.includes("hyper rare") ||
            lowerRarity.includes("hiper-rara") ||
            lowerRarity.includes("rara hiper") ||
            lowerRarity.includes("secret rare") ||
            lowerRarity.includes("rara secreta") ||
            lowerRarity.includes("rare secret") ||
            lowerRarity.includes("rainbow") ||
            lowerRarity.includes("arco-íris") ||
            lowerRarity.includes("full art") ||
            lowerRarity.includes("arte expandida") ||
            lowerRarity.includes("arte completa") ||
            lowerRarity.includes("shiny ultra rare") ||
            lowerRarity.includes("rara ultra brilhante") ||
            lowerRarity.includes("brilhante rara ultra") ||
            lowerRarity.includes("shiny rare vmax") ||
            lowerRarity.includes("vmax") ||
            lowerRarity.includes("vstar") ||
            lowerRarity.includes("v-union") ||
            lowerRarity.includes("vunion") ||
            lowerRarity.includes("holo v") ||
            lowerRarity.includes("rare holo v") ||
            lowerRarity.includes("rare v") ||
            lowerRarity.includes("rara v") ||
            lowerRarity.includes("rara holo v") ||
            lowerRarity.includes("holo ex") ||
            lowerRarity.includes("rare holo ex") ||
            lowerRarity.includes("radiant") ||
            lowerRarity.includes("radiante") ||
            lowerRarity.includes("amazing") ||
            lowerRarity.includes("incrível") ||
            lowerRarity.includes("incrivel") ||
            lowerRarity.includes("ace spec") ||
            /\b(ex|gx|v|vmax|vstar|v-union|vunion)\b/i.test(lowerRarity)
        ) {
            return true;
        }
    }

    if (hasName) {
        if (/\b(ex|gx|v|vmax|vstar|v-union|vunion)\b/i.test(lowerName)) {
            return true;
        }
    }

    return false;
}

export interface RarityFilterOption {
    value: string;
    label: string;
}

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

export function getRarityBadgeStyle(
    rarity?: string | null,
    cardName?: string | null,
): {
    badgeClasses: string;
    label: string;
    tier: RarityImpactTier;
    isFullArt: boolean;
} {
    const tier = getRarityImpactTier(rarity, cardName);
    const label = formatRarityLabel(rarity);
    const isFullArt = isFullArtRarity(rarity, cardName);
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

export function getRarityScore(rarity?: string | null, cardName?: string | null): number {
    if (!rarity && !cardName) return 0;
    const lower = (rarity || "").trim().toLowerCase();
    const lowerName = (cardName || "").trim().toLowerCase();
    if (lower.includes("special illustration rare") || lower.includes("ilustração rara especial")) return 100;
    if (lower.includes("hyper rare") || lower.includes("hiper-rara") || lower.includes("rara hiper")) return 90;
    if (lower.includes("illustration rare") || lower.includes("ilustração rara")) return 80;
    if (lower.includes("shiny ultra rare") || lower.includes("rara ultra brilhante") || lower.includes("brilhante rara ultra") || lower.includes("shiny rare vmax")) return 75;
    if (lower.includes("secret rare") || lower.includes("rara secreta")) return 70;
    if (lower.includes("ultra rare") || lower.includes("rara ultra") || lower.includes("full art trainer")) return 65;
    if (lower.includes("vmax") || lower.includes("vstar") || lower.includes("v-union") || lower.includes("vunion") || lower.includes("rare holo v") || lower.includes("rare v") || lower.includes("rara v") || lower.includes("rara holo v") || lower.includes("holo v") || /\b(ex|gx|v|vmax|vstar|v-union|vunion)\b/i.test(lower) || (lowerName && /\b(ex|gx|v|vmax|vstar|v-union|vunion)\b/i.test(lowerName))) return 60;
    if (lower.includes("radiant") || lower.includes("radiante") || lower.includes("amazing") || lower.includes("incrível") || lower.includes("incrivel")) return 50;
    if (lower.includes("double rare") || lower.includes("rara dupla")) return 40;
    if (lower.includes("holo") || lower.includes("holográfic") || lower.includes("holografic")) return 30;
    if (lower.includes("rare") || lower === "rara") return 20;
    if (lower.includes("uncommon") || lower.includes("incomum")) return 10;
    return 1;
}
