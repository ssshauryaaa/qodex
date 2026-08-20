"use client";

import { ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ReportHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-light/60 bg-sand/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-1.5 text-sm font-medium text-stone transition-colors hover:text-ink"
        >
          <ChevronLeft
            size={18}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Back
        </Link>

        <div className="text-center">
          <h1 className="text-[15px] font-semibold text-ink">Report a hotspot</h1>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-marigold-light px-3 py-1.5">
          <Sparkles size={13} className="text-marigold-dark" />
          <span className="text-[11px] font-medium text-marigold-dark">Under 30 sec</span>
        </div>
      </div>
    </header>
  );
}
