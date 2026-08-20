import Link from "next/link";
import { PartyPopper } from "lucide-react";

export default function JobsEmptyState() {
    return (
        <div className="animate-fade-in-up flex flex-col items-center gap-2 rounded-2xl border border-dashed border-stone-light bg-white/60 px-6 py-12 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-status-resolved-light text-status-resolved">
                <PartyPopper size={22} />
            </span>
            <p className="text-sm font-semibold text-ink">All caught up</p>
            <p className="max-w-xs text-xs text-stone">
                No open jobs near you right now — nice work. Check back soon or view the live map.
            </p>
            <Link href="/map" className="mt-1 text-xs font-semibold text-marigold-dark hover:underline">
                View live map →
            </Link>
        </div>
    );
}