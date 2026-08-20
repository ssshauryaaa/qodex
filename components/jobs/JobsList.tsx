"use client";

import { useMemo, useState } from "react";
import type { Hotspot } from "@/lib/hotspots";
import JobsHeader from "./JobsHeader";
import JobsSortBar from "./JobsSortBar";
import JobCard from "./JobCard";
import JobsEmptyState from "./JobsEmptyState";

type SortKey = "distance" | "payout";

interface JobWithDistance extends Hotspot {
    distanceKm: number;
}

interface JobsListProps {
    initialJobs: JobWithDistance[];
}

export default function JobsList({ initialJobs }: JobsListProps) {
    const [sortBy, setSortBy] = useState<SortKey>("distance");
    const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set());
    const [claimingId, setClaimingId] = useState<string | null>(null);

    function handleClaim(id: string) {
        setClaimingId(id);
        setTimeout(() => {
            setClaimedIds((prev) => new Set(prev).add(id));
            setClaimingId(null);
        }, 500);
    }

    const openJobs = useMemo(
        () =>
            initialJobs
                .filter((j) => !claimedIds.has(j.id))
                .sort((a, b) => (sortBy === "distance" ? a.distanceKm - b.distanceKm : b.payout - a.payout)),
        [initialJobs, claimedIds, sortBy]
    );

    const claimedJobs = useMemo(
        () => initialJobs.filter((j) => claimedIds.has(j.id)),
        [initialJobs, claimedIds]
    );

    const totalPayout = openJobs.reduce((sum, j) => sum + j.payout, 0);

    return (
        <div className="relative min-h-screen bg-black text-white pb-24 overflow-x-hidden selection:bg-white selection:text-black">
            {/* Atmospheric Background Glows & Grid */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent blur-3xl" />
                <div className="absolute top-1/2 -left-32 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-white/[0.03] to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-white/[0.02] to-transparent blur-3xl" />
                {/* Subtle dark dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>

            {/* Main Content with top clearance for AppNavbar */}
            <main className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 pt-24 sm:pt-28 space-y-6">

                {/* Header & Stats */}
                <JobsHeader openCount={openJobs.length} totalPayout={totalPayout} />

                {/* Control & Sorting Bar */}
                <div className="flex items-center justify-between px-2 pt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-body font-semibold tracking-wider text-white/40">
                            Available Hotspots
                        </span>
                        <span className="liquid-glass rounded-full px-2 py-0.5 text-[10px] font-body text-white/70">
                            {openJobs.length}
                        </span>
                    </div>
                    <JobsSortBar sortBy={sortBy} onChange={setSortBy} />
                </div>

                {/* Open Jobs List with Overlapping Numerals */}
                <div className="space-y-4">
                    {openJobs.length === 0 && <JobsEmptyState />}
                    {openJobs.map((job, idx) => (
                        <JobCard
                            key={job.id}
                            hotspot={job}
                            index={idx + 1}
                            claimed={false}
                            claiming={claimingId === job.id}
                            onClaim={() => handleClaim(job.id)}
                        />
                    ))}
                </div>

                {/* Claimed Jobs Section */}
                {claimedJobs.length > 0 && (
                    <div className="pt-8 space-y-4">
                        <div className="flex items-center justify-between px-2 border-t border-white/10 pt-6">
                            <div className="flex items-center gap-2">
                                <span className="text-xs uppercase font-body font-semibold tracking-wider text-white/60">
                                    Claimed by You
                                </span>
                                <span className="liquid-glass rounded-full px-2 py-0.5 text-[10px] font-body text-white/90 bg-white/10">
                                    {claimedJobs.length} Active
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {claimedJobs.map((job, idx) => (
                                <JobCard
                                    key={job.id}
                                    hotspot={job}
                                    index={idx + 1}
                                    claimed
                                    claiming={false}
                                    onClaim={() => { }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}