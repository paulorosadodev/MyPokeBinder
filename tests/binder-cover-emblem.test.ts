import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { filterCoverPokemon, getCoverPokemonPage, parseCoverPokemonDexId } from "../src/lib/binder/coverPokemon";
import { enrichBindersForShelf } from "../src/lib/binder/shelfData";
import type { Binder } from "../src/types/binder";

const binder: Binder = {
    id: "binder-1",
    user_id: "user-1",
    name: "Kanto",
    description: "",
    grid_type: "3x3",
    total_pages: 3,
    cover_theme: "classic_red",
    is_public: false,
    is_featured: false,
    created_at: "",
    updated_at: "",
};

describe("Pokémon da capa", () => {
    it("aceita apenas a Pokédex Nacional inteira ou ausência de Pokémon da capa", () => {
        expect(parseCoverPokemonDexId(null)).toBeNull();
        expect(parseCoverPokemonDexId(1)).toBe(1);
        expect(parseCoverPokemonDexId(1025)).toBe(1025);
        expect(parseCoverPokemonDexId(0)).toBeUndefined();
        expect(parseCoverPokemonDexId(1026)).toBeUndefined();
        expect(parseCoverPokemonDexId(25.5)).toBeUndefined();
        expect(parseCoverPokemonDexId("25")).toBeUndefined();
    });

    it("busca um número de Pokédex somente quando o prefixo # é usado", () => {
        expect(filterCoverPokemon("#25").map((pokemon) => pokemon.dexId)).toEqual([25]);
        expect(filterCoverPokemon("25")).toEqual([]);
        expect(filterCoverPokemon("Pikachu").map((pokemon) => pokemon.dexId)).toContain(25);
    });

    it("pagina toda a Pokédex para rolagem contínua", () => {
        const firstPage = getCoverPokemonPage("", 1, 48);
        const secondPage = getCoverPokemonPage("", 2, 48);
        const finalPage = getCoverPokemonPage("", 22, 48);

        expect(firstPage.pokemon).toHaveLength(48);
        expect(firstPage.pokemon[0]?.dexId).toBe(1);
        expect(firstPage.hasMore).toBe(true);
        expect(secondPage.pokemon).toHaveLength(96);
        expect(secondPage.pokemon[0]?.dexId).toBe(1);
        expect(secondPage.pokemon[48]?.dexId).toBe(49);
        expect(finalPage.pokemon).toHaveLength(1025);
        expect(finalPage.hasMore).toBe(false);
    });
});

describe("Prévia da Estante", () => {
    it("usa até três cartas ordenadas da primeira Página preenchida", () => {
        const enriched = enrichBindersForShelf(
            [binder],
            [
                { binder_id: binder.id, page_number: 2, slot_index: 2, slot_type: "free", user_card_id: "card-2" },
                { binder_id: binder.id, page_number: 1, slot_index: 3, slot_type: "free", user_card_id: "card-3" },
                { binder_id: binder.id, page_number: 1, slot_index: 1, slot_type: "free", user_card_id: "card-1" },
                { binder_id: binder.id, page_number: 1, slot_index: 2, slot_type: "free", user_card_id: "card-2" },
                { binder_id: binder.id, page_number: 1, slot_index: 4, slot_type: "free", user_card_id: "card-4" },
            ],
            [
                { id: "card-1", card_name: "Bulbasaur", card_image_url: "/1.png" },
                { id: "card-2", card_name: "Ivysaur", card_image_url: "/2.png" },
                { id: "card-3", card_name: "Venusaur", card_image_url: "/3.png" },
                { id: "card-4", card_name: "Charmander", card_image_url: "/4.png" },
            ],
        );

        expect(enriched[0].preview_cards?.map((card) => card.id)).toEqual(["card-1", "card-2", "card-3"]);
    });

    it("não cria prévia quando o Binder não possui cartas", () => {
        const enriched = enrichBindersForShelf([binder], [{ binder_id: binder.id, page_number: 1, slot_index: 1, slot_type: "free", user_card_id: null }], []);

        expect(enriched[0].preview_cards).toEqual([]);
    });
});

describe("Acabamento da capa", () => {
    it("preserva a capa proporcional nas prévias e reserva o preenchimento vertical para o binder físico", () => {
        const coverSource = readFileSync(join(import.meta.dir, "../src/components/binder/BinderCoverArt.tsx"), "utf8");
        const bookSource = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderBook.tsx"), "utf8");

        expect(coverSource).toContain("aspect-[480/676]");
        expect(coverSource).not.toContain("aspect-[480/676] h-full");
        expect(bookSource).toContain('back={back} className="h-full"');
    });

    it("amplia a arte central sem usar deslocamento nos hovers do seletor", () => {
        const coverSource = readFileSync(join(import.meta.dir, "../src/components/binder/BinderCoverArt.tsx"), "utf8");
        const selectorSource = readFileSync(join(import.meta.dir, "../src/components/binder/CoverPokemonSelector.tsx"), "utf8");

        expect(coverSource).toContain("w-[48%]");
        expect(coverSource).toContain("h-[92%] w-[92%]");
        expect(selectorSource).toContain("hover:bg-[var(--theme-primary-hover)]");
        expect(selectorSource).not.toContain("hover:-translate");
        expect(selectorSource).not.toContain("group-hover:scale");
    });

    it("atualiza a estante no cache antes de retornar à navegação do binder", () => {
        const editSource = readFileSync(join(import.meta.dir, "../src/app/binders/[id]/edit/BinderEditClient.tsx"), "utf8");

        expect(editSource).toContain('void mutateCache("/api/binders");');
        expect(editSource.indexOf('void mutateCache("/api/binders");')).toBeLessThan(editSource.indexOf('router.push(isFromShelf ? "/" : `/binders/${binder.id}?opened=1`)'));
    });
});
