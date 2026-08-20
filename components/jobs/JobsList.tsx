"use client";

import { useMemo, useState } from "react";
import type { Hotspot } from "@/lib/hotspots";
import JobsHeader from "./JobsHeader";
import JobsSortBar from "./JobsSortBar";
import JobCard from "./JobCard";
import JobsEmptyState from "./JobsEmptyState";
import ReportBackground from "@/components/report/ReportBackground";

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
        }, 600);
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
        <div className="relative min-h-dvh bg-sand pb-16 overflow-x-hidden">
            {/* Colorful animated background elements */}
            <ReportBackground />

            <main className="relative z-10 mx-auto w-full max-w-3xl px-3 sm:px-6 pt-24 sm:pt-28 space-y-4">
                <JobsHeader openCount={openJobs.length} totalPayout={totalPayout} />

                {/* Glassmorphic Container Card wrapping list and controls */}
                <div className="rounded-3xl border border-white/80 bg-white/85 p-5 sm:p-6 shadow-xl shadow-ink/5 backdrop-blur-xl transition-all duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-light/40">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-stone">Open Jobs Available</h2>
                        <JobsSortBar sortBy={sortBy} onChange={setSortBy} />
                    </div>

                    <div className="mt-4 space-y-3">
                        {openJobs.length === 0 && <JobsEmptyState />}
                        {openJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                hotspot={job}
                                claimed={false}
                                claiming={claimingId === job.id}
                                onClaim={() => handleClaim(job.id)}
                            />
                        ))}
                    </div>
                </div>

                {claimedJobs.length > 0 && (
                    <div className="rounded-3xl border border-white/80 bg-white/85 p-5 sm:p-6 shadow-xl shadow-ink/5 backdrop-blur-xl transition-all duration-300 animate-fade-in-up">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-stone pb-3 border-b border-stone-light/40">
                            Claimed by you
                        </h2>
                        <div className="mt-4 space-y-3">
                            {claimedJobs.map((job) => (
                                <JobCard key={job.id} hotspot={job} claimed claiming={false} onClaim={() => { }} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}