"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { useUserSettings, THEME_PRESETS } from "@/lib/context/UserSettingsContext";
import { useAuth } from "@/lib/context/AuthContext";
import { toast } from "sonner";
import { Palette, Volume2, VolumeX, ArrowLeft, Sparkles, LogOut, User, ShieldCheck, Check, Trash2, Loader2 } from "lucide-react";
import { PokemonThemeSelector } from "@/components/theme/PokemonThemeSelector";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { getPokemonThemeSelectorSpriteUrl } from "@/lib/pokemon/constants";
import { BIO_MAX_LENGTH, DISPLAY_NAME_MAX_LENGTH, USERNAME_MAX_LENGTH, validateBio, validateDisplayName, validateUsername } from "@/lib/profile/username";

export default function SettingsPage() {
    const router = useRouter();
    const { themeColor, soundEnabled, animationsEnabled, setThemeColor, setSoundEnabled, setAnimationsEnabled } = useUserSettings();
    const { user, isLoading, signOut, refreshUser } = useAuth();
    const [avatarError, setAvatarError] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
    const [nameDraft, setNameDraft] = useState("");
    const [usernameDraft, setUsernameDraft] = useState("");
    const [bioDraft, setBioDraft] = useState("");
    const [savedBio, setSavedBio] = useState("");
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileHydrated, setProfileHydrated] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    useEffect(() => {
        if (user?.username) {
            setUsernameDraft(user.username);
        }
        if (user?.name) {
            setNameDraft(user.name);
        } else if (user?.username) {
            setNameDraft(user.username);
        }
    }, [user?.username, user?.name]);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const res = await fetch("/api/profile");
                if (!res.ok) return;
                const data = await res.json();
                const profile = data.profile;
                if (cancelled || !profile) return;
                const bio = profile.user?.bio || "";
                setBioDraft(bio);
                setSavedBio(bio);
                setProfileHydrated(true);
            } catch {
                if (!cancelled) setProfileHydrated(true);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const urls = THEME_PRESETS.map((p) => getPokemonThemeSelectorSpriteUrl((p as { dexId: number }).dexId));
        let isCancelled = false;

        const preload = async () => {
            try {
                await Promise.all(
                    urls.map((url) => {
                        return new Promise<void>((resolve) => {
                            const img = new window.Image();
                            img.src = url;
                            if (img.complete) {
                                resolve();
                            } else {
                                img.onload = () => resolve();
                                img.onerror = () => resolve();
                            }
                        });
                    }),
                );
            } finally {
                if (!isCancelled) {
                    setIsAssetsLoaded(true);
                }
            }
        };

        preload();

        return () => {
            isCancelled = true;
        };
    }, []);

    const profileDirty = nameDraft.trim() !== (user?.name || "").trim() || usernameDraft !== (user?.username || "") || bioDraft.trim() !== savedBio.trim();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut();
            toast.success("Sessão encerrada com sucesso.");
        } catch {
            toast.error("Erro ao encerrar sessão.");
            setIsLoggingOut(false);
        }
    };

    const clearLocalUserData = () => {
        try {
            const keys = ["mypokebinder_user_profile", "mypokebinder_theme_color", "mypokebinder_sound_enabled", "mypokebinder_animations_enabled"];
            for (const key of keys) {
                localStorage.removeItem(key);
            }
            sessionStorage.removeItem("mypokebinder_collection_filters");
            document.cookie = "mypokebinder_theme_color=; path=/; max-age=0; SameSite=Lax";
        } catch {
            // ignore storage errors (private mode, etc.)
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText.trim().toUpperCase() !== "EXCLUIR") {
            toast.error("Digite EXCLUIR para confirmar.");
            return;
        }

        setIsDeletingAccount(true);
        try {
            const res = await fetch("/api/account", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ confirm: "EXCLUIR" }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                toast.error(data.error || "Não foi possível excluir a conta.");
                setIsDeletingAccount(false);
                return;
            }

            clearLocalUserData();
            setIsDeleteModalOpen(false);
            toast.success("Conta excluída permanentemente.");
            await signOut();
        } catch {
            toast.error("Não foi possível excluir a conta.");
            setIsDeletingAccount(false);
        }
    };

    const handleToggleSound = async () => {
        const nextState = !soundEnabled;
        await setSoundEnabled(nextState);
        toast.success(nextState ? "Sons ativados" : "Sons desativados", {
            description: nextState ? "Efeitos sonoros ao inserir cartas habilitados." : "Efeitos sonoros silenciados.",
        });
    };

    const handleToggleAnimations = async () => {
        const nextState = !animationsEnabled;
        await setAnimationsEnabled(nextState);
        toast.success(nextState ? "Animações ativadas" : "Animações desativadas", {
            description: nextState ? "Efeitos 3D e folheamento de páginas habilitados." : "Efeitos 3D e folheamento de páginas desativados.",
        });
    };

    const handleSaveProfile = async () => {
        const validatedName = validateDisplayName(nameDraft);
        if (!validatedName.ok) {
            toast.error(validatedName.error);
            return;
        }

        const validatedUsername = validateUsername(usernameDraft);
        if (!validatedUsername.ok) {
            toast.error(validatedUsername.error);
            return;
        }

        const validatedBio = validateBio(bioDraft);
        if (!validatedBio.ok) {
            toast.error(validatedBio.error);
            return;
        }

        if (!profileDirty) {
            toast.message("Nenhuma alteração para salvar.");
            return;
        }

        setIsSavingProfile(true);
        try {
            const body: { display_name?: string; username?: string; bio?: string } = {};
            if (validatedName.displayName !== (user?.name || "").trim()) {
                body.display_name = validatedName.displayName;
            }
            if (validatedUsername.username !== user?.username) {
                body.username = validatedUsername.username;
            }
            if ((validatedBio.bio || "") !== savedBio.trim()) {
                body.bio = validatedBio.bio ?? "";
            }

            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                toast.error(data.error || "Não foi possível salvar o perfil.");
                return;
            }
            setSavedBio(validatedBio.bio ?? "");
            setBioDraft(validatedBio.bio ?? "");
            await refreshUser();
            toast.success("Perfil atualizado.");
        } catch {
            toast.error("Não foi possível salvar o perfil.");
        } finally {
            setIsSavingProfile(false);
        }
    };

    if (!isAssetsLoaded) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center">
                    <PokeballLoader size="lg" message="Carregando configurações..." />
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex flex-col gap-3 sm:gap-4">
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                const profilePath = user?.username ? `/perfil/${user.username}` : "/perfil";
                                router.replace(profilePath);
                            }}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                        >
                            <ArrowLeft size={16} />
                            <span>Voltar</span>
                        </button>
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Configurações</h1>
                    </div>
                </div>

                <section className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6">
                    <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue">
                                <User size={18} />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white sm:text-lg">Conta</h2>
                                <p className="text-xs text-slate-400">Nome, username e descrição</p>
                            </div>
                        </div>

                        <button type="button" onClick={handleLogout} disabled={isLoggingOut} className="hidden items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-400 transition-all hover:border-rose-500/60 hover:bg-rose-500/20 hover:text-rose-200 disabled:opacity-50 sm:inline-flex">
                            <LogOut size={15} />
                            <span>{isLoggingOut ? "Saindo..." : "Sair da conta"}</span>
                        </button>
                    </div>

                    <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                        <div className="flex shrink-0 items-center gap-3.5 lg:w-56 lg:flex-col lg:items-start">
                            {isLoading && !user ? (
                                <>
                                    <div className="h-16 w-16 shrink-0 animate-pulse rounded-full border border-white/10 bg-white/10" />
                                    <div className="flex flex-col gap-2">
                                        <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
                                        <div className="h-3 w-36 animate-pulse rounded bg-white/5" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {user?.avatarUrl && !avatarError ? (
                                        <Image src={user.avatarUrl} alt={user.name || user.username || "Avatar"} width={64} height={64} priority className="h-16 w-16 rounded-full border border-white/20 bg-white/10 object-cover shadow-sm ring-1 ring-white/10" referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized />
                                    ) : (
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl font-bold text-white shadow-sm">{(user?.name?.[0] || user?.username?.[0] || user?.email?.[0] || "P").toUpperCase()}</div>
                                    )}
                                    <div className="flex min-w-0 flex-col">
                                        <span className="truncate text-sm font-bold text-white">{user?.name || user?.username || "Treinador"}</span>
                                        <span className="truncate font-mono text-xs text-poke-blue">@{user?.username || "treinador"}</span>
                                        <span className="mt-1 truncate text-[11px] text-slate-500">{user?.email}</span>
                                        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                                            <ShieldCheck size={12} />
                                            <span>Conta conectada</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="min-w-0 flex-1 space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-xs font-semibold text-slate-300">Nome</span>
                                    <input type="text" value={nameDraft} onChange={(e) => setNameDraft(e.target.value.slice(0, DISPLAY_NAME_MAX_LENGTH))} maxLength={DISPLAY_NAME_MAX_LENGTH} autoComplete="nickname" className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-slate-600 focus:border-poke-blue/50 focus:ring-1 focus:ring-poke-blue/30" placeholder="Como quer ser chamado" />
                                    <span className="text-[10px] text-slate-500">Aparece no seu perfil público</span>
                                </label>

                                <label className="flex flex-col gap-1.5">
                                    <span className="text-xs font-semibold text-slate-300">Username</span>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">@</span>
                                        <input
                                            type="text"
                                            value={usernameDraft}
                                            onChange={(e) =>
                                                setUsernameDraft(
                                                    e.target.value
                                                        .toLowerCase()
                                                        .replace(/[^a-z0-9_]/g, "")
                                                        .slice(0, USERNAME_MAX_LENGTH),
                                                )
                                            }
                                            maxLength={USERNAME_MAX_LENGTH}
                                            spellCheck={false}
                                            autoComplete="username"
                                            className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-8 pr-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-slate-600 focus:border-poke-blue/50 focus:ring-1 focus:ring-poke-blue/30"
                                            placeholder="seu_username"
                                        />
                                    </div>
                                    <span className="text-[10px] text-slate-500">
                                        Único · /perfil/<span className="font-mono text-slate-400">{usernameDraft || "username"}</span>
                                    </span>
                                </label>
                            </div>

                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-slate-300">Descrição</span>
                                <textarea value={bioDraft} onChange={(e) => setBioDraft(e.target.value.slice(0, BIO_MAX_LENGTH))} maxLength={BIO_MAX_LENGTH} rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-poke-blue/50 focus:ring-1 focus:ring-poke-blue/30" placeholder="Conte um pouco sobre a sua coleção" />
                                <span className="text-[10px] text-slate-500">
                                    {bioDraft.trim().length}/{BIO_MAX_LENGTH}
                                </span>
                            </label>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleSaveProfile} disabled={isSavingProfile || !profileDirty || !profileHydrated} className="inline-flex items-center justify-center gap-2 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-4 py-2.5 text-xs font-bold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25 disabled:cursor-not-allowed disabled:opacity-50">
                                    <Check size={14} />
                                    <span>{isSavingProfile ? "Salvando..." : "Salvar alterações"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <button type="button" onClick={handleLogout} disabled={isLoggingOut} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-bold text-rose-400 transition-all hover:border-rose-500/60 hover:bg-rose-500/20 hover:text-rose-200 disabled:opacity-50 sm:hidden">
                    <LogOut size={15} />
                    <span>{isLoggingOut ? "Saindo..." : "Sair da conta"}</span>
                </button>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <section className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#12151d]/90 px-4 py-3.5 shadow-lg backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-poke-blue/30 bg-poke-blue/10 text-poke-blue">{soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</div>
                            <div className="min-w-0">
                                <h2 className="text-sm font-bold text-white">Sons do Binder</h2>
                                <p className="text-[11px] text-slate-400">Impacto ao inserir cartas</p>
                            </div>
                        </div>

                        <button type="button" role="switch" aria-checked={soundEnabled} onClick={handleToggleSound} className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${soundEnabled ? "bg-poke-blue" : "bg-white/20"}`}>
                            <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${soundEnabled ? "translate-x-4" : "translate-x-0"}`} />
                        </button>
                    </section>

                    <section className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#12151d]/90 px-4 py-3.5 shadow-lg backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-poke-blue/30 bg-poke-blue/10 text-poke-blue">
                                <Sparkles size={16} />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-sm font-bold text-white">Animações e Efeitos</h2>
                                <p className="text-[11px] text-slate-400">Cartas 3D, folheamento e partículas</p>
                            </div>
                        </div>

                        <button type="button" role="switch" aria-checked={animationsEnabled} onClick={handleToggleAnimations} className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${animationsEnabled ? "bg-poke-blue" : "bg-white/20"}`}>
                            <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${animationsEnabled ? "translate-x-4" : "translate-x-0"}`} />
                        </button>
                    </section>
                </div>

                <section className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3.5 sm:pb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue">
                            <Palette size={18} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-white sm:text-lg">Tema do Treinador</h2>
                            <p className="text-xs text-slate-400">Escolha a Pokébola e a cor de destaque</p>
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-5">
                        <PokemonThemeSelector themeColor={themeColor} onSelectColor={setThemeColor} />
                    </div>
                </section>

                <section className="rounded-2xl border border-rose-500/20 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3.5 sm:pb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
                            <Trash2 size={18} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-white sm:text-lg">Zona de perigo</h2>
                            <p className="text-xs text-slate-400">Exclusão permanente da conta e de todos os dados</p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-xl text-xs leading-relaxed text-slate-400">Apaga perfil, coleção, binder, preferências e o vínculo de login com o Google neste app. Esta ação não pode ser desfeita.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setDeleteConfirmText("");
                                setIsDeleteModalOpen(true);
                            }}
                            disabled={isDeletingAccount || isLoggingOut}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2.5 text-xs font-bold text-rose-300 transition-all hover:border-rose-500/60 hover:bg-rose-500/25 hover:text-rose-100 disabled:opacity-50"
                        >
                            <Trash2 size={15} />
                            <span>Excluir conta</span>
                        </button>
                    </div>
                </section>
            </main>

            {isDeleteModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget && !isDeletingAccount) {
                            setIsDeleteModalOpen(false);
                            setDeleteConfirmText("");
                        }
                    }}
                >
                    <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-rose-500/30 bg-[#141722] p-6 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
                                <Trash2 size={22} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Excluir conta permanentemente?</h3>
                                <p className="text-xs text-slate-400">Todos os seus dados serão apagados.</p>
                            </div>
                        </div>

                        <p className="text-xs leading-relaxed text-slate-300">
                            Isso remove seu perfil, todas as cartas da coleção e do binder, preferências e a sessão vinculada ao Google. Digite <strong className="text-white">EXCLUIR</strong> para confirmar.
                        </p>

                        <label className="flex flex-col gap-1.5">
                            <span className="sr-only">Confirmação</span>
                            <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} disabled={isDeletingAccount} autoComplete="off" spellCheck={false} placeholder="EXCLUIR" className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm font-semibold tracking-wide text-white outline-none transition-colors placeholder:text-slate-600 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 disabled:opacity-50" />
                        </label>

                        <div className="mt-1 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setDeleteConfirmText("");
                                }}
                                disabled={isDeletingAccount}
                                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50"
                            >
                                Cancelar
                            </button>

                            <button type="button" onClick={handleDeleteAccount} disabled={isDeletingAccount || deleteConfirmText.trim().toUpperCase() !== "EXCLUIR"} className="flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50">
                                {isDeletingAccount && <Loader2 size={14} className="animate-spin" />}
                                <span>{isDeletingAccount ? "Excluindo..." : "Sim, excluir conta"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
