import { describe, expect, it } from "bun:test";
import { buildStoredCardImageUrl, resolveStoredCardImage } from "../src/lib/pokemon/cardImageStorage";

describe("cardImageStorage", () => {
    it("should build an encoded HTTPS URL for a mapped object", () => {
        expect(buildStoredCardImageUrl("https://cards.example.com/", "cards/base1-4.jpg")).toBe("https://cards.example.com/cards/base1-4.jpg");
    });

    it("should reject non-HTTPS URLs and unsafe object keys", () => {
        expect(buildStoredCardImageUrl("http://cards.example.com", "cards/base1-4.jpg")).toBeNull();
        expect(buildStoredCardImageUrl("https://cards.example.com", "../private.jpg")).toBeNull();
    });

    it("should return null when no stored image is mapped or configured", () => {
        expect(resolveStoredCardImage("not-mapped")).toBeNull();
        expect(resolveStoredCardImage(null)).toBeNull();
    });
});
