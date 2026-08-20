"use client";

import { useCallback, useEffect, useState } from "react";
import { Sparkles, Recycle, Zap, Award } from "lucide-react";

type LitterType = "can" | "bottle" | "wrapper" | "dumpster";

interface LitterSeed {
  id: number;
  type: LitterType;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
}

const SEEDS: LitterSeed[] = [
  { id: 1, type: "can", top: "14%", left: "2.5%", rotate: -14 },
  { id: 2, type: "wrapper", top: "36%", left: "4.5%", rotate: 10 },
  { id: 3, type: "bottle", top: "62%", left: "2%", rotate: -6 },
  { id: 4, type: "dumpster", top: "20%", right: "2.5%", rotate: 8 },
  { id: 5, type: "can", top: "48%", right: "4%", rotate: -16 },
  { id: 6, type: "bottle", top: "74%", right: "2%", rotate: 12 },
];

function CanIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9 drop-shadow-lg">
      <rect x="12" y="8" width="16" height="24" rx="4" fill="#d8432f" stroke="#1b2430" strokeWidth="2" />
      <rect x="14" y="6" width="12" height="3" rx="1" fill="#d3d1c7" />
      <rect x="14" y="31" width="12" height="3" rx="1" fill="#d3d1c7" />
      <circle cx="20" cy="20" r="5" fill="#f0b429" />
    </svg>
  );
}

function BottleIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9 drop-shadow-lg">
      <path d="M 16 6 H 24 V 11 L 27 15 V 32 H 13 V 15 L 16 11 Z" fill="#0f6e56" stroke="#04342c" strokeWidth="2" />
      <rect x="15" y="4" width="10" height="3" rx="1" fill="#e1f5ee" />
      <line x1="14" y1="20" x2="26" y2="20" stroke="#e1f5ee" strokeWidth="2" />
    </svg>
  );
}

function WrapperIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9 drop-shadow-lg">
      <path d="M 8 16 C 14 10 26 10 32 16 C 34 22 28 30 20 28 C 12 26 6 22 8 16 Z" fill="#f0b429" stroke="#993c1d" strokeWidth="2" />
      <circle cx="20" cy="19" r="3" fill="#ffffff" />
    </svg>
  );
}

function DumpsterMiniIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-xl">
      <path d="M 6 12 L 34 12 L 31 32 L 9 32 Z" fill="#0f6e56" stroke="#04342c" strokeWidth="2" />
      <rect x="4" y="9" width="32" height="4" rx="1" fill="#04342c" />
      <circle cx="12" cy="34" r="3" fill="#1b2430" />
      <circle cx="28" cy="34" r="3" fill="#1b2430" />
    </svg>
  );
}

const ICONS: Record<LitterType, () => React.JSX.Element> = {
  can: CanIcon,
  bottle: BottleIcon,
  wrapper: WrapperIcon,
  dumpster: DumpsterMiniIcon,
};

export default function AmbientLitter() {
  const [items, setItems] = useState(SEEDS.map((s) => ({ ...s, collected: false })));
  const [cleaned, setCleaned] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Mouse Parallax Physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCollect = useCallback((id: number, type: LitterType) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, collected: true } : i)));
    setCleaned((c) => c + 1);

    const labels: Record<LitterType, string> = {
      can: "Soda Can Recycled! +10 XP 🥫",
      bottle: "Plastic Bottle Cleared! +10 XP 🍾",
      wrapper: "Litter Tagged! +10 XP ✨",
      dumpster: "Dumpster Dispatched! +20 XP 🗑️",
    };
    setToastMsg(labels[type]);

    setTimeout(() => setToastMsg(null), 2000);

    window.setTimeout(() => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, collected: false, rotate: i.rotate + (Math.random() > 0.5 ? 25 : -25) }
            : i
        )
      );
    }, 2500);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden select-none xl:block">
      {/* Floating XP Toast */}
      {toastMsg && (
        <div className="pointer-events-auto fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-pop">
          <div className="flex items-center gap-2 rounded-full border border-teal/40 bg-ink/90 px-4 py-2 text-xs font-bold text-white shadow-2xl backdrop-blur-md">
            <Award size={15} className="text-marigold animate-bounce" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* 3D Parallax Floating Elements */}
      {items.map((item) => {
        const Icon = ICONS[item.type];
        const parallaxX = item.id % 2 === 0 ? mousePos.x * 0.8 : mousePos.x * -0.8;
        const parallaxY = item.id % 2 === 0 ? mousePos.y * 0.8 : mousePos.y * -0.8;

        return (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => handleCollect(item.id, item.type)}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) rotate(${item.rotate}deg)`,
            }}
            className={`pointer-events-auto absolute flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white/70 shadow-md backdrop-blur-xs transition-all duration-300 ease-out hover:scale-125 hover:rotate-12 hover:shadow-xl hover:border-marigold border border-white/80 ${
              item.collected ? "scale-0 opacity-0" : "scale-100 opacity-80"
            }`}
            title="Interactive 3D Waste Item • Click to Clean!"
          >
            <Icon />
          </div>
        );
      })}

      {/* Bottom Cleaned Stats Counter */}
      {cleaned > 0 && (
        <div className="animate-fade-in-up pointer-events-none fixed bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-teal/30 bg-white/90 px-4 py-1.5 text-xs font-semibold text-ink shadow-lg backdrop-blur-md flex items-center gap-1.5">
          <Sparkles size={13} className="text-teal animate-spin" />
          <span>Virtually cleaned <strong className="text-status-resolved">{cleaned}</strong> hotspot items!</span>
        </div>
      )}
    </div>
  );
}
