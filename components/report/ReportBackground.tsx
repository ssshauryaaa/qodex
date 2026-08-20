"use client";

import { useEffect, useState } from "react";
import { Sparkles, Recycle, Trash2 } from "lucide-react";

export default function ReportBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Parallax mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // max 15px shift
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function handleItemClick(name: string, msg: string) {
    setClickedItem(name);
    setToastMsg(msg);
    setTimeout(() => setClickedItem(null), 800);
    setTimeout(() => setToastMsg(null), 2500);
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Interactive Toast Banner when clicking background icons */}
      {toastMsg && (
        <div className="pointer-events-auto fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-pop">
          <div className="flex items-center gap-2 rounded-full border border-marigold/40 bg-ink/90 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md">
            <Sparkles size={14} className="text-marigold animate-spin" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* Dynamic Ambient Gradient Glow Orbs */}
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-marigold/30 via-amber-400/20 to-transparent blur-3xl animate-pulse-glow transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)` }}
      />
      <div
        className="absolute top-1/3 -left-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-teal/25 via-emerald-400/15 to-transparent blur-3xl animate-pulse-glow transition-transform duration-700 ease-out"
        style={{ animationDelay: "-1.5s", transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)` }}
      />

      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#1b2430_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

      {/* FLOATING ELEMENT 1: Green Municipal Dumpster (Top Right) */}
      <div
        onClick={() => handleItemClick("dumpster", "Green Dumpster Tagged! +10 Eco XP ♻️")}
        className={`pointer-events-auto cursor-pointer absolute top-14 -right-8 hidden lg:block w-72 h-64 opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-110 ${
          clickedItem === "dumpster" ? "animate-pop" : "animate-float-slow"
        }`}
        style={{ transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)` }}
        title="Interactive Dumpster • Click to interact!"
      >
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
          <path d="M 30 60 L 210 60 L 195 160 L 45 160 Z" fill="#0f6e56" stroke="#04342c" strokeWidth="4" />
          <rect x="20" y="45" width="200" height="18" rx="5" fill="#04342c" />
          <rect x="35" y="80" width="170" height="10" rx="3" fill="#0c4a3b" />
          <line x1="85" y1="95" x2="80" y2="150" stroke="#04342c" strokeWidth="3" />
          <line x1="155" y1="95" x2="160" y2="150" stroke="#04342c" strokeWidth="3" />
          <circle cx="65" cy="170" r="14" fill="#1b2430" stroke="#6b6459" strokeWidth="3" />
          <circle cx="175" cy="170" r="14" fill="#1b2430" stroke="#6b6459" strokeWidth="3" />
          <circle cx="65" cy="170" r="5" fill="#d3d1c7" />
          <circle cx="175" cy="170" r="5" fill="#d3d1c7" />
          <circle cx="120" cy="125" r="18" fill="#e1f5ee" opacity="0.9" />
          <path d="M 120 114 L 126 122 H 114 Z" fill="#0f6e56" />
          <path d="M 127 127 L 121 133 V 121 Z" fill="#0f6e56" />
          <path d="M 113 127 L 119 121 V 133 Z" fill="#0f6e56" />
        </svg>
      </div>

      {/* FLOATING ELEMENT 2: Orange Wheelie Trash Bin (Left Side) */}
      <div
        onClick={() => handleItemClick("wheelie", "Wheelie Bin Activated! 🗑️")}
        className={`pointer-events-auto cursor-pointer absolute top-1/4 -left-6 hidden sm:block w-48 h-56 opacity-85 transition-all duration-300 hover:opacity-100 hover:scale-110 ${
          clickedItem === "wheelie" ? "animate-pop" : "animate-float-reverse"
        }`}
        style={{ transform: `translate3d(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px, 0)` }}
        title="Interactive Wheelie Bin • Click to interact!"
      >
        <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
          <path d="M 35 40 L 125 40 L 115 170 L 45 170 Z" fill="#f2872e" stroke="#993c1d" strokeWidth="4" />
          <rect x="25" y="26" width="110" height="16" rx="4" fill="#993c1d" />
          <rect x="15" y="45" width="12" height="30" rx="3" fill="#1b2430" />
          <circle cx="45" cy="178" r="12" fill="#1b2430" stroke="#6b6459" strokeWidth="3" />
          <circle cx="115" cy="178" r="12" fill="#1b2430" stroke="#6b6459" strokeWidth="3" />
          <line x1="55" y1="65" x2="52" y2="150" stroke="#993c1d" strokeWidth="3" />
          <line x1="80" y1="65" x2="80" y2="150" stroke="#993c1d" strokeWidth="3" />
          <line x1="105" y1="65" x2="108" y2="150" stroke="#993c1d" strokeWidth="3" />
        </svg>
      </div>

      {/* FLOATING ELEMENT 3: Crushed Soda Can (Bottom Right) */}
      <div
        onClick={() => handleItemClick("can", "Soda Can Recycled! 🥫 Zero Waste")}
        className={`pointer-events-auto cursor-pointer absolute bottom-20 right-4 hidden md:block w-36 h-36 opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-125 ${
          clickedItem === "can" ? "animate-pop" : "animate-float-medium"
        }`}
        style={{ transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px, 0)` }}
        title="Interactive Recycled Can • Click me!"
      >
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-12 drop-shadow-lg">
          <rect x="35" y="25" width="50" height="70" rx="10" fill="#d8432f" stroke="#1b2430" strokeWidth="3" />
          <rect x="40" y="20" width="40" height="8" rx="3" fill="#d3d1c7" />
          <rect x="40" y="92" width="40" height="8" rx="3" fill="#d3d1c7" />
          <circle cx="60" cy="60" r="15" fill="#f0b429" />
          <path d="M 45 45 C 55 55 65 35 75 45" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* FLOATING ELEMENT 4: Interactive Sparkle Badge */}
      <div
        onClick={() => handleItemClick("recycle", "Swachh Bharat Clean City Active 🌿")}
        className="pointer-events-auto cursor-pointer absolute top-1/4 right-1/4 hidden lg:block animate-float-medium"
        style={{ animationDelay: "-2s", transform: `translate3d(${mousePos.x * -0.9}px, ${mousePos.y * -0.9}px, 0)` }}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-teal shadow-md border border-teal/30 backdrop-blur-md transition-transform duration-300 hover:scale-125">
          <Recycle className="h-6 w-6 animate-spin-slow text-teal" />
        </div>
      </div>
    </div>
  );
}
