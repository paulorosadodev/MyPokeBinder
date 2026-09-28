import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { formatTcgdexImageUrl, isPocketCard, POKEMON_CARD_BACK_URL } from "@/lib/pokemon/tcgdex";
import { coalesceRequest, getFromMemoryCache, setToMemoryCache } from "@/lib/pokemon/coalesce";
import { normalizeVariantsFlags } from "@/lib/pokemon/variant";
import { normalizeCardElementTypes } from "@/lib/pokemon/cardTypes";
import { POKEMON_151 } from "@/lib/pokemon/constants";
import { isCardMatchingPokemon } from "@/lib/pokemon/match";
import type { CardElementType, CardVariantsFlags } from "@/types/binder";

interface TcgDexCardSummary {
    id: string;
    localId?: string;
    name: string;
    image?: string;
}

interface TcgDexCardDetail {
    id: string;
    name: string;
    image?: string;
    rarity?: string;
    illustrator?: string;
    types?: string[];
    set?: {
        id?: string;
        name?: string;
    };
    variants?: Partial<CardVariantsFlags>;
}

interface CachedCardDetail {
    setName: string;
    rarity: string;
    artist?: string;
    types: CardElementType[];
    variants: CardVariantsFlags;
}

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }

    const name = request.nextUrl.searchParams.get("name");
    const dexIdParam = request.nextUrl.searchParams.get("dexId");
    const pageParam = request.nextUrl.searchParams.get("page");
    const pageSizeParam = request.nextUrl.searchParams.get("pageSize");

    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 50) {
        return NextResponse.json({ error: "O parâmetro name é obrigatório e deve ter no máximo 50 caracteres" }, { status: 400 });
    }

    let targetDexId: number | undefined;
    if (dexIdParam) {
        const parsed = parseInt(dexIdParam, 10);
        if (isNaN(parsed) || parsed < 1 || parsed > 1025) {
            return NextResponse.json({ error: "O parâmetro dexId deve ser um número entre 1 e 1025" }, { status: 400 });
        }
        targetDexId = parsed;
    } else {
        const cleanName = name.replace(/[♀♂]/g, "").trim().toLowerCase();
        const matched = POKEMON_151.find((p) => p.name.toLowerCase().replace(/[♀♂]/g, "").trim() === cleanName);
        if (matched) {
            targetDexId = matched.dexId;
        }
    }

    const parsedPage = parseInt(pageParam || "1", 10);
    const parsedPageSize = parseInt(pageSizeParam || "36", 10);
    const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const pageSize = !isNaN(parsedPageSize) && parsedPageSize > 0 && parsedPageSize <= 100 ? parsedPageSize : 36;

    try {
        const encodedName = encodeURIComponent(name.trim());
        const searchCacheKey = targetDexId ? `search_dex_${targetDexId}_${encodedName}` : `search_${encodedName}`;

        const data = await coalesceRequest<unknown>(searchCacheKey, async () => {
            const fetchCards = async (url: string): Promise<TcgDexCardSummary[]> => {
                const response = await fetch(url, {
                    headers: { Accept: "application/json" },
                    next: { revalidate: 3600 },
                });
                if (!response.ok) {
                    return [];
                }
                const json = await response.json();
                return Array.isArray(json) ? (json as TcgDexCardSummary[]) : [];
            };

            if (targetDexId) {
                const [nameCards, dexCards] = await Promise.all([fetchCards(`https://api.tcgdex.net/v2/en/cards?name=${encodedName}`), fetchCards(`https://api.tcgdex.net/v2/en/cards?dexId=eq:${targetDexId}`)]);
                return [...nameCards, ...dexCards];
            }

            return await fetchCards(`https://api.tcgdex.net/v2/en/cards?name=${encodedName}`);
        });

        if (!Array.isArray(data)) {
            return NextResponse.json(
                { cards: [], hasMore: false, totalCount: 0 },
                {
                    headers: {
                        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
                    },
                },
            );
        }

        const validCards: TcgDexCardSummary[] = [];
        const seenIds = new Set<string>();

        for (const card of data as TcgDexCardSummary[]) {
            if (!isPocketCard(card) && !seenIds.has(card.id) && (!targetDexId || isCardMatchingPokemon(card.name, targetDexId))) {
                seenIds.add(card.id);
                validCards.push({
                    ...card,
                    image: typeof card.image === "string" && card.image.trim().length > 0 ? card.image : POKEMON_CARD_BACK_URL,
                });
            }
        }

        const totalCount = validCards.length;
        const offset = (page - 1) * pageSize;
        const pagedCards = validCards.slice(offset, offset + pageSize);
        const hasMore = offset + pageSize < totalCount;

        const enrichedCards = await Promise.all(
            pagedCards.map(async (card) => {
                const cachedDetail = getFromMemoryCache<CachedCardDetail>(`detail_${card.id}`);
                if (cachedDetail) {
                    return {
                        id: card.id,
                        localId: card.localId,
                        name: card.name,
                        image: formatTcgdexImageUrl(card.image),
                        setName: cachedDetail.setName,
                        rarity: cachedDetail.rarity,
                        artist: cachedDetail.artist || "",
                        types: cachedDetail.types ?? [],
                        variants: cachedDetail.variants,
                    };
                }

                let setName = "";
                let rarity = "";
                let artist = "";
                let types: CardElementType[] = [];
                let variants = normalizeVariantsFlags({ normal: true });
                let cardImage = card.image;

                try {
                    const detail = await coalesceRequest<TcgDexCardDetail | null>(`fetch_detail_${card.id}`, async () => {
                        const detailRes = await fetch(`https://api.tcgdex.net/v2/en/cards/${card.id}`, {
                            headers: { Accept: "application/json" },
                            next: { revalidate: 86400 },
                        });
                        if (!detailRes.ok) {
                            return null;
                        }
                        return (await detailRes.json()) as TcgDexCardDetail;
                    });

                    if (detail) {
                        setName = detail.set?.name || "";
                        rarity = detail.rarity || "";
                        artist = (detail.illustrator || "").trim();
                        types = normalizeCardElementTypes(detail.types);
                        variants = normalizeVariantsFlags(detail.variants);
                        if (!variants.normal && !variants.holo && !variants.reverse) {
                            variants = normalizeVariantsFlags({ normal: true });
                        }
                        if ((!cardImage || cardImage === POKEMON_CARD_BACK_URL) && typeof detail.image === "string" && detail.image.trim().length > 0) {
                            cardImage = detail.image;
                        }
                        setToMemoryCache(`detail_${card.id}`, { setName, rarity, artist, types, variants } satisfies CachedCardDetail, 86400000);
                    }
                } catch {}

                return {
                    id: card.id,
                    localId: card.localId,
                    name: card.name,
                    image: formatTcgdexImageUrl(cardImage),
                    setName,
                    rarity,
                    artist,
                    types,
                    variants,
                };
            }),
        );

        return NextResponse.json(
            { cards: enrichedCards, hasMore, totalCount },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
                },
            },
        );
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro ao buscar cartas";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
