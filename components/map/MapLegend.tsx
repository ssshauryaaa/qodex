"use client";

import { Leaf, TrendingUp } from "lucide-react";

interface MapLegendProps {
  counts: Record<"open" | "claimed" | "resolved", number>;
}

const ROWS = [
  { status: "open" as const, label: "Open", dot: "bg-red-400", ring: "shadow-[0_0_8px_rgba(248,113,113,0.6)]" },
  { status: "claimed" as const, label: "Claimed", dot: "bg-amber-400", ring: "shadow-[0_0_8px_rgba(251,191,36,0.6)]" },
  { status: "resolved" as const, label: "Resolved", dot: "bg-emerald-400", ring: "shadow-[0_0_8px_rgba(52,211,153,0.6)]" },
] as const;

export default function MapLegend({ counts }: MapLegendProps) {
  const total = counts.open + counts.claimed + counts.resolved;
  const resolvedPct = total > 0 ? Math.round((counts.resolved / total) * 100) : 0;

  return (
    <div className="animate-fade-in-up">
      <div className="overflow-hidden rounded-2xl liquid-glass shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-white/10 px-3.5 py-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-white">
            <Leaf size={12} />
          </div>
          <span className="text-xs font-body font-medium text-white/90">Hotspot Index</span>
        </div>

        {/* Legend Rows */}
        <ul className="space-y-0 px-3.5 py-2 font-body">
          {ROWS.map((r) => (
            <li key={r.status} className="flex items-center gap-2.5 py-1">
              <span className={`h-2 w-2 rounded-full ${r.dot} ${r.ring} shrink-0`} />
              <span className="text-xs text-white/60 w-14 font-light">{r.label}</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="h-1 w-12 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${r.dot} opacity-90`}
                    style={{ width: `${total > 0 ? (counts[r.status] / total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-white/90 w-3 text-right">{counts[r.status]}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer stat */}
        <div className="border-t border-white/10 px-3.5 py-2 flex items-center gap-1.5 font-body">
          <TrendingUp size={12} className="text-emerald-400" />
          <span className="text-[11px] text-white/60 font-light">
            <span className="font-semibold text-emerald-400">{resolvedPct}%</span> resolved today
          </span>
        </div>
      </div>
    </div>
  );
}
