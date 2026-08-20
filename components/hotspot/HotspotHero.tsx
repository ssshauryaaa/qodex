"use client";

import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { CATEGORY_OPTIONS } from "@/lib/types";
import CategoryIllustration from "@/components/report/CategoryIllustration";

const STATUS_BADGE: Record<Hotspot["status"], { bg: string; label: string }> = {
    open: { bg: "bg-red-500/20 text-red-300", label: "Open Report" },
    claimed: { bg: "bg-amber-500/20 text-amber-300", label: "Worker Claimed" },
    resolved: { bg: "bg-emerald-500/20 text-emerald-300", label: "Resolved" },
};

export default function HotspotHero({ hotspot }: { hotspot: Hotspot }) {
    const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
    const status = STATUS_BADGE[hotspot.status];

    return (
        <div className="relative h-64 w-full overflow-hidden sm:h-80 border-b border-white/10">
            {category && (
                <CategoryIllustration
                    category={category.id}
                    className="h-full w-full object-cover"
                />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <Link
                href="/map"
                aria-label="Back to map"
                className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full liquid-glass text-white/80 shadow-md transition-all hover:text-white hover:scale-110 active:scale-95"
            >
                <ArrowLeft size={17} />
            </Link>

            <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-body font-medium shadow-md backdrop-blur-md ${status.bg}`}>
                {status.label}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h1 className="animate-fade-in-up text-2xl sm:text-3xl font-heading italic text-white tracking-tight leading-tight drop-shadow-md">
                    {category?.label ?? "Reported hotspot"}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-body font-light text-white/70">
                    <MapPin size={12} className="text-white/50" />
                    <span>{hotspot.ward}, Delhi NCR</span>
                </p>
            </div>
        </div>
    );
}