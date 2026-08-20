import { notFound } from "next/navigation";
import { SEED_HOTSPOTS } from "@/lib/hotspots";
import HotspotHero from "@/components/hotspot/HotspotHero";
import HotspotMeta from "@/components/hotspot/HotspotMeta";
import HotspotTimeline from "@/components/hotspot/HotspotTimeline";
import HotspotActions from "@/components/hotspot/HotspotActions";
import HotspotLocationCard from "@/components/hotspot/HotspotLocationCard";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const hotspot = SEED_HOTSPOTS.find((h) => h.id === id);
    return {
        title: hotspot ? `${hotspot.ward} hotspot — WasteYatra` : "Hotspot not found — WasteYatra",
    };
}

export default async function HotspotPage({ params }: PageProps) {
    const { id } = await params;
    const hotspot = SEED_HOTSPOTS.find((h) => h.id === id);

    if (!hotspot) notFound();

    return (
        <div className="min-h-dvh bg-sand pb-16">
            <HotspotHero hotspot={hotspot} />

            <main className="mx-auto -mt-8 grid w-full max-w-3xl gap-4 px-4 sm:px-6">
                <HotspotMeta hotspot={hotspot} />
                <HotspotActions hotspot={hotspot} />
                <HotspotTimeline hotspot={hotspot} />
                <HotspotLocationCard hotspot={hotspot} />
            </main>
        </div>
    );
}