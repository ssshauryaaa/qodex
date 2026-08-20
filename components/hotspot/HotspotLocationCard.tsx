"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";

const HotspotMiniMap = dynamic(() => import("./HotspotMiniMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs font-body font-light text-white/40">
      Loading interactive map…
    </div>
  ),
});

export default function HotspotLocationCard({ hotspot }: { hotspot: Hotspot }) {
  return (
    <div className="animate-fade-in-up overflow-hidden liquid-glass rounded-2xl [animation-delay:140ms]">
      {/* Map display area */}
      <div className="relative h-44 sm:h-52 w-full bg-neutral-950">
        <HotspotMiniMap hotspot={hotspot} />
      </div>

      {/* Info and action footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-t border-white/10 bg-black/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 shrink-0">
            <MapPin size={14} className="text-white/70" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-body font-semibold text-white truncate">
              {hotspot.ward}
            </p>
            <p className="text-xs font-body font-light text-white/40 truncate">
              {hotspot.lat.toFixed(4)}° N, {hotspot.lng.toFixed(4)}° E · Delhi NCR
            </p>
          </div>
        </div>

        <Link
          href="/map"
          className="inline-flex items-center justify-center gap-1.5 rounded-full liquid-glass-strong px-4 py-2 text-xs font-body font-medium text-white hover:brightness-125 transition-all shadow-sm shrink-0 active:scale-95"
        >
          <span>View on Live Map</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}