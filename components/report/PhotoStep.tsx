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
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#111111"/>
      <rect y="280" width="600" height="120" fill="#1c1c1c"/>
      <line x1="0" y1="280" x2="600" y2="280" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2"/>
      <!-- Green Dumpster -->
      <path d="M 180 180 L 420 180 L 390 320 L 210 320 Z" fill="#222222" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2"/>
      <rect x="170" y="165" width="260" height="20" rx="4" fill="#333333" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
      <line x1="260" y1="200" x2="250" y2="300" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>
      <line x1="340" y1="200" x2="350" y2="300" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>
      <!-- Trash Bags & Spills -->
      <circle cx="230" cy="150" r="32" fill="#555555" opacity="0.9"/>
      <circle cx="280" cy="140" r="40" fill="#444444" opacity="0.95"/>
      <circle cx="340" cy="155" r="35" fill="#666666" opacity="0.9"/>
      <circle cx="370" cy="165" r="25" fill="#777777" opacity="0.9"/>
      <!-- Fallen items on ground -->
      <ellipse cx="160" cy="330" rx="25" ry="15" fill="#555555"/>
      <rect x="420" y="325" width="30" height="20" rx="3" fill="#666666" transform="rotate(15 420 325)"/>
      <circle cx="460" cy="340" r="10" fill="#888888"/>
      <!-- Hotspot Tag -->
      <rect x="200" y="50" width="200" height="36" rx="18" fill="#ffffff" fill-opacity="0.15"/>
      <text x="300" y="73" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">OVERFLOW HOTSPOT</text>
    </svg>`,
  },
  {
    id: "illegal_dump",
    title: "Illegal Dump Site",
    desc: "Roadside junk & debris",
    badge: "High Severity",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#111111"/>
      <path d="M 0 250 Q 300 220 600 250 L 600 400 L 0 400 Z" fill="#222222"/>
      <!-- Furniture & Debris -->
      <rect x="180" y="190" width="130" height="90" rx="8" fill="#333333" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5"/>
      <rect x="200" y="160" width="90" height="35" rx="5" fill="#444444"/>
      <circle cx="360" cy="240" r="45" fill="#2a2a2a" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2"/>
      <circle cx="360" cy="240" r="20" fill="#111111"/>
      <rect x="310" y="260" width="120" height="50" rx="6" fill="#555555" transform="rotate(-10 310 260)"/>
      <circle cx="130" cy="290" r="28" fill="#444444"/>
      <circle cx="480" cy="300" r="22" fill="#666666"/>
      <!-- Hotspot Tag -->
      <rect x="200" y="50" width="200" height="36" rx="18" fill="#ffffff" fill-opacity="0.15"/>
      <text x="300" y="73" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">ILLEGAL DUMPING</text>
    </svg>`,
  },
  {
    id: "drain_block",
    title: "Blocked Drain",
    desc: "Clogged stormwater grate",
    badge: "Action Needed",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#111111"/>
      <!-- Road Surface & Drain Grate -->
      <rect x="100" y="180" width="400" height="180" rx="12" fill="#222222" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2"/>
      <line x1="160" y1="200" x2="160" y2="340" stroke="#111111" stroke-width="8"/>
      <line x1="220" y1="200" x2="220" y2="340" stroke="#111111" stroke-width="8"/>
      <line x1="280" y1="200" x2="280" y2="340" stroke="#111111" stroke-width="8"/>
      <line x1="340" y1="200" x2="340" y2="340" stroke="#111111" stroke-width="8"/>
      <line x1="400" y1="200" x2="400" y2="340" stroke="#111111" stroke-width="8"/>
      <line x1="440" y1="200" x2="440" y2="340" stroke="#111111" stroke-width="8"/>
      <!-- Leaves & Plastic Blocking Grate -->
      <circle cx="240" cy="250" r="38" fill="#555555" opacity="0.95"/>
      <circle cx="300" cy="270" r="42" fill="#666666" opacity="0.95"/>
      <ellipse cx="360" cy="240" rx="45" ry="30" fill="#444444"/>
      <ellipse cx="200" cy="280" rx="35" ry="22" fill="#333333"/>
      <!-- Hotspot Tag -->
      <rect x="200" y="50" width="200" height="36" rx="18" fill="#ffffff" fill-opacity="0.15"/>
      <text x="300" y="73" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">DRAIN BLOCKAGE</text>
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
          <div className="liquid-glass rounded-xl p-3">
            <div className="flex items-center justify-between text-[11px] font-body text-white/50 mb-2">
              <span>Or test with a sample photo</span>
              <span className="text-white/70 flex items-center gap-1">
                <Zap size={11} /> 1-Tap Demo
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectSamplePreset(preset.svg, preset.title)}
                  className="group relative flex flex-col items-center overflow-hidden rounded-xl liquid-glass p-1.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:brightness-125"
                >
                  <div className="relative h-16 w-full overflow-hidden rounded-lg bg-black/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(preset.svg)}`}
                      alt={preset.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-1 left-1 rounded bg-black/70 px-1 py-0.5 text-[8px] font-body text-white/80 backdrop-blur-xs">
                      {preset.badge}
                    </div>
                  </div>
                  <div className="mt-1 w-full text-center">
                    <p className="text-[11px] font-medium font-body text-white/90 truncate">
                      {preset.title}
                    </p>
                    <p className="text-[9px] text-white/40 font-body truncate">{preset.desc}</p>
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
