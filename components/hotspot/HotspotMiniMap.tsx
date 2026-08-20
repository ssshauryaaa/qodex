"use client";

import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import type { Hotspot } from "@/lib/hotspots";

const STATUS_COLOR: Record<Hotspot["status"], string> = {
    open: "#f87171",
    claimed: "#fbbf24",
    resolved: "#34d399",
};

export default function HotspotMiniMap({ hotspot }: { hotspot: Hotspot }) {
    return (
        <MapContainer
            center={[hotspot.lat, hotspot.lng]}
            zoom={15}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            attributionControl={false}
            className="h-full w-full bg-black"
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <CircleMarker
                center={[hotspot.lat, hotspot.lng]}
                radius={9}
                pathOptions={{
                    color: "#ffffff",
                    fillColor: STATUS_COLOR[hotspot.status],
                    fillOpacity: 0.95,
                    weight: 2,
                }}
            />
        </MapContainer>
    );
}