"use client";

import { Check } from "lucide-react";
import type { ReportStep } from "@/lib/types";

const STEPS: { id: ReportStep; label: string }[] = [
  { id: "photo", label: "Photo" },
  { id: "location", label: "Location" },
  { id: "category", label: "Category" },
];

export default function StepProgress({ current }: { current: ReportStep }) {
  const activeIndex = STEPS.findIndex((s) => s.id === current);
  const currentIndex = activeIndex === -1 ? STEPS.length : activeIndex;

  return (
    <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-light/40">
      {STEPS.map((step, i) => {
        const isComplete = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isComplete
                    ? "bg-marigold text-white shadow-xs"
                    : isActive
                    ? "bg-ink text-white ring-3 ring-marigold-light"
                    : "bg-white text-stone border border-stone-light/70"
                }`}
              >
                {isComplete ? (
                  <Check size={13} className="animate-scale-in" strokeWidth={3} />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs font-semibold transition-colors duration-300 ${
                  isActive || isComplete ? "text-ink" : "text-stone"
                }`}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-stone-light/60">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-marigold transition-all duration-500 ease-out"
                  style={{ width: i < currentIndex ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
