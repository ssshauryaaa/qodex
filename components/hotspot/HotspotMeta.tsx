import { IndianRupee, Layers, Hash } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";
import { CATEGORY_OPTIONS, SEVERITY_STYLES } from "@/lib/types";

export default function HotspotMeta({ hotspot }: { hotspot: Hotspot }) {
    const category = CATEGORY_OPTIONS.find((c) => c.id === hotspot.category);
    const severity = SEVERITY_STYLES[hotspot.severity];

    return (
        <div className="animate-fade-in-up grid grid-cols-3 gap-0 liquid-glass rounded-2xl overflow-hidden">
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 text-center p-2.5 sm:p-4">
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                    <Layers size={14} className="sm:w-4 sm:h-4" />
                </span>
                <span className="text-[11px] sm:text-xs font-heading italic text-white tracking-tight truncate max-w-full">{severity.label}</span>
                <span className="text-[9px] sm:text-[10px] font-body text-white/40 uppercase tracking-wider">Severity</span>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-1.5 border-x border-white/10 text-center p-2.5 sm:p-4">
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                    <IndianRupee size={14} className="sm:w-4 sm:h-4" />
                </span>
                <span className="text-[11px] sm:text-xs font-heading italic text-white tracking-tight">₹{hotspot.payout}</span>
                <span className="text-[9px] sm:text-[10px] font-body text-white/40 uppercase tracking-wider">Payout</span>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-1.5 text-center p-2.5 sm:p-4">
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                    <Hash size={14} className="sm:w-4 sm:h-4" />
                </span>
                <span className="text-[11px] sm:text-xs font-heading italic text-white tracking-tight truncate max-w-full">{category?.label ?? "—"}</span>
                <span className="text-[9px] sm:text-[10px] font-body text-white/40 uppercase tracking-wider">Category</span>
            </div>
        </div>
    );
}