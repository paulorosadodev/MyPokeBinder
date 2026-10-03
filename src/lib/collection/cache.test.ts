import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { applyCollectionCardMutation, isCollectionListRequestKey, isGroupedCollectionListRequestKey } from "@/lib/collection/cache";
import { groupCollectionCards } from "@/lib/collection/listCards";
import type { UserCard } from "@/types/binder";

const card: UserCard = {
    id: "card-1",
    user_id: "user-1",
    pokemon_dex_id: 25,
    tcgdex_card_id: "base1-58",
    card_name: "Pikachu",
    card_image_url: "/pokemon-card-back.png",
    card_set_name: "Base Set",
    card_rarity: "Common",
    card_language: "pt-br",
    card_variant: "normal",
    card_condition: "NM",
    is_in_binder: false,
    created_at: "2026-09-28T00:00:00.000Z",
    updated_at: "2026-09-28T00:00:00.000Z",
};

const page = {
    groups: groupCollectionCards([card]),
    total: 1,
    page: 1,
    pageSize: 36,
    hasMore: false,
};

test("seleciona a chave paginada da Coleção para revalidação após editar uma carta", () => {
    expect(isCollectionListRequestKey("/api/cards?grouped=true&page=1&limit=30&sort=recent&direction=desc")).toBe(true);
});

test("não revalida a lista pontual de cartas de um Pokémon", () => {
    expect(isCollectionListRequestKey("/api/cards?pokemon_dex_id=25")).toBe(false);
});

test("seleciona somente páginas agrupadas para a mutação local", () => {
    expect(isGroupedCollectionListRequestKey("/api/cards?grouped=true&page=1")).toBe(true);
    expect(isGroupedCollectionListRequestKey("/api/cards")).toBe(false);
});

test("atualiza imediatamente a carta editada no grupo paginado em memória", () => {
    const result = applyCollectionCardMutation("/api/cards?grouped=true&page=1&limit=36&sort=recent&direction=desc", page, {
        updatedCards: [{ ...card, card_condition: "MP" }],
    });

    expect(result.groups[0].card.card_condition).toBe("MP");
    expect(result.groups[0].copies[0].card_condition).toBe("MP");
});

test("remove a carta do snapshot quando a edição a faz sair do filtro atual", () => {
    const result = applyCollectionCardMutation("/api/cards?grouped=true&page=1&limit=36&language=pt-br&sort=recent&direction=desc", page, {
        updatedCards: [{ ...card, card_language: "en" }],
    });

    expect(result.groups).toEqual([]);
});

test("reagrupa cópias quando a edição passa a compartilhar os mesmos atributos físicos", () => {
    const otherConditionCard = { ...card, id: "card-2", card_condition: "MP" as const };
    const result = applyCollectionCardMutation("/api/cards?grouped=true&page=1&limit=36&sort=recent&direction=desc", { ...page, groups: groupCollectionCards([card, otherConditionCard]), total: 2 }, { updatedCards: [{ ...otherConditionCard, card_condition: "NM" }] });

    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].totalCount).toBe(2);
    expect(result.total).toBe(1);
});

test("adiciona uma cópia somente na página que já contém o grupo correspondente", () => {
    const newCopy = { ...card, id: "card-2" };
    const unrelatedCard = { ...card, id: "card-3", tcgdex_card_id: "base1-1", card_name: "Alakazam", pokemon_dex_id: 65 };
    const unrelatedPage = { ...page, groups: groupCollectionCards([unrelatedCard]) };
    const key = "/api/cards?grouped=true&page=1&limit=36&sort=recent&direction=desc";

    expect(applyCollectionCardMutation(key, page, { addedCards: [newCopy] }).groups[0].totalCount).toBe(2);
    expect(applyCollectionCardMutation(key, unrelatedPage, { addedCards: [newCopy] })).toBe(unrelatedPage);
});

test("sincroniza a Coleção antes da requisição de edição e não bloqueia no GET de confirmação", () => {
    const source = readFileSync(join(import.meta.dir, "../../app/cards/[id]/CardDetailClient.tsx"), "utf8");
    const handlers = [source.slice(source.indexOf("const handleChangeLanguage"), source.indexOf("const handleChangeVariant")), source.slice(source.indexOf("const handleChangeVariant"), source.indexOf("const handleChangeCondition")), source.slice(source.indexOf("const handleChangeCondition"), source.indexOf("const handleToggleBinder"))];

    for (const handler of handlers) {
        expect(handler).toContain("const rollbackCollection = syncCachedCollection");
        expect(handler.indexOf("syncCachedCollection")).toBeGreaterThan(-1);
        expect(handler.indexOf("syncCachedCollection")).toBeLessThan(handler.indexOf("await fetch"));
        expect(handler).toContain("rollbackCollection();");
        expect(handler).not.toContain("await mutate()");
        expect(handler).not.toContain("router.refresh()");
    }
});
