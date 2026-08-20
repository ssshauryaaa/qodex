"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";

const HotspotMiniMap = dynamic(() => import("./HotspotMiniMap"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-teal-light text-xs font-medium text-teal-dark">
            Loading map…
        </div>
    ),
});

export default function HotspotLocationCard({ hotspot }: { hotspot: Hotspot }) {
    return (
        <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-stone-light/60 bg-white shadow-sm [animation-delay:140ms]">
            <div className="h-40 w-full">
                <HotspotMiniMap hotspot={hotspot} />
            </div>
            <div className="flex items-center gap-2 p-4">
                <MapPin size={14} className="text-stone" />
                <div>
                    <p className="text-sm font-medium text-ink">{hotspot.ward}</p>
                    <p className="text-xs text-stone">
                        {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}
                    </p>
                </div>
            </div>
        </div>
    );
}