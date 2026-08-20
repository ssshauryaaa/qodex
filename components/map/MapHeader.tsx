"use client";

import { Sparkles, MapPin, Radio } from "lucide-react";

interface MapHeaderProps {
  total: number;
}

export default function MapHeader({ total }: MapHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-white shadow-sm">
        <MapPin size={18} className="text-marigold" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold tracking-tight text-ink">
            Delhi Hotspot Grid
          </h1>
          <span className="flex items-center gap-1 rounded-full bg-status-resolved-light px-2.5 py-0.5 text-[10px] font-bold text-status-resolved">
            <Radio size={10} className="animate-pulse" />
            <span>LIVE</span>
          </span>
        </div>
        <p className="text-[11px] font-medium text-stone">
          {total} active community hotspots indexed
        </p>
      </div>
    </div>
  );
}
