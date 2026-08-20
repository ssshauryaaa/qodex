"use client";

import Link from "next/link";
import { PartyPopper, ArrowUpRight } from "lucide-react";

export default function JobsEmptyState() {
    return (
        <div className="animate-fade-in-up flex flex-col items-center gap-3 liquid-glass rounded-3xl px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white shadow-inner">
                <PartyPopper size={26} strokeWidth={1.5} />
            </span>
            <h3 className="text-2xl font-heading italic text-white tracking-tight">All caught up</h3>
            <p className="max-w-sm text-xs sm:text-sm text-white/50 font-body font-light leading-relaxed">
                No open cleanup jobs near your coordinates right now. Check back shortly as citizens report new hotspots.
            </p>
            <div className="mt-2 flex items-center gap-3">
                <Link 
                    href="/map" 
                    className="flex items-center gap-1.5 liquid-glass rounded-full px-4 py-2 text-xs font-body font-medium text-white/80 hover:text-white transition-all"
                >
                    <span>View Live Map</span>
                    <ArrowUpRight size={13} />
                </Link>
                <Link 
                    href="/report" 
                    className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 text-xs font-body font-semibold text-black hover:bg-white/90 transition-all"
                >
                    <span>Report Hotspot</span>
                </Link>
            </div>
        </div>
    );
}