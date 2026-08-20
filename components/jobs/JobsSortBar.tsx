"use client";

import { ArrowDownWideNarrow, IndianRupee } from "lucide-react";

type SortKey = "distance" | "payout";

interface JobsSortBarProps {
    sortBy: SortKey;
    onChange: (value: SortKey) => void;
}

const OPTIONS: { key: SortKey; label: string; icon: typeof ArrowDownWideNarrow }[] = [
    { key: "distance", label: "Nearest", icon: ArrowDownWideNarrow },
    { key: "payout", label: "Highest pay", icon: IndianRupee },
];

export default function JobsSortBar({ sortBy, onChange }: JobsSortBarProps) {
    return (
        <div className="flex items-center gap-1 rounded-full border border-stone-light/60 bg-white p-1">
            {OPTIONS.map(({ key, label, icon: Icon }) => (
                <button
                    key={key}
                    type="button"
                    onClick={() => onChange(key)}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${sortBy === key ? "bg-marigold text-white" : "text-stone hover:text-ink"
                        }`}
                >
                    <Icon size={11} />
                    {label}
                </button>
            ))}
        </div>
    );
}