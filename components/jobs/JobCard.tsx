"use client";

import Link from "next/link";
import { MapPin, Clock, IndianRupee, Check, Loader2, Sparkles, ArrowUpRight } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { timeAgo } from "@/lib/hotspots";
import { formatDistance } from "@/lib/geo";
import { CATEGORY_OPTIONS } from "@/lib/types";
import CategoryIllustration from "@/components/report/CategoryIllustration";

interface JobCardProps {
  hotspot: Hotspot & { distanceKm: number };
  index: number;
  claimed: boolean;
  claiming: boolean;
  onClaim: () => void;
}

const CATEGORY_THEMES = {
  overflow: {
    cardGlow: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]",
    numeralColor: "text-amber-500/[0.08] group-hover:text-amber-400/[0.18]",
    categoryBadge: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    payoutColor: "text-amber-400",
  },
  illegal_dump: {
    cardGlow: "hover:border-rose-500/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]",
    numeralColor: "text-rose-500/[0.08] group-hover:text-rose-400/[0.18]",
    categoryBadge: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    payoutColor: "text-rose-400",
  },
  drain_block: {
    cardGlow: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]",
    numeralColor: "text-cyan-500/[0.08] group-hover:text-cyan-400/[0.18]",
    categoryBadge: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
    payoutColor: "text-cyan-400",
  },
};

const SEVERITY_BADGES = {
  high: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
  medium: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  low: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
};

export default function JobCard({ hotspot, index, claimed, claiming, onClaim }: JobCardProps) {
  const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
  const theme = CATEGORY_THEMES[hotspot.category] || CATEGORY_THEMES.overflow;
  const severityBadge = SEVERITY_BADGES[hotspot.severity] || SEVERITY_BADGES.medium;
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div className="group relative pt-4 sm:pt-6 transition-all duration-500">
      {/* 
        Giant overlapping background numeral with category-specific tint
      */}
      <div 
        className={`absolute -top-2 left-3 sm:-top-6 sm:left-6 z-0 text-5xl sm:text-8xl md:text-9xl font-heading italic font-bold select-none pointer-events-none tracking-tighter transition-all duration-500 group-hover:-translate-y-1.5 ${theme.numeralColor}`}
        aria-hidden="true"
      >
        {formattedIndex}
      </div>

      {/* Main Liquid Glass Card */}
      <div className={`relative z-10 liquid-glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500 hover:-translate-y-1 ${
        claimed 
          ? "ring-1 ring-emerald-400/40 bg-emerald-950/10 shadow-[0_0_25px_rgba(52,211,153,0.15)]" 
          : `${theme.cardGlow} hover:brightness-105`
      }`}>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
          
          {/* Category Visual Thumbnail */}
          <Link
            href={`/hotspot/${hotspot.id}`}
            className="relative h-28 sm:h-28 w-full sm:w-28 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-black/60 border border-white/15 transition-transform duration-500 group-hover:scale-105 shadow-md"
          >
            {category && (
              <CategoryIllustration
                category={category.id}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="text-[10px] font-body font-semibold text-emerald-300 bg-black/80 border border-emerald-500/30 px-2 py-0.5 rounded-full backdrop-blur-xs">
                📍 {formatDistance(hotspot.distanceKm)}
              </span>
            </div>
          </Link>

          {/* Details Column */}
          <div className="flex-1 min-w-0 flex flex-col justify-between gap-3 w-full">
            <div>
              {/* Header tags & severity */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="liquid-glass rounded-full px-2.5 py-0.5 text-[10px] font-body text-white/60">
                    #{hotspot.id.slice(0, 5)}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-body font-semibold capitalize backdrop-blur-md ${theme.categoryBadge}`}>
                    {category?.label ?? "Hotspot"}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-body font-semibold capitalize ${severityBadge}`}>
                    {hotspot.severity}
                  </span>
                </div>

                <span className="flex items-center gap-1 text-[11px] font-body text-white/40">
                  <Clock size={11} />
                  <span>Reported {timeAgo(hotspot.hoursAgo)}</span>
                </span>
              </div>

              {/* Title */}
              <Link href={`/hotspot/${hotspot.id}`} className="block mt-2">
                <h3 className="text-xl sm:text-2xl font-heading italic text-white tracking-tight leading-tight hover:text-white/80 transition-colors">
                  {category?.label ?? "Reported hotspot"}
                </h3>
              </Link>

              {/* Location / Ward */}
              <p className="mt-1 flex items-center gap-1.5 text-xs text-white/70 font-body font-light">
                <MapPin size={12} className="text-white/40 shrink-0" />
                <span>{hotspot.ward} · Delhi Ward Zone</span>
              </p>
            </div>

            {/* Bottom Meta & Action */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1">
              <div>
                <span className="text-[10px] uppercase font-body font-medium tracking-wider text-white/40 block">
                  Reward Payout
                </span>
                <div className={`flex items-center gap-0.5 text-2xl sm:text-3xl font-heading italic leading-none mt-0.5 ${theme.payoutColor}`}>
                  <IndianRupee size={18} strokeWidth={2.5} />
                  <span>{hotspot.payout}</span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {claimed ? (
                  <Link
                    href={`/hotspot/${hotspot.id}`}
                    className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-400 text-black px-5 py-2.5 text-xs font-body font-semibold transition-all hover:bg-emerald-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-400/20"
                  >
                    <Check size={14} strokeWidth={2.5} />
                    <span>Finish Cleanup</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onClaim}
                    disabled={claiming}
                    className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-white text-black px-5 py-2.5 text-xs font-body font-semibold transition-all hover:bg-white/90 hover:scale-105 active:scale-95 disabled:opacity-50 shadow-md hover:shadow-xl"
                  >
                    {claiming ? (
                      <Loader2 size={13} className="animate-spin text-black" />
                    ) : (
                      <Sparkles size={13} className="text-amber-600" />
                    )}
                    <span>{claiming ? "Claiming…" : "Claim Job"}</span>
                    <ArrowUpRight size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}