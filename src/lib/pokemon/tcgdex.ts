export const POKEMON_CARD_BACK_URL = "/pokemon-card-back.png";

export function formatTcgdexImageUrl(baseUrl?: string | null, quality: "high" | "low" = "high"): string {
    if (!baseUrl || typeof baseUrl !== "string") {
        return POKEMON_CARD_BACK_URL;
    }

    const trimmed = baseUrl.trim();
    if (!trimmed) {
        return POKEMON_CARD_BACK_URL;
    }

    if (trimmed.startsWith("/")) {
        return trimmed;
    }

    if (trimmed.endsWith(".webp") || trimmed.endsWith(".png") || trimmed.endsWith(".jpg") || trimmed.endsWith(".jpeg")) {
        return trimmed;
    }

    const cleanUrl = trimmed.replace(/\/+$/, "");
    return `${cleanUrl}/${quality}.webp`;
}

export function hasCardImage(url?: string | null): boolean {
    if (!url || typeof url !== "string") {
        return false;
    }
    const trimmed = url.trim();
    if (!trimmed) {
        return false;
    }
    if (trimmed === POKEMON_CARD_BACK_URL || trimmed.includes("pokemon-card-back") || trimmed.includes("tcg-card-back")) {
        return false;
    }
    return true;
}

const POCKET_ID_PATTERN = /^(A\d+[a-z]?|B\d+[a-z]?|P-A)-/i;

export function isPocketCard(card?: { id?: string; image?: string } | null): boolean {
    if (!card) {
        return false;
    }

    if (typeof card.image === "string" && card.image.includes("/tcgp/")) {
        return true;
    }

    if (typeof card.id === "string" && POCKET_ID_PATTERN.test(card.id.trim())) {
        return true;
    }

    return false;
}
