"use client";

import { useState } from "react";
import { Check, Loader2, Upload, Sparkles } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";

export default function HotspotActions({ hotspot }: { hotspot: Hotspot }) {
    const [status, setStatus] = useState<Hotspot["status"]>(hotspot.status);
    const [claiming, setClaiming] = useState(false);
    const [afterPhoto, setAfterPhoto] = useState<string | null>(null);

    function handleClaim() {
        setClaiming(true);
        setTimeout(() => {
            setStatus("claimed");
            setClaiming(false);
        }, 700);
    }

    function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setAfterPhoto(URL.createObjectURL(file));
        setStatus("resolved");
    }

    if (status === "resolved") {
        return (
            <div className="animate-fade-in-up flex items-center gap-3 liquid-glass rounded-2xl p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check size={18} />
                </span>
                <div>
                    <p className="text-sm font-heading italic text-white tracking-tight">Marked as resolved</p>
                    <p className="text-xs text-white/50 font-body font-light mt-0.5">
                        {afterPhoto ? "After-photo uploaded — the reporter has been notified." : "The reporter has been notified this was fixed."}
                    </p>
                </div>
            </div>
        );
    }

    if (status === "claimed") {
        return (
            <div className="animate-fade-in-up liquid-glass rounded-2xl p-4">
                <p className="text-sm font-heading italic text-white tracking-tight">Claimed — upload an after-photo to resolve</p>
                <p className="mt-1 text-xs text-white/50 font-body font-light">
                    Once the spot is cleaned, upload a photo to release the ₹{hotspot.payout} payout and notify the reporter.
                </p>
                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 liquid-glass rounded-xl border border-dashed border-white/20 px-4 py-5 text-sm font-body font-medium text-white/60 transition-all hover:text-white hover:brightness-125">
                    <Upload size={15} />
                    Upload after-photo
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
                </label>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up flex items-center justify-between gap-4 liquid-glass rounded-2xl p-4">
            <div>
                <p className="text-sm font-heading italic text-white tracking-tight">Open job — ₹{hotspot.payout}</p>
                <p className="text-xs text-white/50 font-body font-light mt-0.5">Claim it and mark resolved once cleaned up.</p>
            </div>
            <button
                type="button"
                onClick={handleClaim}
                disabled={claiming}
                className="flex shrink-0 items-center gap-2 rounded-full bg-white text-black px-5 py-2 text-sm font-body font-semibold transition-all hover:bg-white/90 hover:scale-105 disabled:opacity-70 active:scale-95 shadow-md"
            >
                {claiming ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {claiming ? "Claiming…" : "Claim job"}
            </button>
        </div>
    );
}