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
      {/* Header section with status pill */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-teal-dark">
            <Sparkles size={13} className="animate-pulse text-teal" />
            <span>AI GPS Locator</span>
          </div>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-ink">
            Pin the exact hotspot location
          </h2>
          <p className="text-xs text-stone">
            Auto-matches municipal ward & assigns nearest available cleanup team.
          </p>
        </div>
      </div>

      {/* Main Map Box & Interactive Radar Target */}
      <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-stone-light/60 bg-teal-light shadow-inner">
        {/* Abstract Map Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(15,110,86,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15,110,86,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Radar Sweep Effect while locating */}
        {locating && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,110,86,0.2)_0,transparent_70%)] animate-pulse" />
        )}

        {/* Center Reticle / Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          {locating ? (
            <div className="flex flex-col items-center gap-2 text-teal-dark">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-teal/20">
                <Loader2 size={24} className="animate-spin text-teal" />
              </div>
              <span className="text-xs font-medium bg-white/80 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                Scanning satellites & GPS fix…
              </span>
            </div>
          ) : coords ? (
            <div className="relative flex flex-col items-center group">
              <span className="absolute -top-3 h-14 w-14 rounded-full bg-marigold/30 animate-ring-pulse" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border-2 border-marigold transition-transform duration-300 group-hover:scale-110">
                <MapPin size={26} className="text-marigold" fill="#F2872E" strokeWidth={1.5} />
              </div>
              <div className="mt-1 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-xs flex items-center gap-1">
                <Navigation size={11} className="text-marigold" />
                <span>{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-teal-dark/70">
              <MapPin size={32} strokeWidth={1.5} />
              <span className="text-xs font-semibold bg-white/80 px-3 py-1 rounded-full">
                Tap Detect or select a demo pin below
              </span>
            </div>
          )}
        </div>

        {/* GPS Control Floating Action */}
        <div className="absolute bottom-2.5 right-2.5">
          <button
            type="button"
            onClick={onLocate}
            disabled={locating}
            className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:bg-marigold hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            <LocateFixed size={14} className={locating ? "animate-spin" : ""} />
            <span>{coords ? "Re-detect GPS" : "Detect Location"}</span>
          </button>
        </div>
      </div>

      {/* Quick Demo Location Presets */}
      <div className="rounded-xl border border-stone-light/40 bg-white/60 p-3 backdrop-blur-xs">
        <div className="flex items-center justify-between text-[11px] font-medium text-stone mb-2">
          <span>Or test with a preset location</span>
          <span className="text-teal font-semibold flex items-center gap-1">
            <Zap size={11} /> 1-Tap Pin
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {LOCATION_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                // Simulate quick selection
                onLocate();
                setTimeout(() => {
                  // Direct set via event handled in page
                  window.dispatchEvent(new CustomEvent("qodex-set-coords", { detail: preset.coords }));
                }, 100);
              }}
              className="flex flex-col items-start rounded-lg border border-stone-light/60 bg-white p-2 text-left transition-all duration-200 hover:border-teal hover:bg-teal-light/30 hover:-translate-y-0.5"
            >
              <span className="text-xs font-bold text-ink truncate w-full">{preset.name}</span>
              <span className="text-[10px] text-stone">{preset.ward}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Diagnostic & Copy Bar */}
      {coords && (
        <div className="flex items-center justify-between rounded-xl border border-stone-light/60 bg-sand/60 px-3.5 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-status-resolved" />
            <span className="font-semibold text-ink">Ward Indexing Matched</span>
          </div>

          <button
            type="button"
            onClick={copyCoords}
            className="flex items-center gap-1 rounded-md bg-white border border-stone-light/60 px-2.5 py-1 text-[11px] font-medium text-stone hover:text-ink transition-colors"
          >
            {copied ? <Check size={12} className="text-status-resolved" /> : <Copy size={12} />}
            <span>{copied ? "Copied" : "Copy GPS"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
