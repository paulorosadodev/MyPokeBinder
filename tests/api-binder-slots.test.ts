import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { GET as getBinder, PATCH as patchBinder, DELETE as deleteBinder } from "../src/app/api/binders/[id]/route";
import { POST as assignSlot, DELETE as unassignSlot } from "../src/app/api/binders/[id]/slots/[slotId]/assign/route";

describe("Binder Details and Slot Assignment API", () => {
    it("should return 400 for GET /api/binders/[id] with malformed UUID", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders/invalid-uuid", {
            method: "GET",
        });
        const res = await getBinder(req, { params: Promise.resolve({ id: "invalid-uuid" }) });
        expect(res.status).toBe(400);

        const data = await res.json();
        expect(data.error).toContain("inválido");
    });

    it("should return 400 for PATCH /api/binders/[id] with malformed UUID", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders/not-a-uuid", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Novo Nome" }),
        });
        const res = await patchBinder(req, { params: Promise.resolve({ id: "not-a-uuid" }) });
        expect(res.status).toBe(400);
    });

    it("should return 400 for DELETE /api/binders/[id] with malformed UUID", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders/bad-id", {
            method: "DELETE",
        });
        const res = await deleteBinder(req, { params: Promise.resolve({ id: "bad-id" }) });
        expect(res.status).toBe(400);
    });

    it("should return 400 for slot assign with invalid UUIDs", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders/bad/slots/bad/assign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_card_id: "00000000-0000-0000-0000-000000000000" }),
        });
        const res = await assignSlot(req, {
            params: Promise.resolve({ id: "bad", slotId: "bad" }),
        });
        expect(res.status).toBe(400);
    });

    it("should return 401 for slot assign without authentication", async () => {
        const validId = "11111111-1111-4111-8111-111111111111";
        const req = new NextRequest(`http://localhost:3000/api/binders/${validId}/slots/${validId}/assign`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_card_id: validId }),
        });
        const res = await assignSlot(req, {
            params: Promise.resolve({ id: validId, slotId: validId }),
        });
        expect(res.status).toBe(401);
    });

    it("should return 400 for slot assign with invalid user_card_id format", async () => {
        const validId = "11111111-1111-4111-8111-111111111111";
        const req = new NextRequest(`http://localhost:3000/api/binders/${validId}/slots/${validId}/assign`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({ user_card_id: "not-a-valid-uuid" }),
        });
        const res = await assignSlot(req, {
            params: Promise.resolve({ id: validId, slotId: validId }),
        });
        expect(res.status).toBe(400);
    });

    it("should return 400 for slot unassign with invalid UUIDs", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders/bad/slots/bad/assign", {
            method: "DELETE",
        });
        const res = await unassignSlot(req, {
            params: Promise.resolve({ id: "bad", slotId: "bad" }),
        });
        expect(res.status).toBe(400);
    });
});
