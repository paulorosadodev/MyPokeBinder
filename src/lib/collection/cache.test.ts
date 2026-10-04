import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { applyCollectionCardMutation, collectionInfiniteFirstPageKey, collectionPageKey, isCollectionListRequestKey, isGroupedCollectionInfiniteKey, isGroupedCollectionListRequestKey, planCollectionCachePatches, type CollectionCachedPage } from "@/lib/collection/cache";
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
    const source = readFileSync(join(import.meta.dir, "../../app/cartas/[id]/CardDetailClient.tsx"), "utf8");
    const handlers = [source.slice(source.indexOf("const handleChangeLanguage"), source.indexOf("const handleChangeVariant")), source.slice(source.indexOf("const handleChangeVariant"), source.indexOf("const handleChangeCondition")), source.slice(source.indexOf("const handleChangeCondition"), source.indexOf("const handleRemoveFromBinder"))];

    for (const handler of handlers) {
        expect(handler).toContain("const rollbackCollection = syncCachedCollection");
        expect(handler.indexOf("syncCachedCollection")).toBeGreaterThan(-1);
        expect(handler.indexOf("syncCachedCollection")).toBeLessThan(handler.indexOf("await fetch"));
        expect(handler).toContain("rollbackCollection();");
        expect(handler).not.toContain("await mutate()");
        expect(handler).not.toContain("router.refresh()");
    }
});

const firstPageKey = "/api/cards?grouped=true&page=1&limit=36&sort=recent&direction=desc";
const secondPageKey = "/api/cards?grouped=true&page=2&limit=36&sort=recent&direction=desc";
const infiniteKey = `$inf$${firstPageKey}`;

const secondPageCard: UserCard = { ...card, id: "card-2", tcgdex_card_id: "base1-1", card_name: "Alakazam", pokemon_dex_id: 65 };
const secondPage: CollectionCachedPage = { ...page, groups: groupCollectionCards([secondPageCard]) };

function buildCache(entries: Record<string, unknown>) {
    const cache = new Map<string, { data?: unknown }>(Object.entries(entries).map(([key, data]) => [key, { data }]));
    return {
        keys: () => cache.keys(),
        read: (key: string) => cache.get(key),
        cache,
    };
}

function applyPatches(source: ReturnType<typeof buildCache>, patches: ReturnType<typeof planCollectionCachePatches>) {
    for (const patch of patches) source.cache.set(patch.key, { data: patch.data });
    return patches;
}

test("reconhece a chave agregada do useSWRInfinite da Coleção", () => {
    expect(isGroupedCollectionInfiniteKey(infiniteKey)).toBe(true);
    expect(isGroupedCollectionInfiniteKey("$inf$/api/binder")).toBe(false);
    expect(isGroupedCollectionInfiniteKey(firstPageKey)).toBe(false);
    expect(collectionInfiniteFirstPageKey(infiniteKey)).toBe(firstPageKey);
});

test("mantém a ordem da query ao derivar a chave de cada página", () => {
    expect(collectionPageKey(firstPageKey, 1)).toBe(secondPageKey);
    expect(collectionPageKey(firstPageKey, 0)).toBe(firstPageKey);
});

test("atualiza a lista renderizada do useSWRInfinite, não apenas as páginas isoladas", () => {
    const source = buildCache({
        [firstPageKey]: page,
        [secondPageKey]: secondPage,
        [infiniteKey]: [page, secondPage],
    });

    const patches = applyPatches(source, planCollectionCachePatches(source.keys(), source.read, { updatedCards: [{ ...card, card_condition: "MP" }] }));

    const infinitePatch = patches.find((patch) => patch.key === infiniteKey);
    expect(infinitePatch).toBeDefined();

    const patchedPages = infinitePatch!.data as CollectionCachedPage[];
    expect(patchedPages[0].groups[0].card.card_condition).toBe("MP");
    expect(patchedPages[1].groups[0].card.card_name).toBe("Alakazam");
    expect((source.cache.get(firstPageKey)!.data as CollectionCachedPage).groups[0].card.card_condition).toBe("MP");
});

test("não escreve a chave agregada quando a edição não afeta nenhuma página carregada", () => {
    const source = buildCache({
        [firstPageKey]: page,
        [infiniteKey]: [page],
    });

    const patches = planCollectionCachePatches(source.keys(), source.read, { updatedCards: [{ ...secondPageCard, card_condition: "MP" }] });

    expect(patches).toEqual([]);
    expect(source.cache.get(infiniteKey)!.data).toEqual([page]);
});

test("reaplica os filtros da página ao reagrupar a lista agregada", () => {
    const filteredPageKey = "/api/cards?grouped=true&page=1&limit=36&language=pt-br&sort=recent&direction=asc";
    const filteredInfiniteKey = `$inf$${filteredPageKey}`;
    const source = buildCache({
        [filteredPageKey]: page,
        [filteredInfiniteKey]: [page],
    });

    const patches = applyPatches(source, planCollectionCachePatches(source.keys(), source.read, { updatedCards: [{ ...card, card_language: "en" }] }));
    const patchedPages = patches.find((patch) => patch.key === filteredInfiniteKey)!.data as CollectionCachedPage[];

    expect(patchedPages[0].groups).toEqual([]);
});
