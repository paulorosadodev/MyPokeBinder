import { CollectionGridSkeleton } from "@/components/loading/CollectionGridSkeleton";

export default function CollectionLoading() {
    return (
        <div className="flex min-h-screen flex-col animate-pulse">
            <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <div className="h-8 w-48 sm:h-9 sm:w-56 rounded-xl bg-white/10" />
                    </div>
                    <div className="h-10 w-40 rounded-xl bg-poke-blue/40" />
                </div>

                <div className="relative z-30 flex flex-col gap-0 rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 shadow-xl backdrop-blur-md sm:p-3.5">
                    <div className="flex items-center gap-2">
                        <div className="h-9 sm:h-10 flex-1 rounded-xl bg-white/5 border border-white/10" />
                        <div className="h-9 sm:h-10 w-24 rounded-xl bg-white/5 border border-white/10" />
                    </div>
                </div>

                <CollectionGridSkeleton count={18} />
            </main>
        </div>
    );
}
