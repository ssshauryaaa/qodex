"use client";

import Link from "next/link";
import { MapPin, Clock, IndianRupee, Check, Loader2, Sparkles } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { timeAgo } from "@/lib/hotspots";
import { formatDistance } from "@/lib/geo";
import { CATEGORY_OPTIONS, SEVERITY_STYLES } from "@/lib/types";
import CategoryIllustration from "@/components/report/CategoryIllustration";

interface JobCardProps {
  hotspot: Hotspot & { distanceKm: number };
  claimed: boolean;
  claiming: boolean;
  onClaim: () => void;
}

export default function JobCard({ hotspot, claimed, claiming, onClaim }: JobCardProps) {
  const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
  const severity = SEVERITY_STYLES[hotspot.severity];

  return (
    <div className="animate-fade-in-up group relative flex flex-col sm:flex-row gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-marigold/40">
      
      {/* 3D Category Illustration instead of photo placeholder */}
      <Link
        href={`/hotspot/${hotspot.id}`}
        className="relative h-28 w-full sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-stone-light/40 shadow-inner"
      >
        {category && (
          <CategoryIllustration
            category={category.id}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <div className="flex items-center justify-between">
            <Link href={`/hotspot/${hotspot.id}`} className="block">
              <h3 className="truncate text-base font-bold text-ink transition-colors hover:text-marigold">
                {category?.label ?? "Reported hotspot"}
              </h3>
            </Link>
            
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${severity.bg} ${severity.text}`}>
              {severity.label}
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-stone">
            <MapPin size={13} className="text-teal" />
            <span>{hotspot.ward} · {formatDistance(hotspot.distanceKm)}</span>
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-stone-light/45 pt-2.5 text-xs">
          <span className="flex items-center gap-1 text-stone">
            <Clock size={12} />
            <span>Reported {timeAgo(hotspot.hoursAgo)}</span>
          </span>

          <span className="flex items-center gap-0.5 font-extrabold text-teal">
            <IndianRupee size={13} />
            <span>{hotspot.payout}</span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end border-t border-stone-light/30 pt-3 sm:pt-0 sm:border-0 sm:justify-center">
        {claimed ? (
          <Link
            href={`/hotspot/${hotspot.id}`}
            className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-status-claimed-light px-4 py-2.5 text-xs font-bold text-status-claimed shadow-sm transition-transform hover:scale-105"
          >
            <Check size={14} strokeWidth={2.5} />
            <span>FINISH JOB</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={onClaim}
            disabled={claiming}
            className="flex w-full sm:w-auto items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-marigold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-marigold-dark hover:shadow-lg active:scale-95 disabled:opacity-70"
          >
            {claiming ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Sparkles size={13} />
            )}
            <span>{claiming ? "Claiming…" : "Claim Job"}</span>
          </button>
        )}
      </div>
    </div>
  );
}