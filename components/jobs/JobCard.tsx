"use client";

import Link from "next/link";
import { MapPin, Clock, IndianRupee, Check, Loader2, Sparkles, ArrowUpRight, ShieldAlert } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { timeAgo } from "@/lib/hotspots";
import { formatDistance } from "@/lib/geo";
import { CATEGORY_OPTIONS, SEVERITY_STYLES } from "@/lib/types";
import CategoryIllustration from "@/components/report/CategoryIllustration";

interface JobCardProps {
  hotspot: Hotspot & { distanceKm: number };
  index: number;
  claimed: boolean;
  claiming: boolean;
  onClaim: () => void;
}

export default function JobCard({ hotspot, index, claimed, claiming, onClaim }: JobCardProps) {
  const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
  const severity = SEVERITY_STYLES[hotspot.severity];
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div className="group relative pt-4 sm:pt-6 transition-all duration-500">
      {/* 
        Giant overlapping background numeral:
        Positioned to stick out behind the top-left of the glass card. 
        The card's backdrop-filter will frost and blur the lower half of the number!
      */}
      <div 
        className="absolute -top-3 left-4 sm:-top-6 sm:left-6 z-0 text-7xl sm:text-8xl md:text-9xl font-heading italic font-bold text-white/[0.08] select-none pointer-events-none tracking-tighter transition-all duration-500 group-hover:text-white/[0.18] group-hover:-translate-y-1.5"
        aria-hidden="true"
      >
        {formattedIndex}
      </div>

      {/* Main Liquid Glass Card */}
      <div className={`relative z-10 liquid-glass rounded-3xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
        claimed 
          ? "ring-1 ring-white/30 brightness-110" 
          : "hover:brightness-105"
      }`}>
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          
          {/* Category Visual Thumbnail */}
          <Link
            href={`/hotspot/${hotspot.id}`}
            className="relative h-24 w-full sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-2xl bg-black/60 border border-white/10 transition-transform duration-500 group-hover:scale-105"
          >
            {category && (
              <CategoryIllustration
                category={category.id}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="text-[10px] font-body font-medium text-white/80 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full">
                {formatDistance(hotspot.distanceKm)}
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
                    Hotspot #{hotspot.id.slice(0, 5)}
                  </span>
                  <span className="liquid-glass rounded-full px-2.5 py-0.5 text-[10px] font-body font-medium text-white/80">
                    {severity.label}
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
              <p className="mt-1 flex items-center gap-1.5 text-xs text-white/60 font-body font-light">
                <MapPin size={12} className="text-white/40 shrink-0" />
                <span>{hotspot.ward} · Delhi Ward Zone</span>
              </p>
            </div>

            {/* Bottom Meta & Action */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1">
              <div>
                <span className="text-[10px] uppercase font-body tracking-wider text-white/40 block">
                  Reward Payout
                </span>
                <div className="flex items-center gap-0.5 text-2xl sm:text-3xl font-heading italic text-white leading-none mt-0.5">
                  <IndianRupee size={18} strokeWidth={2} />
                  <span>{hotspot.payout}</span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {claimed ? (
                  <Link
                    href={`/hotspot/${hotspot.id}`}
                    className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-white text-black px-5 py-2.5 text-xs font-body font-semibold transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-md"
                  >
                    <Check size={14} strokeWidth={2.5} />
                    <span>Finish Cleanup</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onClaim}
                    disabled={claiming}
                    className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full liquid-glass-strong px-5 py-2.5 text-xs font-body font-semibold text-white transition-all hover:brightness-125 hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {claiming ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Sparkles size={13} />
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