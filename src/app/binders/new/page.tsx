"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles, BookOpen, Layers, Grid, Shield, Globe, Lock, HelpCircle } from "lucide-react";
import { BinderCoverArt } from "@/components/binder/BinderCoverArt";
import { CoverPokemonSelector } from "@/components/binder/CoverPokemonSelector";
import { BINDER_COVER_THEMES } from "@/lib/binder/themes";
import { getBinderSlotPageCount } from "@/lib/binder/pageCapacity";
import { GridType, SlotType } from "@/types/binder";

const SLOTS_PER_GRID: Record<GridType, number> = {
    "1x1": 1,
    "2x2": 4,
    "3x3": 9,
    "3x4": 12,
};

const GENERATIONS = [
    { id: 1, name: "Geração 1 (Kanto)", start: 1, end: 151, count: 151 },
    { id: 2, name: "Geração 2 (Johto)", start: 152, end: 251, count: 100 },
    { id: 3, name: "Geração 3 (Hoenn)", start: 252, end: 386, count: 135 },
    { id: 4, name: "Geração 4 (Sinnoh)", start: 387, end: 493, count: 107 },
    { id: 5, name: "Geração 5 (Unova)", start: 494, end: 649, count: 156 },
    { id: 6, name: "Geração 6 (Kalos)", start: 650, end: 721, count: 72 },
    { id: 7, name: "Geração 7 (Alola)", start: 722, end: 809, count: 88 },
    { id: 8, name: "Geração 8 (Galar)", start: 810, end: 905, count: 96 },
    { id: 9, name: "Geração 9 (Paldea)", start: 906, end: 1025, count: 120 },
];

export default function NewBinderPage() {
    const router = useRouter();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [coverTheme, setCoverTheme] = useState("classic_red");
    const [coverPokemonDexId, setCoverPokemonDexId] = useState<number | null>(null);
    const [isPublic, setIsPublic] = useState(false);

    const [gridType, setGridType] = useState<GridType>("3x3");
    const [totalPages, setTotalPages] = useState<number>(10);

    const [templateType, setTemplateType] = useState<"blank" | "kanto151" | "generation">("blank");
    const [selectedGenId, setSelectedGenId] = useState<number>(1);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const slotsPerPage = SLOTS_PER_GRID[gridType];
    const totalCapacity = getBinderSlotPageCount(totalPages) * slotsPerPage;

    const handleSelectTemplate = (template: "blank" | "kanto151" | "generation", genId = 1) => {
        setTemplateType(template);
        if (template === "kanto151") {
            setGridType("3x3");
            setTotalPages(17);
            if (!name.trim()) setName("Kanto 151 Pokédex");
        } else if (template === "generation") {
            setSelectedGenId(genId);
            const gen = GENERATIONS.find((g) => g.id === genId) || GENERATIONS[0];
            const neededPages = Math.ceil(gen.count / slotsPerPage);
            setTotalPages(Math.min(50, Math.max(1, neededPages)));
            if (!name.trim()) setName(`Pokédex ${gen.name}`);
        }
    };

    const handleGenChange = (genId: number) => {
        setSelectedGenId(genId);
        const gen = GENERATIONS.find((g) => g.id === genId) || GENERATIONS[0];
        const neededPages = Math.ceil(gen.count / slotsPerPage);
        setTotalPages(Math.min(50, Math.max(1, neededPages)));
        if (!name.trim() || name.startsWith("Pokédex Geração")) {
            setName(`Pokédex ${gen.name}`);
        }
    };

    const handleGridChange = (newGrid: GridType) => {
        setGridType(newGrid);
        const newSlotsPerPage = SLOTS_PER_GRID[newGrid];
        if (templateType === "kanto151") {
            const needed = Math.ceil(151 / newSlotsPerPage);
            setTotalPages(Math.min(50, Math.max(1, needed)));
        } else if (templateType === "generation") {
            const gen = GENERATIONS.find((g) => g.id === selectedGenId) || GENERATIONS[0];
            const needed = Math.ceil(gen.count / newSlotsPerPage);
            setTotalPages(Math.min(50, Math.max(1, needed)));
        }
    };

    const handleSubmit = async () => {
        const trimmedName = name.trim();
        if (!trimmedName) {
            setErrorMessage("Por favor, informe um nome para o seu binder.");
            setStep(1);
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            let initialSlots: any[] | undefined = undefined;

            if (templateType === "kanto151") {
                initialSlots = [];
                let currentDex = 1;
                for (let page = 1; page <= totalPages; page++) {
                    for (let slot = 1; slot <= slotsPerPage; slot++) {
                        if (currentDex <= 151) {
                            initialSlots.push({
                                page_number: page,
                                slot_index: slot,
                                slot_type: "pokemon",
                                target_dex_id: currentDex,
                            });
                            currentDex++;
                        } else {
                            initialSlots.push({
                                page_number: page,
                                slot_index: slot,
                                slot_type: "free",
                            });
                        }
                    }
                }
            } else if (templateType === "generation") {
                initialSlots = [];
                const gen = GENERATIONS.find((g) => g.id === selectedGenId) || GENERATIONS[0];
                let currentDex = gen.start;
                for (let page = 1; page <= totalPages; page++) {
                    for (let slot = 1; slot <= slotsPerPage; slot++) {
                        if (currentDex <= gen.end) {
                            initialSlots.push({
                                page_number: page,
                                slot_index: slot,
                                slot_type: "pokemon",
                                target_dex_id: currentDex,
                            });
                            currentDex++;
                        } else {
                            initialSlots.push({
                                page_number: page,
                                slot_index: slot,
                                slot_type: "free",
                            });
                        }
                    }
                }
            }

            const response = await fetch("/api/binders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: trimmedName,
                    description: description.trim(),
                    cover_theme: coverTheme,
                    cover_pokemon_dex_id: coverPokemonDexId,
                    grid_type: gridType,
                    total_pages: totalPages,
                    is_public: isPublic,
                    slots: initialSlots,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Falha ao criar binder");
            }

            const data = await response.json();
            router.push(`/binders/${data.binder.id}`);
        } catch (err: any) {
            setErrorMessage(err.message || "Erro inesperado ao criar o binder");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10] text-slate-100">
            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <NextLink href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white">
                        <ArrowLeft size={16} />
                        <span>Voltar para a Estante</span>
                    </NextLink>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Passo {step} de 3</span>
                        <div className="flex gap-1.5">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className={`h-1.5 w-6 rounded-full transition-all ${step >= s ? "bg-poke-blue" : "bg-white/10"}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {errorMessage && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-300">{errorMessage}</div>}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {step === 1 && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <h1 className="text-xl font-black text-white sm:text-2xl">Identidade e Capa</h1>
                                    <p className="mt-1 text-xs text-slate-400">Dê um título especial ao seu binder e escolha a textura da capa.</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-300">
                                        Nome do Binder <span className="text-red-400">*</span>
                                    </label>
                                    <input type="text" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Minha Coleção Rara, Masterset 151, Johto..." className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" autoFocus />
                                    <span className="text-right text-[10px] text-slate-500">{name.length}/60 caracteres</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-300">Descrição (Opcional)</label>
                                    <textarea rows={3} maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Conte brevemente sobre o foco ou tema deste binder..." className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" />
                                    <span className="text-right text-[10px] text-slate-500">{description.length}/200 caracteres</span>
                                </div>

                                <div className="flex flex-col gap-2.5">
                                    <label className="text-xs font-bold text-slate-300">Cor e Estilo da Capa</label>
                                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                                        {Object.values(BINDER_COVER_THEMES).map((theme) => {
                                            const isSelected = coverTheme === theme.id;
                                            return (
                                                <button key={theme.id} type="button" onClick={() => setCoverTheme(theme.id)} className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${isSelected ? "border-white bg-white/10 shadow-md" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`}>
                                                    <div className="h-6 w-6 shrink-0 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: theme.primaryColor }} />
                                                    <div className="min-w-0 flex-1">
                                                        <span className="block truncate text-xs font-semibold text-white">{theme.name}</span>
                                                    </div>
                                                    {isSelected && <Check size={14} className="text-white" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <CoverPokemonSelector value={coverPokemonDexId} onChange={setCoverPokemonDexId} />

                                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-1.5">
                                            {isPublic ? <Globe size={14} className="text-emerald-400" /> : <Lock size={14} className="text-slate-400" />}
                                            <span className="text-xs font-bold text-white">Binder Público</span>
                                        </div>
                                        <span className="text-[11px] text-slate-400">Outros treinadores poderão visualizar seu binder através do seu perfil público.</span>
                                    </div>

                                    <button type="button" onClick={() => setIsPublic(!isPublic)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPublic ? "bg-emerald-500" : "bg-white/15"}`}>
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isPublic ? "translate-x-5" : "translate-x-0"}`} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <h1 className="text-xl font-black text-white sm:text-2xl">Formato do Grid e Páginas</h1>
                                    <p className="mt-1 text-xs text-slate-400">Escolha a disposição visual das cartas em cada folha e a quantidade de páginas.</p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-bold text-slate-300">Formato das Folhas (Grid)</label>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {(["1x1", "2x2", "3x3", "3x4"] as GridType[]).map((g) => {
                                            const isSelected = gridType === g;
                                            return (
                                                <button key={g} type="button" onClick={() => handleGridChange(g)} className={`flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center transition-all ${isSelected ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`}>
                                                    <span className="font-mono text-base font-extrabold text-white">{g}</span>
                                                    <span className="text-[11px] text-slate-400">
                                                        {SLOTS_PER_GRID[g]} {SLOTS_PER_GRID[g] === 1 ? "carta/pág" : "cartas/pág"}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-slate-300">Quantidade de Páginas</label>
                                        <span className="font-mono text-sm font-bold text-poke-blue">
                                            {totalPages} {totalPages === 1 ? "página" : "páginas"}
                                        </span>
                                    </div>

                                    <input type="range" min={1} max={50} value={totalPages} onChange={(e) => setTotalPages(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-poke-blue" />

                                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                                        <span>Mínimo: 1 página</span>
                                        <span className="font-mono">
                                            Capacidade: <strong className="text-white">{totalCapacity}</strong> cartas
                                        </span>
                                        <span>Máximo: 50 páginas</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <h1 className="text-xl font-black text-white sm:text-2xl">Estrutura Inicial dos Slots</h1>
                                    <p className="mt-1 text-xs text-slate-400">Pré-configure as metas de cada slot ou comece com um binder livre.</p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button type="button" onClick={() => handleSelectTemplate("blank")} className={`flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${templateType === "blank" ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`}>
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300">
                                            <BookOpen size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-white">Binder Livre (Em Branco)</h3>
                                            <p className="mt-0.5 text-xs text-slate-400">Todos os slots começam vazios com bordas tracejadas. Você pode inserir qualquer carta da sua coleção sem metas pré-fixadas.</p>
                                        </div>
                                        {templateType === "blank" && <Check size={18} className="text-poke-blue shrink-0" />}
                                    </button>

                                    <button type="button" onClick={() => handleSelectTemplate("kanto151")} className={`flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${templateType === "kanto151" ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`}>
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-300">
                                            <Sparkles size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-white">Kanto 151 Original (Pokédex Clássica)</h3>
                                            <p className="mt-0.5 text-xs text-slate-400">17 páginas em grid 3×3 com as silhuetas oficiais dos 151 Pokémon de Kanto (#001 a #151) para colecionar suas cartas físicas.</p>
                                        </div>
                                        {templateType === "kanto151" && <Check size={18} className="text-poke-blue shrink-0" />}
                                    </button>

                                    <div className={`flex flex-col gap-3 rounded-xl border p-4 transition-all ${templateType === "generation" ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02]"}`}>
                                        <div className="flex cursor-pointer items-start gap-3.5" onClick={() => handleSelectTemplate("generation", selectedGenId)}>
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-300">
                                                <Layers size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-bold text-white">Geração Específica da Pokédex</h3>
                                                <p className="mt-0.5 text-xs text-slate-400">Gera metas sequenciais para qualquer uma das 9 gerações oficiais com silhuetas pré-carregadas.</p>
                                            </div>
                                            {templateType === "generation" && <Check size={18} className="text-poke-blue shrink-0" />}
                                        </div>

                                        {templateType === "generation" && (
                                            <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-2">
                                                <label className="text-xs font-semibold text-slate-300">Selecione a Geração Desejada:</label>
                                                <select value={selectedGenId} onChange={(e) => handleGenChange(Number(e.target.value))} className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-xs text-white focus:border-poke-blue/60 focus:outline-none">
                                                    {GENERATIONS.map((gen) => (
                                                        <option key={gen.id} value={gen.id} className="bg-[#121622] text-white">
                                                            {gen.name} (#{String(gen.start).padStart(3, "0")} a #{String(gen.end).padStart(3, "0")} · {gen.count} pokémon)
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            {step > 1 ? (
                                <button type="button" onClick={() => setStep((s) => (s - 1) as any)} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10">
                                    <ArrowLeft size={14} />
                                    <span>Anterior</span>
                                </button>
                            ) : (
                                <div />
                            )}

                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (step === 1 && !name.trim()) {
                                            setErrorMessage("Por favor, preencha o nome do binder antes de prosseguir.");
                                            return;
                                        }
                                        setErrorMessage(null);
                                        setStep((s) => (s + 1) as any);
                                    }}
                                    className="flex items-center gap-1.5 rounded-xl bg-poke-blue px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-poke-blue/90"
                                >
                                    <span>Próximo</span>
                                    <ArrowRight size={14} />
                                </button>
                            ) : (
                                <button type="button" disabled={isSubmitting} onClick={handleSubmit} className="flex items-center gap-2 rounded-xl bg-poke-blue px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:bg-poke-blue/90 disabled:opacity-50">
                                    {isSubmitting ? (
                                        <span>Criando Binder...</span>
                                    ) : (
                                        <>
                                            <Sparkles size={15} />
                                            <span>Concluir e Abrir Binder</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="rounded-2xl border border-white/10 bg-[#121520]/80 p-5 shadow-xl backdrop-blur-md">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pré-visualização da Capa</span>

                            <BinderCoverArt name={name.trim() || "Nome do Binder"} coverTheme={coverTheme} coverPokemonDexId={coverPokemonDexId} className="mx-auto mt-4 w-full max-w-[305px]" />

                            <div className="mt-4 flex flex-col gap-2 rounded-xl border border-white/5 bg-black/30 p-3 text-xs text-slate-400">
                                <div className="flex justify-between">
                                    <span>Formato:</span>
                                    <strong className="text-white">
                                        Grid {gridType} ({slotsPerPage} slots/página)
                                    </strong>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total de Folhas:</span>
                                    <strong className="text-white">{totalPages} páginas</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span>Capacidade Total:</span>
                                    <strong className="text-white">{totalCapacity} cartas</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estrutura:</span>
                                    <strong className="text-white">{templateType === "blank" ? "Slots Livres" : templateType === "kanto151" ? "Kanto 151 Metas" : `Metas ${GENERATIONS.find((g) => g.id === selectedGenId)?.name}`}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
