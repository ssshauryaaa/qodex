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
    <div className="flex items-center gap-2.5 liquid-glass rounded-2xl p-2">
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-medium text-white/70 font-body transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95"
        >
          <ChevronLeft size={15} />
          <span>Back</span>
        </button>
      )}

      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black font-body transition-all duration-200 hover:bg-white/90 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 disabled:shadow-none"
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
