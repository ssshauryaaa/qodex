"use client";

import { Check, Droplets, PackageX, AlertTriangle, Sparkles, IndianRupee, Zap } from "lucide-react";
import { CATEGORY_OPTIONS, type Category } from "@/lib/types";

const ICONS: Record<Category, React.ElementType> = {
  overflow: PackageX,
  illegal_dump: AlertTriangle,
  drain_block: Droplets,
};

const ICON_STYLES: Record<Category, { badge: string; payout: number }> = {
  overflow:     { badge: "Low Severity",    payout: 50  },
  illegal_dump: { badge: "High Severity",   payout: 150 },
  drain_block:  { badge: "Medium Severity", payout: 90  },
};

interface CategoryStepProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export default function CategoryStep({ selected, onSelect }: CategoryStepProps) {
  return (
    <div className="animate-fade-in-up space-y-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 liquid-glass rounded-full px-3 py-1 text-xs font-body text-white/70">
          <Sparkles size={12} className="animate-pulse text-white/50" />
          <span>AI Category Matcher</span>
        </div>
        <h2 className="mt-2 text-xl font-heading italic text-white tracking-tight">
          What type of waste hotspot is this?
        </h2>
        <p className="text-xs text-white/50 font-body font-light">
          Select the matching category to lock in the verified community payout.
        </p>
      </div>

      {/* AI suggestion banner */}
      <div className="flex items-center gap-2 liquid-glass rounded-xl px-3.5 py-2 text-xs text-white/70">
        <Zap size={14} className="shrink-0 text-white/50" />
        <span className="font-body">
          <span className="font-semibold text-white/90">AI Suggestion:</span> Matches{" "}
          <span className="underline text-white/80">Overflowing Bin</span> (96% vision match).
        </span>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CATEGORY_OPTIONS.map((option) => {
          const Icon = ICONS[option.id];
          const style = ICON_STYLES[option.id];
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`group relative flex flex-col justify-between rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 liquid-glass ${
                isSelected
                  ? "ring-1 ring-white/40 brightness-125"
                  : "hover:brightness-110"
              }`}
            >
              {isSelected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 animate-pop items-center justify-center rounded-full bg-white text-black">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-transform duration-200 group-hover:scale-110">
                    <Icon size={19} className="text-white/80" strokeWidth={1.75} />
                  </div>
                  <span className="text-[10px] font-body font-semibold text-white/40 uppercase tracking-wider">
                    {style.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-heading italic text-white tracking-tight group-hover:text-white/90 transition-colors">
                    {option.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/50 font-body font-light line-clamp-2">
                    {option.description}
                  </p>
                </div>
              </div>

              {/* Payout tag */}
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-xs">
                <span className="text-[11px] text-white/40 font-body">Payout:</span>
                <span className="flex items-center font-heading italic text-white/80">
                  <IndianRupee size={11} />
                  {style.payout}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
