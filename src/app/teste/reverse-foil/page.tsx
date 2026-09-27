import type { Metadata } from "next";
import Image from "next/image";
import { MousePointer2, Sparkles } from "lucide-react";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { CARD_ELEMENT_LABELS } from "@/lib/pokemon/cardTypes";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import type { CardElementType } from "@/types/binder";

export const metadata: Metadata = {
    title: "Teste de Reverse Foil | MyPokeBinder",
    description: "Comparação visual dos padrões Reverse Foil por tipo elemental.",
};

const TEST_CARDS: Array<{ type: CardElementType; name: string; image: string }> = [
    { type: "Colorless", name: "Clefable", image: "https://assets.tcgdex.net/en/base/base2/1" },
    { type: "Darkness", name: "Absol", image: "https://assets.tcgdex.net/en/ex/ex3/1" },
    { type: "Dragon", name: "Dratini", image: "https://assets.tcgdex.net/en/bw/dv1/1" },
    { type: "Fairy", name: "Jigglypuff", image: "https://assets.tcgdex.net/en/sm/det1/14" },
    { type: "Fighting", name: "Armaldo", image: "https://assets.tcgdex.net/en/ex/ex2/1" },
    { type: "Fire", name: "Arcanine", image: "https://assets.tcgdex.net/en/hgss/hgss1/1" },
    { type: "Grass", name: "Bellossom", image: "https://assets.tcgdex.net/en/hgss/hgss3/1" },
    { type: "Lightning", name: "Ampharos", image: "https://assets.tcgdex.net/en/dp/dp3/1" },
    { type: "Metal", name: "Aggron", image: "https://assets.tcgdex.net/en/hgss/hgss4/1" },
    { type: "Psychic", name: "Jirachi", image: "https://assets.tcgdex.net/en/hgss/hgss2/1" },
    { type: "Water", name: "Articuno", image: "https://assets.tcgdex.net/en/dp/dp5/1" },
];

export default function ReverseFoilTestPage() {
    return (
        <main className="min-h-[calc(100dvh-4rem)] bg-[#090b10] px-4 py-8 text-white sm:px-6 sm:py-12">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="max-w-3xl">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                            <Sparkles size={20} />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Teste de Reverse Foil</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">Compare o recorte, a cor e o símbolo de cada tipo elemental. A ilustração central deve permanecer limpa enquanto o padrão acompanha o brilho fora dela.</p>
                    </div>

                    <div className="flex max-w-sm items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                        <MousePointer2 size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                        <span>Mova o cursor sobre as cartas. No celular, toque e arraste o dedo.</span>
                    </div>
                </header>

                <section aria-label="Tipos elementais em Reverse Foil" className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {TEST_CARDS.map((card, index) => (
                        <article key={card.type} className="min-w-0">
                            <div className="relative aspect-[8/11] w-full">
                                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-[4.5%] bg-[#10141d] shadow-[0_18px_45px_rgba(0,0,0,0.42)]" maxTilt={11} maxMove={2} scale={1.025} glareOpacity={0.34} perspective={900} shineMode="foil" elementTypes={[card.type]} enableTouch>
                                    <Image src={formatTcgdexImageUrl(card.image)} alt={`${card.name}, tipo ${CARD_ELEMENT_LABELS[card.type]}`} fill sizes="(max-width: 640px) 46vw, (max-width: 1024px) 24vw, 190px" className="pointer-events-none object-contain" priority={index < 6} unoptimized />
                                </Card3DTilt>
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                                <div className="min-w-0">
                                    <h2 className="truncate text-sm font-bold text-white">{CARD_ELEMENT_LABELS[card.type]}</h2>
                                    <p className="truncate text-xs text-slate-500">{card.name}</p>
                                </div>
                                <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[10px] font-semibold text-slate-300">{card.type}</span>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
