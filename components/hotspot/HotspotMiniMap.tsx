"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Hotspot } from "@/lib/hotspots";

const STATUS_COLOR: Record<Hotspot["status"], string> = {
  open: "#f87171",
  claimed: "#fbbf24",
  resolved: "#34d399",
};

function MiniMapController({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate map size after mounting and layout animations
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    map.setView([lat, lng], 15, { animate: false });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [map, lat, lng]);

  return null;
}

function createMiniPinIcon(status: Hotspot["status"]) {
  const color = STATUS_COLOR[status];
  const pulse =
    status === "open"
      ? `<span style="position:absolute;inset:-6px;border-radius:9999px;background:${color};opacity:0.4;animation:ring-pulse 2s ease-out infinite;"></span>`
      : "";

  const html = `
    <div style="position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center;">
      ${pulse}
      <div style="
        position:relative;
        width:18px;
        height:18px;
        border-radius:9999px;
        background:${color};
        border:2px solid rgba(255,255,255,0.95);
        box-shadow:0 0 12px ${color}90, 0 2px 8px rgba(0,0,0,0.6);
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        <div style="width:6px;height:6px;border-radius:9999px;background:rgba(255,255,255,0.95);"></div>
      </div>
    </div>`;

  return L.divIcon({
    html,
    className: "leaflet-mini-pin",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export default function HotspotMiniMap({ hotspot }: { hotspot: Hotspot }) {
  const icon = createMiniPinIcon(hotspot.status);

  return (
    <div className="relative h-full w-full bg-neutral-950 overflow-hidden">
      <MapContainer
        center={[hotspot.lat, hotspot.lng]}
        zoom={15}
        scrollWheelZoom={false}
        dragging={true}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
        <MiniMapController lat={hotspot.lat} lng={hotspot.lng} />
        <Marker position={[hotspot.lat, hotspot.lng]} icon={icon} />
      </MapContainer>
    </div>
  );
}