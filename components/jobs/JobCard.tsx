"use client";

import Link from "next/link";
import { MapPin, Clock, IndianRupee, Check, Loader2 } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { timeAgo } from "@/lib/hotspots";
import { formatDistance } from "@/lib/geo";
import { CATEGORY_OPTIONS, SEVERITY_STYLES } from "@/lib/types";

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
        <div className="animate-fade-in-up group relative flex gap-3 rounded-2xl border border-stone-light/60 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-4">
            <Link
                href={`/hotspot/${hotspot.id}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={hotspot.photoUrl}
                    alt={category?.label ?? "Hotspot"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <div>
                    <Link href={`/hotspot/${hotspot.id}`} className="block">
                        <h3 className="truncate text-sm font-semibold text-ink transition-colors hover:text-marigold-dark sm:text-base">
                            {category?.label ?? "Reported hotspot"}
                        </h3>
                    </Link>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-stone">
                        <MapPin size={12} />
                        {hotspot.ward} · {formatDistance(hotspot.distanceKm)}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${severity.bg} ${severity.text}`}>
                        {severity.label}
                    </span>
                    <span className="flex items-center gap-0.5 rounded-full bg-sand px-2 py-0.5 text-[10px] font-semibold text-ink">
                        <IndianRupee size={10} />
                        {hotspot.payout}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-stone">
                        <Clock size={10} />
                        {timeAgo(hotspot.hoursAgo)}
                    </span>
                </div>
            </div>

            <div className="flex shrink-0 flex-col items-end justify-center">
                {claimed ? (
                    <Link
                        href={`/hotspot/${hotspot.id}`}
                        className="flex items-center gap-1 whitespace-nowrap rounded-full bg-status-claimed-light px-3 py-1.5 text-xs font-semibold text-status-claimed transition-transform hover:scale-105"
                    >
                        <Check size={13} />
                        Finish job
                    </Link>
                ) : (
                    <button
                        type="button"
                        onClick={onClaim}
                        disabled={claiming}
                        className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-marigold px-3.5 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105 disabled:opacity-70 sm:px-4 sm:py-2 sm:text-sm"
                    >
                        {claiming && <Loader2 size={13} className="animate-spin" />}
                        {claiming ? "Claiming…" : "Claim"}
                    </button>
                )}
            </div>
        </div>
    );
}