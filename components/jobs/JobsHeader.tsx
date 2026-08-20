import { Briefcase } from "lucide-react";

interface JobsHeaderProps {
    openCount: number;
    totalPayout: number;
}

export default function JobsHeader({ openCount, totalPayout }: JobsHeaderProps) {
    return (
        <header className="bg-ink px-4 pb-6 pt-8 text-white sm:px-6">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold/20 text-marigold">
                    <Briefcase size={20} />
                </span>
                <div>
                    <h1 className="text-lg font-semibold sm:text-xl">Nearby jobs</h1>
                    <p className="text-xs text-white/60 sm:text-sm">
                        Open cleanup jobs near you, sorted for the best pickup.
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-4 flex max-w-3xl gap-3">
                <div className="rounded-xl bg-white/10 px-3 py-2 text-xs sm:text-sm">
                    <span className="font-semibold">{openCount}</span> open now
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2 text-xs sm:text-sm">
                    <span className="font-semibold">₹{totalPayout}</span> total payout available
                </div>
            </div>
        </header>
    );
}