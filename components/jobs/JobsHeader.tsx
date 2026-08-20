"use client";

import { Briefcase, IndianRupee, Sparkles, MapPin } from "lucide-react";

interface JobsHeaderProps {
    openCount: number;
    totalPayout: number;
}

export default function JobsHeader({ openCount, totalPayout }: JobsHeaderProps) {
    return (
        <header className="liquid-glass rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300">
            {/* Ambient subtle glow inside card */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/[0.03] blur-2xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-3.5 py-1 text-xs font-body text-white/70 mb-3">
                        <Sparkles size={13} className="text-white/60 animate-pulse" />
                        <span>Worker Dispatch & Gig Board</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-heading italic text-white tracking-tight leading-tight">
                        Nearby Cleanup Jobs
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-white/50 font-body font-light max-w-lg leading-relaxed">
                        Claim open waste hotspots near your GPS coordinates. Complete the cleanup, submit proof, and receive instant payouts.
                    </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                    {/* Jobs count badge */}
                    <div className="liquid-glass rounded-2xl p-3.5 px-4 flex flex-col min-w-[130px]">
                        <span className="text-[10px] uppercase font-body font-semibold tracking-wider text-white/40">
                            Available Jobs
                        </span>
                        <div className="mt-1 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-2xl font-heading italic text-white tracking-tight leading-none">
                                {openCount} Open
                            </span>
                        </div>
                    </div>

                    {/* Total Pool badge */}
                    <div className="liquid-glass rounded-2xl p-3.5 px-4 flex flex-col min-w-[140px]">
                        <span className="text-[10px] uppercase font-body font-semibold tracking-wider text-white/40">
                            Reward Pool
                        </span>
                        <div className="mt-1 flex items-center gap-1 text-2xl font-heading italic text-white tracking-tight leading-none">
                            <IndianRupee size={18} strokeWidth={2} />
                            <span>{totalPayout}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}