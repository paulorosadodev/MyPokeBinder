import useSWR, { SWRConfiguration } from "swr";
import useSWRInfinite from "swr/infinite";
import { useMemo, useCallback } from "react";
import type { CardVariant, UserCard, DashboardData, CollectionCardGroup, BinderStatusFilter } from "@/types/binder";
import { ALL_EXPANSIONS_FILTER, COLLECTION_PAGE_SIZE, type CollectionSortDirection, type CollectionSortField } from "@/lib/collection/listCards";

export const defaultSWRConfig: SWRConfiguration = {
    dedupingInterval: 2000,
    revalidateOnFocus: false,
};

export const fetcher = async <T>(url: string): Promise<T> => {
    const res = await fetch(url);
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch");
    }
    return res.json();
};

export interface CollectionGroupsResponse {
    groups: CollectionCardGroup[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

export interface PublicCollectionGroupsResponse {
    owner: {
        id: string;
        username: string;
        name: string;
        avatarUrl?: string | null;
        themeColor: string;
    };
    isOwner: boolean;
    groups: CollectionCardGroup[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

export function useInfiniteCollectionGroups(filters: { searchTerm: string; statusFilter: BinderStatusFilter; languageFilter: string; rarityFilter: string; expansionFilter?: string; sortField: CollectionSortField; sortDirection: CollectionSortDirection }) {
    const getKey = (pageIndex: number, previousPageData: CollectionGroupsResponse | null) => {
        if (previousPageData && !previousPageData.hasMore) return null;

        const params = new URLSearchParams();
        params.set("grouped", "true");
        params.set("page", String(pageIndex + 1));
        params.set("limit", String(COLLECTION_PAGE_SIZE));
        if (filters.searchTerm.trim()) params.set("search", filters.searchTerm.trim());
        if (filters.statusFilter !== "all") params.set("status", filters.statusFilter);
        if (filters.languageFilter !== "all") params.set("language", filters.languageFilter);
        if (filters.rarityFilter !== "all") params.set("rarity", filters.rarityFilter);
        if (filters.expansionFilter && filters.expansionFilter !== ALL_EXPANSIONS_FILTER) {
            params.set("expansion", filters.expansionFilter);
        }
        params.set("sort", filters.sortField);
        params.set("direction", filters.sortDirection);

        return `/api/cards?${params.toString()}`;
    };

    const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite<CollectionGroupsResponse>(getKey, fetcher, {
        ...defaultSWRConfig,
        revalidateFirstPage: false,
    });

    const groups = useMemo(() => {
        return data ? data.flatMap((page) => page.groups) : [];
    }, [data]);

    const lastPage = data ? data[data.length - 1] : undefined;
    const hasMore = lastPage ? lastPage.hasMore : false;
    const total = data && data[0] ? data[0].total : 0;
    const isLoading = !data && !error;
    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

    const loadMore = useCallback(() => {
        if (!isLoadingMore && hasMore) {
            setSize((prev) => prev + 1);
        }
    }, [isLoadingMore, hasMore, setSize]);

    return {
        groups,
        total,
        isLoading,
        isLoadingMore,
        isValidating,
        hasMore,
        loadMore,
        isError: error,
        mutate,
    };
}

export function useUserExpansions() {
    const { data, error, isLoading, mutate } = useSWR<{ expansions: string[] }>("/api/cards/expansions", fetcher, {
        ...defaultSWRConfig,
        revalidateOnFocus: false,
    });
    return {
        expansions: data?.expansions ?? [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useInfinitePublicCollectionGroups(
    username: string,
    filters: {
        searchTerm: string;
        statusFilter: BinderStatusFilter;
        languageFilter: string;
        rarityFilter: string;
        expansionFilter?: string;
        sortField: CollectionSortField;
        sortDirection: CollectionSortDirection;
    },
) {
    const getKey = (pageIndex: number, previousPageData: PublicCollectionGroupsResponse | null) => {
        if (!username) return null;
        if (previousPageData && !previousPageData.hasMore) return null;

        const params = new URLSearchParams();
        params.set("page", String(pageIndex + 1));
        params.set("limit", String(COLLECTION_PAGE_SIZE));
        if (filters.searchTerm.trim()) params.set("search", filters.searchTerm.trim());
        if (filters.statusFilter !== "all") params.set("status", filters.statusFilter);
        if (filters.languageFilter !== "all") params.set("language", filters.languageFilter);
        if (filters.rarityFilter !== "all") params.set("rarity", filters.rarityFilter);
        if (filters.expansionFilter && filters.expansionFilter !== ALL_EXPANSIONS_FILTER) {
            params.set("expansion", filters.expansionFilter);
        }
        params.set("sort", filters.sortField);
        params.set("direction", filters.sortDirection);

        return `/api/profile/${encodeURIComponent(username)}/collection?${params.toString()}`;
    };

    const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite<PublicCollectionGroupsResponse>(getKey, fetcher, {
        ...defaultSWRConfig,
        revalidateFirstPage: false,
    });

    const groups = useMemo(() => {
        return data ? data.flatMap((page) => page.groups) : [];
    }, [data]);

    const firstPage = data ? data[0] : undefined;
    const lastPage = data ? data[data.length - 1] : undefined;
    const hasMore = lastPage ? lastPage.hasMore : false;
    const total = firstPage ? firstPage.total : 0;
    const owner = firstPage ? firstPage.owner : undefined;
    const isOwner = firstPage ? firstPage.isOwner : false;
    const isLoading = !data && !error;
    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

    const loadMore = useCallback(() => {
        if (!isLoadingMore && hasMore) {
            setSize((prev) => prev + 1);
        }
    }, [isLoadingMore, hasMore, setSize]);

    return {
        groups,
        total,
        owner,
        isOwner,
        isLoading,
        isLoadingMore,
        isValidating,
        hasMore,
        loadMore,
        isError: error,
        mutate,
    };
}

export function usePublicUserExpansions(username: string) {
    const key = username ? `/api/profile/${encodeURIComponent(username)}/expansions` : null;
    const { data, error, isLoading, mutate } = useSWR<{ expansions: string[] }>(key, fetcher, {
        ...defaultSWRConfig,
        revalidateOnFocus: false,
    });
    return {
        expansions: data?.expansions ?? [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useBinderCards(fallbackData?: { cards: UserCard[]; availableCounts?: Record<number, number> }) {
    const { data, error, isLoading, mutate } = useSWR<{ cards: UserCard[]; availableCounts?: Record<number, number> }>("/api/binder", fetcher, {
        ...defaultSWRConfig,
        fallbackData,
        revalidateOnMount: true,
    });
    return {
        cards: data?.cards ?? [],
        availableCounts: data?.availableCounts ?? fallbackData?.availableCounts ?? {},
        isLoading: isLoading && !data,
        isError: error,
        mutate,
    };
}

export function useCollectionCards(dexId?: number | null) {
    const key = dexId ? `/api/cards?pokemon_dex_id=${dexId}` : null;
    const { data, error, isLoading, mutate } = useSWR<{ cards: UserCard[] }>(key, fetcher, defaultSWRConfig);
    return {
        cards: data?.cards ?? [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useAllCollectionCards() {
    const { data, error, isLoading, mutate } = useSWR<{ cards: UserCard[] }>("/api/cards", fetcher, defaultSWRConfig);
    return {
        cards: data?.cards ?? [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useCardDetails(id?: string | null) {
    const key = id ? `/api/cards/${id}` : null;
    const { data, error, isLoading, mutate } = useSWR<{ card: UserCard; copies: UserCard[]; availableVariants: CardVariant[] }>(key, fetcher, defaultSWRConfig);
    return {
        card: data?.card ?? null,
        copies: data?.copies ?? [],
        availableVariants: data?.availableVariants ?? ["normal", "holo", "reverse"],
        isLoading: isLoading && !data,
        isError: error,
        mutate,
    };
}

export function useDashboardData() {
    const { data, error, isLoading, mutate } = useSWR<DashboardData>("/api/dashboard", fetcher, defaultSWRConfig);
    return {
        data: data ?? null,
        isLoading,
        isError: error,
        mutate,
    };
}
