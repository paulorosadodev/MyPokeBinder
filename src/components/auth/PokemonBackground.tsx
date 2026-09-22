import { memo } from "react";
import { getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";

interface FloatingPokemon {
    dexId: number;
    name: string;
    style: React.CSSProperties;
    className: string;
}

const BACKGROUND_POKEMON: FloatingPokemon[] = [
    {
        dexId: 6,
        name: "Charizard",
        style: {
            top: "5%",
            left: "5%",
            width: "260px",
            height: "260px",
            animationDelay: "0s",
        },
        className: "animate-pokemon-float-1 opacity-50 filter drop-shadow-[0_0_40px_rgba(239,68,68,0.5)]",
    },
    {
        dexId: 94,
        name: "Gengar",
        style: {
            top: "58%",
            left: "3%",
            width: "220px",
            height: "220px",
            animationDelay: "-4s",
        },
        className: "animate-pokemon-float-2 opacity-55 filter drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]",
    },
    {
        dexId: 25,
        name: "Pikachu",
        style: {
            top: "38%",
            left: "22%",
            width: "170px",
            height: "170px",
            animationDelay: "-2s",
        },
        className: "animate-pokemon-float-3 opacity-65 filter drop-shadow-[0_0_35px_rgba(250,204,21,0.55)]",
    },
    {
        dexId: 151,
        name: "Mew",
        style: {
            top: "10%",
            left: "42%",
            width: "190px",
            height: "190px",
            animationDelay: "-8s",
        },
        className: "animate-pokemon-drift opacity-70 filter drop-shadow-[0_0_40px_rgba(244,114,182,0.6)]",
    },
    {
        dexId: 145,
        name: "Zapdos",
        style: {
            top: "28%",
            left: "50%",
            width: "210px",
            height: "210px",
            animationDelay: "-10s",
        },
        className: "animate-pokemon-float-1 opacity-45 filter drop-shadow-[0_0_35px_rgba(234,179,8,0.45)]",
    },
    {
        dexId: 93,
        name: "Haunter",
        style: {
            top: "62%",
            left: "40%",
            width: "180px",
            height: "180px",
            animationDelay: "-12s",
        },
        className: "animate-pokemon-float-2 opacity-50 filter drop-shadow-[0_0_35px_rgba(147,51,234,0.45)]",
    },
    {
        dexId: 9,
        name: "Blastoise",
        style: {
            bottom: "5%",
            left: "18%",
            width: "250px",
            height: "250px",
            animationDelay: "-6s",
        },
        className: "animate-pokemon-float-1 opacity-50 filter drop-shadow-[0_0_40px_rgba(59,130,246,0.45)]",
    },
    {
        dexId: 149,
        name: "Dragonite",
        style: {
            top: "4%",
            left: "62%",
            width: "240px",
            height: "240px",
            animationDelay: "-11s",
        },
        className: "animate-pokemon-float-2 opacity-45 filter drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]",
    },
    {
        dexId: 133,
        name: "Eevee",
        style: {
            bottom: "18%",
            left: "45%",
            width: "160px",
            height: "160px",
            animationDelay: "-3s",
        },
        className: "animate-pokemon-float-3 opacity-60 filter drop-shadow-[0_0_30px_rgba(217,119,6,0.4)]",
    },
    {
        dexId: 150,
        name: "Mewtwo",
        style: {
            top: "45%",
            left: "58%",
            width: "220px",
            height: "220px",
            animationDelay: "-7s",
        },
        className: "animate-pokemon-drift opacity-40 filter drop-shadow-[0_0_40px_rgba(192,132,252,0.45)]",
    },
    {
        dexId: 143,
        name: "Snorlax",
        style: {
            bottom: "2%",
            left: "65%",
            width: "230px",
            height: "230px",
            animationDelay: "-13s",
        },
        className: "animate-pokemon-float-1 opacity-35 filter drop-shadow-[0_0_35px_rgba(100,116,139,0.35)]",
    },
    {
        dexId: 3,
        name: "Venusaur",
        style: {
            top: "28%",
            left: "2%",
            width: "210px",
            height: "210px",
            animationDelay: "-9s",
        },
        className: "animate-pokemon-float-2 opacity-40 filter drop-shadow-[0_0_35px_rgba(34,197,94,0.4)]",
    },
    {
        dexId: 130,
        name: "Gyarados",
        style: {
            top: "72%",
            left: "28%",
            width: "240px",
            height: "240px",
            animationDelay: "-5s",
        },
        className: "animate-pokemon-drift opacity-40 filter drop-shadow-[0_0_40px_rgba(56,189,248,0.45)]",
    },
    {
        dexId: 65,
        name: "Alakazam",
        style: {
            top: "18%",
            left: "18%",
            width: "180px",
            height: "180px",
            animationDelay: "-14s",
        },
        className: "animate-pokemon-float-3 opacity-35 filter drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]",
    },
    {
        dexId: 144,
        name: "Articuno",
        style: {
            top: "16%",
            left: "32%",
            width: "200px",
            height: "200px",
            animationDelay: "-15s",
        },
        className: "animate-pokemon-float-1 opacity-45 filter drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]",
    },
];

export const PokemonBackground = memo(function PokemonBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
            <div className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-red-600/12 blur-[150px]" />
            <div className="absolute top-1/4 left-1/3 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/12 blur-[150px]" />
            <div className="absolute -bottom-40 left-1/4 h-[700px] w-[700px] rounded-full bg-purple-600/12 blur-[160px]" />

            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

            {BACKGROUND_POKEMON.map((poke) => (
                <div key={poke.dexId} style={poke.style} className={`absolute transition-transform duration-1000 ${poke.className}`}>
                    <img src={getPokemonSilhouetteUrl(poke.dexId)} alt={poke.name} loading="lazy" draggable={false} className="h-full w-full object-contain select-none" />
                </div>
            ))}
        </div>
    );
});
