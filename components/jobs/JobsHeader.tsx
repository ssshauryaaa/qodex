"use client";

import { Briefcase, IndianRupee, Sparkles } from "lucide-react";

interface JobsHeaderProps {
    openCount: number;
    totalPayout: number;
}

export default function JobsHeader({ openCount, totalPayout }: JobsHeaderProps) {
    return (
        <header className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-xl backdrop-blur-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-marigold-light text-marigold">
                        <Briefcase size={20} />
                    </span>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-ink">Nearby Cleanup Jobs</h1>
                        <p className="text-xs text-stone">
                            Open hotspots near your current geolocation, prioritized by reward payouts.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-sand border border-stone-light/60 px-3 py-1.5 text-xs font-semibold text-ink flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-marigold animate-pulse" />
                        <span>{openCount} Jobs Open</span>
                    </div>
                    <div className="rounded-full bg-teal-light border border-teal/20 px-3 py-1.5 text-xs font-bold text-teal-dark flex items-center gap-0.5">
                        <IndianRupee size={12} />
                        <span>₹{totalPayout} Total Pool</span>
                    </div>
                </div>
            </div>
        </header>
    );
}