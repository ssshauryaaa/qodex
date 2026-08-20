"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";

const HotspotMiniMap = dynamic(() => import("./HotspotMiniMap"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs font-body font-light text-white/40">
            Loading map…
        </div>
    ),
});

export default function HotspotLocationCard({ hotspot }: { hotspot: Hotspot }) {
    return (
        <div className="animate-fade-in-up overflow-hidden liquid-glass rounded-2xl [animation-delay:140ms]">
            <div className="h-40 w-full">
                <HotspotMiniMap hotspot={hotspot} />
            </div>
            <div className="flex items-center gap-2 p-4 border-t border-white/10">
                <MapPin size={14} className="text-white/40" />
                <div>
                    <p className="text-sm font-body font-medium text-white/90">{hotspot.ward}</p>
                    <p className="text-xs font-body font-light text-white/40">
                        {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}
                    </p>
                </div>
            </div>
        </div>
    );
}