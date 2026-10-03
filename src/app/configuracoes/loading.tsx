export default function ConfiguracoesLoading() {
    return (
        <div className="flex min-h-screen flex-col animate-pulse">
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex flex-col gap-3 sm:gap-4">
                    <div>
                        <div className="h-8 w-20 rounded-xl bg-white/10" />
                    </div>
                    <div>
                        <div className="h-8 w-48 sm:h-9 sm:w-56 rounded-xl bg-white/10" />
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 sm:p-6 flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-poke-blue/20" />
                            <div className="flex flex-col gap-1.5">
                                <div className="h-5 w-24 rounded bg-white/10" />
                                <div className="h-3 w-40 rounded bg-white/5" />
                            </div>
                        </div>
                        <div className="hidden sm:block h-9 w-28 rounded-xl bg-rose-500/10" />
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                        <div className="flex shrink-0 items-center gap-3.5 lg:w-56 lg:flex-col lg:items-start">
                            <div className="h-16 w-16 rounded-full border border-white/20 bg-white/10" />
                            <div className="flex flex-col gap-1.5">
                                <div className="h-4 w-28 rounded bg-white/10" />
                                <div className="h-3 w-20 rounded bg-poke-blue/20" />
                                <div className="h-2.5 w-32 rounded bg-white/5" />
                            </div>
                        </div>

                        <div className="min-w-0 flex-1 space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="h-14 rounded-xl border border-white/10 bg-black/30" />
                                <div className="h-14 rounded-xl border border-white/10 bg-black/30" />
                            </div>
                            <div className="h-24 rounded-xl border border-white/10 bg-black/30" />
                            <div className="flex justify-end">
                                <div className="h-9 w-32 rounded-xl bg-poke-blue/20" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#12151d]/90 px-4 py-3.5">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-poke-blue/20" />
                            <div className="flex flex-col gap-1.5">
                                <div className="h-4 w-28 rounded bg-white/10" />
                                <div className="h-3 w-36 rounded bg-white/5" />
                            </div>
                        </div>
                        <div className="h-5 w-9 rounded-full bg-white/20" />
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#12151d]/90 px-4 py-3.5">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-poke-blue/20" />
                            <div className="flex flex-col gap-1.5">
                                <div className="h-4 w-32 rounded bg-white/10" />
                                <div className="h-3 w-40 rounded bg-white/5" />
                            </div>
                        </div>
                        <div className="h-5 w-9 rounded-full bg-white/20" />
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 sm:p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <div className="h-9 w-9 rounded-xl bg-poke-blue/20" />
                        <div className="flex flex-col gap-1.5">
                            <div className="h-5 w-36 rounded bg-white/10" />
                            <div className="h-3 w-48 rounded bg-white/5" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-24 rounded-2xl bg-white/5 border border-white/10" />
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-rose-500/20 bg-[#12151d]/90 p-4 sm:p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <div className="h-9 w-9 rounded-xl bg-rose-500/20" />
                        <div className="flex flex-col gap-1.5">
                            <div className="h-5 w-32 rounded bg-white/10" />
                            <div className="h-3 w-56 rounded bg-white/5" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="h-4 w-72 rounded bg-white/5" />
                        <div className="h-9 w-28 rounded-xl bg-rose-500/20" />
                    </div>
                </div>
            </main>
        </div>
    );
}
