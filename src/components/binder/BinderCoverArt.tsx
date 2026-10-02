import Image from "next/image";
import { PokemonBallSvg } from "@/components/theme/PokemonBallSvg";
import { getCoverTheme } from "@/lib/binder/themes";
import { getPokemonThemeSelectorSpriteUrl } from "@/lib/pokemon/constants";

interface BinderCoverArtProps {
    name: string;
    coverTheme?: string;
    coverPokemonDexId?: number | null;
    className?: string;
    back?: boolean;
}

export function BinderCoverArt({ name, coverTheme, coverPokemonDexId = null, className = "", back = false }: BinderCoverArtProps) {
    const theme = getCoverTheme(coverTheme);

    return (
        <div
            className={`relative isolate flex aspect-[480/676] min-h-0 w-full flex-col overflow-hidden rounded-[inherit] border border-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_42px_rgba(0,0,0,0.58)] ${className}`}
            style={{
                backgroundColor: theme.primaryColor,
                backgroundImage: `radial-gradient(circle at 12% 8%, rgba(255,255,255,0.2), transparent 24%), radial-gradient(circle at 88% 95%, rgba(0,0,0,0.62), transparent 42%), repeating-linear-gradient(112deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 5px), linear-gradient(145deg, ${theme.primaryColor} 0%, #11131a 58%, #07090d 100%)`,
                containerType: "inline-size",
            }}
        >
            <div className="pointer-events-none absolute inset-[1.1%] rounded-[inherit] border border-white/[0.13]" />
            <div className="pointer-events-none absolute top-0 right-[17%] bottom-0 w-px bg-black/35 shadow-[1px_0_rgba(255,255,255,0.12)]" />
            <div className="pointer-events-none absolute top-0 right-[17%] bottom-0 w-[7%] translate-x-1/2 bg-gradient-to-l from-black/30 to-transparent blur-md" />
            <div className="relative flex h-full min-h-0 flex-col p-[6%]">
                <div className="flex items-center justify-between gap-2">
                    <span />
                    {!back && <PokemonBallSvg ballType={theme.ballType} size={100} className="h-auto w-[9%]" />}
                </div>

                <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center py-[3%] text-center">
                    {!back && coverPokemonDexId ? (
                        <div className="relative flex aspect-square w-[48%] items-center justify-center rounded-full border border-white/25 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_30px_rgba(0,0,0,0.28)]">
                            <Image src={getPokemonThemeSelectorSpriteUrl(coverPokemonDexId)} alt="" width={320} height={320} unoptimized className="h-[92%] w-[92%] object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.56)] [image-rendering:pixelated]" />
                        </div>
                    ) : !back ? (
                        <PokemonBallSvg ballType={theme.ballType} size={320} className="h-auto w-[27%] opacity-80" />
                    ) : null}
                    {!back && (
                        <div className="mt-[4%] w-full px-[4%]">
                            <h2 className="max-w-full break-words font-black leading-tight uppercase text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]" style={{ fontSize: "clamp(0.7rem, 5cqw, 1.5rem)" }}>
                                {name}
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
