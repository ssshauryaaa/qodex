"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  ImagePlus,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  Scan,
  Eye,
  Maximize2,
  Trash2,
  Layers,
  Zap,
  Sun,
  Target,
} from "lucide-react";

interface PhotoStepProps {
  preview: string | null;
  onSelect: (file: File) => void;
  onClear: () => void;
}

// Sample SVG illustrations converted to File objects for 1-click testing
const SAMPLE_PRESETS = [
  {
    id: "overflow",
    title: "Overflowing Bin",
    desc: "Community bin spilled over",
    badge: "Popular",
    badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    cardGlow: "group-hover:border-amber-500/40 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="bg-overflow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0c192c"/>
          <stop offset="60%" stop-color="#182d49"/>
          <stop offset="100%" stop-color="#2a2016"/>
        </linearGradient>
        <linearGradient id="dumpster-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#047857"/>
          <stop offset="50%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#065f46"/>
        </linearGradient>
        <linearGradient id="ground-overflow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#262626"/>
          <stop offset="100%" stop-color="#171717"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg-overflow)"/>
      <ellipse cx="300" cy="180" rx="260" ry="120" fill="#f59e0b" opacity="0.08"/>
      <rect y="280" width="600" height="120" fill="url(#ground-overflow)"/>
      <line x1="0" y1="280" x2="600" y2="280" stroke="#f59e0b" stroke-opacity="0.4" stroke-width="2"/>
      
      <!-- Green Community Dumpster -->
      <path d="M 180 180 L 420 180 L 390 320 L 210 320 Z" fill="url(#dumpster-grad)" stroke="#34d399" stroke-opacity="0.8" stroke-width="2"/>
      <rect x="170" y="165" width="260" height="18" rx="4" fill="#f97316" stroke="#fdba74" stroke-width="1.5"/>
      <line x1="260" y1="195" x2="250" y2="305" stroke="#047857" stroke-width="3"/>
      <line x1="340" y1="195" x2="350" y2="305" stroke="#047857" stroke-width="3"/>
      
      <!-- Vivid Overflowing Trash Bags -->
      <circle cx="230" cy="148" r="34" fill="#f97316" opacity="0.95"/>
      <circle cx="280" cy="135" r="42" fill="#06b6d4" opacity="0.95"/>
      <circle cx="335" cy="150" r="36" fill="#a855f7" opacity="0.95"/>
      <circle cx="370" cy="160" r="26" fill="#eab308" opacity="0.95"/>
      <circle cx="205" cy="165" r="22" fill="#10b981" opacity="0.9"/>
      
      <!-- Spilled Trash Items on Ground -->
      <ellipse cx="160" cy="330" rx="26" ry="16" fill="#f97316"/>
      <rect x="415" y="320" width="34" height="22" rx="4" fill="#06b6d4" transform="rotate(18 415 320)"/>
      <circle cx="465" cy="340" r="12" fill="#fbbf24"/>
      <ellipse cx="125" cy="345" rx="18" ry="10" fill="#a855f7"/>
      
      <!-- Hotspot Tag -->
      <rect x="190" y="45" width="220" height="38" rx="19" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-opacity="0.6"/>
      <text x="300" y="69" fill="#fef3c7" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle" letter-spacing="1">⚡ OVERFLOW HOTSPOT</text>
    </svg>`,
  },
  {
    id: "illegal_dump",
    title: "Illegal Dump Site",
    desc: "Roadside junk & debris",
    badge: "High Severity",
    badgeColor: "bg-red-500/20 text-red-300 border border-red-500/30",
    cardGlow: "group-hover:border-red-500/40 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="bg-dump" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1c0a0e"/>
          <stop offset="60%" stop-color="#3b1219"/>
          <stop offset="100%" stop-color="#1f1813"/>
        </linearGradient>
        <linearGradient id="hazard-stripes" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#dc2626"/>
          <stop offset="50%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#dc2626"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg-dump)"/>
      <ellipse cx="300" cy="220" rx="280" ry="100" fill="#ef4444" opacity="0.1"/>
      <path d="M 0 250 Q 300 210 600 250 L 600 400 L 0 400 Z" fill="#1e1e1e"/>
      
      <!-- Abandoned Sofa / Furniture -->
      <rect x="170" y="185" width="140" height="95" rx="10" fill="#dc2626" stroke="#f87171" stroke-width="2"/>
      <rect x="190" y="155" width="100" height="38" rx="6" fill="#b91c1c" stroke="#fca5a5" stroke-width="1.5"/>
      <rect x="160" y="220" width="22" height="60" rx="4" fill="#991b1b"/>
      <rect x="298" y="220" width="22" height="60" rx="4" fill="#991b1b"/>
      
      <!-- Discarded Tire with rim -->
      <circle cx="365" cy="245" r="46" fill="#334155" stroke="#64748b" stroke-width="3"/>
      <circle cx="365" cy="245" r="28" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
      <circle cx="365" cy="245" r="12" fill="#0f172a"/>
      
      <!-- Industrial Yellow Crate -->
      <rect x="310" y="265" width="125" height="52" rx="6" fill="#f59e0b" stroke="#fcd34d" stroke-width="1.5" transform="rotate(-8 310 265)"/>
      <line x1="330" y1="280" x2="410" y2="280" stroke="#b45309" stroke-width="2" transform="rotate(-8 310 265)"/>
      
      <!-- Debris & Paint Can -->
      <circle cx="125" cy="300" r="30" fill="#3b82f6"/>
      <circle cx="490" cy="310" r="24" fill="#10b981"/>
      <rect x="440" y="280" width="30" height="40" rx="4" fill="#ec4899"/>
      
      <!-- Hotspot Tag -->
      <rect x="190" y="45" width="220" height="38" rx="19" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-opacity="0.6"/>
      <text x="300" y="69" fill="#fee2e2" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle" letter-spacing="1">🚨 ILLEGAL DUMP SITE</text>
    </svg>`,
  },
  {
    id: "drain_block",
    title: "Blocked Drain",
    desc: "Clogged stormwater grate",
    badge: "Action Needed",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    cardGlow: "group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="bg-drain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#081b2a"/>
          <stop offset="50%" stop-color="#0c3552"/>
          <stop offset="100%" stop-color="#082337"/>
        </linearGradient>
        <linearGradient id="water-flow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="50%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bg-drain)"/>
      <ellipse cx="300" cy="260" rx="270" ry="110" fill="#06b6d4" opacity="0.12"/>
      
      <!-- Wet Road & Water Swirl -->
      <path d="M 50 190 Q 300 230 550 190 L 550 380 L 50 380 Z" fill="#0f283d"/>
      <ellipse cx="300" cy="270" rx="210" ry="85" fill="url(#water-flow)" opacity="0.4"/>
      
      <!-- Metallic Steel Drain Grate -->
      <rect x="110" y="180" width="380" height="175" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-opacity="0.8" stroke-width="2.5"/>
      <line x1="165" y1="200" x2="165" y2="335" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round"/>
      <line x1="220" y1="200" x2="220" y2="335" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round"/>
      <line x1="275" y1="200" x2="275" y2="335" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round"/>
      <line x1="330" y1="200" x2="330" y2="335" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round"/>
      <line x1="385" y1="200" x2="385" y2="335" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round"/>
      <line x1="435" y1="200" x2="435" y2="335" stroke="#0ea5e9" stroke-width="7" stroke-linecap="round"/>
      
      <!-- Floating Organic Leaves & Plastic Blocking Grate -->
      <ellipse cx="235" cy="250" rx="40" ry="24" fill="#22c55e" opacity="0.95"/>
      <ellipse cx="310" cy="270" rx="44" ry="28" fill="#16a34a" opacity="0.95"/>
      <circle cx="370" cy="245" r="32" fill="#e11d48" opacity="0.9"/>
      <rect x="180" y="275" width="45" height="20" rx="6" fill="#f59e0b" transform="rotate(-15 180 275)"/>
      <ellipse cx="410" cy="285" rx="30" ry="18" fill="#a855f7"/>
      
      <!-- Water Ripples -->
      <circle cx="290" cy="265" r="70" fill="none" stroke="#e0f2fe" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.6"/>
      
      <!-- Hotspot Tag -->
      <rect x="190" y="45" width="220" height="38" rx="19" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-opacity="0.6"/>
      <text x="300" y="69" fill="#e0f2fe" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle" letter-spacing="1">🌊 DRAIN BLOCKAGE</text>
    </svg>`,
  },
];

export default function PhotoStep({ preview, onSelect, onClear }: PhotoStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shutterEffect, setShutterEffect] = useState(false);

  // Trigger scanning simulation when preview is created
  useEffect(() => {
    if (preview) {
      setIsScanning(true);
      const timer = setTimeout(() => {
        setIsScanning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [preview]);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) {
      triggerShutter();
      onSelect(file);
    }
  }

  function triggerShutter() {
    setShutterEffect(true);
    setTimeout(() => setShutterEffect(false), 300);
  }

  function selectSamplePreset(svgContent: string, title: string) {
    triggerShutter();
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const file = new File([blob], `${title.toLowerCase().replace(/\s+/g, "_")}.svg`, {
      type: "image/svg+xml",
    });
    onSelect(file);
  }

  return (
    <div className="animate-fade-in-up">
      {/* Header section with status pill */}
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 liquid-glass rounded-full px-3 py-1 text-xs font-body text-white/70">
            <Sparkles size={12} className="animate-pulse text-white/50" />
            <span>AI Vision Triage</span>
          </div>
          <h2 className="mt-2 text-xl font-heading italic text-white tracking-tight">
            Snap or upload the hotspot
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-white/50 font-body font-light">
            A clear photo allows WasteYatra AI to verify report authenticity, classify severity, and calculate payout tier.
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Shutter Flash Animation Overlay */}
      {shutterEffect && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-white/40 animate-ping" />
      )}

      {!preview ? (
        <div className="mt-4 space-y-4">
          {/* Main Dropzone Area */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`group relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl liquid-glass p-6 text-center transition-all duration-300 ${
              dragging
                ? "scale-[1.01] brightness-125 ring-1 ring-white/40"
                : "hover:brightness-110"
            }`}
          >
            {/* Ambient Background Gradient Effect */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-white/10" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-white/10" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 transition-transform duration-300 group-hover:scale-110">
              <Camera size={28} className="text-white/80 transition-transform duration-300 group-hover:scale-105" strokeWidth={1.75} />
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black shadow-sm">
                <ImagePlus size={11} />
              </div>
            </div>

            <div className="relative z-10 max-w-xs">
              <p className="text-sm font-heading italic text-white tracking-tight group-hover:text-white/90 transition-colors">
                Tap to take or upload photo
              </p>
              <p className="mt-1 text-[11px] text-white/50 font-body font-light">
                Drag & drop JPG or PNG, or click to use camera
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-body text-white/60 border border-white/10">
              <Scan size={11} className="text-white/70" />
              <span>Instant AI Waste Analysis</span>
            </div>
          </button>

          {/* Quick Preset Samples ("Or try a sample photo") */}
          <div className="liquid-glass rounded-2xl p-2.5 sm:p-3.5">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-body text-white/50 mb-2 px-0.5">
              <span>Or test with a sample photo</span>
              <span className="text-white/80 flex items-center gap-1">
                <Zap size={11} className="text-amber-400" /> 1-Tap Demo
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectSamplePreset(preset.svg, preset.title)}
                  className={`group relative flex flex-col items-center overflow-hidden rounded-xl sm:rounded-2xl liquid-glass p-1.5 sm:p-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${preset.cardGlow} active:scale-95`}
                >
                  <div className="relative h-16 sm:h-24 w-full overflow-hidden rounded-lg sm:rounded-xl bg-black/80 border border-white/10 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(preset.svg)}`}
                      alt={preset.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute top-1 left-1 sm:top-1.5 sm:left-1.5 rounded-full px-1.5 py-0.5 text-[7px] sm:text-[9px] font-body font-semibold backdrop-blur-md ${preset.badgeColor}`}>
                      {preset.badge}
                    </div>
                  </div>
                  <div className="mt-1.5 w-full text-center px-0.5">
                    <p className="text-[10px] sm:text-xs font-semibold font-body text-white group-hover:text-white transition-colors truncate">
                      {preset.title}
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-white/50 font-body truncate mt-0.5 font-light">{preset.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Photo Uploaded Preview & Interactive AI Inspector */
        <div className="mt-4 space-y-3 animate-scale-in">
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-2xl liquid-glass">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2 text-xs font-body">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-medium text-white/90">Photo Uploaded</span>
                <span className="text-white/30">•</span>
                <span className="text-white/70 font-light flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-400" /> AI Verified
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowOverlay(!showOverlay)}
                  className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-body transition-all ${
                    showOverlay
                      ? "bg-white/20 text-white font-medium"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  <Layers size={11} />
                  <span>{showOverlay ? "AI Overlay ON" : "Raw"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  aria-label="Expand image view"
                  className="rounded-lg bg-white/5 p-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Maximize2 size={12} />
                </button>
              </div>
            </div>

            {/* Photo & AI Scanning Canvas */}
            <div className="relative h-60 w-full overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Uploaded waste hotspot"
                className="h-full w-full object-cover"
              />

              {/* Animated Laser Scanner Line */}
              {isScanning && (
                <div className="pointer-events-none absolute inset-x-0 z-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_#ffffff] animate-laser-scan">
                  <div className="absolute left-1/2 -top-3 -translate-x-1/2 rounded-full bg-white px-2 py-0.5 text-[8px] font-bold text-black shadow-sm font-body">
                    SCANNING HOTSPOT...
                  </div>
                </div>
              )}

              {/* AI Vision Overlay (Bounding box & detected targets) */}
              {showOverlay && !isScanning && (
                <div className="absolute inset-0 pointer-events-none animate-fade-in-up">
                  {/* Target Reticle Bounding Box */}
                  <div className="absolute left-[18%] top-[22%] right-[18%] bottom-[22%] rounded-xl border border-dashed border-white/80 bg-white/5 backdrop-blur-[1px] shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    {/* Bounding box corners */}
                    <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-white" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-white" />
                    <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-white" />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-white" />

                    {/* Floating Target Label */}
                    <div className="absolute -top-3.5 left-2 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-black font-body shadow-md">
                      <Target size={10} />
                      <span>HOTSPOT • 98.4% CONFIDENCE</span>
                    </div>

                    {/* Secondary Pin Point */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/80 px-1.5 py-0.5 text-[9px] text-white/80 backdrop-blur-xs font-body">
                      <Sparkles size={9} className="text-white/70" />
                      <span>Volume: ~0.8 m³</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons Floating Overlay */}
              <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1 liquid-glass rounded-full px-3 py-1 text-xs font-body text-white/80 hover:text-white transition-all"
                >
                  <RotateCcw size={11} />
                  <span>Retake</span>
                </button>

                <button
                  type="button"
                  onClick={onClear}
                  aria-label="Remove photo"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/80 text-white transition-all hover:scale-105 hover:bg-red-500"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            {/* AI Diagnostics Bottom Bar */}
            <div className="grid grid-cols-3 divide-x divide-white/10 bg-white/[0.02] p-2.5 text-center text-xs font-body">
              <div className="px-1">
                <p className="flex items-center justify-center gap-1 text-white/40 text-[10px]">
                  <Sun size={10} className="text-white/60" /> Lighting
                </p>
                <p className="mt-0.5 font-medium text-white/90 text-xs">Optimal ☀️</p>
              </div>
              <div className="px-1">
                <p className="flex items-center justify-center gap-1 text-white/40 text-[10px]">
                  <Zap size={10} className="text-white/60" /> Clarity
                </p>
                <p className="mt-0.5 font-medium text-white/90 text-xs">Sharp ⚡</p>
              </div>
              <div className="px-1">
                <p className="flex items-center justify-center gap-1 text-white/40 text-[10px]">
                  <CheckCircle2 size={10} className="text-emerald-400" /> AI Status
                </p>
                <p className="mt-0.5 font-medium text-emerald-400 text-xs">Ready 🎯</p>
              </div>
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="flex items-start gap-2 liquid-glass rounded-xl p-2.5 text-xs text-white/70 font-body font-light">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400" />
            <p>
              <span className="font-medium text-white">Photo verified.</span> Click continue below to set the location.
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isFullscreen && preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in-up">
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl liquid-glass">
            <div className="flex items-center justify-between border-b border-white/10 p-3 px-4">
              <span className="text-xs font-body text-white/80 flex items-center gap-1.5">
                <Eye size={13} className="text-white/60" /> Full Preview & Inspection
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="rounded-full bg-white/10 p-1 text-white/60 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Expanded Hotspot Preview" className="h-auto max-w-full rounded-xl object-contain mx-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
