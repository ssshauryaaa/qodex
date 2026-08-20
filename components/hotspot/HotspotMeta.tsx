import { IndianRupee, Layers, Hash } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { CATEGORY_OPTIONS, SEVERITY_STYLES } from "@/lib/types";

export default function HotspotMeta({ hotspot }: { hotspot: Hotspot }) {
    const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
    const severity = SEVERITY_STYLES[hotspot.severity];

    return (
        <div className="animate-fade-in-up grid grid-cols-3 gap-3 rounded-2xl border border-stone-light/60 bg-white p-4 shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${severity.bg} ${severity.text}`}>
                    <Layers size={16} />
                </span>
                <span className="text-[11px] font-semibold text-ink">{severity.label}</span>
                <span className="text-[10px] text-stone">Severity</span>
            </div>

            <div className="flex flex-col items-center gap-1 border-x border-stone-light/60 text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold-light text-marigold-dark">
                    <IndianRupee size={16} />
                </span>
                <span className="text-[11px] font-semibold text-ink">₹{hotspot.payout}</span>
                <span className="text-[10px] text-stone">Payout</span>
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-light text-teal-dark">
                    <Hash size={16} />
                </span>
                <span className="text-[11px] font-semibold text-ink">{category?.label ?? "—"}</span>
                <span className="text-[10px] text-stone">Category</span>
            </div>
        </div>
    );
}