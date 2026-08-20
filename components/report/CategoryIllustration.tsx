"use client";

import type { Category } from "@/lib/types";

interface CategoryIllustrationProps {
  category: Category;
  className?: string;
}

export default function CategoryIllustration({ category, className = "h-full w-full" }: CategoryIllustrationProps) {
  if (category === "overflow") {
    return (
      <div className={`relative bg-gradient-to-br from-white/[0.08] via-black to-white/[0.03] flex items-center justify-center overflow-hidden ${className}`}>
        {/* Animated Background Ring */}
        <div className="absolute inset-2 rounded-full border border-dashed border-white/20 animate-spin-slow" />
        
        {/* Overflow Dumpster SVG */}
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 drop-shadow-xl animate-float-slow" fill="none">
          {/* Bin Body */}
          <path d="M 20 32 L 80 32 L 72 80 L 28 80 Z" fill="#242424" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
          <rect x="16" y="24" width="68" height="8" rx="2" fill="#3a3a3a" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          {/* Wheel Mounts */}
          <rect x="24" y="80" width="8" height="4" fill="#1b1b1b" />
          <rect x="68" y="80" width="8" height="4" fill="#1b1b1b" />
          {/* Wheels */}
          <circle cx="28" cy="86" r="6" fill="#111111" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
          <circle cx="72" cy="86" r="6" fill="#111111" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
          
          {/* Overflowing Trash Visuals */}
          <circle cx="38" cy="20" r="14" fill="#d8432f" opacity="0.9" />
          <path d="M 32 18 L 44 18 L 38 6 Z" fill="#993c1d" />
          <circle cx="58" cy="22" r="12" fill="#f0b429" opacity="0.9" />
          <circle cx="48" cy="25" r="8" fill="#f2872e" />
          
          {/* Front details & Recycling symbol */}
          <circle cx="50" cy="56" r="10" fill="#ffffff" fillOpacity="0.1" />
          <path d="M 50 49 L 54 55 H 46 Z" fill="#ffffff" fillOpacity="0.8" />
          <path d="M 54 57 L 50 62 V 52 Z" fill="#ffffff" fillOpacity="0.8" />
          <path d="M 46 57 L 50 52 V 62 Z" fill="#ffffff" fillOpacity="0.8" />
        </svg>
      </div>
    );
  }

  if (category === "illegal_dump") {
    return (
      <div className={`relative bg-gradient-to-br from-white/[0.08] via-black to-white/[0.03] flex items-center justify-center overflow-hidden ${className}`}>
        <div className="absolute inset-2 rounded-full border border-dashed border-white/20 animate-spin-slow" style={{ animationDirection: "reverse" }} />
        
        {/* Illegal Dump Debris Pile SVG */}
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 drop-shadow-xl animate-float-reverse" fill="none">
          {/* Ground Base */}
          <path d="M 10 82 C 30 75 70 75 90 82 L 90 90 L 10 90 Z" fill="#333333" opacity="0.6" />
          
          {/* Large Cardboard Box */}
          <rect x="25" y="44" width="38" height="34" rx="3" fill="#383838" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M 25 44 L 36 34 L 52 34 L 63 44 Z" fill="#4a4a4a" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
          <line x1="44" y1="44" x2="44" y2="78" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
          
          {/* Old Tire */}
          <circle cx="68" cy="65" r="16" fill="#1b1b1b" stroke="#d8432f" strokeWidth="2" />
          <circle cx="68" cy="65" r="7" fill="#2c2c2c" />
          <line x1="56" y1="65" x2="80" y2="65" stroke="#d8432f" strokeWidth="1.5" />
          <line x1="68" y1="53" x2="68" y2="77" stroke="#d8432f" strokeWidth="1.5" />
          
          {/* Discarded Plastic Bottle */}
          <rect x="12" y="72" width="18" height="10" rx="3" fill="#0f6e56" transform="rotate(25 12 72)" stroke="#e1f5ee" strokeOpacity="0.4" strokeWidth="1" />
          
          {/* Warning Sparkles */}
          <path d="M 75 22 L 78 28 L 84 29 L 79 34 L 80 40 L 75 36 L 70 40 L 71 34 L 66 29 L 72 28 Z" fill="#f0b429" className="animate-pulse" />
        </svg>
      </div>
    );
  }

  // default to drain_block
  return (
    <div className={`relative bg-gradient-to-br from-white/[0.08] via-black to-white/[0.03] flex items-center justify-center overflow-hidden ${className}`}>
      <div className="absolute inset-2 rounded-full border border-dashed border-white/20 animate-spin-slow" />
      
      {/* Blocked Drain SVG */}
      <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 drop-shadow-xl animate-float-slow" fill="none">
        {/* Drain Metal Grate */}
        <rect x="18" y="32" width="64" height="48" rx="6" fill="#242424" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
        <line x1="28" y1="36" x2="28" y2="76" stroke="#111111" strokeWidth="4" />
        <line x1="38" y1="36" x2="38" y2="76" stroke="#111111" strokeWidth="4" />
        <line x1="48" y1="36" x2="48" y2="76" stroke="#111111" strokeWidth="4" />
        <line x1="58" y1="36" x2="58" y2="76" stroke="#111111" strokeWidth="4" />
        <line x1="68" y1="36" x2="68" y2="76" stroke="#111111" strokeWidth="4" />
        <line x1="72" y1="36" x2="72" y2="76" stroke="#111111" strokeWidth="4" />
        
        {/* Water Ripples */}
        <path d="M 10 24 Q 30 20 50 24 Q 70 28 90 24" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 12 14 Q 32 10 52 14 Q 72 18 92 14" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Leaves Clogging the Grate */}
        <path d="M 32 46 C 24 50 24 64 38 60 C 44 54 44 48 32 46 Z" fill="#f2872e" />
        <path d="M 52 50 C 46 56 48 68 60 62 C 64 56 60 48 52 50 Z" fill="#f0b429" />
        <path d="M 44 60 C 40 68 46 76 56 70 C 58 62 50 56 44 60 Z" fill="#d8432f" />
      </svg>
    </div>
  );
}
