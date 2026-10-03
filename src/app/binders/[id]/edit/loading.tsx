export default function BinderEditLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10] text-slate-100 animate-pulse">
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="h-4 w-32 rounded-md bg-white/10" />
                    <div className="h-4 w-48 rounded-md bg-white/10" />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="flex flex-col gap-6 lg:col-span-7">
                        <div className="flex flex-col gap-2">
                            <div className="h-3.5 w-28 rounded bg-white/5" />
                            <div className="h-10 w-full rounded-xl border border-white/10 bg-white/5" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="h-3.5 w-20 rounded bg-white/5" />
                            <div className="h-20 w-full rounded-xl border border-white/10 bg-white/5" />
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <div className="h-3.5 w-24 rounded bg-white/5" />
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-2">
                                        <div className="h-5 w-5 shrink-0 rounded-full bg-white/10" />
                                        <div className="h-3 w-16 rounded bg-white/5" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="h-3.5 w-32 rounded bg-white/5" />
                            <div className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03]" />
                        </div>

                        <div className="h-20 w-full rounded-xl border border-white/10 bg-white/[0.02] p-4" />

                        <div className="h-28 w-full rounded-xl border border-white/10 bg-white/[0.02] p-4" />

                        <div className="flex flex-col gap-3">
                            <div className="h-16 w-full rounded-xl border border-white/10 bg-white/[0.02] p-3.5" />
                            <div className="h-16 w-full rounded-xl border border-white/10 bg-white/[0.02] p-3.5" />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="h-4 w-24 rounded bg-red-400/20" />
                            <div className="h-9 w-36 rounded-xl bg-poke-blue/40" />
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="rounded-2xl border border-white/10 bg-[#121520]/80 p-5 shadow-xl backdrop-blur-md flex flex-col gap-4">
                            <div className="h-3 w-36 rounded bg-white/10" />
                            <div className="mx-auto aspect-[305/427] w-full max-w-[305px] rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
