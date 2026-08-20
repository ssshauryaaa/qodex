"use client";

import Link from "next/link";
import { CheckCircle2, IndianRupee, MapPinned, RefreshCcw, ArrowUpRight, Map } from "lucide-react";
import { CATEGORY_OPTIONS, SEVERITY_STYLES, type Category, type TriageResult } from "@/lib/types";

interface ConfirmationScreenProps {
  category: Category;
  triage: TriageResult;
  createdId?: string | null;
  onReportAnother: () => void;
}

export default function ConfirmationScreen({
  category,
  triage,
  createdId,
  onReportAnother,
}: ConfirmationScreenProps) {
  const categoryLabel = CATEGORY_OPTIONS.find((c) => c.id === category)?.label ?? "";
  const severityStyle = SEVERITY_STYLES[triage.severity];

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="relative mb-4 flex h-16 w-16 animate-pop items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
        <span className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ring-pulse" />
        <CheckCircle2
          size={36}
          className="relative text-emerald-400"
          strokeWidth={1.75}
        />
      </div>

      <h2 className="text-2xl font-heading italic text-white tracking-tight leading-tight">
        Report Live & Job Created!
      </h2>
      <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-white/60 font-body font-light">
        Your report was added to the live map and open job queue. Workers in the area have been notified.
      </p>

      {/* Summary card */}
      <div className="mt-5 w-full max-w-sm animate-fade-in-up liquid-glass rounded-2xl p-4 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-body font-medium uppercase tracking-wide text-white/50">
            Assigned Payout
          </span>
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-white/10 text-white/80">
            {severityStyle.label}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-1 text-2xl font-heading italic text-white tracking-tight">
          <IndianRupee size={18} strokeWidth={2} />
          {triage.payout}
        </div>
        <p className="text-[10px] text-white/40 font-body">Funded by CSR Sanitation Pool · Instant release on resolution</p>

        <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
          <MapPinned size={14} className="text-white/50" />
          <span className="text-xs text-white/80 font-body truncate">{categoryLabel}</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            Live on Map
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex w-full max-w-sm flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/map"
            className="flex items-center justify-center gap-1.5 liquid-glass-strong rounded-full px-3 py-2.5 text-xs font-body font-semibold text-white transition-all duration-200 hover:brightness-125 active:scale-95 shadow-sm"
          >
            <Map size={13} />
            <span>View on Map</span>
          </Link>
          <Link
            href={createdId ? `/hotspot/${createdId}` : "/jobs"}
            className="flex items-center justify-center gap-1.5 liquid-glass rounded-full px-3 py-2.5 text-xs font-body font-semibold text-white/90 transition-all duration-200 hover:text-white active:scale-95"
          >
            <span>Job Details</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <button
          type="button"
          onClick={onReportAnother}
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-body font-semibold text-black transition-all duration-200 hover:bg-white/90 active:scale-95 shadow-md"
        >
          <RefreshCcw size={13} />
          Report Another Hotspot
        </button>
      </div>
    </div>
  );
}
