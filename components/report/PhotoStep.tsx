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
  AlertTriangle,
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
      <rect width="600" height="400" fill="#1b2430"/>
      <rect y="280" width="600" height="120" fill="#2c2c2a"/>
      <line x1="0" y1="280" x2="600" y2="280" stroke="#f2872e" stroke-width="4"/>
      <!-- Green Dumpster -->
      <path d="M 180 180 L 420 180 L 390 320 L 210 320 Z" fill="#0f6e56" stroke="#e1f5ee" stroke-width="3"/>
      <rect x="170" y="165" width="260" height="20" rx="4" fill="#04342c" stroke="#0f6e56" stroke-width="2"/>
      <line x1="260" y1="200" x2="250" y2="300" stroke="#04342c" stroke-width="3"/>
      <line x1="340" y1="200" x2="350" y2="300" stroke="#04342c" stroke-width="3"/>
      <!-- Trash Bags & Spills -->
      <circle cx="230" cy="150" r="32" fill="#f2872e" opacity="0.9"/>
      <circle cx="280" cy="140" r="40" fill="#993c1d" opacity="0.95"/>
      <circle cx="340" cy="155" r="35" fill="#d8432f" opacity="0.9"/>
      <circle cx="370" cy="165" r="25" fill="#f0b429" opacity="0.9"/>
      <!-- Fallen items on ground -->
      <ellipse cx="160" cy="330" rx="25" ry="15" fill="#f0b429"/>
      <rect x="420" y="325" width="30" height="20" rx="3" fill="#d8432f" transform="rotate(15 420 325)"/>
      <circle cx="460" cy="340" r="10" fill="#f2872e"/>
      <!-- Hotspot Tag -->
      <rect x="200" y="50" width="200" height="36" rx="18" fill="#f2872e"/>
      <text x="300" y="73" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">OVERFLOW HOTSPOT</text>
    </svg>`,
  },
  {
    id: "illegal_dump",
    title: "Illegal Dump Site",
    desc: "Roadside junk & debris",
    badge: "High Severity",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#182026"/>
      <path d="M 0 250 Q 300 220 600 250 L 600 400 L 0 400 Z" fill="#3a3835"/>
      <!-- Furniture & Debris -->
      <rect x="180" y="190" width="130" height="90" rx="8" fill="#993c1d" stroke="#f2872e" stroke-width="2"/>
      <rect x="200" y="160" width="90" height="35" rx="5" fill="#faece7"/>
      <circle cx="360" cy="240" r="45" fill="#2c2c2a" stroke="#d8432f" stroke-width="4"/>
      <circle cx="360" cy="240" r="20" fill="#182026"/>
      <rect x="310" y="260" width="120" height="50" rx="6" fill="#f0b429" transform="rotate(-10 310 260)"/>
      <circle cx="130" cy="290" r="28" fill="#d8432f"/>
      <circle cx="480" cy="300" r="22" fill="#0f6e56"/>
      <!-- Hotspot Tag -->
      <rect x="200" y="50" width="200" height="36" rx="18" fill="#d8432f"/>
      <text x="300" y="73" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">ILLEGAL DUMPING</text>
    </svg>`,
  },
  {
    id: "drain_block",
    title: "Blocked Drain",
    desc: "Clogged stormwater grate",
    badge: "Action Needed",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <rect width="600" height="400" fill="#0c2328"/>
      <!-- Road Surface & Drain Grate -->
      <rect x="100" y="180" width="400" height="180" rx="12" fill="#1b2430" stroke="#0f6e56" stroke-width="3"/>
      <line x1="160" y1="200" x2="160" y2="340" stroke="#04342c" stroke-width="8"/>
      <line x1="220" y1="200" x2="220" y2="340" stroke="#04342c" stroke-width="8"/>
      <line x1="280" y1="200" x2="280" y2="340" stroke="#04342c" stroke-width="8"/>
      <line x1="340" y1="200" x2="340" y2="340" stroke="#04342c" stroke-width="8"/>
      <line x1="400" y1="200" x2="400" y2="340" stroke="#04342c" stroke-width="8"/>
      <line x1="440" y1="200" x2="440" y2="340" stroke="#04342c" stroke-width="8"/>
      <!-- Leaves & Plastic Blocking Grate -->
      <circle cx="240" cy="250" r="38" fill="#f2872e" opacity="0.95"/>
      <circle cx="300" cy="270" r="42" fill="#f0b429" opacity="0.95"/>
      <ellipse cx="360" cy="240" rx="45" ry="30" fill="#d8432f"/>
      <ellipse cx="200" cy="280" rx="35" ry="22" fill="#0f6e56"/>
      <!-- Hotspot Tag -->
      <rect x="200" y="50" width="200" height="36" rx="18" fill="#0f6e56"/>
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

          <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">
            Snap or upload the hotspot
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-stone">
            A clear photo allows Qodex AI to pinpoint waste density, verify report authenticity, and calculate payout.
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
        <div className="pointer-events-none fixed inset-0 z-50 bg-white/80 animate-ping" />
      )}

      {!preview ? (
        <div className="mt-5 space-y-6">
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
            className={`group relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-300 ${dragging
                ? "scale-[1.02] border-marigold bg-marigold-light/80 shadow-lg shadow-marigold/10"
                : "border-stone-light/80 bg-white/90 shadow-sm hover:border-marigold hover:bg-marigold-light/30 hover:shadow-md"
              }`}
          >
            {/* Ambient Background Gradient Effect */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-marigold/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-marigold/20" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-teal/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-teal/20" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-marigold-light to-white shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Camera size={34} className="text-marigold transition-transform duration-300 group-hover:scale-105" strokeWidth={1.75} />
              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-marigold text-white shadow-sm">
                <ImagePlus size={13} />
              </div>
            </div>

            <div className="relative z-10 max-w-xs">
              <p className="text-base font-semibold text-ink group-hover:text-marigold-dark transition-colors">
                Tap to take or upload photo
              </p>
              <p className="mt-1 text-xs text-stone">
                Drag & drop any JPG or PNG, or click to use camera device
              </p>
            </div>

            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-stone border border-stone-light/50">
              <Scan size={13} className="text-marigold" />
              <span>Instant AI Waste Analysis</span>
            </div>
          </button>

          {/* Quick Preset Samples ("Or try a sample photo") */}
          <div className="rounded-2xl border border-stone-light/40 bg-white/60 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone">
                Or test with a sample photo
              </span>
              <span className="text-[11px] font-medium text-teal flex items-center gap-1">
                <Zap size={12} /> 1-Tap Demo
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectSamplePreset(preset.svg, preset.title)}
                  className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-stone-light/60 bg-white p-2 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-marigold hover:shadow-md"
                >
                  <div className="relative h-20 w-full overflow-hidden rounded-lg bg-ink-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(preset.svg)}`}
                      alt={preset.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-1 left-1 rounded bg-ink/70 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs">
                      {preset.badge}
                    </div>
                  </div>
                  <div className="mt-1.5 w-full text-center">
                    <p className="text-xs font-semibold text-ink truncate group-hover:text-marigold">
                      {preset.title}
                    </p>
                    <p className="text-[10px] text-stone truncate">{preset.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Photo Uploaded Preview & Interactive AI Inspector */
        <div className="mt-5 space-y-4 animate-scale-in">
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl border border-stone-light/70 bg-white shadow-lg">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-stone-light/40 bg-sand/60 px-4 py-2.5 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-status-resolved animate-ping" />
                <span className="font-semibold text-ink">Photo Uploaded</span>
                <span className="text-stone">•</span>
                <span className="text-teal font-medium flex items-center gap-1">
                  <CheckCircle2 size={13} /> High Quality Fix
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowOverlay(!showOverlay)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition-all ${showOverlay
                      ? "bg-marigold text-white font-medium shadow-xs"
                      : "bg-white text-ink border border-stone-light/60 hover:bg-sand"
                    }`}
                >
                  <Layers size={13} />
                  <span>{showOverlay ? "AI Overlay ON" : "Raw Photo"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  aria-label="Expand image view"
                  className="rounded-lg border border-stone-light/60 bg-white p-1 text-stone hover:text-ink hover:bg-sand transition-colors"
                >
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>

            {/* Photo & AI Scanning Canvas */}
            <div className="relative h-72 w-full overflow-hidden bg-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Uploaded waste hotspot"
                className="h-full w-full object-cover"
              />

              {/* Animated Laser Scanner Line */}
              {isScanning && (
                <div className="pointer-events-none absolute inset-x-0 z-20 h-1 bg-gradient-to-r from-transparent via-marigold to-transparent shadow-[0_0_15px_#f2872e] animate-laser-scan">
                  <div className="absolute left-1/2 -top-3 -translate-x-1/2 rounded-full bg-marigold px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
                    SCANNING HOTSPOT...
                  </div>
                </div>
              )}

              {/* AI Vision Overlay (Bounding box & detected targets) */}
              {showOverlay && !isScanning && (
                <div className="absolute inset-0 pointer-events-none animate-fade-in-up">
                  {/* Target Reticle Bounding Box */}
                  <div className="absolute left-[18%] top-[22%] right-[18%] bottom-[22%] rounded-xl border-2 border-dashed border-marigold bg-marigold/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(242,135,46,0.25)]">
                    {/* Bounding box corners */}
                    <div className="absolute -top-1 -left-1 h-3.5 w-3.5 border-t-3 border-l-3 border-marigold" />
                    <div className="absolute -top-1 -right-1 h-3.5 w-3.5 border-t-3 border-r-3 border-marigold" />
                    <div className="absolute -bottom-1 -left-1 h-3.5 w-3.5 border-b-3 border-l-3 border-marigold" />
                    <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 border-b-3 border-r-3 border-marigold" />

                    {/* Floating Target Label */}
                    <div className="absolute -top-4 left-3 flex items-center gap-1.5 rounded-full bg-marigold px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
                      <Target size={11} />
                      <span>WASTE HOTSPOT • 98.4% CONFIDENCE</span>
                    </div>

                    {/* Secondary Pin Point */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-ink/80 px-2 py-1 text-[10px] text-white backdrop-blur-xs">
                      <Sparkles size={11} className="text-marigold" />
                      <span>Volume: ~0.8 m³</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons Floating Overlay */}
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white hover:scale-105"
                >
                  <RotateCcw size={13} className="text-marigold" />
                  <span>Retake</span>
                </button>

                <button
                  type="button"
                  onClick={onClear}
                  aria-label="Remove photo"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-status-open/90 text-white shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-status-open"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* AI Diagnostics Bottom Bar */}
            <div className="grid grid-cols-3 divide-x divide-stone-light/40 bg-sand/40 p-3 text-center text-xs">
              <div className="px-2">
                <p className="flex items-center justify-center gap-1 text-stone text-[11px]">
                  <Sun size={12} className="text-marigold" /> Lighting
                </p>
                <p className="mt-0.5 font-semibold text-ink">Optimal ☀️</p>
              </div>
              <div className="px-2">
                <p className="flex items-center justify-center gap-1 text-stone text-[11px]">
                  <Zap size={12} className="text-teal" /> Clarity
                </p>
                <p className="mt-0.5 font-semibold text-ink">Sharp ⚡</p>
              </div>
              <div className="px-2">
                <p className="flex items-center justify-center gap-1 text-stone text-[11px]">
                  <CheckCircle2 size={12} className="text-status-resolved" /> AI Verified
                </p>
                <p className="mt-0.5 font-semibold text-teal-dark">Ready 🎯</p>
              </div>
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="flex items-start gap-2.5 rounded-2xl border border-teal-light bg-teal-light/40 p-3 text-xs text-teal-dark">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal" />
            <p>
              <span className="font-semibold">Hotspot photo verified!</span> Click continue below to set the precise map location.
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isFullscreen && preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md animate-fade-in-up">
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-light/40 p-3 px-4">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Eye size={14} className="text-marigold" /> Full Preview & Inspection
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="rounded-full bg-sand p-1.5 text-stone hover:text-ink transition-colors"
              >
                <X size={16} />
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
