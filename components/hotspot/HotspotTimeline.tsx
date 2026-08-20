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
        { key: "resolved", label: "Resolved", time: resolvedAt, done: hotspot.status === "resolved" },
    ];

    return (
        <div className="animate-fade-in-up rounded-2xl border border-stone-light/60 bg-white p-4 shadow-sm [animation-delay:80ms]">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone">Timeline</h2>
            <ol className="space-y-4">
                {steps.map((step, i) => (
                    <li key={step.key} className="relative flex gap-3 pl-1">
                        {i < steps.length - 1 && (
                            <span
                                className={`absolute left-[15px] top-6 h-full w-px ${step.done ? "bg-status-resolved" : "bg-stone-light"
                                    }`}
                            />
                        )}
                        <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${step.done ? "bg-status-resolved-light text-status-resolved" : "bg-sand text-stone-light"
                                }`}
                        >
                            {step.done ? <Check size={15} /> : <Circle size={15} />}
                        </span>
                        <div className="pt-1">
                            <p className={`text-sm font-medium ${step.done ? "text-ink" : "text-stone"}`}>{step.label}</p>
                            {step.time && (
                                <p className="mt-0.5 flex items-center gap-1 text-xs text-stone">
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