"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import {
  MapPin, Clock, CheckCircle2, AlertTriangle,
  ArrowLeft, Building2, IndianRupee, TrendingDown,
  Circle, BarChart3
} from "lucide-react";
import { WARD_STATS, WARD_HISTORY, CSR_SPONSORS } from "@/lib/demo-data";
import { SEED_HOTSPOTS } from "@/lib/hotspots";

const SEVERITY_COLORS = {
  High:   { badge: "bg-red-500/10 text-red-400 border-red-500/20",   dot: "bg-red-400"   },
  Medium: { badge: "bg-amber-500/10 text-amber-400 border-amber-500/20", dot: "bg-amber-400" },
  Low:    { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
};

export default function WardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const wardName = decodeURIComponent(id);

  const wardStat = WARD_STATS.find(w => w.ward === wardName);
  if (!wardStat) notFound();

  const history = WARD_HISTORY[wardName] ?? [];
  const liveHotspots = SEED_HOTSPOTS.filter(h => h.ward === wardName);
  const openCount    = liveHotspots.filter(h => h.status === "open").length;
  const claimedCount = liveHotspots.filter(h => h.status === "claimed").length;
  const resolvedCount = wardStat.resolved;

  const sponsor = CSR_SPONSORS.find(s => wardStat.sponsored.includes(s.name.split(" ")[0]));
  const totalInWard = resolvedCount + wardStat.open;
  const resolutionRate = Math.round((resolvedCount / totalInWard) * 100);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-white/[0.03] to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 pt-24 sm:pt-28 pb-24 space-y-6">

        {/* Back */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-body text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Dashboard
        </Link>

        {/* Ward hero */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/[0.02] blur-2xl" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-3 py-1 text-[11px] font-body text-white/60 mb-3">
                <Building2 size={11} className="text-white/40" />
                <span>Ward · Delhi NCR</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-none">
                {wardName}
              </h1>
              <p className="mt-2 text-sm font-body text-white/50">
                Sponsored by <span className="text-white/80">{wardStat.sponsored}</span>
              </p>
            </div>

            {/* Resolution ring */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative h-20 w-20">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#34d399" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${resolutionRate} 100`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-heading italic text-emerald-400 text-lg">
                  {resolutionRate}%
                </span>
              </div>
              <p className="mt-1 text-[10px] font-body text-white/40 text-center">Resolution Rate</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: CheckCircle2, label: "Resolved",  value: resolvedCount, color: "text-emerald-400" },
              { icon: AlertTriangle, label: "Open",     value: wardStat.open, color: "text-red-400"     },
              { icon: Clock,         label: "Avg Hours", value: `${wardStat.avgHours}h`, color: "text-amber-400" },
              { icon: IndianRupee,   label: "Pool (₹)", value: `₹${(resolvedCount * 80 + wardStat.open * 120).toLocaleString()}`, color: "text-white/80" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white/5 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={12} className={color} />
                  <p className="text-[10px] font-body uppercase tracking-wider text-white/40">{label}</p>
                </div>
                <p className={`text-2xl font-heading italic leading-none ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two-col layout: hotspot timeline + CSR panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Hotspot history timeline */}
          <div className="lg:col-span-3 liquid-glass rounded-3xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={14} className="text-white/40" />
              <h2 className="text-xs font-body font-semibold uppercase tracking-wider text-white/50">Hotspot History</h2>
            </div>
            {history.length > 0 ? (
              <div className="relative space-y-0">
                {/* Timeline spine */}
                <div className="absolute left-3.5 top-4 bottom-4 w-px bg-white/10" />
                {history.map((h, i) => {
                  const sev = SEVERITY_COLORS[h.severity as keyof typeof SEVERITY_COLORS];
                  return (
                    <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                      <div className={`relative z-10 mt-1 h-3.5 w-3.5 rounded-full border-2 border-black shrink-0 ${sev.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-body font-medium text-white">{h.category}</span>
                          <span className={`text-[10px] font-body px-2 py-0.5 rounded-full border ${sev.badge}`}>
                            {h.severity}
                          </span>
                          {h.status === "resolved" ? (
                            <span className="text-[10px] font-body text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={10} />
                              Resolved in {h.hoursToResolve}h
                            </span>
                          ) : (
                            <span className="text-[10px] font-body text-red-400 flex items-center gap-1">
                              <Circle size={10} className="fill-red-400" />
                              Still Open
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-body text-white/40">{h.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                <CheckCircle2 size={28} className="text-emerald-400/50" />
                <p className="text-sm font-body text-white/40">No historical data yet.<br />Be the first to report here!</p>
              </div>
            )}

            {/* Live hotspots from seed (if any match) */}
            {liveHotspots.length > 0 && (
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-[10px] font-body uppercase tracking-wider text-white/40 mb-3">Live from Seed Data</p>
                <div className="space-y-2">
                  {liveHotspots.map(h => (
                    <Link
                      key={h.id}
                      href={`/hotspot/${h.id}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className={`h-2 w-2 rounded-full shrink-0 ${
                        h.status === "open" ? "bg-red-400" : h.status === "claimed" ? "bg-amber-400" : "bg-emerald-400"
                      }`} />
                      <span className="text-sm font-body text-white/80 flex-1 capitalize">{h.category.replace("_", " ")}</span>
                      <span className="text-xs font-body text-white/40">₹{h.payout}</span>
                      <span className="text-[10px] font-body text-white/30 capitalize">{h.status}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CSR sponsor panel + trend callout */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* CSR sponsor card */}
            <div className="liquid-glass rounded-3xl p-5 flex-1">
              <p className="text-[10px] font-body uppercase tracking-wider text-white/40 mb-3">Active Sponsor</p>
              {sponsor ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <span className="font-heading italic text-2xl text-white">{sponsor.logo}</span>
                    </div>
                    <div>
                      <p className="text-base font-body font-semibold text-white">{sponsor.name}</p>
                      <p className="text-xs font-body text-white/50">{sponsor.category} · {sponsor.jobs} jobs funded</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-body text-white/40 mb-1.5">
                      <span>CSR Disbursed</span>
                      <span>₹{(sponsor.disbursed / 1000).toFixed(1)}K / ₹{(sponsor.totalAllocated / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-400/70 transition-all duration-500"
                        style={{ width: `${(sponsor.disbursed / sponsor.totalAllocated) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-3 text-center">
                    <p className="text-xs font-body text-white/50 mb-0.5">Compliance Score</p>
                    <p className="text-2xl font-heading italic text-emerald-400">9.4/10</p>
                    <p className="text-[10px] font-body text-white/30 mt-0.5">All 3 cleanups verified with photo proof</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <Building2 size={24} className="text-white/20" />
                  <p className="text-sm font-body text-white/40">No CSR sponsor yet for this ward.</p>
                  <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body text-white/60">
                    Contact district office →
                  </div>
                </div>
              )}
            </div>

            {/* Trend note */}
            <div className="liquid-glass rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown size={14} className="text-emerald-400" />
                <p className="text-[10px] font-body uppercase tracking-wider text-white/40">Trend</p>
              </div>
              <p className="text-sm font-body text-white/70 leading-relaxed">
                Open hotspot count <span className="text-emerald-400 font-semibold">down {Math.round(wardStat.open / (wardStat.open + wardStat.resolved) * 100)}%</span> vs. last week.
                Avg resolution improved by <span className="text-emerald-400 font-semibold">0.8h</span> since CSR funding began.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
