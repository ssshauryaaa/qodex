"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BarChart3, TrendingUp, IndianRupee, MapPin, Clock,
  Leaf, ArrowUpRight, CheckCircle2, Circle, AlertTriangle,
  Building2, ChevronDown, ChevronUp, Award
} from "lucide-react";
import { WARD_STATS, CSR_SPONSORS } from "@/lib/demo-data";
import { SEED_HOTSPOTS } from "@/lib/hotspots";

const STAT_COLORS = {
  open: { dot: "bg-red-400", text: "text-red-400", bar: "bg-red-400" },
  claimed: { dot: "bg-amber-400", text: "text-amber-400", bar: "bg-amber-400" },
  resolved: { dot: "bg-emerald-400", text: "text-emerald-400", bar: "bg-emerald-400" },
};

export default function DashboardPage() {
  const [activeWard, setActiveWard] = useState<string | null>(null);

  const globalStats = useMemo(() => ({
    total: SEED_HOTSPOTS.length,
    open: SEED_HOTSPOTS.filter(h => h.status === "open").length,
    claimed: SEED_HOTSPOTS.filter(h => h.status === "claimed").length,
    resolved: SEED_HOTSPOTS.filter(h => h.status === "resolved").length,
    totalPayout: SEED_HOTSPOTS.filter(h => h.status === "open").reduce((a, h) => a + h.payout, 0),
    avgResolutionHours: (SEED_HOTSPOTS
      .filter(h => h.resolutionHours)
      .reduce((a, h) => a + (h.resolutionHours ?? 0), 0) /
      SEED_HOTSPOTS.filter(h => h.resolutionHours).length
    ).toFixed(1),
  }), []);

  const totalAllocated = CSR_SPONSORS.reduce((a, s) => a + s.totalAllocated, 0);
  const totalDisbursed = CSR_SPONSORS.reduce((a, s) => a + s.disbursed, 0);
  const topWard = [...WARD_STATS].sort((a, b) => b.resolved - a.resolved)[0];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/3 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-900/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-white/[0.02] to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-24 sm:pt-28 pb-24 space-y-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-3.5 py-1 text-xs font-body text-white/70 mb-3">
              <Building2 size={12} className="text-emerald-400" />
              <span>ULB & CSR Command Centre</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-none">
              Ward Operations<br />Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 liquid-glass rounded-2xl px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-body text-white/70">Live · Delhi NCR · 16 Hotspots</span>
          </div>
        </div>

        {/* Global stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Hotspots", value: globalStats.total, icon: MapPin, accent: "text-white" },
            { label: "Avg Resolution", value: `${globalStats.avgResolutionHours}h`, icon: Clock, accent: "text-emerald-400" },
            { label: "Open Pool (₹)", value: `₹${globalStats.totalPayout}`, icon: IndianRupee, accent: "text-amber-400" },
            { label: "Resolved", value: globalStats.resolved, icon: CheckCircle2, accent: "text-emerald-400" },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="liquid-glass rounded-2xl p-4 sm:p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-body uppercase tracking-wider text-white/40">{label}</span>
                <Icon size={14} className={`${accent}`} />
              </div>
              <span className={`text-2xl sm:text-3xl font-heading italic tracking-tight leading-none ${accent}`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Status breakdown bar */}
        <div className="liquid-glass rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-body font-semibold text-white/60 uppercase tracking-wider">Hotspot Status Distribution</h2>
            <BarChart3 size={16} className="text-white/40" />
          </div>
          <div className="h-3 w-full rounded-full overflow-hidden flex gap-0.5 mb-4">
            <div className="bg-red-400 h-full transition-all duration-700 rounded-l-full" style={{ width: `${(globalStats.open / globalStats.total) * 100}%` }} />
            <div className="bg-amber-400 h-full transition-all duration-700" style={{ width: `${(globalStats.claimed / globalStats.total) * 100}%` }} />
            <div className="bg-emerald-400 h-full transition-all duration-700 rounded-r-full" style={{ width: `${(globalStats.resolved / globalStats.total) * 100}%` }} />
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {[
              { key: "open", label: "Open", count: globalStats.open },
              { key: "claimed", label: "Claimed / In Progress", count: globalStats.claimed },
              { key: "resolved", label: "Resolved", count: globalStats.resolved },
            ].map(({ key, label, count }) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${STAT_COLORS[key as keyof typeof STAT_COLORS].dot}`} />
                <span className="text-xs font-body text-white/60">{label}</span>
                <span className={`text-xs font-heading italic font-bold ${STAT_COLORS[key as keyof typeof STAT_COLORS].text}`}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Ward leaderboard */}
          <div className="liquid-glass rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5">
              <Award size={16} className="text-amber-400" />
              <h2 className="text-sm font-body font-semibold text-white/60 uppercase tracking-wider">Ward Leaderboard</h2>
            </div>
            <div className="space-y-2">
              {[...WARD_STATS]
                .sort((a, b) => b.resolved - a.resolved)
                .map((ward, i) => {
                  const total = ward.resolved + ward.open;
                  const pct = Math.round((ward.resolved / total) * 100);
                  const isActive = activeWard === ward.ward;
                  return (
                    <div key={ward.ward}>
                      <button
                        type="button"
                        onClick={() => setActiveWard(isActive ? null : ward.ward)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                      >
                        <span className="font-heading italic text-2xl text-white/10 w-7 shrink-0 leading-none">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-body font-medium text-white truncate">{ward.ward}</span>
                            <span className="text-xs font-body text-white/50 shrink-0 ml-2">{ward.avgHours}h avg</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-400/80 transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        <span className="text-xs font-heading italic text-emerald-400 shrink-0">{pct}%</span>
                        {isActive ? <ChevronUp size={14} className="text-white/40 shrink-0" /> : <ChevronDown size={14} className="text-white/40 shrink-0" />}
                      </button>
                      {isActive && (
                        <div className="mx-3 mb-2 p-3 rounded-xl bg-white/5 border border-white/10 space-y-3 animate-fade-in-up">
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <p className="text-[10px] text-white/40 font-body uppercase tracking-wide">Resolved</p>
                              <p className="text-lg font-heading italic text-emerald-400">{ward.resolved}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-white/40 font-body uppercase tracking-wide">Open</p>
                              <p className="text-lg font-heading italic text-red-400">{ward.open}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-white/40 font-body uppercase tracking-wide">Sponsor</p>
                              <p className="text-[11px] font-body text-white/70 leading-tight mt-0.5">{ward.sponsored}</p>
                            </div>
                          </div>
                          <Link
                            href={`/ward/${encodeURIComponent(ward.ward)}`}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-body text-white transition-colors"
                          >
                            <span>Open {ward.ward} Deep Dive</span>
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* CSR Sponsors panel */}
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Leaf size={16} className="text-emerald-400" />
              <h2 className="text-sm font-body font-semibold text-white/60 uppercase tracking-wider">CSR Fund Tracker</h2>
            </div>
            <p className="text-xs text-white/40 font-body font-light mb-5">
              Companies legally required to spend sanitation CSR — tracked with before/after proof.
            </p>

            {/* Total budget ring visual */}
            <div className="flex items-center gap-5 liquid-glass rounded-2xl p-4 mb-5">
              <div className="relative h-16 w-16 shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9155" fill="none"
                    stroke="#34d399" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${(totalDisbursed / totalAllocated) * 100} 100`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-heading italic text-emerald-400">
                  {Math.round((totalDisbursed / totalAllocated) * 100)}%
                </span>
              </div>
              <div>
                <p className="text-[10px] font-body uppercase tracking-wider text-white/40 mb-1">Total CSR Fund Pool</p>
                <p className="text-2xl font-heading italic text-white tracking-tight leading-none">₹{(totalAllocated / 1000).toFixed(0)}K</p>
                <p className="text-xs text-white/50 font-body mt-1">₹{(totalDisbursed / 1000).toFixed(1)}K disbursed across {CSR_SPONSORS.reduce((a, s) => a + s.jobs, 0)} cleanups</p>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {CSR_SPONSORS.map((sponsor) => {
                const pct = Math.round((sponsor.disbursed / sponsor.totalAllocated) * 100);
                return (
                  <div key={sponsor.name} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <span className="font-heading italic text-white text-base">{sponsor.logo}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-body font-medium text-white truncate">{sponsor.name}</span>
                        <span className="text-[10px] font-body text-white/50 shrink-0 ml-1">{sponsor.jobs} jobs</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-400/70 transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-body text-white/50 shrink-0 w-12 text-right">
                      ₹{(sponsor.disbursed / 1000).toFixed(1)}K
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <p className="text-xs text-white/40 font-body">Powered by Swachh Bharat Kosh + Direct CSR</p>
              <div className="flex items-center gap-1 text-xs font-body text-emerald-400">
                <TrendingUp size={12} />
                <span>+18% this month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top performing ward callout */}
        <Link
          href={`/ward/${encodeURIComponent(topWard.ward)}`}
          className="liquid-glass rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:brightness-125 transition-all group active:scale-[0.99]"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400">
            <Award size={28} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-body uppercase tracking-widest text-white/40 mb-1">Top Performing Ward This Week</p>
            <h3 className="text-2xl sm:text-3xl font-heading italic text-white tracking-tight leading-none group-hover:text-emerald-300 transition-colors">
              {topWard.ward} — {topWard.resolved} Cleanups
            </h3>
            <p className="mt-1 text-xs text-white/50 font-body font-light">
              Avg. resolution time of {topWard.avgHours}h · Sponsored by {topWard.sponsored}
            </p>
          </div>
          <div className="flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span className="text-xs font-body text-white/80">View Deep Dive →</span>
          </div>
        </Link>

      </main>
    </div>
  );
}
