import Link from "next/link";
import { MapPin } from "lucide-react";

export default function HotspotNotFound() {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-sand px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-status-open-light text-status-open">
                <MapPin size={24} />
            </div>
            <h1 className="text-lg font-semibold text-ink">Hotspot not found</h1>
            <p className="max-w-sm text-sm text-stone">
                This report may have been removed, or the link is out of date.
            </p>
            <Link
                href="/map"
                className="mt-2 rounded-full bg-marigold px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
                Back to live map
            </Link>
        </div>
    );
}