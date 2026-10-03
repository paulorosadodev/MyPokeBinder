import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Badge de variante na página da carta", () => {
    it("imports the Circle icon used by the Normal variant badge", () => {
        const source = readFileSync(join(import.meta.dir, "../src/app/cards/[id]/CardDetailClient.tsx"), "utf8");

        expect(source).toMatch(/import \{[^}]*\bCircle\b[^}]*\} from "lucide-react"/s);
        expect(source).toContain('<Circle size={13} className="text-slate-400" />');
    });
});
