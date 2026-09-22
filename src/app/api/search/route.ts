import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { formatTcgdexImageUrl, isPocketCard } from "@/lib/pokemon/tcgdex";
import { coalesceRequest, getFromMemoryCache, setToMemoryCache } from "@/lib/pokemon/coalesce";
import { normalizeVariantsFlags } from "@/lib/pokemon/variant";
import type { CardVariantsFlags } from "@/types/binder";

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
    set?: {
        id?: string;
        name?: string;
    };
    variants?: Partial<CardVariantsFlags>;
}

interface CachedCardDetail {
    setName: string;
    rarity: string;
    variants: CardVariantsFlags;
}

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }

    const name = request.nextUrl.searchParams.get("name");
    const pageParam = request.nextUrl.searchParams.get("page");
    const pageSizeParam = request.nextUrl.searchParams.get("pageSize");

    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 50) {
        return NextResponse.json({ error: "O parâmetro name é obrigatório e deve ter no máximo 50 caracteres" }, { status: 400 });
    }

    const parsedPage = parseInt(pageParam || "1", 10);
    const parsedPageSize = parseInt(pageSizeParam || "36", 10);
    const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const pageSize = !isNaN(parsedPageSize) && parsedPageSize > 0 && parsedPageSize <= 100 ? parsedPageSize : 36;

    try {
        const encodedName = encodeURIComponent(name.trim());
        const searchCacheKey = `search_${encodedName}`;

        const data = await coalesceRequest<unknown>(searchCacheKey, async () => {
            const apiUrl = `https://api.tcgdex.net/v2/en/cards?name=${encodedName}`;
            const response = await fetch(apiUrl, {
                headers: { Accept: "application/json" },
                next: { revalidate: 3600 },
            });

            if (!response.ok) {
                return [];
            }

            return await response.json();
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
            if (typeof card.image === "string" && card.image.trim().length > 0 && !isPocketCard(card) && !seenIds.has(card.id)) {
                seenIds.add(card.id);
                validCards.push(card);
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
                        variants: cachedDetail.variants,
                    };
                }

                let setName = "";
                let rarity = "";
                let variants = normalizeVariantsFlags({ normal: true });

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
                        variants = normalizeVariantsFlags(detail.variants);
                        if (!variants.normal && !variants.holo && !variants.reverse) {
                            variants = normalizeVariantsFlags({ normal: true });
                        }
                        setToMemoryCache(`detail_${card.id}`, { setName, rarity, variants } satisfies CachedCardDetail, 86400000);
                    }
                } catch {}

                return {
                    id: card.id,
                    localId: card.localId,
                    name: card.name,
                    image: formatTcgdexImageUrl(card.image),
                    setName,
                    rarity,
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
