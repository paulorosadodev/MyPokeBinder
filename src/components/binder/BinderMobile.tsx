"use client";

import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState, type CSSProperties } from "react";
import { TOTAL_PAGES, SLOTS_PER_PAGE, getPokemonByDexId } from "@/lib/pokemon/constants";
import { resolveBinderPageSwipe } from "@/lib/pokemon/binderOpen";
import { UserSettingsContext } from "@/lib/context/UserSettingsContext";
import { BinderSlot } from "./BinderSlot";
import type { BinderNavigationHandle, BinderViewProps } from "./types";

type MobileView = { page: number; target: number; direction: number; phase: "idle" | "exit" | "enter" };
const clampPage = (page: number) => Math.min(TOTAL_PAGES, Math.max(1, Math.trunc(page) || 1));

export const BinderMobile = forwardRef<BinderNavigationHandle, BinderViewProps>(function BinderMobile({ currentPage, cardsMap, availableCounts = {}, highlightedDexId, droppingDexId, readyToOpen = true, skipOpeningAnimation = false, onEngineReady, onPageChange, onSlotClick, onSwapClick, onReady }, ref) {
    const settings = useContext(UserSettingsContext);
    const animationsEnabled = settings?.animationsEnabled ?? true;
    const [view, setView] = useState<MobileView>(() => ({ page: clampPage(currentPage), target: clampPage(currentPage), direction: 1, phase: "idle" }));
    const viewRef = useRef(view);
    const readyRef = useRef(readyToOpen);
    readyRef.current = readyToOpen;
    const pointerRef = useRef<{ id: number; x: number; y: number } | null>(null);
    const suppressClickRef = useRef(false);
    const busy = view.phase !== "idle";
    const entranceClass = readyToOpen && animationsEnabled && !skipOpeningAnimation ? "binder-mobile--entrance" : "";

    const updateView = useCallback((next: MobileView) => {
        viewRef.current = next;
        setView(next);
    }, []);

    useEffect(() => {
        onEngineReady?.();
    }, [onEngineReady]);

    useEffect(() => {
        if (!readyToOpen) return;
        if (currentPage !== clampPage(currentPage)) onPageChange(clampPage(currentPage));
        onReady?.();
    }, [readyToOpen, currentPage, onPageChange, onReady]);

    const navigate = useCallback(
        (requestedPage: number) => {
            const current = viewRef.current;
            const target = clampPage(requestedPage);
            if (!readyRef.current || current.phase !== "idle" || target === current.page) return;
            if (!animationsEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                updateView({ ...current, page: target, target, phase: "idle" });
                onPageChange(target);
                return;
            }
            updateView({ ...current, target, direction: target > current.page ? 1 : -1, phase: "exit" });
        },
        [animationsEnabled, onPageChange, updateView],
    );

    const finishPhase = useCallback(() => {
        const current = viewRef.current;
        if (current.phase === "exit") {
            updateView({ ...current, page: current.target, phase: "enter" });
            onPageChange(current.target);
        } else if (current.phase === "enter") {
            updateView({ ...current, phase: "idle" });
        }
    }, [onPageChange, updateView]);

    useEffect(() => {
        if (view.phase === "idle") return;
        const timer = window.setTimeout(finishPhase, view.phase === "exit" ? 200 : 240);
        return () => window.clearTimeout(timer);
    }, [view.phase, finishPhase]);

    useEffect(() => {
        navigate(currentPage);
    }, [currentPage, navigate]);

    useImperativeHandle(
        ref,
        () => ({
            flipNext: () => navigate(viewRef.current.page + 1),
            flipPrev: () => navigate(viewRef.current.page - 1),
            turnToPage: navigate,
            getCurrentPageIndex: () => viewRef.current.page - 1,
            isBusy: () => !readyRef.current || viewRef.current.phase !== "idle",
        }),
        [navigate],
    );

    const startSlot = (view.page - 1) * SLOTS_PER_PAGE + 1;

    return (
        <div
            className={`binder-mobile ${readyToOpen ? "" : "invisible"} ${entranceClass}`}
            data-page={view.page}
            data-phase={view.phase}
            aria-busy={busy || !readyToOpen}
            onPointerDownCapture={(event) => {
                suppressClickRef.current = false;
                pointerRef.current = event.isPrimary && !busy ? { id: event.pointerId, x: event.clientX, y: event.clientY } : null;
            }}
            onPointerCancel={() => {
                pointerRef.current = null;
            }}
            onPointerUpCapture={(event) => {
                const start = pointerRef.current;
                pointerRef.current = null;
                if (!start || start.id !== event.pointerId) return;
                const direction = resolveBinderPageSwipe({ dx: event.clientX - start.x, dy: event.clientY - start.y, isBusy: !readyRef.current || viewRef.current.phase !== "idle" });
                if (!direction) return;
                suppressClickRef.current = true;
                navigate(viewRef.current.page + (direction === "next" ? 1 : -1));
            }}
            onClickCapture={(event) => {
                if (!suppressClickRef.current && viewRef.current.phase === "idle") return;
                event.preventDefault();
                event.stopPropagation();
                suppressClickRef.current = false;
            }}
        >
            <div className="mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400">
                <span className="font-medium text-slate-300">
                    Página {view.page} de {TOTAL_PAGES}
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                    #{String(startSlot).padStart(3, "0")} – #{String(Math.min(view.page * SLOTS_PER_PAGE, 151)).padStart(3, "0")}
                </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#161b26] bg-[#0b0e15] p-1.5 shadow-inner">
                <div
                    className="binder-mobile-grid grid h-full min-h-0 grid-cols-3 grid-rows-3 gap-2"
                    data-phase={view.phase}
                    style={{ "--binder-slide-x": `${view.direction * -18}px` } as CSSProperties}
                    inert={busy}
                    onAnimationEnd={(event) => {
                        if (event.target === event.currentTarget) finishPhase();
                    }}
                >
                    {Array.from({ length: SLOTS_PER_PAGE }, (_, index) => {
                        const dexId = startSlot + index;
                        const pokemon = getPokemonByDexId(dexId);
                        const card = cardsMap.get(dexId);
                        return (
                            <BinderSlot
                                key={dexId}
                                dexId={dexId}
                                pokemonName={pokemon?.name ?? ""}
                                card={card}
                                availableCount={availableCounts[dexId] ?? 0}
                                isTrailing={dexId > 151}
                                isHighlighted={highlightedDexId === dexId}
                                isDropping={droppingDexId === dexId}
                                priority
                                pauseTilt={busy}
                                onClick={() => {
                                    if (pokemon) onSlotClick(dexId, pokemon.name, card);
                                }}
                                onSwapClick={card && pokemon && onSwapClick ? () => onSwapClick(dexId, pokemon.name, card) : undefined}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
