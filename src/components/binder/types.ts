import type { UserCard } from "@/types/binder";

export interface BinderNavigationHandle {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
    getCurrentPageIndex: () => number;
    isBusy: () => boolean;
}

export interface BinderViewProps {
    currentPage: number;
    cardsMap: Map<number, UserCard>;
    availableCounts?: Record<number, number>;
    highlightedDexId?: number | null;
    droppingDexId?: number | null;
    isMobile?: boolean;
    imagePages?: readonly number[];
    priorityPages?: readonly number[];
    readyToOpen?: boolean;
    skipOpeningAnimation?: boolean;
    onEngineReady?: () => void;
    onPageChange: (page: number) => void;
    onSlotClick: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onSwapClick?: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onReady?: () => void;
}
