"use client";

import { IndianRupee, Sparkles, MapPin, Zap } from "lucide-react";

interface JobsHeaderProps {
    openCount: number;
    totalPayout: number;
}

export default function JobsHeader({ openCount, totalPayout }: JobsHeaderProps) {
    return (
        <header className="liquid-glass rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all duration-500 border border-white/10 shadow-2xl">
            {/* Ambient colorful glow orbs inside card */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="pointer-events-none absolute left-1/3 -bottom-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-3.5 py-1 text-xs font-body text-emerald-300 mb-3 border border-emerald-500/30">
                        <Zap size={13} className="text-emerald-400 animate-pulse" />
                        <span>Live Worker Dispatch · Delhi NCR</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-tight">
                        Nearby Cleanup Jobs
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-white/60 font-body font-light max-w-lg leading-relaxed">
                        Claim open waste hotspots near your GPS coordinates. Upload an after-photo to unlock instant UPI payouts from CSR partner funds.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    {/* Jobs count badge */}
                    <div className="liquid-glass rounded-2xl p-3 sm:p-4 sm:px-5 flex flex-col border border-emerald-500/20 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <span className="text-[9px] sm:text-[10px] uppercase font-body font-semibold tracking-wider text-emerald-300/70">
                            Available Jobs
                        </span>
                        <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
                            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xl sm:text-2xl md:text-3xl font-heading italic text-emerald-300 tracking-tight leading-none">
                                {openCount} Open
                            </span>
                        </div>
                    </div>

                    {/* Total Pool badge */}
                    <div className="liquid-glass rounded-2xl p-3 sm:p-4 sm:px-5 flex flex-col border border-amber-500/20 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                        <span className="text-[9px] sm:text-[10px] uppercase font-body font-semibold tracking-wider text-amber-300/70">
                            Reward Pool
                        </span>
                        <div className="mt-1 flex items-center gap-0.5 text-xl sm:text-2xl md:text-3xl font-heading italic text-amber-300 tracking-tight leading-none">
                            <IndianRupee size={17} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                            <span>{totalPayout}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}