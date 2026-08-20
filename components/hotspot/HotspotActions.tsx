"use client";

import { useState } from "react";
import { Check, Loader2, Upload } from "lucide-react";
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
            <div className="animate-fade-in-up flex items-center gap-3 rounded-2xl border border-status-resolved/30 bg-status-resolved-light p-4 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-status-resolved text-white">
                    <Check size={16} />
                </span>
                <div>
                    <p className="text-sm font-semibold text-status-resolved">Marked as resolved</p>
                    <p className="text-xs text-stone">
                        {afterPhoto ? "After-photo uploaded — the reporter has been notified." : "The reporter has been notified this was fixed."}
                    </p>
                </div>
            </div>
        );
    }

    if (status === "claimed") {
        return (
            <div className="animate-fade-in-up rounded-2xl border border-stone-light/60 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-ink">Claimed — upload an after-photo to resolve</p>
                <p className="mt-1 text-xs text-stone">
                    Once the spot is cleaned, upload a photo to release the ₹{hotspot.payout} payout and notify the reporter.
                </p>
                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-light bg-sand px-4 py-6 text-sm font-medium text-stone transition-colors hover:border-marigold hover:text-marigold">
                    <Upload size={16} />
                    Upload after-photo
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
                </label>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up flex items-center justify-between gap-3 rounded-2xl border border-stone-light/60 bg-white p-4 shadow-sm">
            <div>
                <p className="text-sm font-semibold text-ink">Open job — ₹{hotspot.payout}</p>
                <p className="text-xs text-stone">Claim it and mark resolved once cleaned up.</p>
            </div>
            <button
                type="button"
                onClick={handleClaim}
                disabled={claiming}
                className="flex shrink-0 items-center gap-2 rounded-full bg-marigold px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-70"
            >
                {claiming ? <Loader2 size={15} className="animate-spin" /> : null}
                {claiming ? "Claiming…" : "Claim job"}
            </button>
        </div>
    );
}