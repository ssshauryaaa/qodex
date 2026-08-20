"use client";

import type { Category } from "@/lib/types";

interface CategoryIllustrationProps {
  category: Category;
  className?: string;
}

export default function CategoryIllustration({ category, className = "h-full w-full" }: CategoryIllustrationProps) {
  if (category === "overflow") {
    return (
      <div className={`relative bg-gradient-to-br from-amber-950/40 via-neutral-950 to-emerald-950/30 flex items-center justify-center overflow-hidden ${className}`}>
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.2),transparent_70%)]" />
        <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/20 animate-spin-slow" />
        
        {/* Overflow Dumpster SVG */}
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 drop-shadow-[0_10px_20px_rgba(245,158,11,0.25)] animate-float-slow" fill="none">
          {/* Bin Body - Emerald & Orange */}
          <path d="M 20 34 L 80 34 L 72 82 L 28 82 Z" fill="#047857" stroke="#34d399" strokeWidth="2" />
          <rect x="16" y="26" width="68" height="9" rx="2.5" fill="#f97316" stroke="#fdba74" strokeWidth="1.2" />
          {/* Wheels */}
          <circle cx="28" cy="88" r="6" fill="#1f2937" stroke="#9ca3af" strokeWidth="1.5" />
          <circle cx="72" cy="88" r="6" fill="#1f2937" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Overflowing Colorful Trash */}
          <circle cx="38" cy="19" r="14" fill="#f97316" opacity="0.95" />
          <circle cx="58" cy="21" r="13" fill="#06b6d4" opacity="0.95" />
          <circle cx="48" cy="25" r="9" fill="#eab308" />
          <circle cx="28" cy="28" r="8" fill="#a855f7" />
          
          {/* Front details & Recycling symbol */}
          <circle cx="50" cy="58" r="10" fill="#ffffff" fillOpacity="0.15" />
          <path d="M 50 51 L 54 57 H 46 Z" fill="#34d399" />
          <path d="M 54 59 L 50 64 V 54 Z" fill="#34d399" />
          <path d="M 46 59 L 50 54 V 64 Z" fill="#34d399" />
        </svg>
      </div>
    );
  }

  if (category === "illegal_dump") {
    return (
      <div className={`relative bg-gradient-to-br from-rose-950/40 via-neutral-950 to-red-950/40 flex items-center justify-center overflow-hidden ${className}`}>
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.25),transparent_70%)]" />
        <div className="absolute inset-2 rounded-full border border-dashed border-rose-400/20 animate-spin-slow" style={{ animationDirection: "reverse" }} />
        
        {/* Illegal Dump Debris Pile SVG */}
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 drop-shadow-[0_10px_20px_rgba(239,68,68,0.3)] animate-float-reverse" fill="none">
          {/* Ground Base */}
          <path d="M 10 82 C 30 75 70 75 90 82 L 90 90 L 10 90 Z" fill="#292524" />
          
          {/* Red Discarded Couch/Furniture */}
          <rect x="22" y="42" width="42" height="36" rx="4" fill="#dc2626" stroke="#fca5a5" strokeWidth="1.5" />
          <path d="M 22 42 L 34 32 L 52 32 L 64 42 Z" fill="#b91c1c" stroke="#fca5a5" strokeWidth="1.2" />
          <line x1="43" y1="42" x2="43" y2="78" stroke="#f87171" strokeOpacity="0.4" strokeWidth="1.5" />
          
          {/* Old Tire */}
          <circle cx="68" cy="65" r="16" fill="#334155" stroke="#94a3b8" strokeWidth="2.5" />
          <circle cx="68" cy="65" r="8" fill="#1e293b" />
          <line x1="56" y1="65" x2="80" y2="65" stroke="#64748b" strokeWidth="1.5" />
          <line x1="68" y1="53" x2="68" y2="77" stroke="#64748b" strokeWidth="1.5" />
          
          {/* Yellow Crate & Paint can */}
          <rect x="10" y="70" width="20" height="12" rx="3" fill="#f59e0b" transform="rotate(20 10 70)" stroke="#fde68a" strokeWidth="1" />
          <circle cx="82" cy="78" r="5" fill="#38bdf8" />
          
          {/* Warning Sparkles */}
          <path d="M 75 22 L 78 28 L 84 29 L 79 34 L 80 40 L 75 36 L 70 40 L 71 34 L 66 29 L 72 28 Z" fill="#fbbf24" className="animate-pulse" />
        </svg>
      </div>
    );
  }

  // default to drain_block
  return (
    <div className={`relative bg-gradient-to-br from-cyan-950/40 via-neutral-950 to-blue-950/40 flex items-center justify-center overflow-hidden ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.25),transparent_70%)]" />
      <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400/20 animate-spin-slow" />
      
      {/* Blocked Drain SVG */}
      <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 drop-shadow-[0_10px_20px_rgba(6,182,212,0.3)] animate-float-slow" fill="none">
        {/* Drain Metal Grate */}
        <rect x="18" y="32" width="64" height="48" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <line x1="28" y1="36" x2="28" y2="76" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <line x1="38" y1="36" x2="38" y2="76" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <line x1="48" y1="36" x2="48" y2="76" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <line x1="58" y1="36" x2="58" y2="76" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        <line x1="68" y1="36" x2="68" y2="76" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
        
        {/* Water Ripples */}
        <path d="M 10 24 Q 30 18 50 24 Q 70 30 90 24" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d="M 12 14 Q 32 8 52 14 Q 72 20 92 14" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        
        {/* Leaves & Trash Clogging the Grate */}
        <path d="M 30 46 C 22 50 22 64 36 60 C 42 54 42 48 30 46 Z" fill="#22c55e" />
        <path d="M 52 50 C 46 56 48 68 60 62 C 64 56 60 48 52 50 Z" fill="#eab308" />
        <path d="M 44 60 C 40 68 46 76 56 70 C 58 62 50 56 44 60 Z" fill="#f43f5e" />
      </svg>
    </div>
  );
}
