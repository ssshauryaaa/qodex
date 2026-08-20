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
        <div className="flex items-center gap-1 liquid-glass rounded-full p-1">
            {OPTIONS.map(({ key, label, icon: Icon }) => {
                const isActive = sortBy === key;
                return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onChange(key)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-body transition-all duration-300 ${
                            isActive
                                ? "bg-white text-black font-semibold shadow-md"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <Icon size={12} />
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}