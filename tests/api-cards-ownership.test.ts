import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { GET as getOwnership } from "../src/app/api/cards/ownership/route";

const AUTH_HEADERS = { "x-test-user-id": "test-user-id" };

function ownershipRequest(query: string, headers: Record<string, string> = AUTH_HEADERS) {
    return new NextRequest(`http://localhost:3000/api/cards/ownership${query}`, { method: "GET", headers });
}

describe("Cards Ownership API Validation", () => {
    it("should return 401 for unauthenticated request", async () => {
        const response = await getOwnership(ownershipRequest("?ids=base1-44", {}));
        expect(response.status).toBe(401);
    });

    it("should return 400 when ids are missing", async () => {
        const response = await getOwnership(ownershipRequest(""));
        expect(response.status).toBe(400);
        expect((await response.json()).error).toBe("Informe as cartas consultadas");
    });

    it("should return 400 when ids are blank", async () => {
        const response = await getOwnership(ownershipRequest("?ids=%20%2C%20"));
        expect(response.status).toBe(400);
        expect((await response.json()).error).toBe("Nenhuma carta informada");
    });

    it("should return 400 when more than 100 ids are requested", async () => {
        const ids = Array.from({ length: 101 }, (_, index) => `base1-${index + 1}`).join(",");
        const response = await getOwnership(ownershipRequest(`?ids=${ids}`));
        expect(response.status).toBe(400);
        expect((await response.json()).error).toBe("Máximo de 100 cartas por consulta");
    });

    it("should return 400 for an oversized card identifier", async () => {
        const response = await getOwnership(ownershipRequest(`?ids=${"a".repeat(101)}`));
        expect(response.status).toBe(400);
        expect((await response.json()).error).toBe("Identificador de carta inválido");
    });
});
