"use client";

import type { HotspotStatus } from "@/lib/hotspots";

type FilterValue = "all" | HotspotStatus;

const FILTERS: { id: FilterValue; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "claimed", label: "Claimed" },
  { id: "resolved", label: "Resolved" },
];

const DOT_STYLES: Record<FilterValue, string> = {
  all: "bg-white",
  open: "bg-red-400",
  claimed: "bg-amber-400",
  resolved: "bg-emerald-400",
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
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-body transition-all duration-200 ${
              isActive
                ? "bg-white text-black font-semibold shadow-md scale-105"
                : "liquid-glass text-white/70 hover:text-white hover:brightness-125"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-black" : DOT_STYLES[f.id]}`} />
            <span>{f.label}</span>
            <span className={`text-[10px] ${isActive ? "text-black/60" : "text-white/40"}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
}
