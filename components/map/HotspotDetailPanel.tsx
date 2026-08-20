"use client";

import { X, Clock, MapPin, IndianRupee, Sparkles, Navigation } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { timeAgo } from "@/lib/hotspots";
import { CATEGORY_OPTIONS, SEVERITY_STYLES } from "@/lib/types";

const STATUS_BADGE: Record<Hotspot["status"], { bg: string; text: string; label: string }> = {
  open: { bg: "bg-red-500/20", text: "text-red-300", label: "Open Hotspot" },
  claimed: { bg: "bg-amber-500/20", text: "text-amber-300", label: "Worker Claimed" },
  resolved: { bg: "bg-emerald-500/20", text: "text-emerald-300", label: "Resolved" },
};

interface HotspotDetailPanelProps {
  hotspot: Hotspot | null;
  onClose: () => void;
}

export default function HotspotDetailPanel({ hotspot, onClose }: HotspotDetailPanelProps) {
  if (!hotspot) return null;

  const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
  const status = STATUS_BADGE[hotspot.status];
  const severity = SEVERITY_STYLES[hotspot.severity];

  return (
    <div
      key={hotspot.id}
      className="animate-pop absolute bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:bottom-6 sm:translate-x-0 z-40 w-[92%] max-w-sm overflow-hidden rounded-3xl liquid-glass shadow-2xl backdrop-blur-2xl"
    >
      <div className="relative group overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hotspot.photoUrl}
          alt={category?.label ?? "Hotspot"}
          className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:text-white hover:bg-black/90"
        >
          <X size={14} />
        </button>

        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-body font-medium shadow-sm backdrop-blur-md ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-heading italic text-white tracking-tight">{category?.label}</h3>
            <p className="flex items-center gap-1 text-xs text-white/60 font-body font-light mt-0.5">
              <MapPin size={12} className="text-white/40" />
              <span>{hotspot.ward}, Delhi</span>
            </p>
          </div>

          <div className="flex items-center gap-0.5 text-xl font-heading italic text-white">
            <IndianRupee size={15} strokeWidth={2} />
            <span>{hotspot.payout}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs font-body">
          <span className="liquid-glass rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white/80">
            {severity.label}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-white/40">
            <Clock size={11} />
            <span>{timeAgo(hotspot.hoursAgo)}</span>
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          {hotspot.status === "open" ? (
            <button
              type="button"
              onClick={() => alert(`Claimed job #${hotspot.id}! Payout ₹${hotspot.payout} allocated.`)}
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-white text-black py-2 text-xs font-body font-semibold shadow-md transition-all duration-200 hover:bg-white/90 active:scale-95"
            >
              <Sparkles size={13} />
              <span>Claim Job (₹{hotspot.payout})</span>
            </button>
          ) : (
            <a
              href={`https://maps.google.com/?q=${hotspot.lat},${hotspot.lng}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-full liquid-glass py-2 text-xs font-body font-medium text-white/80 transition-all duration-200 hover:text-white"
            >
              <Navigation size={13} />
              <span>Navigate</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
