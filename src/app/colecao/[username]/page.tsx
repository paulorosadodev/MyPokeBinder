import { PublicCollectionView } from "@/components/profile/PublicCollectionView";

export default async function PublicCollectionPage({ params }: { params: Promise<{ username: string }> }) {
    const { username: raw } = await params;
    const username = decodeURIComponent(raw || "")
        .trim()
        .toLowerCase();
    return <PublicCollectionView username={username} />;
}
