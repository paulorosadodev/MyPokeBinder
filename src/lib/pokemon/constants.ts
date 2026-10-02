import { POKEMON_1025 } from "./pokedexData";

export type PokemonType = "grass" | "fire" | "water" | "electric" | "bug" | "normal" | "poison" | "ground" | "rock" | "fighting" | "psychic" | "ghost" | "ice" | "dragon" | "fairy" | "steel" | "dark" | "flying";

export interface PokemonGlowColors {
    ring: string;
    bright: string;
    soft: string;
}

export interface PokemonInfo {
    dexId: number;
    name: string;
    type: PokemonType;
}

export const TYPE_GLOW_COLORS: Record<PokemonType, PokemonGlowColors> = {
    grass: { ring: "#22c55e", bright: "rgba(34, 197, 94, 0.8)", soft: "rgba(34, 197, 94, 0.4)" },
    fire: { ring: "#f97316", bright: "rgba(249, 115, 22, 0.85)", soft: "rgba(249, 115, 22, 0.45)" },
    water: { ring: "#38bdf8", bright: "rgba(56, 189, 248, 0.85)", soft: "rgba(56, 189, 248, 0.45)" },
    electric: { ring: "#eab308", bright: "rgba(234, 179, 8, 0.9)", soft: "rgba(234, 179, 8, 0.45)" },
    bug: { ring: "#84cc16", bright: "rgba(132, 204, 22, 0.85)", soft: "rgba(132, 204, 22, 0.4)" },
    normal: { ring: "#e2e8f0", bright: "rgba(226, 232, 240, 0.85)", soft: "rgba(226, 232, 240, 0.4)" },
    poison: { ring: "#a855f7", bright: "rgba(168, 85, 247, 0.85)", soft: "rgba(168, 85, 247, 0.45)" },
    ground: { ring: "#d97706", bright: "rgba(217, 119, 6, 0.85)", soft: "rgba(217, 119, 6, 0.4)" },
    rock: { ring: "#b45309", bright: "rgba(180, 83, 9, 0.85)", soft: "rgba(180, 83, 9, 0.4)" },
    fighting: { ring: "#ef4444", bright: "rgba(239, 68, 68, 0.85)", soft: "rgba(239, 68, 68, 0.45)" },
    psychic: { ring: "#ec4899", bright: "rgba(236, 72, 153, 0.85)", soft: "rgba(236, 72, 153, 0.45)" },
    ghost: { ring: "#8b5cf6", bright: "rgba(139, 92, 246, 0.85)", soft: "rgba(139, 92, 246, 0.45)" },
    ice: { ring: "#06b6d4", bright: "rgba(6, 182, 212, 0.85)", soft: "rgba(6, 182, 212, 0.45)" },
    dragon: { ring: "#6366f1", bright: "rgba(99, 102, 241, 0.85)", soft: "rgba(99, 102, 241, 0.45)" },
    fairy: { ring: "#f472b6", bright: "rgba(244, 114, 182, 0.85)", soft: "rgba(244, 114, 182, 0.45)" },
    steel: { ring: "#94a3b8", bright: "rgba(148, 163, 184, 0.85)", soft: "rgba(148, 163, 184, 0.45)" },
    dark: { ring: "#64748b", bright: "rgba(100, 116, 139, 0.85)", soft: "rgba(100, 116, 139, 0.45)" },
    flying: { ring: "#cbd5e1", bright: "rgba(203, 213, 225, 0.85)", soft: "rgba(203, 213, 225, 0.4)" },
};

export { POKEMON_1025 };
export const POKEMON_151: PokemonInfo[] = POKEMON_1025.slice(0, 151);

export const POKEMON_GENERATION_RANGES = [
    { gen: 1, start: 1, end: 151 },
    { gen: 2, start: 152, end: 251 },
    { gen: 3, start: 252, end: 386 },
    { gen: 4, start: 387, end: 493 },
    { gen: 5, start: 494, end: 649 },
    { gen: 6, start: 650, end: 721 },
    { gen: 7, start: 722, end: 809 },
    { gen: 8, start: 810, end: 905 },
    { gen: 9, start: 906, end: 1025 },
] as const;

export function getPokemonGeneration(dexId: number): number | null {
    if (!Number.isInteger(dexId) || dexId < 1) {
        return null;
    }
    const range = POKEMON_GENERATION_RANGES.find((r) => dexId >= r.start && dexId <= r.end);
    return range ? range.gen : null;
}

const POKEAPI_SPRITES_VERSIONS = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions";

/** Highest-resolution PC/party icons on PokeAPI/sprites (SwSh, ~68×56px). */
function getBoxIconVersionFolder(dexId: number): string | null {
    const gen = getPokemonGeneration(dexId);
    if (gen !== null && gen >= 1 && gen <= 8) {
        return "generation-viii";
    }
    return null;
}

export function getPokemonBoxIconUrl(dexId: number): string {
    const version = getBoxIconVersionFolder(dexId);
    if (version !== null) {
        return `${POKEAPI_SPRITES_VERSIONS}/${version}/icons/${dexId}.png`;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexId}.png`;
}

/** In-game front sprite (~96×96) for compact theme-selector accents. */
export function getPokemonThemeSelectorSpriteUrl(dexId: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexId}.png`;
}

export function getPokemonSilhouetteUrl(dexId: number): string {
    const gen = getPokemonGeneration(dexId);
    if (gen !== null) {
        return `/pokemon/gen${gen}/${dexId}.png`;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexId}.png`;
}

export const POKEMON_MAP = new Map<number, PokemonInfo>(POKEMON_1025.map((p) => [p.dexId, p]));

export function getPokemonByDexId(dexId: number): PokemonInfo | undefined {
    return POKEMON_MAP.get(dexId);
}

export function getPokemonGlowColors(dexId: number): PokemonGlowColors {
    const pokemon = getPokemonByDexId(dexId);
    if (!pokemon) {
        return {
            ring: "rgb(251, 191, 36)",
            bright: "rgba(251, 191, 36, 0.8)",
            soft: "rgba(251, 191, 36, 0.4)",
        };
    }
    return (
        TYPE_GLOW_COLORS[pokemon.type] || {
            ring: "rgb(251, 191, 36)",
            bright: "rgba(251, 191, 36, 0.8)",
            soft: "rgba(251, 191, 36, 0.4)",
        }
    );
}

export function getSpreadForDexId(dexId: number): number {
    return Math.floor((dexId - 1) / 18) + 1;
}

export function getMobilePageForDexId(dexId: number): number {
    return Math.floor((dexId - 1) / 9) + 1;
}

export const TOTAL_PAGES = 17;
export const SLOTS_PER_PAGE = 9;

export type BinderSheetKind = "front-cover" | "endpaper" | "catalog" | "blank-slots" | "back-cover";

export interface BinderSheetSpec {
    kind: BinderSheetKind;
    pageNum?: number;
}

/**
 * Sequência física fixa, independente da quantidade de páginas de catálogo:
 * capa, contracapa, páginas, contracapa, capa traseira.
 * O StPageFlip só isola a capa traseira quando o total de folhas é par, então um
 * catálogo ímpar ganha o verso em branco da última folha — grade de slots vazios,
 * nunca uma segunda contracapa.
 */
export function getBinderSheetPlan(catalogPageCount = TOTAL_PAGES): BinderSheetSpec[] {
    const sheets: BinderSheetSpec[] = [{ kind: "front-cover" }, { kind: "endpaper" }];
    for (let pageNum = 1; pageNum <= catalogPageCount; pageNum++) {
        sheets.push({ kind: "catalog", pageNum });
    }
    if (catalogPageCount % 2 !== 0) {
        sheets.push({ kind: "blank-slots" });
    }
    sheets.push({ kind: "endpaper" }, { kind: "back-cover" });
    return sheets;
}

export const BINDER_HAS_TRAILING_BLANK = TOTAL_PAGES % 2 !== 0;
export const BINDER_PHYSICAL_FRONT_COVER = 0;
export const BINDER_PHYSICAL_INSIDE_FRONT = 1;
export const BINDER_PHYSICAL_FIRST_PAGE = 2;
export const BINDER_PHYSICAL_TRAILING_BLANK = BINDER_PHYSICAL_FIRST_PAGE + TOTAL_PAGES;
export const BINDER_PHYSICAL_INSIDE_BACK = BINDER_PHYSICAL_TRAILING_BLANK + (BINDER_HAS_TRAILING_BLANK ? 1 : 0);
export const BINDER_PHYSICAL_BACK_COVER = BINDER_PHYSICAL_INSIDE_BACK + 1;
export const BINDER_SHEET_COUNT = BINDER_PHYSICAL_BACK_COVER + 1;

// Páginas de catálogo vão de 1 a TOTAL_PAGES; 0 é o álbum fechado na capa, a penúltima é o
// spread final (verso em branco + contracapa) e a última é o álbum fechado na capa traseira.
export const BINDER_LAST_SPREAD_PAGE = TOTAL_PAGES + 1;
export const BINDER_CLOSED_BACK_PAGE = TOTAL_PAGES + 2;

export function getPageForDexId(dexId: number): number {
    return Math.min(Math.max(1, Math.floor((dexId - 1) / 9) + 1), TOTAL_PAGES);
}

export function getDesktopSpreadPages(page: number): [number, number | null] {
    const clamped = Math.min(Math.max(1, page), TOTAL_PAGES);
    if (clamped === 1) {
        return [1, null];
    }
    const leftPage = clamped % 2 === 0 ? clamped : clamped - 1;
    const rightPage = leftPage + 1 <= TOTAL_PAGES ? leftPage + 1 : null;
    return [leftPage, rightPage];
}

export const loadedSilhouetteCache = new Set<number>();

export function markSilhouetteLoaded(dexId: number): void {
    if (typeof window !== "undefined" || process.env.NODE_ENV === "test") {
        loadedSilhouetteCache.add(dexId);
    }
}

export function isSilhouetteLoaded(dexId: number): boolean {
    if (typeof window === "undefined" && process.env.NODE_ENV !== "test") {
        return false;
    }
    return loadedSilhouetteCache.has(dexId);
}

export function isElementFullyVisibleInViewport(element: Element): boolean {
    if (typeof window === "undefined") {
        return false;
    }
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= viewportHeight && rect.right <= viewportWidth;
}

export function getSpreadLeftIndex(physical: number): number {
    if (physical <= 0) return 0;
    if (physical >= BINDER_PHYSICAL_BACK_COVER) return BINDER_PHYSICAL_BACK_COVER;
    return physical % 2 === 1 ? physical : physical - 1;
}

export function catalogPageToPhysicalIndex(page: number, isPortrait = false): number {
    if (page <= 0) return BINDER_PHYSICAL_FRONT_COVER;
    if (page >= BINDER_CLOSED_BACK_PAGE) return BINDER_PHYSICAL_BACK_COVER;
    if (page === BINDER_LAST_SPREAD_PAGE) return BINDER_HAS_TRAILING_BLANK ? BINDER_PHYSICAL_TRAILING_BLANK : BINDER_PHYSICAL_INSIDE_BACK;

    const physical = BINDER_PHYSICAL_FIRST_PAGE + page - 1;
    if (isPortrait || page === 1) return physical;
    return getSpreadLeftIndex(physical);
}

export function physicalIndexToCatalogPage(physicalIndex: number, isPortrait = false): number {
    if (physicalIndex >= BINDER_PHYSICAL_BACK_COVER) return BINDER_CLOSED_BACK_PAGE;

    if (physicalIndex <= BINDER_PHYSICAL_FRONT_COVER) return 0;

    if (isPortrait) {
        // A contracapa frontal pertence à página 1, como no spread em paisagem, para que as setas
        // continuem levando de volta à capa.
        if (physicalIndex === BINDER_PHYSICAL_INSIDE_FRONT) return 1;
        if (physicalIndex >= BINDER_PHYSICAL_TRAILING_BLANK) return BINDER_LAST_SPREAD_PAGE;
        return physicalIndex - BINDER_PHYSICAL_FIRST_PAGE + 1;
    }

    const spreadLeft = getSpreadLeftIndex(physicalIndex);
    if (spreadLeft === BINDER_PHYSICAL_INSIDE_FRONT) return 1;
    if (spreadLeft >= BINDER_PHYSICAL_TRAILING_BLANK) return BINDER_LAST_SPREAD_PAGE;
    return spreadLeft - 1;
}

export const OFFICIAL_THEME_COLORS = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"] as const;

export type OfficialThemeColor = (typeof OFFICIAL_THEME_COLORS)[number];

export function isOfficialThemeColor(color: string): color is OfficialThemeColor {
    return OFFICIAL_THEME_COLORS.includes(color.toLowerCase() as OfficialThemeColor);
}
