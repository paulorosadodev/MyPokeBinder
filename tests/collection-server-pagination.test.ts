import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { GET as getCards } from "../src/app/api/cards/route";
import { GET as getExpansions } from "../src/app/api/cards/expansions/route";
import { GET as getPublicCollection } from "../src/app/api/profile/[username]/collection/route";
import { GET as getPublicExpansions } from "../src/app/api/profile/[username]/expansions/route";
import { buildExpansionFilterOptions, ALL_EXPANSIONS_FILTER, COLLECTION_PAGE_SIZE } from "../src/lib/collection/listCards";

describe("Collection Server-Side Pagination and Validation", () => {
    it("should reject unauthenticated request for grouped collection cards", async () => {
        const req = new NextRequest("http://localhost:3000/api/cards?grouped=true");
        const res = await getCards(req);
        expect(res.status).toBe(401);
    });

    it("should reject unauthenticated request for expansions", async () => {
        const req = new NextRequest("http://localhost:3000/api/cards/expansions");
        const res = await getExpansions(req);
        expect(res.status).toBe(401);
    });

    it("should reject negative or zero page parameter", async () => {
        const reqZero = new NextRequest("http://localhost:3000/api/cards?grouped=true&page=0", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resZero = await getCards(reqZero);
        expect(resZero.status).toBe(400);

        const reqNeg = new NextRequest("http://localhost:3000/api/cards?grouped=true&page=-1", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resNeg = await getCards(reqNeg);
        expect(resNeg.status).toBe(400);
    });

    it("should reject limit exceeding maximum limit 100 or less than 1", async () => {
        const reqHigh = new NextRequest("http://localhost:3000/api/cards?grouped=true&limit=101", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resHigh = await getCards(reqHigh);
        expect(resHigh.status).toBe(400);

        const reqLow = new NextRequest("http://localhost:3000/api/cards?grouped=true&limit=0", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resLow = await getCards(reqLow);
        expect(resLow.status).toBe(400);
    });

    it("should reject invalid status, language, sort or direction whitelists", async () => {
        const badStatus = new NextRequest("http://localhost:3000/api/cards?grouped=true&status=deleted", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        expect((await getCards(badStatus)).status).toBe(400);

        const badLang = new NextRequest("http://localhost:3000/api/cards?grouped=true&language=fr", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        expect((await getCards(badLang)).status).toBe(400);

        const badSort = new NextRequest("http://localhost:3000/api/cards?grouped=true&sort=price", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        expect((await getCards(badSort)).status).toBe(400);

        const badDir = new NextRequest("http://localhost:3000/api/cards?grouped=true&direction=up", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        expect((await getCards(badDir)).status).toBe(400);
    });

    it("should reject query strings exceeding max lengths", async () => {
        const longSearch = new NextRequest(`http://localhost:3000/api/cards?grouped=true&search=${"x".repeat(101)}`, {
            headers: { "x-test-user-id": "test-user-id" },
        });
        expect((await getCards(longSearch)).status).toBe(400);

        const longRarity = new NextRequest(`http://localhost:3000/api/cards?grouped=true&rarity=${"x".repeat(51)}`, {
            headers: { "x-test-user-id": "test-user-id" },
        });
        expect((await getCards(longRarity)).status).toBe(400);

        const longExpansion = new NextRequest(`http://localhost:3000/api/cards?grouped=true&expansion=${"x".repeat(101)}`, {
            headers: { "x-test-user-id": "test-user-id" },
        });
        expect((await getCards(longExpansion)).status).toBe(400);
    });

    it("should build correct expansion options and page size constants", () => {
        expect(COLLECTION_PAGE_SIZE).toBe(36);
        expect(ALL_EXPANSIONS_FILTER).toBe("all");

        const options = buildExpansionFilterOptions(["Base Set", "151", "Jungle"]);
        expect(options[0]).toEqual({ value: "all", label: "Todas as expansões" });
        expect(options.map((o) => o.value)).toContain("151");
        expect(options.map((o) => o.value)).toContain("Base Set");
    });

    it("should validate and reject empty or invalid usernames in public collection routes", async () => {
        const emptyReq = new NextRequest("http://localhost:3000/api/profile/%20/collection");
        const emptyRes = await getPublicCollection(emptyReq, { params: Promise.resolve({ username: "   " }) });
        expect(emptyRes.status).toBe(400);

        const malformedReq = new NextRequest("http://localhost:3000/api/profile/%25/collection");
        const malformedRes = await getPublicCollection(malformedReq, { params: Promise.resolve({ username: "%" }) });
        expect(malformedRes.status).toBe(404);

        const emptyExpReq = new NextRequest("http://localhost:3000/api/profile/%20/expansions");
        const emptyExpRes = await getPublicExpansions(emptyExpReq, { params: Promise.resolve({ username: "   " }) });
        expect(emptyExpRes.status).toBe(400);

        const malformedExpReq = new NextRequest("http://localhost:3000/api/profile/%25/expansions");
        const malformedExpRes = await getPublicExpansions(malformedExpReq, { params: Promise.resolve({ username: "%" }) });
        expect(malformedExpRes.status).toBe(404);
    });

    it("should reject invalid pagination and filter query params in public collection", async () => {
        const invalidPage = new NextRequest("http://localhost:3000/api/profile/ashketchum/collection?page=0");
        expect((await getPublicCollection(invalidPage, { params: Promise.resolve({ username: "ashketchum" }) })).status).toBe(400);

        const invalidLimit = new NextRequest("http://localhost:3000/api/profile/ashketchum/collection?limit=101");
        expect((await getPublicCollection(invalidLimit, { params: Promise.resolve({ username: "ashketchum" }) })).status).toBe(400);

        const invalidStatus = new NextRequest("http://localhost:3000/api/profile/ashketchum/collection?status=invalid");
        expect((await getPublicCollection(invalidStatus, { params: Promise.resolve({ username: "ashketchum" }) })).status).toBe(400);

        const invalidLang = new NextRequest("http://localhost:3000/api/profile/ashketchum/collection?language=de");
        expect((await getPublicCollection(invalidLang, { params: Promise.resolve({ username: "ashketchum" }) })).status).toBe(400);

        const invalidSort = new NextRequest("http://localhost:3000/api/profile/ashketchum/collection?sort=invalid");
        expect((await getPublicCollection(invalidSort, { params: Promise.resolve({ username: "ashketchum" }) })).status).toBe(400);

        const invalidDir = new NextRequest("http://localhost:3000/api/profile/ashketchum/collection?direction=invalid");
        expect((await getPublicCollection(invalidDir, { params: Promise.resolve({ username: "ashketchum" }) })).status).toBe(400);

        const longSearch = new NextRequest(`http://localhost:3000/api/profile/ashketchum/collection?search=${"a".repeat(101)}`);
        expect((await getPublicCollection(longSearch, { params: Promise.resolve({ username: "ashketchum" }) })).status).toBe(400);
    });
});
