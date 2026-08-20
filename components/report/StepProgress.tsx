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
    <div className="flex items-center justify-between pb-4 mb-3 border-b border-white/10">
      {STEPS.map((step, i) => {
        const isComplete = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isComplete
                    ? "bg-white text-black"
                    : isActive
                    ? "bg-white/20 text-white ring-2 ring-white/40"
                    : "bg-white/5 text-white/30 border border-white/10"
                }`}
              >
                {isComplete ? (
                  <Check size={13} className="animate-scale-in" strokeWidth={3} />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs font-medium font-body transition-colors duration-300 ${
                  isActive ? "text-white" : isComplete ? "text-white/70" : "text-white/30"
                }`}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="relative mx-3 h-px flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-white/50 transition-all duration-500 ease-out"
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
