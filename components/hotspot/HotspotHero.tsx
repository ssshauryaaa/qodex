import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { CATEGORY_OPTIONS } from "@/lib/types";

const STATUS_BADGE: Record<Hotspot["status"], { bg: string; text: string; label: string }> = {
    open: { bg: "bg-status-open-light", text: "text-status-open", label: "Open" },
    claimed: { bg: "bg-status-claimed-light", text: "text-status-claimed", label: "Claimed" },
    resolved: { bg: "bg-status-resolved-light", text: "text-status-resolved", label: "Resolved" },
};

export default function HotspotHero({ hotspot }: { hotspot: Hotspot }) {
    const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
    const status = STATUS_BADGE[hotspot.status];

    return (
        <div className="relative h-64 w-full overflow-hidden sm:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={hotspot.photoUrl}
                alt={category?.label ?? "Hotspot"}
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

            <Link
                href="/map"
                aria-label="Back to map"
                className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-sm transition-transform hover:scale-105"
            >
                <ArrowLeft size={18} />
            </Link>

            <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${status.bg} ${status.text}`}>
                {status.label}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                <h1 className="animate-fade-in-up text-xl font-semibold sm:text-2xl">
                    {category?.label ?? "Reported hotspot"}
                </h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-white/85">
                    <MapPin size={13} />
                    {hotspot.ward}
                </p>
            </div>
        </div>
    );
}