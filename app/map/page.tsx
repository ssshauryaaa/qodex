"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import MapHeader from "@/components/map/MapHeader";
import FilterBar from "@/components/map/FilterBar";
import MapLegend from "@/components/map/MapLegend";
import MapEcoWidget from "@/components/map/MapEcoWidget";
import HotspotDetailPanel from "@/components/map/HotspotDetailPanel";
import { SEED_HOTSPOTS, type Hotspot, type HotspotStatus } from "@/lib/hotspots";
import { Plus } from "lucide-react";
import Link from "next/link";

const MapCanvas = dynamic(() => import("@/components/map/MapCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-sand/80">
            <div className="flex flex-col items-center gap-2 text-ink">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-marigold border-t-transparent" />
                <span className="text-xs font-bold tracking-wide">Syncing Delhi Hotspot Grid…</span>
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
        /*
          Key fix: NO overflow-hidden on this root div.
          Leaflet uses transform: translate3d on its layers which creates a new
          containing block, clipping fixed/absolute children when overflow-hidden is set.
          Instead we let the map canvas fill via absolute inset-0, and keep all UI
          overlays as siblings with explicit z-index above the Leaflet z-index band.
        */
        <div className="relative h-dvh w-full bg-sand">

            {/* ── Layer 0: Full-bleed Leaflet Map ── */}
            <div className="absolute inset-0 z-0">
                <MapCanvas hotspots={filtered} onSelect={setSelected} selectedId={selected?.id ?? null} />
            </div>

            {/* ── Layer 30: Top Floating Control Dock (below FloatingNavbar z-50) ── */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-4xl rounded-2xl border border-white/80 bg-white/90 px-3 py-2.5 shadow-xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in-up">
                <MapHeader total={SEED_HOTSPOTS.length} />

                <div className="flex items-center gap-2 min-w-0 max-w-full">
                    <div className="min-w-0 overflow-x-auto no-scrollbar">
                        <FilterBar value={statusFilter} onChange={setStatusFilter} counts={counts} total={SEED_HOTSPOTS.length} />
                    </div>
                    <Link
                        href="/report"
                        className="flex items-center gap-1 shrink-0 rounded-xl bg-marigold px-3 py-1.5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-marigold-dark hover:scale-105 active:scale-95"
                    >
                        <Plus size={14} />
                        <span className="hidden sm:inline">Report</span>
                    </Link>
                </div>
            </div>

            {/* ── Layer 30: Bottom-left Legend Stats Card ── */}
            <div className="absolute bottom-6 left-4 z-30">
                <MapLegend counts={counts} />
            </div>

            {/* ── Layer 30: Bottom-right Eco Widget ── */}
            <div className="absolute bottom-6 right-4 z-30">
                <MapEcoWidget totalPayout={totalPayout} />
            </div>

            {/* ── Layer 40: Hotspot Detail Inspector (sits above all other UI) ── */}
            <HotspotDetailPanel hotspot={selected} onClose={() => setSelected(null)} />
        </div>
    );
}