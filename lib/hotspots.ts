import type { Category } from "./types";

export type HotspotStatus = "open" | "claimed" | "resolved";

export interface Hotspot {
    id: string;
    lat: number;
    lng: number;
    status: HotspotStatus;
    category: Category;
    severity: "low" | "medium" | "high";
    payout: number;
    ward: string;
    hoursAgo: number;
    resolutionHours?: number;
    photoUrl: string;
}

export function timeAgo(hoursAgo: number): string {
    if (hoursAgo < 0.05) return "Just now";
    if (hoursAgo < 1) return `${Math.max(1, Math.round(hoursAgo * 60))} min ago`;
    if (hoursAgo < 24) return `${Math.round(hoursAgo)}h ago`;
    return `${Math.round(hoursAgo / 24)}d ago`;
}

export const SEED_HOTSPOTS: Hotspot[] = [
    { id: "h1", lat: 28.6519, lng: 77.1909, status: "open", category: "illegal_dump", severity: "high", payout: 150, ward: "Karol Bagh", hoursAgo: 2, photoUrl: "https://picsum.photos/seed/h1/480/320" },
    { id: "h2", lat: 28.5677, lng: 77.2431, status: "claimed", category: "overflow", severity: "low", payout: 50, ward: "Lajpat Nagar", hoursAgo: 5, photoUrl: "https://picsum.photos/seed/h2/480/320" },
    { id: "h3", lat: 28.5921, lng: 77.046, status: "resolved", category: "drain_block", severity: "medium", payout: 90, ward: "Dwarka", hoursAgo: 28, resolutionHours: 4, photoUrl: "https://picsum.photos/seed/h3/480/320" },
    { id: "h4", lat: 28.7495, lng: 77.0565, status: "open", category: "drain_block", severity: "medium", payout: 90, ward: "Rohini", hoursAgo: 0.7, photoUrl: "https://picsum.photos/seed/h4/480/320" },
    { id: "h5", lat: 28.5245, lng: 77.2066, status: "resolved", category: "overflow", severity: "low", payout: 50, ward: "Saket", hoursAgo: 50, resolutionHours: 3, photoUrl: "https://picsum.photos/seed/h5/480/320" },
    { id: "h6", lat: 28.6315, lng: 77.2167, status: "claimed", category: "illegal_dump", severity: "high", payout: 150, ward: "Connaught Place", hoursAgo: 3, photoUrl: "https://picsum.photos/seed/h6/480/320" },
    { id: "h7", lat: 28.6506, lng: 77.2303, status: "open", category: "overflow", severity: "low", payout: 50, ward: "Chandni Chowk", hoursAgo: 0.3, photoUrl: "https://picsum.photos/seed/h7/480/320" },
    { id: "h8", lat: 28.5244, lng: 77.1588, status: "resolved", category: "drain_block", severity: "medium", payout: 90, ward: "Vasant Kunj", hoursAgo: 14, resolutionHours: 6, photoUrl: "https://picsum.photos/seed/h8/480/320" },
    { id: "h9", lat: 28.6096, lng: 77.2953, status: "open", category: "illegal_dump", severity: "high", payout: 150, ward: "Mayur Vihar", hoursAgo: 1, photoUrl: "https://picsum.photos/seed/h9/480/320" },
    { id: "h10", lat: 28.6992, lng: 77.1313, status: "claimed", category: "drain_block", severity: "medium", payout: 90, ward: "Pitampura", hoursAgo: 4, photoUrl: "https://picsum.photos/seed/h10/480/320" },
    { id: "h11", lat: 28.6219, lng: 77.0878, status: "resolved", category: "overflow", severity: "low", payout: 50, ward: "Janakpuri", hoursAgo: 20, resolutionHours: 5, photoUrl: "https://picsum.photos/seed/h11/480/320" },
    { id: "h12", lat: 28.5535, lng: 77.2003, status: "open", category: "overflow", severity: "low", payout: 50, ward: "Hauz Khas", hoursAgo: 3, photoUrl: "https://picsum.photos/seed/h12/480/320" },
    { id: "h13", lat: 28.6784, lng: 77.2891, status: "open", category: "illegal_dump", severity: "high", payout: 150, ward: "Shahdara", hoursAgo: 0.5, photoUrl: "https://picsum.photos/seed/h13/480/320" },
    { id: "h14", lat: 28.6742, lng: 77.1312, status: "claimed", category: "overflow", severity: "low", payout: 50, ward: "Punjabi Bagh", hoursAgo: 2, photoUrl: "https://picsum.photos/seed/h14/480/320" },
    { id: "h15", lat: 28.71, lng: 77.1925, status: "resolved", category: "illegal_dump", severity: "high", payout: 150, ward: "Model Town", hoursAgo: 36, resolutionHours: 9, photoUrl: "https://picsum.photos/seed/h15/480/320" },
    { id: "h16", lat: 28.5487, lng: 77.2519, status: "open", category: "drain_block", severity: "medium", payout: 90, ward: "Nehru Place", hoursAgo: 0.8, photoUrl: "https://picsum.photos/seed/h16/480/320" },
];

export const STORAGE_KEY = "wasteyatra_live_hotspots_v2";
export const EVENT_KEY = "wasteyatra_hotspots_updated";

/** Get stored hotspots from localStorage or initialize with SEED_HOTSPOTS */
export function getStoredHotspots(): Hotspot[] {
    if (typeof window === "undefined") return SEED_HOTSPOTS;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_HOTSPOTS));
            return SEED_HOTSPOTS;
        }
        return JSON.parse(stored);
    } catch {
        return SEED_HOTSPOTS;
    }
}

/** Add a new reported hotspot in real-time */
export function addReportedHotspot(hotspot: {
    lat: number;
    lng: number;
    category: Category;
    severity: "low" | "medium" | "high";
    payout: number;
    ward?: string;
    photoUrl?: string;
}): Hotspot {
    const list = getStoredHotspots();
    const id = `user-${Date.now().toString(36)}`;
    
    // Auto-detect ward from coordinates if not specified
    const ward = hotspot.ward || (
        hotspot.lat > 28.64 ? (hotspot.lng > 77.20 ? "Chandni Chowk" : "Karol Bagh")
        : (hotspot.lng > 77.20 ? "Lajpat Nagar" : "Dwarka")
    );

    const newHotspot: Hotspot = {
        id,
        lat: hotspot.lat,
        lng: hotspot.lng,
        status: "open",
        category: hotspot.category,
        severity: hotspot.severity,
        payout: hotspot.payout,
        ward,
        hoursAgo: 0.01,
        photoUrl: hotspot.photoUrl || "https://picsum.photos/seed/user/480/320",
    };

    const updated = [newHotspot, ...list];
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: newHotspot }));
        }
    } catch (e) {
        console.error("Failed to save live hotspot:", e);
    }
    return newHotspot;
}

/** Update hotspot status (e.g. claim, resolve) */
export function updateHotspotStatus(id: string, status: HotspotStatus, resolutionHours?: number) {
    const list = getStoredHotspots();
    const updated = list.map((h) => {
        if (h.id === id) {
            return {
                ...h,
                status,
                ...(resolutionHours ? { resolutionHours } : {}),
            };
        }
        return h;
    });

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: { id, status } }));
        }
    } catch (e) {
        console.error("Failed to update hotspot status:", e);
    }
}