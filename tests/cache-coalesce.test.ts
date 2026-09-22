import { describe, it, expect } from "bun:test";
import { coalesceRequest, getFromMemoryCache, setToMemoryCache } from "@/lib/pokemon/coalesce";

describe("Request Coalescing and In-Memory Cache Logic", () => {
    it("should coalesce multiple concurrent in-flight requests into a single execution", async () => {
        let callCount = 0;

        const slowTask = async () => {
            callCount++;
            await new Promise((resolve) => setTimeout(resolve, 50));
            return { result: "success" };
        };

        const results = await Promise.all([coalesceRequest("test_key", slowTask), coalesceRequest("test_key", slowTask), coalesceRequest("test_key", slowTask)]);

        expect(callCount).toBe(1);
        expect(results[0].result).toBe("success");
        expect(results[1].result).toBe("success");
        expect(results[2].result).toBe("success");
    });

    it("should allow a new execution after previous in-flight request finishes", async () => {
        let callCount = 0;

        const task = async () => {
            callCount++;
            return { count: callCount };
        };

        const first = await coalesceRequest("key_after_finish", task);
        const second = await coalesceRequest("key_after_finish", task);

        expect(first.count).toBe(1);
        expect(second.count).toBe(2);
        expect(callCount).toBe(2);
    });

    it("should retrieve and expire memory cache items accurately according to TTL", async () => {
        setToMemoryCache("ttl_item", { name: "Pikachu" }, 30);
        expect(getFromMemoryCache<{ name: string }>("ttl_item")?.name).toBe("Pikachu");

        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(getFromMemoryCache("ttl_item")).toBeNull();
    });
});
