"use client";

import { MapPin, Radio } from "lucide-react";

interface MapHeaderProps {
  total: number;
}

export default function MapHeader({ total }: MapHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white shadow-sm border border-white/10">
        <MapPin size={17} className="text-white/80" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-base font-heading italic text-white tracking-tight leading-none">
            Delhi Hotspot Grid
          </h1>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-body font-semibold text-emerald-300">
            <Radio size={9} className="animate-pulse" />
            <span>LIVE</span>
          </span>
        </div>
        <p className="text-[11px] font-body font-light text-white/50 mt-0.5">
          {total} active community hotspots indexed
        </p>
      </div>
    </div>
  );
}
