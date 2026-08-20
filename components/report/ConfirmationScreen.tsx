"use client";

import { CheckCircle2, IndianRupee, MapPinned, RefreshCcw } from "lucide-react";
import { CATEGORY_OPTIONS, SEVERITY_STYLES, type Category, type TriageResult } from "@/lib/types";

interface ConfirmationScreenProps {
  category: Category;
  triage: TriageResult;
  onReportAnother: () => void;
}

export default function ConfirmationScreen({
  category,
  triage,
  onReportAnother,
}: ConfirmationScreenProps) {
  const categoryLabel = CATEGORY_OPTIONS.find((c) => c.id === category)?.label ?? "";
  const severityStyle = SEVERITY_STYLES[triage.severity];

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="relative mb-5 flex h-20 w-20 animate-pop items-center justify-center rounded-full bg-white/10">
        <span className="absolute inset-0 rounded-full bg-white/5 animate-ring-pulse" />
        <CheckCircle2
          size={44}
          className="relative text-white"
          strokeWidth={1.5}
        />
      </div>

      <h2 className="text-xl font-heading italic text-white tracking-tight">Reported and job created</h2>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/60 font-body font-light">
        A nearby worker can now claim this cleanup. You'll be notified the moment it's marked resolved.
      </p>

      <div className="mt-6 w-full max-w-sm animate-fade-in-up liquid-glass rounded-2xl p-5 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-body font-medium uppercase tracking-wide text-white/50">
            Payout for this job
          </span>
          <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold bg-white/10 text-white/80">
            {severityStyle.label}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-3xl font-heading italic text-white tracking-tight">
          <IndianRupee size={22} strokeWidth={2} />
          {triage.payout}
        </div>
        <p className="mt-0.5 text-xs text-white/40 font-body">Sponsored by Swachh Bharat Kosh · CSR partner</p>

        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
          <MapPinned size={15} className="text-white/50" />
          <span className="text-sm text-white/80 font-body">{categoryLabel}</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            Open on live map
          </span>
        </div>
      </div>

      <div className="mt-7 flex w-full max-w-sm flex-col gap-2.5 sm:flex-row">
        <a
          href="/map"
          className="flex flex-1 items-center justify-center gap-1.5 liquid-glass rounded-full px-4 py-3 text-sm font-body font-medium text-white/80 transition-all duration-200 hover:text-white active:scale-95"
        >
          View on live map
        </a>
        <button
          type="button"
          onClick={onReportAnother}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-3 text-sm font-body font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:shadow-md active:scale-95"
        >
          <RefreshCcw size={14} />
          Report another
        </button>
      </div>
    </div>
  );
}
