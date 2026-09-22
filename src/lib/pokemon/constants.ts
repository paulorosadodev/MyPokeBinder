export type PokemonType = "grass" | "fire" | "water" | "electric" | "bug" | "normal" | "poison" | "ground" | "rock" | "fighting" | "psychic" | "ghost" | "ice" | "dragon" | "fairy";

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
};

export const POKEMON_151: PokemonInfo[] = [
    { dexId: 1, name: "Bulbasaur", type: "grass" },
    { dexId: 2, name: "Ivysaur", type: "grass" },
    { dexId: 3, name: "Venusaur", type: "grass" },
    { dexId: 4, name: "Charmander", type: "fire" },
    { dexId: 5, name: "Charmeleon", type: "fire" },
    { dexId: 6, name: "Charizard", type: "fire" },
    { dexId: 7, name: "Squirtle", type: "water" },
    { dexId: 8, name: "Wartortle", type: "water" },
    { dexId: 9, name: "Blastoise", type: "water" },
    { dexId: 10, name: "Caterpie", type: "bug" },
    { dexId: 11, name: "Metapod", type: "bug" },
    { dexId: 12, name: "Butterfree", type: "bug" },
    { dexId: 13, name: "Weedle", type: "bug" },
    { dexId: 14, name: "Kakuna", type: "bug" },
    { dexId: 15, name: "Beedrill", type: "bug" },
    { dexId: 16, name: "Pidgey", type: "normal" },
    { dexId: 17, name: "Pidgeotto", type: "normal" },
    { dexId: 18, name: "Pidgeot", type: "normal" },
    { dexId: 19, name: "Rattata", type: "normal" },
    { dexId: 20, name: "Raticate", type: "normal" },
    { dexId: 21, name: "Spearow", type: "normal" },
    { dexId: 22, name: "Fearow", type: "normal" },
    { dexId: 23, name: "Ekans", type: "poison" },
    { dexId: 24, name: "Arbok", type: "poison" },
    { dexId: 25, name: "Pikachu", type: "electric" },
    { dexId: 26, name: "Raichu", type: "electric" },
    { dexId: 27, name: "Sandshrew", type: "ground" },
    { dexId: 28, name: "Sandslash", type: "ground" },
    { dexId: 29, name: "Nidoran♀", type: "poison" },
    { dexId: 30, name: "Nidorina", type: "poison" },
    { dexId: 31, name: "Nidoqueen", type: "poison" },
    { dexId: 32, name: "Nidoran♂", type: "poison" },
    { dexId: 33, name: "Nidorino", type: "poison" },
    { dexId: 34, name: "Nidoking", type: "poison" },
    { dexId: 35, name: "Clefairy", type: "fairy" },
    { dexId: 36, name: "Clefable", type: "fairy" },
    { dexId: 37, name: "Vulpix", type: "fire" },
    { dexId: 38, name: "Ninetales", type: "fire" },
    { dexId: 39, name: "Jigglypuff", type: "normal" },
    { dexId: 40, name: "Wigglytuff", type: "normal" },
    { dexId: 41, name: "Zubat", type: "poison" },
    { dexId: 42, name: "Golbat", type: "poison" },
    { dexId: 43, name: "Oddish", type: "grass" },
    { dexId: 44, name: "Gloom", type: "grass" },
    { dexId: 45, name: "Vileplume", type: "grass" },
    { dexId: 46, name: "Paras", type: "bug" },
    { dexId: 47, name: "Parasect", type: "bug" },
    { dexId: 48, name: "Venonat", type: "bug" },
    { dexId: 49, name: "Venomoth", type: "bug" },
    { dexId: 50, name: "Diglett", type: "ground" },
    { dexId: 51, name: "Dugtrio", type: "ground" },
    { dexId: 52, name: "Meowth", type: "normal" },
    { dexId: 53, name: "Persian", type: "normal" },
    { dexId: 54, name: "Psyduck", type: "water" },
    { dexId: 55, name: "Golduck", type: "water" },
    { dexId: 56, name: "Mankey", type: "fighting" },
    { dexId: 57, name: "Primeape", type: "fighting" },
    { dexId: 58, name: "Growlithe", type: "fire" },
    { dexId: 59, name: "Arcanine", type: "fire" },
    { dexId: 60, name: "Poliwag", type: "water" },
    { dexId: 61, name: "Poliwhirl", type: "water" },
    { dexId: 62, name: "Poliwrath", type: "water" },
    { dexId: 63, name: "Abra", type: "psychic" },
    { dexId: 64, name: "Kadabra", type: "psychic" },
    { dexId: 65, name: "Alakazam", type: "psychic" },
    { dexId: 66, name: "Machop", type: "fighting" },
    { dexId: 67, name: "Machoke", type: "fighting" },
    { dexId: 68, name: "Machamp", type: "fighting" },
    { dexId: 69, name: "Bellsprout", type: "grass" },
    { dexId: 70, name: "Weepinbell", type: "grass" },
    { dexId: 71, name: "Victreebel", type: "grass" },
    { dexId: 72, name: "Tentacool", type: "water" },
    { dexId: 73, name: "Tentacruel", type: "water" },
    { dexId: 74, name: "Geodude", type: "rock" },
    { dexId: 75, name: "Graveler", type: "rock" },
    { dexId: 76, name: "Golem", type: "rock" },
    { dexId: 77, name: "Ponyta", type: "fire" },
    { dexId: 78, name: "Rapidash", type: "fire" },
    { dexId: 79, name: "Slowpoke", type: "water" },
    { dexId: 80, name: "Slowbro", type: "water" },
    { dexId: 81, name: "Magnemite", type: "electric" },
    { dexId: 82, name: "Magneton", type: "electric" },
    { dexId: 83, name: "Farfetch'd", type: "normal" },
    { dexId: 84, name: "Doduo", type: "normal" },
    { dexId: 85, name: "Dodrio", type: "normal" },
    { dexId: 86, name: "Seel", type: "water" },
    { dexId: 87, name: "Dewgong", type: "water" },
    { dexId: 88, name: "Grimer", type: "poison" },
    { dexId: 89, name: "Muk", type: "poison" },
    { dexId: 90, name: "Shellder", type: "water" },
    { dexId: 91, name: "Cloyster", type: "water" },
    { dexId: 92, name: "Gastly", type: "ghost" },
    { dexId: 93, name: "Haunter", type: "ghost" },
    { dexId: 94, name: "Gengar", type: "ghost" },
    { dexId: 95, name: "Onix", type: "rock" },
    { dexId: 96, name: "Drowzee", type: "psychic" },
    { dexId: 97, name: "Hypno", type: "psychic" },
    { dexId: 98, name: "Krabby", type: "water" },
    { dexId: 99, name: "Kingler", type: "water" },
    { dexId: 100, name: "Voltorb", type: "electric" },
    { dexId: 101, name: "Electrode", type: "electric" },
    { dexId: 102, name: "Exeggcute", type: "grass" },
    { dexId: 103, name: "Exeggutor", type: "grass" },
    { dexId: 104, name: "Cubone", type: "ground" },
    { dexId: 105, name: "Marowak", type: "ground" },
    { dexId: 106, name: "Hitmonlee", type: "fighting" },
    { dexId: 107, name: "Hitmonchan", type: "fighting" },
    { dexId: 108, name: "Lickitung", type: "normal" },
    { dexId: 109, name: "Koffing", type: "poison" },
    { dexId: 110, name: "Weezing", type: "poison" },
    { dexId: 111, name: "Rhyhorn", type: "ground" },
    { dexId: 112, name: "Rhydon", type: "ground" },
    { dexId: 113, name: "Chansey", type: "normal" },
    { dexId: 114, name: "Tangela", type: "grass" },
    { dexId: 115, name: "Kangaskhan", type: "normal" },
    { dexId: 116, name: "Horsea", type: "water" },
    { dexId: 117, name: "Seadra", type: "water" },
    { dexId: 118, name: "Goldeen", type: "water" },
    { dexId: 119, name: "Seaking", type: "water" },
    { dexId: 120, name: "Staryu", type: "water" },
    { dexId: 121, name: "Starmie", type: "water" },
    { dexId: 122, name: "Mr. Mime", type: "psychic" },
    { dexId: 123, name: "Scyther", type: "bug" },
    { dexId: 124, name: "Jynx", type: "ice" },
    { dexId: 125, name: "Electabuzz", type: "electric" },
    { dexId: 126, name: "Magmar", type: "fire" },
    { dexId: 127, name: "Pinsir", type: "bug" },
    { dexId: 128, name: "Tauros", type: "normal" },
    { dexId: 129, name: "Magikarp", type: "water" },
    { dexId: 130, name: "Gyarados", type: "water" },
    { dexId: 131, name: "Lapras", type: "water" },
    { dexId: 132, name: "Ditto", type: "normal" },
    { dexId: 133, name: "Eevee", type: "normal" },
    { dexId: 134, name: "Vaporeon", type: "water" },
    { dexId: 135, name: "Jolteon", type: "electric" },
    { dexId: 136, name: "Flareon", type: "fire" },
    { dexId: 137, name: "Porygon", type: "normal" },
    { dexId: 138, name: "Omanyte", type: "rock" },
    { dexId: 139, name: "Omastar", type: "rock" },
    { dexId: 140, name: "Kabuto", type: "rock" },
    { dexId: 141, name: "Kabutops", type: "rock" },
    { dexId: 142, name: "Aerodactyl", type: "rock" },
    { dexId: 143, name: "Snorlax", type: "normal" },
    { dexId: 144, name: "Articuno", type: "ice" },
    { dexId: 145, name: "Zapdos", type: "electric" },
    { dexId: 146, name: "Moltres", type: "fire" },
    { dexId: 147, name: "Dratini", type: "dragon" },
    { dexId: 148, name: "Dragonair", type: "dragon" },
    { dexId: 149, name: "Dragonite", type: "dragon" },
    { dexId: 150, name: "Mewtwo", type: "psychic" },
    { dexId: 151, name: "Mew", type: "psychic" },
];

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

const POKEAPI_SPRITES_VERSIONS =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions";

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

export function getPokemonByDexId(dexId: number): PokemonInfo | undefined {
    return POKEMON_151.find((p) => p.dexId === dexId);
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
