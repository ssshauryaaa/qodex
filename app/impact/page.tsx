"use client";

import { useState, useEffect, useRef } from "react";
import {
  Leaf, IndianRupee, Users, Clock, CheckCircle2,
  Zap, Globe, TrendingUp, MapPin, ArrowRight
} from "lucide-react";
import { IMPACT_STATS, RECENT_RESOLUTIONS } from "@/lib/demo-data";
import Link from "next/link";

// Animated counting hook
function useCountUp(target: number, duration = 1800, active = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function CounterCard({
  icon: Icon,
  value,
  label,
  suffix = "",
  prefix = "",
  accent,
  delay = 0,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  accent: string;
  delay?: number;
}) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setActive(true); observer.disconnect(); }
      }, { threshold: 0.3 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const count = useCountUp(value, 1800, active);

  return (
    <div
      ref={ref}
      className="liquid-glass rounded-3xl p-5 sm:p-6 flex flex-col gap-3 relative overflow-hidden group hover:brightness-110 transition-all duration-300"
    >
      <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full ${accent}/10 blur-2xl group-hover:${accent}/20 transition-all`} />
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ${accent}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className={`text-3xl sm:text-4xl font-heading italic tracking-tighter leading-none ${accent}`}>
          {prefix}{count.toLocaleString("en-IN")}{suffix}
        </p>
        <p className="mt-1.5 text-xs font-body text-white/50 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

function TickerItem({ ward, category, hoursAgo, payout }: {
  ward: string; category: string; hoursAgo: number; payout: number;
}) {
  const t = hoursAgo < 1
    ? `${Math.round(hoursAgo * 60)}m ago`
    : `${hoursAgo}h ago`;

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
      <span className="flex h-2 w-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-body font-medium text-white truncate">
          {category} cleaned in <span className="text-white/70">{ward}</span>
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[11px] font-body text-white/40">{t}</span>
        <span className="text-xs font-heading italic text-emerald-400">+₹{payout}</span>
      </div>
    </div>
  );
}

export default function ImpactPage() {
  const s = IMPACT_STATS;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-gradient-to-b from-emerald-900/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-white/[0.02] to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 pt-24 sm:pt-28 pb-24 space-y-10">

        {/* Hero header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-3.5 py-1.5 text-xs font-body text-white/70 mb-5">
            <Leaf size={12} className="text-emerald-400" />
            <span>Real-time Impact Tracker · Delhi NCR</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading italic text-white tracking-tight leading-tight">
            Every Report.<br className="hidden sm:block" />
            <span className="text-emerald-400">Real Change.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/60 font-body font-light max-w-2xl mx-auto leading-relaxed">
            WasteYatra doesn't just log complaints — it closes the loop. Here's the proof.
          </p>
        </div>

        {/* Primary counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <CounterCard icon={CheckCircle2} value={s.hotspotsCleaned}  label="Hotspots Cleaned"     accent="text-emerald-400" suffix=""    delay={0}   />
          <CounterCard icon={IndianRupee} value={s.totalPayoutINR}    label="Paid to Workers (₹)" accent="text-amber-400"   prefix="₹" delay={150} />
          <CounterCard icon={Leaf}        value={s.kgWasteRemoved}    label="kg Waste Removed"     accent="text-teal-400"   suffix="kg" delay={300} />
          <CounterCard icon={Zap}        value={s.co2KgSaved}        label="kg CO₂ Equivalent"    accent="text-blue-400"   suffix="kg" delay={450} />
        </div>

        {/* Secondary counters row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Users,      value: s.workersActive,       label: "Active Workers",      accent: "text-white",         suffix: "" },
            { icon: Clock,      value: s.avgResolutionHours,  label: "Avg Resolution (hrs)", accent: "text-amber-400",    suffix: "h" },
            { icon: TrendingUp, value: s.reportsThisMonth,    label: "Reports This Month",  accent: "text-emerald-400",   suffix: "" },
            { icon: Globe,      value: s.citiesOnboarded,     label: "Cities Onboarded",    accent: "text-white/80",      suffix: "" },
          ].map(({ icon: Icon, value, label, accent, suffix }) => (
            <div key={label} className="liquid-glass rounded-2xl p-4 flex items-center gap-3">
              <Icon size={16} className={`${accent} shrink-0`} />
              <div>
                <p className={`text-xl font-heading italic leading-none ${accent}`}>{value}{suffix}</p>
                <p className="text-[10px] font-body text-white/40 mt-1 uppercase tracking-wide leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live resolution ticker */}
        <div className="liquid-glass rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-xs font-body font-semibold uppercase tracking-wider text-white/60">Live Resolution Feed</h2>
            </div>
            <span className="text-[10px] font-body text-white/30">Delhi NCR · Auto-updating</span>
          </div>
          <div>
            {RECENT_RESOLUTIONS.map((r, i) => (
              <TickerItem key={i} {...r} />
            ))}
          </div>
        </div>

        {/* Callout comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border border-red-500/10">
            <p className="text-xs font-body uppercase tracking-wider text-red-400/70 mb-3">Before WasteYatra</p>
            <h3 className="text-xl font-heading italic text-white tracking-tight leading-tight mb-3">
              "The complaint black hole"
            </h3>
            <ul className="space-y-2 text-xs font-body text-white/50 font-light">
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Reports filed, no one assigned</li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Average resolution: weeks or never</li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Workers have no way to find paid work</li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Citizens get zero feedback</li>
            </ul>
          </div>
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border border-emerald-500/20">
            <p className="text-xs font-body uppercase tracking-wider text-emerald-400/70 mb-3">With WasteYatra</p>
            <h3 className="text-xl font-heading italic text-white tracking-tight leading-tight mb-3">
              "Report = paid job, instantly"
            </h3>
            <ul className="space-y-2 text-xs font-body text-white/70 font-light">
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>Every report auto-creates a paid job</li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>Avg. resolution: {s.avgResolutionHours} hours</li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>{s.workersActive} workers earning steady gig income</li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>Reporter notified when done — with proof</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/report" className="flex items-center gap-2 bg-white text-black font-body font-semibold text-sm rounded-full px-6 py-3 hover:bg-white/90 transition-all shadow-xl active:scale-95">
            Report a Hotspot
            <ArrowRight size={15} />
          </Link>
          <Link href="/map" className="flex items-center gap-2 liquid-glass text-white font-body text-sm rounded-full px-6 py-3 hover:brightness-125 transition-all active:scale-95">
            <MapPin size={14} />
            View Live Map
          </Link>
        </div>
      </main>
    </div>
  );
}
