import imageObjectKeys from "@/data/card-image-map.json";

const cardImageObjectKeys = imageObjectKeys as Record<string, string>;

function publicBaseUrl(): string | null {
    const configuredUrl = process.env.CARD_IMAGES_R2_PUBLIC_URL?.trim();
    if (!configuredUrl) {
        return null;
    }

    try {
        const url = new URL(configuredUrl);
        if (url.protocol !== "https:") {
            return null;
        }
        return url.toString().replace(/\/+$/, "");
    } catch {
        return null;
    }
}

export function buildStoredCardImageUrl(publicUrl: string | null | undefined, objectKey: string | null | undefined): string | null {
    if (!publicUrl || !objectKey || !/^[a-z0-9][a-z0-9/._-]*$/i.test(objectKey)) {
        return null;
    }

    try {
        const baseUrl = new URL(publicUrl);
        if (baseUrl.protocol !== "https:") {
            return null;
        }
        const encodedObjectKey = objectKey.split("/").map(encodeURIComponent).join("/");
        return `${baseUrl.toString().replace(/\/+$/, "")}/${encodedObjectKey}`;
    } catch {
        return null;
    }
}

export function resolveStoredCardImage(cardId?: string | null): string | null {
    if (!cardId || typeof cardId !== "string") {
        return null;
    }

    const objectKey = cardImageObjectKeys[cardId.trim()];
    return buildStoredCardImageUrl(publicBaseUrl(), objectKey);
}
