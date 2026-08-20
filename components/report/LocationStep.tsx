"use client";

import { useState } from "react";
import { LocateFixed, MapPin, Loader2, Sparkles, Navigation, Copy, Check, ShieldCheck, Zap } from "lucide-react";
import type { Coords } from "@/lib/types";

interface LocationStepProps {
  coords: Coords | null;
  locating: boolean;
  error: string | null;
  onLocate: () => void;
}

const LOCATION_PRESETS = [
  { name: "Karol Bagh", ward: "Ward 84", coords: { lat: 28.6519, lng: 77.1909 } },
  { name: "Lajpat Nagar", ward: "Ward 52", coords: { lat: 28.5677, lng: 77.2431 } },
  { name: "Dwarka Sec 12", ward: "Ward 11", coords: { lat: 28.5921, lng: 77.046 } },
];

export default function LocationStep({ coords, locating, error, onLocate }: LocationStepProps) {
  const [copied, setCopied] = useState(false);

  function copyCoords() {
    if (!coords) return;
    navigator.clipboard.writeText(`${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="animate-fade-in-up space-y-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 liquid-glass rounded-full px-3 py-1 text-xs font-body text-white/70">
          <Sparkles size={12} className="animate-pulse text-white/50" />
          <span>AI GPS Locator</span>
        </div>
        <h2 className="mt-2 text-xl font-heading italic text-white tracking-tight">
          Pin the exact hotspot location
        </h2>
        <p className="text-xs text-white/50 font-body font-light">
          Auto-matches municipal ward & assigns nearest available cleanup team.
        </p>
      </div>

      {/* Map Box */}
      <div className="relative h-48 w-full overflow-hidden rounded-2xl liquid-glass">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Radar sweep while locating */}
        {locating && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,transparent_70%)] animate-pulse" />
        )}

        {/* Center Reticle / Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          {locating ? (
            <div className="flex flex-col items-center gap-2 text-white/70">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Loader2 size={24} className="animate-spin text-white/70" />
              </div>
              <span className="text-xs font-body liquid-glass px-2.5 py-0.5 rounded-full">
                Scanning satellites & GPS fix…
              </span>
            </div>
          ) : coords ? (
            <div className="relative flex flex-col items-center group">
              <span className="absolute -top-3 h-14 w-14 rounded-full bg-white/10 animate-ring-pulse" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 border border-white/30 transition-transform duration-300 group-hover:scale-110">
                <MapPin size={26} className="text-white" fill="rgba(255,255,255,0.5)" strokeWidth={1.5} />
              </div>
              <div className="mt-1 liquid-glass rounded-full px-3 py-1 text-[11px] font-body text-white/80 flex items-center gap-1">
                <Navigation size={10} className="text-white/50" />
                <span>{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-white/40">
              <MapPin size={32} strokeWidth={1.5} />
              <span className="text-xs font-body liquid-glass px-3 py-1 rounded-full text-white/60">
                Tap Detect or select a demo pin below
              </span>
            </div>
          )}
        </div>

        {/* GPS button */}
        <div className="absolute bottom-2.5 right-2.5">
          <button
            type="button"
            onClick={onLocate}
            disabled={locating}
            className="flex items-center gap-1.5 liquid-glass rounded-full px-4 py-2 text-xs font-body font-medium text-white/80 transition-all duration-200 hover:text-white hover:brightness-125 active:scale-95 disabled:opacity-40"
          >
            <LocateFixed size={14} className={locating ? "animate-spin" : ""} />
            <span>{coords ? "Re-detect GPS" : "Detect Location"}</span>
          </button>
        </div>
      </div>

      {/* Preset pins */}
      <div className="liquid-glass rounded-xl p-3">
        <div className="flex items-center justify-between text-[11px] font-body text-white/50 mb-2">
          <span>Or test with a preset location</span>
          <span className="text-white/70 flex items-center gap-1">
            <Zap size={11} /> 1-Tap Pin
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {LOCATION_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                onLocate();
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent("qodex-set-coords", { detail: preset.coords }));
                }, 100);
              }}
              className="flex flex-col items-start liquid-glass rounded-lg p-2 text-left transition-all duration-200 hover:brightness-125 hover:-translate-y-0.5"
            >
              <span className="text-xs font-body font-medium text-white/80 truncate w-full">{preset.name}</span>
              <span className="text-[10px] text-white/40 font-body">{preset.ward}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Coords confirmation bar */}
      {coords && (
        <div className="flex items-center justify-between liquid-glass rounded-xl px-3.5 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-white/60" />
            <span className="font-body font-medium text-white/80">Ward Indexing Matched</span>
          </div>
          <button
            type="button"
            onClick={copyCoords}
            className="flex items-center gap-1 liquid-glass rounded-md px-2.5 py-1 text-[11px] font-body text-white/60 hover:text-white transition-colors"
          >
            {copied ? <Check size={12} className="text-white" /> : <Copy size={12} />}
            <span>{copied ? "Copied" : "Copy GPS"}</span>
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-400/80 font-body font-light px-1">{error}</p>
      )}
    </div>
  );
}
