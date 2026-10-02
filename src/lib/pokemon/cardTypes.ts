import { getPokemonByDexId, type PokemonType } from "@/lib/pokemon/constants";
import type { CardElementType } from "@/types/binder";

export const CARD_ELEMENT_TYPES: readonly CardElementType[] = ["Colorless", "Darkness", "Dragon", "Fairy", "Fighting", "Fire", "Grass", "Lightning", "Metal", "Psychic", "Water"];

export const CARD_ELEMENT_LABELS: Record<CardElementType, string> = {
    Colorless: "Incolor",
    Darkness: "Noturno",
    Dragon: "Dragão",
    Fairy: "Fada",
    Fighting: "Lutador",
    Fire: "Fogo",
    Grass: "Grama",
    Lightning: "Elétrico",
    Metal: "Metal",
    Psychic: "Psíquico",
    Water: "Água",
};

const CARD_ELEMENT_TYPE_SET = new Set<string>(CARD_ELEMENT_TYPES);

const TYPE_ALIASES: Record<string, CardElementType> = {
    colorless: "Colorless",
    normal: "Colorless",
    dark: "Darkness",
    darkness: "Darkness",
    dragon: "Dragon",
    fairy: "Fairy",
    fighting: "Fighting",
    fire: "Fire",
    grass: "Grass",
    electric: "Lightning",
    lightning: "Lightning",
    metal: "Metal",
    steel: "Metal",
    psychic: "Psychic",
    water: "Water",
};

const POKEMON_TYPE_FALLBACK: Record<PokemonType, CardElementType> = {
    grass: "Grass",
    fire: "Fire",
    water: "Water",
    electric: "Lightning",
    bug: "Grass",
    normal: "Colorless",
    poison: "Psychic",
    ground: "Fighting",
    rock: "Fighting",
    fighting: "Fighting",
    psychic: "Psychic",
    ghost: "Psychic",
    ice: "Water",
    dragon: "Dragon",
    fairy: "Fairy",
    steel: "Metal",
    dark: "Darkness",
    flying: "Colorless",
};

export function isCardElementType(value: unknown): value is CardElementType {
    return typeof value === "string" && CARD_ELEMENT_TYPE_SET.has(value);
}

export function normalizeCardElementTypes(value: unknown): CardElementType[] {
    if (!Array.isArray(value)) return [];

    const normalized: CardElementType[] = [];
    for (const item of value) {
        if (typeof item !== "string") continue;
        const type = TYPE_ALIASES[item.trim().toLowerCase()];
        if (type && !normalized.includes(type)) normalized.push(type);
        if (normalized.length === 2) break;
    }
    return normalized;
}

export function isValidCardElementTypes(value: unknown): value is CardElementType[] {
    return Array.isArray(value) && value.length <= 2 && value.every(isCardElementType) && new Set(value).size === value.length;
}

export function resolveCardElementTypes(value: unknown, pokemonDexId?: number | null): CardElementType[] {
    const normalized = normalizeCardElementTypes(value);
    if (normalized.length > 0) return normalized;
    if (!pokemonDexId) return ["Colorless"];

    const pokemon = getPokemonByDexId(pokemonDexId);
    return pokemon ? [POKEMON_TYPE_FALLBACK[pokemon.type]] : ["Colorless"];
}
