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
        <div className="min-h-dvh bg-sand pb-16">
            <JobsHeader openCount={openJobs.length} totalPayout={totalPayout} />

            <main className="mx-auto -mt-2 w-full max-w-3xl px-4 sm:px-6">
                <div className="mt-4 flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-stone">Open jobs</h2>
                    <JobsSortBar sortBy={sortBy} onChange={setSortBy} />
                </div>

                <div className="mt-3 space-y-2.5">
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

                {claimedJobs.length > 0 && (
                    <div className="animate-fade-in-up mt-8">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-stone">Claimed by you</h2>
                        <div className="mt-3 space-y-2.5">
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