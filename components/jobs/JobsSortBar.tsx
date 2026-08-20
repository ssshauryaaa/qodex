"use client";

import { ArrowDownWideNarrow, IndianRupee, Sparkles } from "lucide-react";

type SortKey = "distance" | "payout";

interface JobsSortBarProps {
    sortBy: SortKey;
    onChange: (value: SortKey) => void;
}

const OPTIONS: { key: SortKey; label: string; icon: typeof ArrowDownWideNarrow; color: string }[] = [
    { key: "distance", label: "Nearest to Me", icon: ArrowDownWideNarrow, color: "text-emerald-400" },
    { key: "payout", label: "Highest Bounty", icon: IndianRupee, color: "text-amber-400" },
];

export default function JobsSortBar({ sortBy, onChange }: JobsSortBarProps) {
    return (
        <div className="inline-flex items-center gap-1.5 liquid-glass rounded-full p-1.5 border border-white/10 shadow-lg">
            {OPTIONS.map(({ key, label, icon: Icon, color }) => {
                const isActive = sortBy === key;
                return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onChange(key)}
                        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-body transition-all duration-300 ${
                            isActive
                                ? "bg-white text-black font-semibold shadow-md scale-[1.02]"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                    >
                        <Icon size={13} className={isActive ? "text-black" : color} />
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}