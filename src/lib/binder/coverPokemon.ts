import { POKEMON_1025, type PokemonInfo } from "@/lib/pokemon/constants";

export const COVER_POKEMON_DEX_MIN = 1;
export const COVER_POKEMON_DEX_MAX = 1025;
export const COVER_POKEMON_PAGE_SIZE = 48;

export function parseCoverPokemonDexId(value: unknown): number | null | undefined {
    if (value === undefined) return undefined;
    if (value === null) return null;
    if (typeof value !== "number" || !Number.isInteger(value) || value < COVER_POKEMON_DEX_MIN || value > COVER_POKEMON_DEX_MAX) return undefined;
    return value;
}

export function filterCoverPokemon(query: string): PokemonInfo[] {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return POKEMON_1025;
    const dexMatch = normalized.match(/^#(\d{1,4})$/);
    if (dexMatch) {
        const dexId = Number(dexMatch[1]);
        return POKEMON_1025.filter((pokemon) => pokemon.dexId === dexId);
    }
    if (normalized.startsWith("#")) return [];
    return POKEMON_1025.filter((pokemon) => pokemon.name.toLocaleLowerCase().includes(normalized));
}

export function getCoverPokemonPage(query: string, page: number, pageSize = COVER_POKEMON_PAGE_SIZE) {
    const safePage = Math.max(1, Math.trunc(page));
    const safePageSize = Math.max(1, Math.trunc(pageSize));
    const matches = filterCoverPokemon(query);
    const pokemon = matches.slice(0, safePage * safePageSize);

    return {
        pokemon,
        hasMore: pokemon.length < matches.length,
    };
}
