import { BinderStatusFilter, CollectionCardGroup, SearchCardItem, UserCard } from "@/types/binder";
import { cardCopyGroupKey } from "@/lib/pokemon/variant";
import { POKEMON_151 } from "@/lib/pokemon/constants";
import { isCardMatchingPokemon } from "@/lib/pokemon/match";

export const COLLECTION_PAGE_SIZE = 36;
export const ALL_EXPANSIONS_FILTER = "all";
export const ALL_ARTISTS_FILTER = "all";

const SORTED_151 = [...POKEMON_151].sort((a, b) => b.name.length - a.name.length);

export function resolveCardDexId(card: { name?: string | null; card_name?: string | null }): number | null {
    const rawName = card.card_name || card.name || "";
    if (!rawName) return null;
    const lower = rawName.toLowerCase();
    const found = SORTED_151.find((p) => lower.includes(p.name.toLowerCase()));
    return found ? found.dexId : null;
}

export type CollectionSortField = "dex" | "name" | "recent";
export type CollectionSortDirection = "asc" | "desc";

export interface CollectionListFilters {
    searchTerm: string;
    statusFilter: BinderStatusFilter;
    languageFilter: string;
    rarityFilter: string;
    expansionFilter?: string;
    variantFilter?: string;
    artistFilter?: string;
    sortField: CollectionSortField;
    sortDirection: CollectionSortDirection;
}

export interface CatalogListFilters {
    searchTerm: string;
    rarityFilter: string;
    expansionFilter: string;
    artistFilter?: string;
    dexId?: number;
}

export interface ExpansionFilterOption {
    value: string;
    label: string;
}

export interface ArtistFilterOption {
    value: string;
    label: string;
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

export function buildExpansionFilterOptions(setNames: Iterable<string | null | undefined>): ExpansionFilterOption[] {
    const unique = new Map<string, string>();
    for (const name of setNames) {
        const trimmed = (name || "").trim();
        if (!trimmed) continue;
        const key = trimmed.toLowerCase();
        if (!unique.has(key)) unique.set(key, trimmed);
    }
    const sorted = [...unique.values()].toSorted((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
    return [{ value: ALL_EXPANSIONS_FILTER, label: "Todas as expansões" }, ...sorted.map((name) => ({ value: name, label: name }))];
}

export function buildArtistFilterOptions(artists: Iterable<string | null | undefined>): ArtistFilterOption[] {
    const unique = new Map<string, string>();
    for (const name of artists) {
        const trimmed = (name || "").trim();
        if (!trimmed) continue;
        const key = trimmed.toLowerCase();
        if (!unique.has(key)) unique.set(key, trimmed);
    }
    const sorted = [...unique.values()].toSorted((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
    return [{ value: ALL_ARTISTS_FILTER, label: "Todos os artistas" }, ...sorted.map((name) => ({ value: name, label: name }))];
}

export function extractCardLocalId(card: { tcgdex_card_id?: string | null; id?: string | null }): string {
    const raw = card.tcgdex_card_id || card.id || "";
    const lastHyphenIndex = raw.lastIndexOf("-");
    if (lastHyphenIndex !== -1 && lastHyphenIndex < raw.length - 1) {
        return raw.slice(lastHyphenIndex + 1);
    }
    return raw;
}

export function parseDexQuery(term: string): number | null {
    const trimmed = term.trim();
    if (!trimmed.startsWith("#")) return null;
    const cleanNum = trimmed.replace(/^#\s*/, "");
    if (!cleanNum) return null;
    const parsed = parseInt(cleanNum, 10);
    return !isNaN(parsed) && parsed >= 1 && parsed <= 1025 ? parsed : null;
}

export function matchesCardNumber(rawLocalId: string | undefined | null, term: string): boolean {
    if (!rawLocalId) return false;
    const localId = rawLocalId.trim().toLowerCase();
    if (!localId) return false;

    const cleanTerm = term.trim().toLowerCase();
    if (!cleanTerm || cleanTerm.startsWith("#")) return false;

    let targetPart = cleanTerm;
    const parenMatch = cleanTerm.match(/\(([^)]+)\)/);
    if (parenMatch) {
        const inside = parenMatch[1].trim();
        if (/^[a-z]{0,4}\d+[a-z]?$/.test(inside)) {
            targetPart = inside;
        } else {
            return false;
        }
    } else if (cleanTerm.includes("/")) {
        const slashIdx = cleanTerm.indexOf("/");
        const left = cleanTerm.slice(0, slashIdx).trim();
        const right = cleanTerm.slice(slashIdx + 1).trim();
        if (!left || !right) return false;
        const leftIsLocalId = /^[a-z]{0,4}\d+[a-z]?$/.test(left);
        const rightIsLocalId = /^[a-z]{0,4}\d+[a-z]?$/.test(right);
        if (leftIsLocalId && rightIsLocalId) {
            targetPart = left;
        } else if (!leftIsLocalId && rightIsLocalId) {
            targetPart = right;
        } else {
            return false;
        }
    }

    if (!targetPart) return false;

    if (localId === targetPart) return true;

    const parsedLocal = parseInt(localId, 10);
    const parsedTarget = parseInt(targetPart, 10);
    if (!isNaN(parsedLocal) && !isNaN(parsedTarget) && parsedLocal === parsedTarget) {
        return true;
    }

    const normLocal = localId.replace(/([a-z]+)0+(\d+)/, "$1$2");
    const normTarget = targetPart.replace(/([a-z]+)0+(\d+)/, "$1$2");
    if (normLocal === normTarget) return true;

    return false;
}

export function matchesCardSearch(card: { card_name: string; card_set_name?: string | null; pokemon_dex_id?: number | null; tcgdex_card_id: string; card_artist?: string | null }, searchTerm: string): boolean {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const matchesName = card.card_name.toLowerCase().includes(term);
    const matchesSet = (card.card_set_name || "").toLowerCase().includes(term);
    const matchesArtist = (card.card_artist || "").toLowerCase().includes(term);

    const dexQuery = parseDexQuery(term);
    const matchesDex = dexQuery !== null && card.pokemon_dex_id != null && card.pokemon_dex_id === dexQuery;

    const cardLocalId = extractCardLocalId(card);
    const matchesCardNum = matchesCardNumber(cardLocalId, term);

    return matchesName || matchesSet || matchesArtist || matchesDex || matchesCardNum;
}

export function filterCatalogCards(cards: SearchCardItem[], filters: CatalogListFilters): SearchCardItem[] {
    const { searchTerm, rarityFilter, expansionFilter, artistFilter, dexId } = filters;

    return cards.filter((card) => {
        if (dexId && !isCardMatchingPokemon(card.name, dexId)) {
            return false;
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            const matchesName = card.name.toLowerCase().includes(term);
            const matchesSet = (card.setName || "").toLowerCase().includes(term);
            const matchesArtist = (card.artist || "").toLowerCase().includes(term);

            const dexQuery = parseDexQuery(term);
            const cardDexId = resolveCardDexId(card);
            const matchesDex = dexQuery !== null && (cardDexId !== null ? cardDexId === dexQuery : !card.name && dexId !== undefined && dexId === dexQuery);

            const cardLocalId = card.localId || extractCardLocalId({ id: card.id });
            const matchesLocal = matchesCardNumber(cardLocalId, term);

            if (!matchesName && !matchesSet && !matchesArtist && !matchesDex && !matchesLocal) return false;
        }

        if (expansionFilter !== ALL_EXPANSIONS_FILTER && (card.setName || "") !== expansionFilter) return false;

        if (artistFilter && artistFilter !== ALL_ARTISTS_FILTER && (card.artist || "") !== artistFilter) return false;

        if (rarityFilter !== "all") {
            const lower = (card.rarity || "").trim().toLowerCase();
            if (!lower.includes(rarityFilter)) return false;
        }

        return true;
    });
}

export function filterAndSortCollectionGroups(groups: CollectionCardGroup[], filters: CollectionListFilters): CollectionCardGroup[] {
    const { searchTerm, statusFilter, languageFilter, rarityFilter, sortField, sortDirection } = filters;
    const expansionFilter = filters.expansionFilter ?? ALL_EXPANSIONS_FILTER;
    const variantFilter = filters.variantFilter ?? "all";
    const artistFilter = filters.artistFilter ?? ALL_ARTISTS_FILTER;

    const list = groups.filter((group) => {
        const card = group.card;

        if (searchTerm.trim()) {
            if (!matchesCardSearch(card, searchTerm)) {
                return false;
            }
        }

        if (statusFilter === "in_binder" && !group.hasInBinder) return false;
        if (statusFilter === "stored" && group.hasInBinder && group.totalCount === 1) return false;

        if (languageFilter !== "all" && card.card_language !== languageFilter) return false;

        if (variantFilter !== "all" && card.card_variant !== variantFilter) return false;

        if (artistFilter !== ALL_ARTISTS_FILTER && (card.card_artist || "") !== artistFilter) return false;

        if (rarityFilter !== "all") {
            const lower = (card.card_rarity || "").trim().toLowerCase();
            if (!lower.includes(rarityFilter)) return false;
        }

        if (expansionFilter !== ALL_EXPANSIONS_FILTER && (card.card_set_name || "") !== expansionFilter) return false;

        return true;
    });

    list.sort((a, b) => {
        if (sortField === "dex") {
            const dexA = a.card.pokemon_dex_id ?? 99999;
            const dexB = b.card.pokemon_dex_id ?? 99999;
            return sortDirection === "asc" ? dexA - dexB : dexB - dexA;
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

export function buildCollectionFilterResetKey(filters: { searchTerm: string; statusFilter: string; languageFilter: string; rarityFilter: string; expansionFilter?: string; variantFilter?: string; artistFilter?: string; sortField?: string; sortDirection?: string }): string {
    return [filters.searchTerm.trim().toLowerCase(), filters.statusFilter, filters.languageFilter, filters.rarityFilter, filters.expansionFilter ?? ALL_EXPANSIONS_FILTER, filters.variantFilter ?? "all", filters.artistFilter ?? ALL_ARTISTS_FILTER, filters.sortField ?? "", filters.sortDirection ?? ""].join("|");
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
