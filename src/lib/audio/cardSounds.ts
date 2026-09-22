import { PokemonType } from "@/lib/pokemon/constants";
import { RarityImpactTier } from "@/lib/pokemon/rarity";

let isAudioMuted = false;

export function setSoundMuted(muted: boolean) {
    isAudioMuted = muted;
}

export function isSoundMuted(): boolean {
    return isAudioMuted;
}

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!sharedAudioCtx) {
        sharedAudioCtx = new AudioContextClass();
    }

    if (sharedAudioCtx.state === "suspended") {
        sharedAudioCtx.resume().catch(() => {});
    }

    return sharedAudioCtx;
}

function playBaseThud(ctx: AudioContext, startTime: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(140, startTime);
    osc.frequency.exponentialRampToValueAtTime(35, startTime + 0.12);

    gain.gain.setValueAtTime(0.28, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.15);

    const snapBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const data = snapBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
    }

    const snapSource = ctx.createBufferSource();
    snapSource.buffer = snapBuffer;

    const snapFilter = ctx.createBiquadFilter();
    snapFilter.type = "bandpass";
    snapFilter.frequency.setValueAtTime(1200, startTime);
    snapFilter.Q.setValueAtTime(1.8, startTime);

    const snapGain = ctx.createGain();
    snapGain.gain.setValueAtTime(0.18, startTime);
    snapGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

    snapSource.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(ctx.destination);

    snapSource.start(startTime);
    snapSource.stop(startTime + 0.07);
}

function playCrystalImpactLayer(ctx: AudioContext, startTime: number) {
    const freqs = [1760, 2637];
    freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, startTime + idx * 0.025);

        gain.gain.setValueAtTime(0.12, startTime + idx * 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.025 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime + idx * 0.025);
        osc.stop(startTime + idx * 0.025 + 0.19);
    });
}

function playHarmonicLayer(ctx: AudioContext, startTime: number) {
    const freqs = [587.33, 880.0, 1174.66, 1318.51];
    freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime + idx * 0.015);

        gain.gain.setValueAtTime(0.08, startTime + idx * 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.015 + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + idx * 0.015);
        osc.stop(startTime + idx * 0.015 + 0.23);
    });
}

function playSparkleArpeggio(ctx: AudioContext, startTime: number) {
    const notes = [783.99, 987.77, 1318.51, 1567.98, 2093.0];
    notes.forEach((freq, i) => {
        const noteStart = startTime + i * 0.045;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.14, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.3);
    });
}

function playMythicSparkleArpeggio(ctx: AudioContext, startTime: number) {
    const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98, 2093.0, 2637.02, 3135.96];
    notes.forEach((freq, i) => {
        const noteStart = startTime + i * 0.035;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.16, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.38);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.4);
    });
}

export function playCardDropSound(tierOrType: RarityImpactTier | PokemonType = 0, maybeTier?: RarityImpactTier) {
    if (isAudioMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const tier: RarityImpactTier = typeof tierOrType === "number" ? tierOrType : (maybeTier ?? 0);
    const startTime = ctx.currentTime + 0.01;

    playBaseThud(ctx, startTime);
    playCrystalImpactLayer(ctx, startTime);

    if (tier === 3) {
        playMythicSparkleArpeggio(ctx, startTime + 0.02);
    } else if (tier === 2) {
        playSparkleArpeggio(ctx, startTime + 0.025);
    } else if (tier === 1) {
        playHarmonicLayer(ctx, startTime + 0.02);
    }
}

export function playPsyduckConfusionSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + 0.02;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(330, startTime);
    osc1.frequency.linearRampToValueAtTime(520, startTime + 0.12);
    osc1.frequency.linearRampToValueAtTime(310, startTime + 0.24);
    osc1.frequency.linearRampToValueAtTime(620, startTime + 0.38);

    gain1.gain.setValueAtTime(0.18, startTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, startTime + 0.42);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(startTime);
    osc1.stop(startTime + 0.44);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(440, startTime + 0.08);
    osc2.frequency.linearRampToValueAtTime(280, startTime + 0.22);
    osc2.frequency.linearRampToValueAtTime(740, startTime + 0.4);

    gain2.gain.setValueAtTime(0.12, startTime + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(startTime + 0.08);
    osc2.stop(startTime + 0.46);
}
