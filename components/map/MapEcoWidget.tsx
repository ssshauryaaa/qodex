"use client";

import { useState } from "react";
import { Award, Recycle, IndianRupee } from "lucide-react";

interface MapEcoWidgetProps {
  totalPayout: number;
}

export default function MapEcoWidget({ totalPayout }: MapEcoWidgetProps) {
  const [clicked, setClicked] = useState(0);

  function handleRecycle() {
    setClicked((c) => c + 1);
  }

  return (
    <div className="animate-fade-in-up w-44" style={{ animationDelay: "0.15s" }}>
      <div className="overflow-hidden rounded-2xl liquid-glass shadow-2xl backdrop-blur-2xl w-44">
        {/* SVG Dumpster Visual Header */}
        <div className="relative overflow-hidden bg-white/[0.03] px-3 pt-3 pb-1 flex items-end justify-between border-b border-white/10">
          {/* Mini Dumpster SVG */}
          <svg
            viewBox="0 0 80 60"
            className="h-14 w-14 animate-float-slow drop-shadow-md"
            fill="none"
          >
            {/* Body */}
            <path d="M 8 18 L 72 18 L 65 54 L 15 54 Z" fill="#222222" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
            {/* Lid */}
            <rect x="4" y="12" width="72" height="8" rx="3" fill="#333333" />
            {/* Ribs */}
            <line x1="28" y1="28" x2="26" y2="48" stroke="#111111" strokeWidth="2" />
            <line x1="40" y1="28" x2="40" y2="48" stroke="#111111" strokeWidth="2" />
            <line x1="52" y1="28" x2="54" y2="48" stroke="#111111" strokeWidth="2" />
            {/* Wheels */}
            <circle cx="22" cy="56" r="5" fill="#111111" />
            <circle cx="58" cy="56" r="5" fill="#111111" />
            {/* Recycling symbol */}
            <circle cx="40" cy="36" r="8" fill="#ffffff" fillOpacity="0.1" />
            <path d="M 40 30 L 44 36 H 36 Z" fill="#ffffff" fillOpacity="0.8" />
            <path d="M 44 38 L 40 44 V 32 Z" fill="#ffffff" fillOpacity="0.8" />
            <path d="M 36 38 L 40 32 V 44 Z" fill="#ffffff" fillOpacity="0.8" />
          </svg>

          {/* Floating can */}
          <svg
            viewBox="0 0 30 45"
            className="h-10 w-6 animate-float-reverse drop-shadow-sm mb-1"
            fill="none"
          >
            <rect x="5" y="6" width="20" height="34" rx="4" fill="#333333" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
            <rect x="7" y="4" width="16" height="4" rx="1" fill="#555555" />
            <rect x="7" y="38" width="16" height="4" rx="1" fill="#555555" />
            <circle cx="15" cy="23" r="5" fill="#f0b429" />
          </svg>
        </div>

        {/* Payout Stat */}
        <div className="px-3.5 py-2.5 space-y-2 font-body">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Community Pool</p>
            <p className="flex items-baseline gap-0.5 text-xl font-heading italic text-white">
              <IndianRupee size={15} strokeWidth={2} />
              <span>{totalPayout.toLocaleString()}</span>
            </p>
          </div>

          {/* Interactive Recycle Button */}
          <button
            type="button"
            onClick={handleRecycle}
            className="group w-full flex items-center justify-center gap-1.5 rounded-xl liquid-glass py-1.5 text-xs font-semibold text-white/80 transition-all duration-200 hover:text-white hover:brightness-125 active:scale-95"
          >
            <Recycle
              size={12}
              className="transition-transform duration-500 group-hover:rotate-180"
            />
            <span>{clicked > 0 ? `+${clicked} Cleans!` : "Support"}</span>
          </button>

          {clicked > 0 && (
            <div className="flex items-center gap-1 animate-pop text-[10px] font-semibold text-emerald-400">
              <Award size={11} />
              <span>{clicked * 10} Eco XP Earned</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
