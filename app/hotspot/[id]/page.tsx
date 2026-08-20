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
        <div className="relative min-h-dvh bg-black pb-24 overflow-x-hidden">
            {/* Atmospheric background glows */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent blur-3xl" />
                <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-white/[0.03] to-transparent blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-2xl px-4 sm:px-6 pt-24 sm:pt-28 space-y-4">
                {/* Main glass card */}
                <div className="liquid-glass rounded-3xl overflow-hidden">
                    <HotspotHero hotspot={hotspot} />

                    <main className="grid w-full gap-3 p-5 sm:p-6">
                        <HotspotMeta hotspot={hotspot} />
                        <HotspotActions hotspot={hotspot} />
                        <HotspotTimeline hotspot={hotspot} />
                        <HotspotLocationCard hotspot={hotspot} />
                    </main>
                </div>
            </div>
        </div>
    );
}