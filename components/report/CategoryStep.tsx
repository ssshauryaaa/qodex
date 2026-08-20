"use client";

import { Check, Droplets, PackageX, AlertTriangle, Sparkles, IndianRupee, Zap, ShieldAlert } from "lucide-react";
import { CATEGORY_OPTIONS, type Category } from "@/lib/types";

const ICONS: Record<Category, React.ElementType> = {
  overflow: PackageX,
  illegal_dump: AlertTriangle,
  drain_block: Droplets,
};

const ICON_STYLES: Record<Category, { bg: string; text: string; badge: string; payout: number }> = {
  overflow: { bg: "bg-status-claimed-light", text: "text-status-claimed", badge: "Low Severity", payout: 50 },
  illegal_dump: { bg: "bg-status-open-light", text: "text-status-open", badge: "High Severity", payout: 150 },
  drain_block: { bg: "bg-teal-light", text: "text-teal", badge: "Medium Severity", payout: 90 },
};

interface CategoryStepProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export default function CategoryStep({ selected, onSelect }: CategoryStepProps) {
  return (
    <div className="animate-fade-in-up space-y-4">
      {/* Header section with status pill */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-marigold-light px-3 py-1 text-xs font-semibold text-marigold-dark">
            <Sparkles size={13} className="animate-pulse text-marigold" />
            <span>AI Category Matcher</span>
          </div>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-ink">
            What type of waste hotspot is this?
          </h2>
          <p className="text-xs text-stone">
            Select the matching category to lock in the verified community payout.
          </p>
        </div>
      </div>

      {/* AI Smart Suggestion Banner */}
      <div className="flex items-center gap-2 rounded-xl border border-marigold/30 bg-marigold-light/40 px-3.5 py-2 text-xs text-marigold-dark">
        <Zap size={15} className="shrink-0 text-marigold" />
        <span>
          <span className="font-bold">AI Suggestion:</span> Matches <span className="underline font-semibold">Overflowing Bin</span> (96% vision match).
        </span>
      </div>

      {/* Category Selection Cards */}
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
              className={`group relative flex flex-col justify-between rounded-2xl border-2 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected
                  ? "border-marigold bg-gradient-to-b from-marigold-light/20 to-white shadow-md ring-2 ring-marigold/20"
                  : "border-stone-light/60 hover:border-marigold/40"
              }`}
            >
              {isSelected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 animate-pop items-center justify-center rounded-full bg-marigold text-white shadow-xs">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${style.bg}`}
                  >
                    <Icon size={19} className={style.text} strokeWidth={1.75} />
                  </div>
                  <span className="text-[10px] font-bold text-stone uppercase tracking-wider">
                    {style.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-bold text-ink group-hover:text-marigold transition-colors">
                    {option.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-stone line-clamp-2">
                    {option.description}
                  </p>
                </div>
              </div>

              {/* Payout Tag */}
              <div className="mt-3 flex items-center justify-between border-t border-stone-light/40 pt-2 text-xs">
                <span className="text-[11px] text-stone">Payout:</span>
                <span className="flex items-center font-bold text-teal">
                  <IndianRupee size={12} />
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
