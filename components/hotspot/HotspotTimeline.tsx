import { Check, Circle, Clock } from "lucide-react";
import type { Hotspot } from "@/lib/hotspots";

function formatTime(hoursAgo: number): string {
    const date = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    });
}

export default function HotspotTimeline({ hotspot }: { hotspot: Hotspot }) {
    const reportedAt = formatTime(hotspot.hoursAgo);
    const resolvedAt =
        hotspot.status === "resolved" && hotspot.resolutionHours
            ? formatTime(hotspot.hoursAgo - hotspot.resolutionHours)
            : null;

    const steps = [
        { key: "reported", label: "Reported", time: reportedAt, done: true },
        {
            key: "claimed",
            label: "Claimed by a worker",
            time: hotspot.status !== "open" ? "In progress" : null,
            done: hotspot.status !== "open",
        },
        { key: "resolved", label: "Resolved & payout released", time: resolvedAt, done: hotspot.status === "resolved" },
    ];

    return (
        <div className="animate-fade-in-up liquid-glass rounded-2xl p-4 [animation-delay:80ms]">
            <h2 className="mb-4 text-xs font-body font-semibold uppercase tracking-wider text-white/40">Timeline</h2>
            <ol className="space-y-5">
                {steps.map((step, i) => (
                    <li key={step.key} className="relative flex gap-3 pl-1">
                        {i < steps.length - 1 && (
                            <span
                                className={`absolute left-[15px] top-7 h-full w-px ${
                                    step.done ? "bg-emerald-500/40" : "bg-white/10"
                                }`}
                            />
                        )}
                        <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                                step.done
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-white/5 text-white/30"
                            }`}
                        >
                            {step.done ? <Check size={14} strokeWidth={2.5} /> : <Circle size={14} />}
                        </span>
                        <div className="pt-1">
                            <p className={`text-sm font-body ${step.done ? "text-white font-medium" : "text-white/40 font-light"}`}>
                                {step.label}
                            </p>
                            {step.time && (
                                <p className="mt-0.5 flex items-center gap-1 text-xs font-body font-light text-white/40">
                                    <Clock size={11} />
                                    {step.time}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}