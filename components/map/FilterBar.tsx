"use client";

import type { HotspotStatus } from "@/lib/hotspots";

type FilterValue = "all" | HotspotStatus;

const FILTERS: { id: FilterValue; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "claimed", label: "Claimed" },
  { id: "resolved", label: "Resolved" },
];

const ACTIVE_STYLES: Record<FilterValue, string> = {
  all: "bg-ink text-white shadow-xs",
  open: "bg-status-open text-white shadow-xs",
  claimed: "bg-status-claimed text-ink shadow-xs",
  resolved: "bg-status-resolved text-white shadow-xs",
};

const DOT_STYLES: Record<FilterValue, string> = {
  all: "bg-ink",
  open: "bg-status-open",
  claimed: "bg-status-claimed",
  resolved: "bg-status-resolved",
};

interface FilterBarProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<HotspotStatus, number>;
  total: number;
}

export default function FilterBar({ value, onChange, counts, total }: FilterBarProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
      {FILTERS.map((f) => {
        const isActive = value === f.id;
        const count = f.id === "all" ? total : counts[f.id];
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
              isActive
                ? `${ACTIVE_STYLES[f.id]} scale-105`
                : "bg-sand/70 border border-stone-light/40 text-stone hover:bg-white hover:text-ink"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : DOT_STYLES[f.id]}`} />
            <span>{f.label}</span>
            <span className={`text-[10px] ${isActive ? "opacity-80" : "text-stone"}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
}
