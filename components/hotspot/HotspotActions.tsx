"use client";

import { useState } from "react";
import { Check, Loader2, Upload, Sparkles, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";
import { updateHotspotStatus, type Hotspot } from "@/lib/hotspots";

export default function HotspotActions({ hotspot }: { hotspot: Hotspot }) {
    const [status, setStatus] = useState<Hotspot["status"]>(hotspot.status);
    const [claiming, setClaiming] = useState(false);
    const [resolving, setResolving] = useState(false);
    const [afterPhoto, setAfterPhoto] = useState<string | null>(null);

    function handleClaim() {
        setClaiming(true);
        setTimeout(() => {
            setStatus("claimed");
            updateHotspotStatus(hotspot.id, "claimed");
            setClaiming(false);
        }, 500);
    }

    function resolveWithMockPhoto() {
        setResolving(true);
        setTimeout(() => {
            setAfterPhoto("mock-clean");
            setStatus("resolved");
            updateHotspotStatus(hotspot.id, "resolved", 1.5);
            setResolving(false);
        }, 600);
    }

    function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setAfterPhoto(URL.createObjectURL(file));
        setStatus("resolved");
        updateHotspotStatus(hotspot.id, "resolved", 1.5);
    }

    if (status === "resolved") {
        return (
            <div className="animate-fade-in-up flex flex-col sm:flex-row sm:items-center justify-between gap-3 liquid-glass rounded-2xl p-4 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <Check size={18} />
                    </span>
                    <div>
                        <p className="text-sm font-heading italic text-white tracking-tight">Cleanup Verified & Resolved</p>
                        <p className="text-xs text-white/50 font-body font-light mt-0.5">
                            ₹{hotspot.payout} payout released to worker. Map marker updated to green.
                        </p>
                    </div>
                </div>
                <Link
                    href="/map"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full liquid-glass-strong px-4 py-2 text-xs font-body font-semibold text-white hover:brightness-125 transition-all shrink-0"
                >
                    <span>Check Live Map</span>
                    <ArrowRight size={13} />
                </Link>
            </div>
        );
    }

    if (status === "claimed") {
        return (
            <div className="animate-fade-in-up liquid-glass rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-heading italic text-white tracking-tight">Claimed — Ready for Cleanup</p>
                    <span className="text-[10px] font-body text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                        In Progress
                    </span>
                </div>
                <p className="mt-1 text-xs text-white/50 font-body font-light">
                    Upload an "After" photo to verify the area is clean and instantly unlock the ₹{hotspot.payout} payout.
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={resolveWithMockPhoto}
                        disabled={resolving}
                        className="flex items-center justify-center gap-2 rounded-xl bg-white text-black font-semibold text-xs py-3 hover:bg-white/90 transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                        {resolving ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                        <span>{resolving ? "Verifying with AI…" : "1-Click Verify & Resolve"}</span>
                    </button>

                    <label className="flex cursor-pointer items-center justify-center gap-2 liquid-glass rounded-xl border border-dashed border-white/20 py-3 text-xs font-body font-medium text-white/70 transition-all hover:text-white hover:brightness-125">
                        <Upload size={14} />
                        <span>Upload photo file</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
                    </label>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up flex flex-col sm:flex-row sm:items-center justify-between gap-4 liquid-glass rounded-2xl p-4 sm:p-5">
            <div>
                <div className="flex items-center gap-2">
                    <p className="text-base font-heading italic text-white tracking-tight">Open for Cleanup</p>
                    <span className="text-[10px] font-body text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                        ₹{hotspot.payout} Bounty
                    </span>
                </div>
                <p className="text-xs text-white/50 font-body font-light mt-0.5">
                    Claim this job to reserve it on your profile and start the cleanup.
                </p>
            </div>
            <button
                type="button"
                onClick={handleClaim}
                disabled={claiming}
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-xs font-body font-semibold transition-all hover:bg-white/90 hover:scale-105 disabled:opacity-70 active:scale-95 shadow-lg"
            >
                {claiming ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>{claiming ? "Claiming Job…" : "Claim This Job"}</span>
            </button>
        </div>
    );
}