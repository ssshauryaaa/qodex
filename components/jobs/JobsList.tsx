"use client";

import { useMemo, useState } from "react";
import { updateHotspotStatus, type Hotspot } from "@/lib/hotspots";
import { useLiveHotspots } from "@/lib/useLiveHotspots";
import { WORKER_LOCATION, distanceKm } from "@/lib/geo";
import JobsHeader from "./JobsHeader";
import JobsSortBar from "./JobsSortBar";
import JobCard from "./JobCard";
import JobsEmptyState from "./JobsEmptyState";

type SortKey = "distance" | "payout";

export default function JobsList({ initialJobs }: { initialJobs?: (Hotspot & { distanceKm: number })[] }) {
    const liveHotspots = useLiveHotspots();
    const [sortBy, setSortBy] = useState<SortKey>("distance");
    const [claimingId, setClaimingId] = useState<string | null>(null);

    // Calculate distances dynamically based on live store
    const allJobsWithDistance = useMemo(() => {
        return liveHotspots.map((h) => ({
            ...h,
            distanceKm: distanceKm(WORKER_LOCATION.lat, WORKER_LOCATION.lng, h.lat, h.lng),
        }));
    }, [liveHotspots]);

    function handleClaim(id: string) {
        setClaimingId(id);
        setTimeout(() => {
            updateHotspotStatus(id, "claimed");
            setClaimingId(null);
        }, 500);
    }

    const openJobs = useMemo(
        () =>
            allJobsWithDistance
                .filter((j) => j.status === "open")
                .sort((a, b) => (sortBy === "distance" ? a.distanceKm - b.distanceKm : b.payout - a.payout)),
        [allJobsWithDistance, sortBy]
    );

    const claimedJobs = useMemo(
        () => allJobsWithDistance.filter((j) => j.status === "claimed"),
        [allJobsWithDistance]
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
            <main className="relative z-10 mx-auto w-full max-w-3xl px-3 sm:px-6 pt-24 sm:pt-28 space-y-5 sm:space-y-6">
                <JobsHeader
                    openCount={openJobs.length}
                    totalPayout={totalPayout}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                    <JobsSortBar
                        sortBy={sortBy}
                        onChange={setSortBy}
                    />
                    <span className="text-xs font-body text-white/50 px-1">
                        {openJobs.length} open cleanups in Delhi NCR
                    </span>
                </div>

                {openJobs.length === 0 && claimedJobs.length === 0 ? (
                    <JobsEmptyState />
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Open Jobs List */}
                        {openJobs.map((job, index) => (
                            <JobCard
                                key={job.id}
                                hotspot={job}
                                index={index + 1}
                                claimed={false}
                                claiming={claimingId === job.id}
                                onClaim={() => handleClaim(job.id)}
                            />
                        ))}

                        {/* Claimed in-progress section */}
                        {claimedJobs.length > 0 && (
                            <div className="pt-8 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                                    <h3 className="text-xs font-body font-semibold uppercase tracking-wider text-white/60">
                                        Your Claimed Jobs ({claimedJobs.length})
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {claimedJobs.map((job, index) => (
                                        <JobCard
                                            key={job.id}
                                            hotspot={job}
                                            index={index + 1}
                                            claimed={true}
                                            claiming={false}
                                            onClaim={() => {}}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}