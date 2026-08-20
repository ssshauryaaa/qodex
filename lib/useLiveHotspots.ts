"use client";

import { useState, useEffect } from "react";
import {
    SEED_HOTSPOTS,
    getStoredHotspots,
    EVENT_KEY,
    type Hotspot
} from "./hotspots";

/** React hook to subscribe to live real-time hotspots in client components */
export function useLiveHotspots(): Hotspot[] {
    const [hotspots, setHotspots] = useState<Hotspot[]>(SEED_HOTSPOTS);

    useEffect(() => {
        setHotspots(getStoredHotspots());

        const handleUpdate = () => {
            setHotspots(getStoredHotspots());
        };

        window.addEventListener(EVENT_KEY, handleUpdate);
        window.addEventListener("storage", handleUpdate);

        return () => {
            window.removeEventListener(EVENT_KEY, handleUpdate);
            window.removeEventListener("storage", handleUpdate);
        };
    }, []);

    return hotspots;
}

/** React hook for a single live hotspot */
export function useLiveHotspot(id: string): Hotspot | undefined {
    const hotspots = useLiveHotspots();
    return hotspots.find((h) => h.id === id);
}
