"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import MapHeader from "@/components/map/MapHeader";
import FilterBar from "@/components/map/FilterBar";
import MapLegend from "@/components/map/MapLegend";
import MapEcoWidget from "@/components/map/MapEcoWidget";
import HotspotDetailPanel from "@/components/map/HotspotDetailPanel";
import { SEED_HOTSPOTS, type Hotspot, type HotspotStatus } from "@/lib/hotspots";

const MapCanvas = dynamic(() => import("@/components/map/MapCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-2 text-white">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                <span className="text-xs font-body font-light tracking-wide text-white/60">Syncing Delhi Hotspot Grid…</span>
            </div>
        </div>
    ),
});

type FilterValue = "all" | HotspotStatus;

export default function MapPage() {
    const [statusFilter, setStatusFilter] = useState<FilterValue>("all");
    const [selected, setSelected] = useState<Hotspot | null>(null);

    const filtered = useMemo(
        () => statusFilter === "all"
            ? SEED_HOTSPOTS
            : SEED_HOTSPOTS.filter((h) => h.status === statusFilter),
        [statusFilter]
    );

    const counts = useMemo(() => ({
        open: SEED_HOTSPOTS.filter((h) => h.status === "open").length,
        claimed: SEED_HOTSPOTS.filter((h) => h.status === "claimed").length,
        resolved: SEED_HOTSPOTS.filter((h) => h.status === "resolved").length,
    }), []);

    const totalPayout = useMemo(
        () => SEED_HOTSPOTS.filter((h) => h.status === "open").reduce((acc, h) => acc + h.payout, 0),
        []
    );

    return (
        <div className="relative h-dvh w-full bg-black overflow-hidden select-none">

            {/* ── Layer 0: Full-bleed Leaflet Map ── */}
            <div className="absolute inset-0 z-0">
                <MapCanvas hotspots={filtered} onSelect={setSelected} selectedId={selected?.id ?? null} />
            </div>

            {/* ── Layer 30: Top Floating Control Dock with responsive positioning ── */}
            <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-3xl rounded-3xl liquid-glass px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xl backdrop-blur-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 animate-fade-in-up">
                <MapHeader total={SEED_HOTSPOTS.length} />

                <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
                    <div className="min-w-0 w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
                        <FilterBar value={statusFilter} onChange={setStatusFilter} counts={counts} total={SEED_HOTSPOTS.length} />
                    </div>
                </div>
            </div>

            {/* ── Layer 30: Bottom-left Legend Stats Card (hidden on mobile if a hotspot is selected) ── */}
            <div className={`absolute bottom-5 sm:bottom-6 left-3 sm:left-4 z-30 transition-opacity duration-300 ${
                selected ? "opacity-0 pointer-events-none hidden sm:block sm:opacity-100 sm:pointer-events-auto" : "opacity-100"
            }`}>
                <MapLegend counts={counts} />
            </div>

            {/* ── Layer 30: Bottom-right Eco Widget (hidden on mobile if a hotspot is selected) ── */}
            <div className={`absolute bottom-5 sm:bottom-6 right-3 sm:right-4 z-30 hidden sm:block transition-opacity duration-300 ${
                selected ? "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto" : "opacity-100"
            }`}>
                <MapEcoWidget totalPayout={totalPayout} />
            </div>

            {/* ── Layer 40: Hotspot Detail Inspector ── */}
            <HotspotDetailPanel hotspot={selected} onClose={() => setSelected(null)} />
        </div>
    );
}