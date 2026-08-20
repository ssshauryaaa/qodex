"use client";

import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { CATEGORY_OPTIONS } from "@/lib/types";
import CategoryIllustration from "@/components/report/CategoryIllustration";

const STATUS_BADGE: Record<Hotspot["status"], { bg: string; text: string; label: string }> = {
    open: { bg: "bg-status-open-light", text: "text-status-open", label: "Open Report" },
    claimed: { bg: "bg-status-claimed-light", text: "text-status-claimed", label: "Worker Claimed" },
    resolved: { bg: "bg-status-resolved-light", text: "text-status-resolved", label: "Resolved" },
};

export default function HotspotHero({ hotspot }: { hotspot: Hotspot }) {
    const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
    const status = STATUS_BADGE[hotspot.status];

    return (
        <div className="relative h-64 w-full overflow-hidden sm:h-80 rounded-b-[2.5rem] border-b border-white/80 shadow-lg">
            {/* Custom 3D Category Illustration instead of plain photo placeholder */}
            {category && (
                <CategoryIllustration
                    category={category.id}
                    className="h-full w-full object-cover"
                />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

            <Link
                href="/map"
                aria-label="Back to map"
                className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
            >
                <ArrowLeft size={18} />
            </Link>

            <span className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-md backdrop-blur-md ${status.bg} ${status.text}`}>
                {status.label}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <h1 className="animate-fade-in-up text-xl font-bold sm:text-2xl tracking-tight text-white drop-shadow-md">
                    {category?.label ?? "Reported hotspot"}
                </h1>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-white/90 drop-shadow-xs">
                    <MapPin size={13} className="text-marigold" />
                    <span>{hotspot.ward}, Delhi NCR</span>
                </p>
            </div>
        </div>
    );
}