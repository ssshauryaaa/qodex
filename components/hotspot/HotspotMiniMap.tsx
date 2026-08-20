"use client";

import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import type { Hotspot } from "@/lib/hotspots";

const STATUS_COLOR: Record<Hotspot["status"], string> = {
    open: "#D8432F",
    claimed: "#F0B429",
    resolved: "#2F9E58",
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
            className="h-full w-full"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CircleMarker
                center={[hotspot.lat, hotspot.lng]}
                radius={10}
                pathOptions={{
                    color: STATUS_COLOR[hotspot.status],
                    fillColor: STATUS_COLOR[hotspot.status],
                    fillOpacity: 0.9,
                    weight: 3,
                }}
            />
        </MapContainer>
    );
}