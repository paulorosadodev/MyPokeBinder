import type { CardCondition } from "@/lib/pokemon/condition";

export type { CardCondition };
export type CardLanguage = "pt-br" | "en" | "ja";
export type CardVariant = "normal" | "holo" | "reverse";
export type CardShineMode = "none" | "foil" | "holo" | "prismatic";
export type CardElementType = "Colorless" | "Darkness" | "Dragon" | "Fairy" | "Fighting" | "Fire" | "Grass" | "Lightning" | "Metal" | "Psychic" | "Water";
export type BinderStatusFilter = "all" | "in_binder" | "stored";

export interface CardVariantsFlags {
    normal: boolean;
    holo: boolean;
    reverse: boolean;
}

export interface UserCard {
    id: string;
    user_id: string;
    pokemon_dex_id: number | null;
    tcgdex_card_id: string;
    card_name: string;
    card_image_url: string;
    card_set_name: string;
    card_rarity: string;
    card_types?: CardElementType[];
    card_language: CardLanguage;
    card_variant: CardVariant;
    card_artist?: string;
    card_condition?: CardCondition;
    is_in_binder: boolean;
    created_at: string;
    updated_at: string;
}

export interface SearchCardItem {
    id: string;
    localId?: string;
    name: string;
    image: string;
    setName?: string;
    rarity?: string;
    artist?: string;
    types?: CardElementType[];
    variants?: CardVariantsFlags;
    dexId?: number | null;
}

export interface SearchResponse {
    cards: SearchCardItem[];
    hasMore: boolean;
    totalCount: number;
}

export type GridType = "1x1" | "2x2" | "3x3" | "3x4";
export type SlotType = "free" | "pokemon" | "card";

export interface Binder {
    id: string;
    user_id: string;
    name: string;
    description: string;
    grid_type: GridType;
    total_pages: number;
    cover_theme: string;
    cover_pokemon_dex_id?: number | null;
    is_public: boolean;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    total_cards?: number;
    total_slots?: number;
    completion_percentage?: number;
    filled_goals?: number;
    total_goals?: number;
    preview_cards?: BinderPreviewCard[];
}

export interface BinderPreviewCard {
    id: string;
    card_name: string;
    card_image_url: string;
    slot_index?: number;
}

export interface BinderSlot {
    id: string;
    binder_id: string;
    page_number: number;
    slot_index: number;
    slot_type: SlotType;
    target_dex_id?: number | null;
    target_tcgdex_id?: string | null;
    target_card_name?: string | null;
    target_card_image_url?: string | null;
    user_card_id?: string | null;
    card?: UserCard | null;
    created_at: string;
    updated_at: string;
}

export interface BinderDetailResponse {
    binder: Binder;
    slots: BinderSlot[];
    otherBinders?: Array<Pick<Binder, "id" | "name" | "description" | "grid_type" | "cover_theme" | "cover_pokemon_dex_id">>;
}

export interface DashboardSlot {
    pokemon_dex_id: number;
    pokemon_name: string;
    is_filled: boolean;
    card_image_url?: string;
}

export interface DashboardData {
    total_in_binder: number;
    total_collection: number;
    completion_percentage: number;
    slots: DashboardSlot[];
}

export interface CollectionCardGroup {
    key: string;
    card: UserCard;
    copies: UserCard[];
    totalCount: number;
    hasInBinder: boolean;
}

export interface CardAllocation {
    slot_id: string;
    binder_id: string;
    page_number: number;
    slot_index: number;
    binder_name: string;
    binder_grid: string;
}

export interface CardDetailsResponse {
    card: UserCard;
    copies: UserCard[];
    availableVariants: CardVariant[];
    allocation?: CardAllocation | null;
}

export interface BinderCardsResponse {
    cards: UserCard[];
    availableCounts: Record<number, number>;
}

export interface UserSettings {
    user_id: string;
    theme_color: string;
    created_at?: string;
    updated_at?: string;
}
