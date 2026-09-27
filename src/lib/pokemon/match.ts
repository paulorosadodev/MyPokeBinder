import { getPokemonByDexId } from "./constants";

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isCardMatchingPokemon(cardName: string | undefined | null, dexId: number): boolean {
    if (!cardName || typeof cardName !== "string") {
        return false;
    }

    const trimmed = cardName.trim();
    if (!trimmed) {
        return false;
    }

    if (dexId === 151) {
        const withoutMewtwo = trimmed.replace(/mewtwo/gi, " ");
        return /\bmew\b/i.test(withoutMewtwo);
    }

    if (dexId === 150) {
        return /\bmewtwo\b/i.test(trimmed);
    }

    if (dexId === 16) {
        return /\bpidgey\b/i.test(trimmed);
    }

    if (dexId === 17) {
        return /\bpidgeotto\b/i.test(trimmed);
    }

    if (dexId === 18) {
        const withoutPidgeotto = trimmed.replace(/pidgeotto/gi, " ");
        return /\bpidgeot\b/i.test(withoutPidgeotto);
    }

    if (dexId === 79) {
        return /\bslowpoke\b/i.test(trimmed);
    }

    if (dexId === 80) {
        return /\bslowbro\b/i.test(trimmed);
    }

    if (dexId === 29) {
        if (/nidorino|nidoking|nidorina|nidoqueen/i.test(trimmed)) {
            return false;
        }
        if (/[♂]|male\b/i.test(trimmed)) {
            return false;
        }
        return /nidoran/i.test(trimmed);
    }

    if (dexId === 32) {
        if (/nidorina|nidoqueen|nidorino|nidoking/i.test(trimmed)) {
            return false;
        }
        if (/[♀]|female\b/i.test(trimmed)) {
            return false;
        }
        return /nidoran/i.test(trimmed);
    }

    const pokemon = getPokemonByDexId(dexId);
    if (!pokemon) {
        return true;
    }

    const cleanBaseName = pokemon.name.toLowerCase().replace(/[♀♂]/g, "").trim();

    if (cleanBaseName.includes("'")) {
        const stripped = cleanBaseName.replace(/'/g, "");
        const cardStripped = trimmed.toLowerCase().replace(/'/g, "");
        return cardStripped.includes(stripped);
    }

    if (cleanBaseName.includes(".")) {
        const stripped = cleanBaseName.replace(/\./g, "");
        const cardStripped = trimmed.toLowerCase().replace(/\./g, "");
        return cardStripped.includes(stripped);
    }

    const regex = new RegExp(`\\b${escapeRegExp(cleanBaseName)}\\b`, "i");
    return regex.test(trimmed);
}
