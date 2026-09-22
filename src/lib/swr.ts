import useSWR, { SWRConfiguration } from "swr";
import type { CardVariant, UserCard, DashboardData } from "@/types/binder";

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

export function useBinderCards(fallbackData?: { cards: UserCard[] }) {
    const { data, error, isLoading, mutate } = useSWR<{ cards: UserCard[] }>("/api/binder", fetcher, {
        ...defaultSWRConfig,
        fallbackData,
        revalidateOnMount: true,
    });
    return {
        cards: data?.cards ?? [],
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
        isLoading,
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
