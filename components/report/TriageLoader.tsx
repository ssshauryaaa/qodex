"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";

const CHECKS = [
  "Confirming this is a genuine report",
  "Checking for duplicates nearby",
  "Classifying severity and payout",
];

interface TriageLoaderProps {
  onComplete: () => void;
}

export default function TriageLoader({ onComplete }: TriageLoaderProps) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (doneCount >= CHECKS.length) {
      const finish = setTimeout(onComplete, 450);
      return () => clearTimeout(finish);
    }
    const step = setTimeout(() => setDoneCount((n) => n + 1), 750);
    return () => clearTimeout(step);
  }, [doneCount, onComplete]);

  return (
    <div className="animate-fade-in-up flex flex-col items-center py-10 text-center">
      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
        <span className="absolute inset-0 rounded-full bg-white/5 animate-ring-pulse" />
        <Sparkles size={26} className="relative text-white/80" strokeWidth={1.75} />
      </div>

      <h2 className="text-lg font-heading italic text-white tracking-tight">AI is triaging your report</h2>
      <p className="mt-1 text-sm text-white/50 font-body font-light">This takes just a couple of seconds</p>

      <ul className="mt-6 w-full max-w-xs space-y-3 text-left">
        {CHECKS.map((label, i) => {
          const isDone = i < doneCount;
          const isActive = i === doneCount;
          return (
            <li
              key={label}
              className="flex items-center gap-3 liquid-glass rounded-xl px-4 py-3 transition-all duration-300"
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  isDone
                    ? "bg-white text-black"
                    : isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/20"
                }`}
              >
                {isDone ? (
                  <Check size={13} strokeWidth={3} className="animate-scale-in" />
                ) : isActive ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </span>
              <span
                className={`text-sm font-body transition-colors duration-300 ${
                  isDone || isActive ? "text-white" : "text-white/30"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
