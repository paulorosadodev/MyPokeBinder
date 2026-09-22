export function formatTcgdexImageUrl(baseUrl?: string | null, quality: "high" | "low" = "high"): string {
    if (!baseUrl || typeof baseUrl !== "string") {
        return "";
    }

    const trimmed = baseUrl.trim();
    if (!trimmed) {
        return "";
    }

    if (trimmed.endsWith(".webp") || trimmed.endsWith(".png") || trimmed.endsWith(".jpg") || trimmed.endsWith(".jpeg")) {
        return trimmed;
    }

    const cleanUrl = trimmed.replace(/\/+$/, "");
    return `${cleanUrl}/${quality}.webp`;
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
