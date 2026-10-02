import { coalesceRequest } from "./coalesce";

export const CARD_IMAGE_FALLBACK_LANGUAGES = ["pt", "es", "it"] as const;

export async function resolveCardImageFallback(cardId?: string | null): Promise<string | null> {
    if (!cardId || typeof cardId !== "string") {
        return null;
    }

    const cleanId = cardId.trim();
    if (!cleanId) {
        return null;
    }

    return coalesceRequest<string | null>(`fallback_img_${cleanId}`, async () => {
        const fetchLangImage = async (lang: string): Promise<string | null> => {
            try {
                const res = await fetch(`https://api.tcgdex.net/v2/${lang}/cards/${encodeURIComponent(cleanId)}`, {
                    headers: { Accept: "application/json" },
                    next: { revalidate: 86400 },
                });
                if (!res.ok) {
                    return null;
                }
                const data = await res.json();
                if (typeof data.image === "string" && data.image.trim().length > 0) {
                    return data.image.trim();
                }
                return null;
            } catch {
                return null;
            }
        };

        const [ptImg, esImg, itImg] = await Promise.all([fetchLangImage("pt"), fetchLangImage("es"), fetchLangImage("it")]);

        return ptImg || esImg || itImg || null;
    });
}
