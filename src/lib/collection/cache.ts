import { filterAndSortCollectionGroups, groupCollectionCards, type CollectionListFilters } from "@/lib/collection/listCards";
import { cardCopyGroupKey } from "@/lib/pokemon/variant";
import type { CollectionCardGroup, UserCard } from "@/types/binder";

const SWR_INFINITE_PREFIX = "$inf$";

export interface CollectionCachedPage {
    groups: CollectionCardGroup[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

export interface CollectionCachePatch {
    key: string;
    data: unknown;
}

export interface CollectionCardMutation {
    updatedCards?: UserCard[];
    addedCards?: UserCard[];
    deletedCardIds?: Iterable<string>;
    clearBinderForPokemonDexId?: number;
}

export function isCollectionListRequestKey(key: unknown): key is string {
    if (typeof key !== "string") return false;

    try {
        const url = new URL(key, "https://mypokebinder.local");
        return url.pathname === "/api/cards" && (url.search === "" || url.searchParams.get("grouped") === "true");
    } catch {
        return false;
    }
}

export function isGroupedCollectionListRequestKey(key: unknown): key is string {
    if (!isCollectionListRequestKey(key)) return false;

    try {
        return new URL(key, "https://mypokebinder.local").searchParams.get("grouped") === "true";
    } catch {
        return false;
    }
}

export function isGroupedCollectionInfiniteKey(key: unknown): key is string {
    if (typeof key !== "string" || !key.startsWith(SWR_INFINITE_PREFIX)) return false;

    return isGroupedCollectionListRequestKey(key.slice(SWR_INFINITE_PREFIX.length));
}

export function collectionInfiniteFirstPageKey(key: string): string {
    return key.startsWith(SWR_INFINITE_PREFIX) ? key.slice(SWR_INFINITE_PREFIX.length) : key;
}

export function collectionPageKey(firstPageKey: string, pageIndex: number): string {
    const queryStart = firstPageKey.indexOf("?");
    if (queryStart === -1) return firstPageKey;

    const params = new URLSearchParams(firstPageKey.slice(queryStart + 1));
    params.set("page", String(pageIndex + 1));

    return `${firstPageKey.slice(0, queryStart)}?${params.toString()}`;
}

/**
 * Chaves do cache SWR que respondem com `{ cards: UserCard[] }` (lista simples da Coleção
 * usada pelo seletor de carta do binder), excluindo as páginas agrupadas da Coleção.
 */
export function isCollectionCardsCacheKey(key: unknown): key is string {
    if (typeof key !== "string" || !key.startsWith("/api/cards")) return false;

    try {
        const url = new URL(key, "https://mypokebinder.local");
        return url.pathname === "/api/cards" && url.searchParams.get("grouped") !== "true";
    } catch {
        return false;
    }
}

function parseCollectionListFilters(key: string): CollectionListFilters | null {
    try {
        const url = new URL(key, "https://mypokebinder.local");
        if (url.pathname !== "/api/cards" || url.searchParams.get("grouped") !== "true") return null;

        return {
            searchTerm: url.searchParams.get("search") ?? "",
            statusFilter: (url.searchParams.get("status") ?? "all") as CollectionListFilters["statusFilter"],
            languageFilter: url.searchParams.get("language") ?? "all",
            rarityFilter: url.searchParams.get("rarity") ?? "all",
            expansionFilter: url.searchParams.get("expansion") ?? "all",
            variantFilter: url.searchParams.get("variant") ?? "all",
            artistFilter: url.searchParams.get("artist") ?? "all",
            sortField: (url.searchParams.get("sort") ?? "dex") as CollectionListFilters["sortField"],
            sortDirection: (url.searchParams.get("direction") ?? "asc") as CollectionListFilters["sortDirection"],
        };
    } catch {
        return null;
    }
}

export function applyCollectionCardMutation(key: string, page: CollectionCachedPage, mutation: CollectionCardMutation): CollectionCachedPage {
    const filters = parseCollectionListFilters(key);
    if (!filters) return page;

    const updatedCards = new Map(mutation.updatedCards?.map((card) => [card.id, card]));
    const deletedCardIds = new Set(mutation.deletedCardIds);
    const addedGroupKeys = new Set(mutation.addedCards?.map(cardCopyGroupKey));
    const pageIsAffected = page.groups.some((group) => addedGroupKeys.has(group.key) || group.copies.some((card) => updatedCards.has(card.id) || deletedCardIds.has(card.id) || mutation.clearBinderForPokemonDexId === card.pokemon_dex_id));
    if (!pageIsAffected) return page;

    const existingCards = page.groups.flatMap((group) => group.copies);
    const cards = existingCards
        .filter((card) => !deletedCardIds.has(card.id))
        .map((card) => {
            const clearedBinderCard = mutation.clearBinderForPokemonDexId === card.pokemon_dex_id ? { ...card, is_in_binder: false } : card;
            return updatedCards.get(card.id) ?? clearedBinderCard;
        });

    for (const card of mutation.addedCards ?? []) {
        const pageContainsGroup = page.groups.some((group) => group.key === cardCopyGroupKey(card));
        if (pageContainsGroup && !deletedCardIds.has(card.id) && !cards.some((current) => current.id === card.id)) {
            cards.push(card);
        }
    }

    const groups = filterAndSortCollectionGroups(groupCollectionCards(cards), filters);
    return {
        ...page,
        groups,
        total: Math.max(0, page.total + groups.length - page.groups.length),
    };
}

export function planCollectionCachePatches(keys: Iterable<string>, readEntry: (key: string) => { data?: unknown } | undefined, mutation: CollectionCardMutation): CollectionCachePatch[] {
    const pageEntries = new Map<string, CollectionCachedPage>();
    const infiniteEntries: Array<{ key: string; pages: CollectionCachedPage[] }> = [];

    for (const key of keys) {
        const data = readEntry(key)?.data;

        if (isGroupedCollectionListRequestKey(key)) {
            if (data) pageEntries.set(key, data as CollectionCachedPage);
            continue;
        }

        if (!isGroupedCollectionInfiniteKey(key)) continue;
        if (!Array.isArray(data) || data.length === 0) continue;

        infiniteEntries.push({ key, pages: data as CollectionCachedPage[] });
    }

    const patches = new Map<string, unknown>();

    for (const [key, page] of pageEntries) {
        const next = applyCollectionCardMutation(key, page, mutation);
        if (next !== page) patches.set(key, next);
    }

    for (const { key, pages } of infiniteEntries) {
        const firstPageKey = collectionInfiniteFirstPageKey(key);
        let changed = false;
        const next = pages.map((page, index) => {
            const pageKey = collectionPageKey(firstPageKey, index);
            const patchedPage = patches.get(pageKey);
            if (patchedPage !== undefined) {
                changed = true;
                return patchedPage as CollectionCachedPage;
            }

            const source = pageEntries.get(pageKey) ?? page;
            if (source === page) return page;

            changed = true;
            return applyCollectionCardMutation(pageKey, source, mutation);
        });

        if (changed) patches.set(key, next);
    }

    return [...patches].map(([key, data]) => ({ key, data }));
}
