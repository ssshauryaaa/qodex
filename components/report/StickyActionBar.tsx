"use client";

import { ArrowRight, ChevronLeft, Send } from "lucide-react";

interface StickyActionBarProps {
  showBack: boolean;
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
  disabled: boolean;
  isFinalStep: boolean;
}

export default function StickyActionBar({
  showBack,
  onBack,
  onContinue,
  continueLabel = "Continue",
  disabled,
  isFinalStep,
}: StickyActionBarProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 p-2 shadow-lg backdrop-blur-xl">
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 rounded-xl border border-stone-light/60 bg-white px-3.5 py-2.5 text-xs font-semibold text-ink transition-all duration-200 hover:bg-sand active:scale-95 shadow-xs"
        >
          <ChevronLeft size={15} />
          <span>Back</span>
        </button>
      )}

      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-marigold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-marigold-dark hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-light/70 disabled:text-stone disabled:shadow-none"
      >
        <span>{continueLabel}</span>
        {isFinalStep ? (
          <Send size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        ) : (
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    </div>
  );
}
