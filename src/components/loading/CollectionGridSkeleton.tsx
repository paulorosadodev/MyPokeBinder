import { CardGridSkeleton } from "@/components/loading/CardGridSkeleton";

export function CollectionGridSkeleton({ count = 18 }: { count?: number }) {
    return <CardGridSkeleton count={count} />;
}
