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
      <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/92 shadow-xl backdrop-blur-2xl w-44">
        {/* SVG Dumpster Visual Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-teal/20 to-marigold/10 px-3 pt-3 pb-1 flex items-end justify-between">
          {/* Mini Dumpster SVG */}
          <svg
            viewBox="0 0 80 60"
            className="h-14 w-14 animate-float-slow drop-shadow-md"
            fill="none"
          >
            {/* Body */}
            <path d="M 8 18 L 72 18 L 65 54 L 15 54 Z" fill="#0f6e56" stroke="#04342c" strokeWidth="2.5" />
            {/* Lid */}
            <rect x="4" y="12" width="72" height="8" rx="3" fill="#04342c" />
            {/* Ribs */}
            <line x1="28" y1="28" x2="26" y2="48" stroke="#04342c" strokeWidth="2" />
            <line x1="40" y1="28" x2="40" y2="48" stroke="#04342c" strokeWidth="2" />
            <line x1="52" y1="28" x2="54" y2="48" stroke="#04342c" strokeWidth="2" />
            {/* Wheels */}
            <circle cx="22" cy="56" r="5" fill="#1b2430" />
            <circle cx="58" cy="56" r="5" fill="#1b2430" />
            {/* Recycling symbol */}
            <circle cx="40" cy="36" r="9" fill="#e1f5ee" />
            <path d="M 40 30 L 44 36 H 36 Z" fill="#0f6e56" />
            <path d="M 44 38 L 40 44 V 32 Z" fill="#0f6e56" />
            <path d="M 36 38 L 40 32 V 44 Z" fill="#0f6e56" />
          </svg>

          {/* Floating can */}
          <svg
            viewBox="0 0 30 45"
            className="h-10 w-6 animate-float-reverse drop-shadow-sm mb-1"
            fill="none"
          >
            <rect x="5" y="6" width="20" height="34" rx="4" fill="#d8432f" stroke="#1b2430" strokeWidth="1.5" />
            <rect x="7" y="4" width="16" height="4" rx="1" fill="#d3d1c7" />
            <rect x="7" y="38" width="16" height="4" rx="1" fill="#d3d1c7" />
            <circle cx="15" cy="23" r="5" fill="#f0b429" />
          </svg>
        </div>

        {/* Payout Stat */}
        <div className="px-3.5 py-2.5 space-y-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone">Community Payout Pool</p>
            <p className="flex items-baseline gap-0.5 text-xl font-extrabold text-ink">
              <IndianRupee size={16} strokeWidth={2.5} />
              {totalPayout.toLocaleString()}
            </p>
          </div>

          {/* Interactive Recycle Button */}
          <button
            type="button"
            onClick={handleRecycle}
            className="group w-full flex items-center justify-center gap-1.5 rounded-xl border border-teal/30 bg-teal-light py-1.5 text-xs font-bold text-teal-dark transition-all duration-200 hover:bg-teal hover:text-white active:scale-95"
          >
            <Recycle
              size={13}
              className="transition-transform duration-500 group-hover:rotate-180"
            />
            <span>{clicked > 0 ? `+${clicked} Virtual Cleans!` : "Support Cleanup"}</span>
          </button>

          {clicked > 0 && (
            <div className="flex items-center gap-1 animate-pop text-[10px] font-bold text-status-resolved">
              <Award size={11} />
              <span>{clicked * 10} Eco XP Earned</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
