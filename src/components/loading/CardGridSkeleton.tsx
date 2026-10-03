import { CardImageSkeleton } from "@/components/ui/CardImage";

interface CardGridSkeletonProps {
    count?: number;
    gridClassName?: string;
}

export function CardGridSkeleton({ count = 12, gridClassName = "grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" }: CardGridSkeletonProps) {
    return (
        <div className={`grid auto-rows-fr ${gridClassName}`} aria-hidden="true">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="relative aspect-[8/11] w-full">
                    <CardImageSkeleton />
                </div>
            ))}
        </div>
    );
}
