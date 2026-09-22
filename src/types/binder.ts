export type CardLanguage = "pt-br" | "en" | "ja";
export type CardVariant = "normal" | "holo" | "reverse";
export type CardShineMode = "none" | "foil" | "prismatic";
export type BinderStatusFilter = "all" | "in_binder" | "stored";

export interface CardVariantsFlags {
    normal: boolean;
    holo: boolean;
    reverse: boolean;
}

export interface UserCard {
    id: string;
    user_id: string;
    pokemon_dex_id: number;
    tcgdex_card_id: string;
    card_name: string;
    card_image_url: string;
    card_set_name: string;
    card_rarity: string;
    card_language: CardLanguage;
    card_variant: CardVariant;
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
    variants?: CardVariantsFlags;
}

export interface SearchResponse {
    cards: SearchCardItem[];
    hasMore: boolean;
    totalCount: number;
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

export interface CardDetailsResponse {
    card: UserCard;
    copies: UserCard[];
    availableVariants: CardVariant[];
}

export interface UserSettings {
    user_id: string;
    theme_color: string;
    created_at?: string;
    updated_at?: string;
}
