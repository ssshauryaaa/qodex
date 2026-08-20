"use client";

import { X, Clock, MapPin, IndianRupee, Sparkles, Navigation } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { timeAgo } from "@/lib/hotspots";
import { CATEGORY_OPTIONS, SEVERITY_STYLES } from "@/lib/types";

const STATUS_BADGE: Record<Hotspot["status"], { bg: string; text: string; label: string }> = {
  open: { bg: "bg-status-open-light", text: "text-status-open", label: "Open Hotspot" },
  claimed: { bg: "bg-status-claimed-light", text: "text-status-claimed", label: "Worker Claimed" },
  resolved: { bg: "bg-status-resolved-light", text: "text-status-resolved", label: "Resolved" },
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
      className="animate-pop absolute bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:bottom-6 sm:translate-x-0 z-40 w-[92%] max-w-sm overflow-hidden rounded-3xl border border-white/90 bg-white/95 shadow-2xl backdrop-blur-2xl"
    >
      <div className="relative group overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hotspot.photoUrl}
          alt={category?.label ?? "Hotspot"}
          className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-status-open"
        >
          <X size={14} />
        </button>

        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow-sm backdrop-blur-md ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      <div className="p-3.5 space-y-2.5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-ink">{category?.label}</h3>
            <p className="flex items-center gap-1 text-xs text-stone">
              <MapPin size={12} className="text-teal" />
              <span>{hotspot.ward}, Delhi</span>
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm font-extrabold text-teal">
            <IndianRupee size={14} />
            <span>{hotspot.payout}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-stone-light/40 pt-2 text-xs">
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${severity.bg} ${severity.text}`}>
            {severity.label}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-stone">
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
              className="flex w-full items-center justify-center gap-1 rounded-xl bg-marigold px-3.5 py-2 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-marigold-dark active:scale-95"
            >
              <Sparkles size={13} />
              <span>Claim Job (₹{hotspot.payout})</span>
            </button>
          ) : (
            <a
              href={`https://maps.google.com/?q=${hotspot.lat},${hotspot.lng}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-1 rounded-xl border border-teal/30 bg-teal-light px-3.5 py-2 text-xs font-bold text-teal-dark transition-all duration-200 hover:bg-teal/20"
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
