"use client";

import { useLiveHotspot } from "@/lib/useLiveHotspots";
import { SEED_HOTSPOTS, type Hotspot } from "@/lib/hotspots";
import HotspotHero from "@/components/hotspot/HotspotHero";
import HotspotMeta from "@/components/hotspot/HotspotMeta";
import HotspotTimeline from "@/components/hotspot/HotspotTimeline";
import HotspotActions from "@/components/hotspot/HotspotActions";
import HotspotLocationCard from "@/components/hotspot/HotspotLocationCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HotspotDetailClient({ initialId, initialHotspot }: { initialId: string; initialHotspot?: Hotspot }) {
    const liveHotspot = useLiveHotspot(initialId);
    const hotspot = liveHotspot || initialHotspot || SEED_HOTSPOTS.find(h => h.id === initialId) || {
        id: initialId,
        lat: 28.6139,
        lng: 77.209,
        status: "open" as const,
        category: "overflow" as const,
        severity: "medium" as const,
        payout: 90,
        ward: "Delhi NCR",
        hoursAgo: 0.1,
        photoUrl: "https://picsum.photos/seed/user/480/320",
    };

    return (
        <div className="relative min-h-dvh bg-black pb-24 overflow-x-hidden">
            {/* Atmospheric background glows */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent blur-3xl" />
                <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-white/[0.03] to-transparent blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-2xl px-4 sm:px-6 pt-24 sm:pt-28 space-y-4">
                {/* Back button */}
                <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 text-xs font-body text-white/50 hover:text-white transition-colors mb-1"
                >
                    <ArrowLeft size={13} />
                    Back to Jobs
                </Link>

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
