import { BinderStatusFilter, CollectionCardGroup, UserCard } from "@/types/binder";
import { cardCopyGroupKey } from "@/lib/pokemon/variant";

export const COLLECTION_PAGE_SIZE = 36;

export type CollectionSortField = "dex" | "name" | "recent";
export type CollectionSortDirection = "asc" | "desc";

export interface CollectionListFilters {
    searchTerm: string;
    statusFilter: BinderStatusFilter;
    languageFilter: string;
    rarityFilter: string;
    sortField: CollectionSortField;
    sortDirection: CollectionSortDirection;
}

export function groupCollectionCards(cards: UserCard[]): CollectionCardGroup[] {
    const map = new Map<string, CollectionCardGroup>();

    for (const card of cards) {
        const key = cardCopyGroupKey(card);
        const existing = map.get(key);

        if (existing) {
            existing.copies.push(card);
            existing.totalCount += 1;
            existing.hasInBinder = existing.hasInBinder || Boolean(card.is_in_binder);
            if (card.is_in_binder && !existing.card.is_in_binder) {
                existing.card = card;
            }
        } else {
            map.set(key, {
                key,
                card,
                copies: [card],
                totalCount: 1,
                hasInBinder: Boolean(card.is_in_binder),
            });
        }
    }

    return Array.from(map.values());
}

export function filterAndSortCollectionGroups(groups: CollectionCardGroup[], filters: CollectionListFilters): CollectionCardGroup[] {
    const { searchTerm, statusFilter, languageFilter, rarityFilter, sortField, sortDirection } = filters;

    const list = groups.filter((group) => {
        const card = group.card;

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            const matchesName = card.card_name.toLowerCase().includes(term);
            const matchesSet = (card.card_set_name || "").toLowerCase().includes(term);
            const matchesDex = `#${card.pokemon_dex_id}`.includes(term) || String(card.pokemon_dex_id) === term;
            if (!matchesName && !matchesSet && !matchesDex) return false;
        }

        if (statusFilter === "in_binder" && !group.hasInBinder) return false;
        if (statusFilter === "stored" && group.hasInBinder && group.totalCount === 1) return false;

        if (languageFilter !== "all" && card.card_language !== languageFilter) return false;

        if (rarityFilter !== "all") {
            const lower = (card.card_rarity || "").trim().toLowerCase();
            if (!lower.includes(rarityFilter)) return false;
        }

        return true;
    });

    list.sort((a, b) => {
        if (sortField === "dex") {
            return sortDirection === "asc" ? a.card.pokemon_dex_id - b.card.pokemon_dex_id : b.card.pokemon_dex_id - a.card.pokemon_dex_id;
        }
        if (sortField === "name") {
            return sortDirection === "asc" ? a.card.card_name.localeCompare(b.card.card_name) : b.card.card_name.localeCompare(a.card.card_name);
        }
        const timeA = new Date(a.card.created_at).getTime();
        const timeB = new Date(b.card.created_at).getTime();
        return sortDirection === "asc" ? timeA - timeB : timeB - timeA;
    });

    return list;
}

export function buildCollectionFilterResetKey(filters: { searchTerm: string; statusFilter: string; languageFilter: string; rarityFilter: string; sortField?: string; sortDirection?: string }): string {
    return [filters.searchTerm.trim().toLowerCase(), filters.statusFilter, filters.languageFilter, filters.rarityFilter, filters.sortField ?? "", filters.sortDirection ?? ""].join("|");
}

/** Pure helper for tests and non-React consumers. */
export function slicePagedWindow<T>(
    items: T[],
    visibleCount: number,
    pageSize = COLLECTION_PAGE_SIZE,
): {
    visibleItems: T[];
    hasMore: boolean;
    nextVisibleCount: number;
} {
    const clamped = Math.min(Math.max(visibleCount, 0), items.length);
    return {
        visibleItems: items.slice(0, clamped),
        hasMore: clamped < items.length,
        nextVisibleCount: Math.min(clamped + pageSize, items.length),
    };
}
