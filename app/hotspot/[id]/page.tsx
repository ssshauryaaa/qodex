import { notFound } from "next/navigation";
import { SEED_HOTSPOTS } from "@/lib/hotspots";
import HotspotHero from "@/components/hotspot/HotspotHero";
import HotspotMeta from "@/components/hotspot/HotspotMeta";
import HotspotTimeline from "@/components/hotspot/HotspotTimeline";
import HotspotActions from "@/components/hotspot/HotspotActions";
import HotspotLocationCard from "@/components/hotspot/HotspotLocationCard";
import ReportBackground from "@/components/report/ReportBackground";

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
        <div className="relative min-h-dvh bg-sand pb-16 overflow-x-hidden">
            {/* Colorful animated background elements */}
            <ReportBackground />

            <div className="relative z-10 mx-auto w-full max-w-3xl px-3 sm:px-6 pt-24 sm:pt-28">
                {/* Hotspot details card */}
                <div className="rounded-3xl border border-white/80 bg-white/85 shadow-xl backdrop-blur-xl transition-all duration-300 overflow-hidden">
                    <HotspotHero hotspot={hotspot} />

                    <main className="grid w-full gap-4 p-5 sm:p-6">
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