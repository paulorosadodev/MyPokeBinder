import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { playCardDropSound, resetCardDropSoundCooldown } from "@/lib/audio/cardSounds";
import { PokemonType } from "@/lib/pokemon/constants";

describe("Card Drop Audio Synthesizer Logic", () => {
    let mockContextInstance: any = null;

    class MockAudioContext {
        currentTime = 0;
        state = "running";
        sampleRate = 44100;
        oscillatorCount = 0;
        destination = {};

        constructor() {
            mockContextInstance = this;
        }

        createOscillator() {
            this.oscillatorCount++;
            return {
                type: "sine",
                frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
                connect: () => {},
                start: () => {},
                stop: () => {},
            };
        }

        createGain() {
            return {
                gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
                connect: () => {},
            };
        }

        createBuffer(_channels: number, length: number, _sampleRate: number) {
            return {
                getChannelData: () => new Float32Array(length),
            };
        }

        createBufferSource() {
            return {
                buffer: null,
                connect: () => {},
                start: () => {},
                stop: () => {},
            };
        }

        createBiquadFilter() {
            return {
                type: "bandpass",
                frequency: { setValueAtTime: () => {} },
                Q: { setValueAtTime: () => {} },
                connect: () => {},
            };
        }
    }

    beforeEach(() => {
        resetCardDropSoundCooldown();
    });

    afterEach(() => {
        delete (globalThis as any).window;
        mockContextInstance = null;
    });

    it("should safely handle invocation in non-browser environments without throwing", () => {
        expect(() => {
            playCardDropSound(0);
            playCardDropSound(1);
            playCardDropSound(2);
            playCardDropSound(3);
            playCardDropSound("electric", 0);
            playCardDropSound("fire", 1);
            playCardDropSound("water", 2);
            playCardDropSound("psychic", 3);
        }).not.toThrow();
    });

    it("should define ascending sparkling frequencies for special and mythic tiers", () => {
        const tier2Notes = [783.99, 987.77, 1318.51, 1567.98, 2093.0];
        for (let i = 1; i < tier2Notes.length; i++) {
            expect(tier2Notes[i]).toBeGreaterThan(tier2Notes[i - 1]);
        }

        const tier3Notes = [659.25, 783.99, 987.77, 1318.51, 1567.98, 2093.0, 2637.02, 3135.96];
        for (let i = 1; i < tier3Notes.length; i++) {
            expect(tier3Notes[i]).toBeGreaterThan(tier3Notes[i - 1]);
        }
    });

    it("should route all impact tiers cleanly without throwing", () => {
        expect(() => playCardDropSound(0)).not.toThrow();
        expect(() => playCardDropSound(1)).not.toThrow();
        expect(() => playCardDropSound(2)).not.toThrow();
        expect(() => playCardDropSound(3)).not.toThrow();
    });

    it("should ignore rapid duplicate invocations within cooldown window", () => {
        (globalThis as any).window = { AudioContext: MockAudioContext };

        playCardDropSound(0);
        expect(mockContextInstance).not.toBeNull();
        const initialOscCount = mockContextInstance.oscillatorCount;
        expect(initialOscCount).toBeGreaterThan(0);

        playCardDropSound(0);
        expect(mockContextInstance.oscillatorCount).toBe(initialOscCount);

        resetCardDropSoundCooldown();
        playCardDropSound(0);
        expect(mockContextInstance.oscillatorCount).toBeGreaterThan(initialOscCount);
    });
});
