import { memo } from "react";
import { getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";

interface FloatingPokemon {
    dexId: number;
    name: string;
    style: React.CSSProperties;
    floatClass: string;
    opacityQuiet: string;
    opacityFull: string;
    glowFull: string;
}

/** Spread across a loose 4×4 grid so left/right and top/bottom stay balanced. */
const BACKGROUND_POKEMON: FloatingPokemon[] = [
    // Top row
    {
        dexId: 6,
        name: "Charizard",
        style: {
            top: "3%",
            left: "2%",
            width: "240px",
            height: "240px",
            animationDelay: "0s",
        },
        floatClass: "animate-pokemon-float-1",
        opacityQuiet: "opacity-35",
        opacityFull: "opacity-50",
        glowFull: "drop-shadow-[0_0_40px_rgba(239,68,68,0.5)]",
    },
    {
        dexId: 144,
        name: "Articuno",
        style: {
            top: "6%",
            left: "28%",
            width: "190px",
            height: "190px",
            animationDelay: "-15s",
        },
        floatClass: "animate-pokemon-float-1",
        opacityQuiet: "opacity-30",
        opacityFull: "opacity-45",
        glowFull: "drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]",
    },
    {
        dexId: 151,
        name: "Mew",
        style: {
            top: "4%",
            left: "54%",
            width: "180px",
            height: "180px",
            animationDelay: "-8s",
        },
        floatClass: "animate-pokemon-drift",
        opacityQuiet: "opacity-40",
        opacityFull: "opacity-70",
        glowFull: "drop-shadow-[0_0_40px_rgba(244,114,182,0.6)]",
    },
    {
        dexId: 149,
        name: "Dragonite",
        style: {
            top: "2%",
            right: "3%",
            width: "230px",
            height: "230px",
            animationDelay: "-11s",
        },
        floatClass: "animate-pokemon-float-2",
        opacityQuiet: "opacity-30",
        opacityFull: "opacity-45",
        glowFull: "drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]",
    },
    // Upper-middle
    {
        dexId: 3,
        name: "Venusaur",
        style: {
            top: "24%",
            left: "8%",
            width: "200px",
            height: "200px",
            animationDelay: "-9s",
        },
        floatClass: "animate-pokemon-float-2",
        opacityQuiet: "opacity-28",
        opacityFull: "opacity-40",
        glowFull: "drop-shadow-[0_0_35px_rgba(34,197,94,0.4)]",
    },
    {
        dexId: 65,
        name: "Alakazam",
        style: {
            top: "22%",
            left: "38%",
            width: "170px",
            height: "170px",
            animationDelay: "-14s",
        },
        floatClass: "animate-pokemon-float-3",
        opacityQuiet: "opacity-25",
        opacityFull: "opacity-35",
        glowFull: "drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]",
    },
    {
        dexId: 145,
        name: "Zapdos",
        style: {
            top: "20%",
            right: "18%",
            width: "200px",
            height: "200px",
            animationDelay: "-10s",
        },
        floatClass: "animate-pokemon-float-1",
        opacityQuiet: "opacity-30",
        opacityFull: "opacity-45",
        glowFull: "drop-shadow-[0_0_35px_rgba(234,179,8,0.45)]",
    },
    {
        dexId: 25,
        name: "Pikachu",
        style: {
            top: "32%",
            right: "4%",
            width: "160px",
            height: "160px",
            animationDelay: "-2s",
        },
        floatClass: "animate-pokemon-float-3",
        opacityQuiet: "opacity-40",
        opacityFull: "opacity-65",
        glowFull: "drop-shadow-[0_0_35px_rgba(250,204,21,0.55)]",
    },
    // Lower-middle
    {
        dexId: 94,
        name: "Gengar",
        style: {
            top: "48%",
            left: "3%",
            width: "210px",
            height: "210px",
            animationDelay: "-4s",
        },
        floatClass: "animate-pokemon-float-2",
        opacityQuiet: "opacity-35",
        opacityFull: "opacity-55",
        glowFull: "drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]",
    },
    {
        dexId: 93,
        name: "Haunter",
        style: {
            top: "52%",
            left: "30%",
            width: "170px",
            height: "170px",
            animationDelay: "-12s",
        },
        floatClass: "animate-pokemon-float-2",
        opacityQuiet: "opacity-32",
        opacityFull: "opacity-50",
        glowFull: "drop-shadow-[0_0_35px_rgba(147,51,234,0.45)]",
    },
    {
        dexId: 150,
        name: "Mewtwo",
        style: {
            top: "46%",
            right: "22%",
            width: "210px",
            height: "210px",
            animationDelay: "-7s",
        },
        floatClass: "animate-pokemon-drift",
        opacityQuiet: "opacity-28",
        opacityFull: "opacity-40",
        glowFull: "drop-shadow-[0_0_40px_rgba(192,132,252,0.45)]",
    },
    {
        dexId: 133,
        name: "Eevee",
        style: {
            top: "55%",
            right: "5%",
            width: "150px",
            height: "150px",
            animationDelay: "-3s",
        },
        floatClass: "animate-pokemon-float-3",
        opacityQuiet: "opacity-38",
        opacityFull: "opacity-60",
        glowFull: "drop-shadow-[0_0_30px_rgba(217,119,6,0.4)]",
    },
    // Bottom
    {
        dexId: 9,
        name: "Blastoise",
        style: {
            bottom: "4%",
            left: "10%",
            width: "230px",
            height: "230px",
            animationDelay: "-6s",
        },
        floatClass: "animate-pokemon-float-1",
        opacityQuiet: "opacity-32",
        opacityFull: "opacity-50",
        glowFull: "drop-shadow-[0_0_40px_rgba(59,130,246,0.45)]",
    },
    {
        dexId: 130,
        name: "Gyarados",
        style: {
            bottom: "6%",
            left: "42%",
            width: "230px",
            height: "230px",
            animationDelay: "-5s",
        },
        floatClass: "animate-pokemon-drift",
        opacityQuiet: "opacity-28",
        opacityFull: "opacity-40",
        glowFull: "drop-shadow-[0_0_40px_rgba(56,189,248,0.45)]",
    },
    {
        dexId: 143,
        name: "Snorlax",
        style: {
            bottom: "3%",
            right: "8%",
            width: "220px",
            height: "220px",
            animationDelay: "-13s",
        },
        floatClass: "animate-pokemon-float-1",
        opacityQuiet: "opacity-25",
        opacityFull: "opacity-35",
        glowFull: "drop-shadow-[0_0_35px_rgba(100,116,139,0.35)]",
    },
];

const QUIET_SHADOW = "drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]";

type PokemonBackgroundIntensity = "quiet" | "full";

interface PokemonBackgroundProps {
    /** `quiet` = neutral shadows, no purple orb (login). `full` = landing default. */
    intensity?: PokemonBackgroundIntensity;
}

export const PokemonBackground = memo(function PokemonBackground({ intensity = "full" }: PokemonBackgroundProps) {
    const quiet = intensity === "quiet";

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
            <div className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-red-600/12 blur-[150px]" />
            <div className="absolute top-[12%] right-[-10%] h-[560px] w-[560px] rounded-full bg-amber-500/10 blur-[150px]" />
            {!quiet && (
                <>
                    <div className="absolute top-1/2 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/12 blur-[150px]" />
                    <div className="absolute -bottom-40 right-[8%] h-[650px] w-[650px] rounded-full bg-purple-600/12 blur-[160px]" />
                </>
            )}
            {quiet && <div className="absolute -bottom-40 right-[8%] h-[650px] w-[650px] rounded-full bg-red-600/8 blur-[160px]" />}

            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

            {BACKGROUND_POKEMON.map((poke) => {
                const opacity = quiet ? poke.opacityQuiet : poke.opacityFull;
                const shadow = quiet ? QUIET_SHADOW : poke.glowFull;
                return (
                    <div key={poke.dexId} style={poke.style} className={`absolute transition-transform duration-1000 filter ${poke.floatClass} ${opacity} ${shadow}`}>
                        <img src={getPokemonSilhouetteUrl(poke.dexId)} alt={poke.name} loading="lazy" draggable={false} className="h-full w-full object-contain select-none" />
                    </div>
                );
            })}
        </div>
    );
});
