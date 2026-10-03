export function BinderShelfGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="relative flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#10131b]/70">
                    <div className="relative w-full aspect-[264/372] rounded-t-[19px] bg-white/[0.04] border-b border-white/5" />
                    <div className="flex flex-1 flex-col justify-between p-4 gap-4">
                        <div className="flex items-center justify-between gap-2">
                            <div className="h-5 w-3/4 rounded bg-white/10" />
                            <div className="h-7 w-7 rounded-lg bg-white/5 shrink-0" />
                        </div>
                        <div className="flex items-end justify-between border-t border-white/[0.07] pt-3">
                            <div className="h-3 w-24 rounded bg-white/5" />
                            <div className="h-3 w-12 rounded bg-white/5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function BinderShelfSkeleton() {
    return (
        <div className="flex min-h-screen flex-col animate-pulse">
            <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-4 py-6 pb-28 sm:px-6 sm:py-8 md:pb-16">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <div className="h-8 w-44 sm:h-9 sm:w-52 rounded-xl bg-white/10" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="h-8 w-40 rounded-xl bg-white/5 border border-white/10" />
                        <div className="h-10 w-36 rounded-xl bg-poke-blue/40" />
                    </div>
                </div>

                <div className="relative z-20 rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 shadow-xl backdrop-blur-md sm:p-3.5">
                    <div className="h-9 sm:h-10 w-full rounded-xl bg-white/5 border border-white/10" />
                </div>

                <BinderShelfGridSkeleton count={4} />
            </main>
        </div>
    );
}
