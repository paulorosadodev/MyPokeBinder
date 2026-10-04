import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { formatTcgdexImageUrl, hasCardImage, isPocketCard, POKEMON_CARD_BACK_URL } from "@/lib/pokemon/tcgdex";
import { resolveCardImageFallback } from "@/lib/pokemon/imageFallback";
import { coalesceRequest, getFromMemoryCache, setToMemoryCache } from "@/lib/pokemon/coalesce";
import { normalizeVariantsFlags } from "@/lib/pokemon/variant";
import { normalizeCardElementTypes } from "@/lib/pokemon/cardTypes";
import { POKEMON_1025, getPokemonByDexId } from "@/lib/pokemon/constants";
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
    dexIds?: number[];
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
    dexId: number | null;
    image?: string;
}

const LOCAL_ID_PATTERN = /^[A-Za-z]{0,4}-?\d+[A-Za-z]?$/;

function parseQueryParts(raw: string): { nameQuery: string | null; localIdHint: string | null } {
    const parenMatch = raw.match(/\(([^)]+)\)/);
    if (parenMatch) {
        const inside = parenMatch[1].trim();
        if (LOCAL_ID_PATTERN.test(inside)) {
            const nameRaw = raw.replace(parenMatch[0], "").trim();
            return { localIdHint: inside, nameQuery: nameRaw || null };
        }
    }
    if (raw.includes("/")) {
        const slashIdx = raw.indexOf("/");
        const left = raw.slice(0, slashIdx).trim();
        const right = raw.slice(slashIdx + 1).trim();
        if (left) {
            const leftParts = left.split(/\s+/);
            const lastPart = leftParts[leftParts.length - 1];
            if (LOCAL_ID_PATTERN.test(lastPart)) {
                return {
                    nameQuery: leftParts.slice(0, -1).join(" ") || null,
                    localIdHint: lastPart.replace(/-/g, ""),
                };
            }
        }
        if (right) {
            const rightParts = right.split(/\s+/);
            if (rightParts.length >= 2 && LOCAL_ID_PATTERN.test(left)) {
                return {
                    nameQuery: rightParts.slice(1).join(" "),
                    localIdHint: left.replace(/-/g, ""),
                };
            }
        }
        return { nameQuery: raw, localIdHint: null };
    }
    if (raw.includes(" ")) {
        const parts = raw.split(/\s+/);
        if (parts.length >= 3) {
            const last = parts[parts.length - 1];
            const secondLast = parts[parts.length - 2];
            if (/^[A-Za-z]{1,4}$/.test(secondLast) && /^\d+[A-Za-z]?$/.test(last)) {
                return {
                    nameQuery: parts.slice(0, -2).join(" "),
                    localIdHint: `${secondLast}${last}`,
                };
            }
        }
        const last = parts[parts.length - 1];
        const first = parts[0];
        if (LOCAL_ID_PATTERN.test(last)) {
            return { nameQuery: parts.slice(0, -1).join(" "), localIdHint: last };
        }
        if (LOCAL_ID_PATTERN.test(first)) {
            return { nameQuery: parts.slice(1).join(" "), localIdHint: first };
        }
        return { nameQuery: raw, localIdHint: null };
    }
    if (LOCAL_ID_PATTERN.test(raw)) {
        return { nameQuery: null, localIdHint: raw };
    }
    return { nameQuery: raw, localIdHint: null };
}

function matchesCardLocalId(card: { id: string; localId?: string }, localIdHint: string): boolean {
    const hint = localIdHint.trim().toLowerCase();
    if (!hint) return true;

    const rawLocal = card.localId || (card.id.includes("-") ? card.id.slice(card.id.lastIndexOf("-") + 1) : card.id);
    const cardLocal = rawLocal.trim().toLowerCase();
    const cardId = card.id.trim().toLowerCase();

    if (cardLocal === hint || cardId.endsWith(`-${hint}`)) {
        return true;
    }

    const unhyphenatedHint = hint.replace(/-/g, "");
    const unhyphenatedCardLocal = cardLocal.replace(/-/g, "");
    if (unhyphenatedCardLocal === unhyphenatedHint || cardId.endsWith(`-${unhyphenatedHint}`)) {
        return true;
    }

    const isNumericHint = /^\d+$/.test(hint);
    if (isNumericHint) {
        const unpaddedHint = hint.replace(/^0+/, "") || "0";
        const unpaddedCardLocal = cardLocal.replace(/^0+/, "") || "0";
        if (unpaddedCardLocal === unpaddedHint || cardId.endsWith(`-${unpaddedHint}`)) {
            return true;
        }
    }

    const normCardLocal = cardLocal.replace(/([a-z]+)0+(\d+)/, "$1$2");
    const normHint = hint.replace(/([a-z]+)0+(\d+)/, "$1$2");
    if (normCardLocal && normCardLocal === normHint) {
        return true;
    }

    const unpaddedId = cardId.replace(/(-[a-z]+)0+(\d+)$/, "$1$2");
    if (unpaddedId.endsWith(`-${normHint}`)) {
        return true;
    }

    return false;
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

    const trimmedName = name.trim();
    const { nameQuery, localIdHint } = parseQueryParts(trimmedName);
    let targetDexId: number | undefined;

    if (dexIdParam) {
        const parsed = parseInt(dexIdParam, 10);
        if (isNaN(parsed) || parsed < 1 || parsed > 1025) {
            return NextResponse.json({ error: "O parâmetro dexId deve ser um número entre 1 e 1025" }, { status: 400 });
        }
        targetDexId = parsed;
    } else if (trimmedName.startsWith("#")) {
        const parsed = parseInt(trimmedName.replace(/^#\s*/, ""), 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 1025) {
            targetDexId = parsed;
        }
    } else if (nameQuery) {
        const cleanName = nameQuery.replace(/[♀♂]/g, "").trim().toLowerCase();
        const basePokemonName = cleanName
            .replace(/^(alolan|galarian|hisuian|paldean)\s+/, "")
            .replace(/\s+de\s+(alola|galar|hisui|paldea)$/, "")
            .trim();
        const matched = POKEMON_1025.find((p) => {
            const base = p.name.toLowerCase().replace(/[♀♂]/g, "").trim();
            return base === cleanName || base === basePokemonName;
        });
        if (matched) {
            targetDexId = matched.dexId;
        }
    }

    const parsedPage = parseInt(pageParam || "1", 10);
    const parsedPageSize = parseInt(pageSizeParam || "36", 10);
    const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const pageSize = !isNaN(parsedPageSize) && parsedPageSize > 0 && parsedPageSize <= 100 ? parsedPageSize : 36;

    try {
        const searchCacheKey = targetDexId ? `search_dex_${targetDexId}` : localIdHint ? `search_lid_${localIdHint.toLowerCase()}${nameQuery ? `_n_${encodeURIComponent(nameQuery.toLowerCase())}` : ""}` : `search_${encodeURIComponent((nameQuery ?? trimmedName).toLowerCase())}`;

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

            const queryCardsByName = async (query: string): Promise<TcgDexCardSummary[]> => {
                const queries = [query];
                const parts = query.trim().split(/\s+/);
                if (parts.length === 2) {
                    queries.push(`${parts[1]} ${parts[0]}`);
                }
                const fetchList: Promise<TcgDexCardSummary[]>[] = [];
                for (const q of queries) {
                    const enc = encodeURIComponent(q);
                    fetchList.push(fetchCards(`https://api.tcgdex.net/v2/en/cards?name=${enc}`));
                    fetchList.push(fetchCards(`https://api.tcgdex.net/v2/pt/cards?name=${enc}`));
                }
                const results = await Promise.all(fetchList);
                return results.flat();
            };

            if (targetDexId) {
                const dexPokemon = getPokemonByDexId(targetDexId);
                const queryName = dexPokemon ? dexPokemon.name : (nameQuery ?? trimmedName);
                const [nameCards, dexCards] = await Promise.all([queryCardsByName(queryName), fetchCards(`https://api.tcgdex.net/v2/en/cards?dexId=eq:${targetDexId}`)]);
                return [...nameCards, ...dexCards];
            }

            if (localIdHint && nameQuery) {
                const nameCards = await queryCardsByName(nameQuery);
                const matchingNameCards = nameCards.filter((c) => matchesCardLocalId(c, localIdHint));
                if (matchingNameCards.length > 0) {
                    return matchingNameCards;
                }
                const fetchPromises = [fetchCards(`https://api.tcgdex.net/v2/en/cards?localId=${encodeURIComponent(localIdHint)}`)];
                if (/^[a-zA-Z]{1,4}\d$/i.test(localIdHint)) {
                    const padded = localIdHint.replace(/(\d)$/, "0$1");
                    fetchPromises.push(fetchCards(`https://api.tcgdex.net/v2/en/cards?localId=${encodeURIComponent(padded)}`));
                }
                const localCards = (await Promise.all(fetchPromises)).flat();
                const nameTokens = nameQuery
                    .toLowerCase()
                    .split(/\s+/)
                    .filter((t) => t.length > 0);
                const matchingLocal = localCards.filter((c) => {
                    const cName = c.name.toLowerCase();
                    return nameTokens.every((t) => cName.includes(t));
                });
                if (matchingLocal.length > 0) {
                    return matchingLocal;
                }
                const partialLocal = localCards.filter((c) => {
                    const cName = c.name.toLowerCase();
                    return nameTokens.some((t) => cName.includes(t));
                });
                return partialLocal.length > 0 ? partialLocal : [...nameCards, ...localCards];
            }

            if (localIdHint) {
                const fetchPromises = [fetchCards(`https://api.tcgdex.net/v2/en/cards?localId=${encodeURIComponent(localIdHint)}`)];
                if (/^[a-zA-Z]{1,4}\d$/i.test(localIdHint)) {
                    const padded = localIdHint.replace(/(\d)$/, "0$1");
                    fetchPromises.push(fetchCards(`https://api.tcgdex.net/v2/en/cards?localId=${encodeURIComponent(padded)}`));
                }
                const results = await Promise.all(fetchPromises);
                return results.flat();
            }

            return await queryCardsByName(nameQuery ?? trimmedName);
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
            if (isPocketCard(card) || seenIds.has(card.id)) {
                continue;
            }

            if (targetDexId && !isCardMatchingPokemon(card.name, targetDexId)) {
                continue;
            }

            if (localIdHint && !matchesCardLocalId(card, localIdHint)) {
                continue;
            }

            seenIds.add(card.id);
            validCards.push({
                ...card,
                image: typeof card.image === "string" && card.image.trim().length > 0 ? card.image : POKEMON_CARD_BACK_URL,
            });
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
                        image: formatTcgdexImageUrl(cachedDetail.image || card.image),
                        setName: cachedDetail.setName,
                        rarity: cachedDetail.rarity,
                        artist: cachedDetail.artist || "",
                        types: cachedDetail.types ?? [],
                        variants: cachedDetail.variants,
                        dexId: cachedDetail.dexId,
                    };
                }

                let setName = "";
                let rarity = "";
                let artist = "";
                let types: CardElementType[] = [];
                let variants = normalizeVariantsFlags({ normal: true });
                let cardImage = card.image;
                let resolvedDexId: number | null = null;

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
                        if (!hasCardImage(cardImage) && typeof detail.image === "string" && detail.image.trim().length > 0) {
                            cardImage = detail.image;
                        }

                        if (Array.isArray(detail.dexIds) && typeof detail.dexIds[0] === "number" && detail.dexIds[0] >= 1 && detail.dexIds[0] <= 1025) {
                            resolvedDexId = detail.dexIds[0];
                        }
                    }
                } catch {}

                if (!hasCardImage(cardImage)) {
                    const fallbackImage = await resolveCardImageFallback(card.id);
                    if (fallbackImage) {
                        cardImage = fallbackImage;
                    }
                }

                if (!resolvedDexId) {
                    if (targetDexId) {
                        resolvedDexId = targetDexId;
                    } else {
                        const found = POKEMON_1025.find((p) => isCardMatchingPokemon(card.name, p.dexId));
                        resolvedDexId = found ? found.dexId : null;
                    }
                }

                setToMemoryCache(`detail_${card.id}`, { setName, rarity, artist, types, variants, dexId: resolvedDexId, image: cardImage } satisfies CachedCardDetail, 86400000);

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
                    dexId: resolvedDexId,
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
