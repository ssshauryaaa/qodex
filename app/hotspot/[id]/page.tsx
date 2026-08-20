import { SEED_HOTSPOTS } from "@/lib/hotspots";
import HotspotDetailClient from "@/components/hotspot/HotspotDetailClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const hotspot = SEED_HOTSPOTS.find((h) => h.id === id);
    return {
        title: hotspot ? `${hotspot.ward} hotspot — WasteYatra` : `Hotspot #${id.slice(0, 6)} — WasteYatra`,
    };
}

export default async function HotspotPage({ params }: PageProps) {
    const { id } = await params;
    const initialHotspot = SEED_HOTSPOTS.find((h) => h.id === id);

    return <HotspotDetailClient initialId={id} initialHotspot={initialHotspot} />;
}