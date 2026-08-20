"use client";

import { Leaf, TrendingUp } from "lucide-react";

interface MapLegendProps {
  counts: Record<"open" | "claimed" | "resolved", number>;
}

const ROWS = [
  { status: "open" as const, label: "Open", dot: "bg-status-open", ring: "shadow-[0_0_6px_rgba(216,67,47,0.5)]" },
  { status: "claimed" as const, label: "Claimed", dot: "bg-status-claimed", ring: "shadow-[0_0_6px_rgba(240,180,41,0.5)]" },
  { status: "resolved" as const, label: "Resolved", dot: "bg-status-resolved", ring: "shadow-[0_0_6px_rgba(47,158,88,0.5)]" },
] as const;

export default function MapLegend({ counts }: MapLegendProps) {
  const total = counts.open + counts.claimed + counts.resolved;
  const resolvedPct = total > 0 ? Math.round((counts.resolved / total) * 100) : 0;

  return (
    <div className="animate-fade-in-up">
      <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/92 shadow-xl backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-stone-light/30 px-3.5 py-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal text-white">
            <Leaf size={13} />
          </div>
          <span className="text-xs font-bold text-ink">Hotspot Index</span>
        </div>

        {/* Legend Rows */}
        <ul className="space-y-0 px-3.5 py-2">
          {ROWS.map((r) => (
            <li key={r.status} className="flex items-center gap-2.5 py-1">
              <span className={`h-2.5 w-2.5 rounded-full ${r.dot} ${r.ring} shrink-0`} />
              <span className="text-xs text-stone w-14">{r.label}</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="h-1 w-12 overflow-hidden rounded-full bg-sand">
                  <div
                    className={`h-full rounded-full ${r.dot} opacity-80`}
                    style={{ width: `${total > 0 ? (counts[r.status] / total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-ink w-3 text-right">{counts[r.status]}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer stat */}
        <div className="border-t border-stone-light/30 px-3.5 py-2 flex items-center gap-1.5">
          <TrendingUp size={12} className="text-status-resolved" />
          <span className="text-[11px] text-stone">
            <span className="font-bold text-status-resolved">{resolvedPct}%</span> resolved today
          </span>
        </div>
      </div>
    </div>
  );
}
