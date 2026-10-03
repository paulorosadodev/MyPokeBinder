export default function CardDetailLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10] text-slate-100">
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex items-center justify-between">
                    <div className="h-9 w-24 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                    <div className="flex flex-col items-center gap-5 md:col-span-5 lg:col-span-4">
                        <div className="relative aspect-[8/11] w-full max-w-[290px] rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl animate-pulse">
                            <div className="h-full w-full rounded-xl bg-gradient-to-b from-white/[0.08] to-transparent" />
                        </div>

                        <div className="h-6 w-44 rounded-full border border-white/5 bg-white/5 animate-pulse" />

                        <div className="flex flex-col items-center gap-2.5">
                            <div className="h-8 w-44 rounded-xl bg-white/10 animate-pulse" />
                            <div className="h-4 w-28 rounded-md bg-white/5 animate-pulse" />
                            <div className="mt-1 flex gap-2">
                                <div className="h-6 w-16 rounded-lg bg-white/5 border border-white/10 animate-pulse" />
                                <div className="h-6 w-20 rounded-lg bg-white/5 border border-white/10 animate-pulse" />
                                <div className="h-6 w-16 rounded-lg bg-white/5 border border-white/10 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 md:col-span-7 lg:col-span-8">
                        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md animate-pulse">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <div className="h-4 w-36 rounded bg-white/10" />
                                <div className="h-5 w-20 rounded-full bg-white/5" />
                            </div>
                            <div className="h-14 w-full rounded-xl bg-white/5" />
                            <div className="h-10 w-full rounded-xl bg-white/10" />
                        </div>

                        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md animate-pulse">
                            <div className="border-b border-white/5 pb-3">
                                <div className="h-4 w-44 rounded bg-white/10" />
                                <div className="mt-1 h-3 w-56 rounded bg-white/5" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="h-3 w-28 rounded bg-white/5" />
                                <div className="h-10 w-full rounded-xl bg-white/5" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="h-3 w-32 rounded bg-white/5" />
                                <div className="h-10 w-full rounded-xl bg-white/5" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="h-3 w-36 rounded bg-white/5" />
                                <div className="h-10 w-full rounded-xl bg-white/5" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md animate-pulse">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <div className="h-4 w-40 rounded bg-white/10" />
                                <div className="h-5 w-10 rounded bg-white/5" />
                            </div>
                            <div className="h-3 w-64 rounded bg-white/5" />
                            <div className="h-12 w-full rounded-xl bg-white/5" />
                        </div>

                        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between animate-pulse">
                            <div className="h-4 w-48 rounded bg-white/5" />
                            <div className="h-9 w-32 rounded-xl bg-red-500/10 border border-red-500/20" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
