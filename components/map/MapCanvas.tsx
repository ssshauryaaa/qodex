"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Hotspot } from "@/lib/hotspots";

const COLORS: Record<Hotspot["status"], string> = {
  open: "#f87171",
  claimed: "#fbbf24",
  resolved: "#34d399",
};

function createPinIcon(hotspot: Hotspot, isSelected: boolean) {
  const color = COLORS[hotspot.status];
  const pulse =
    hotspot.status === "open"
      ? `<span style="position:absolute;inset:-6px;border-radius:9999px;background:${color};opacity:0.4;animation:ring-pulse 2s ease-out infinite;"></span>`
      : "";

  const size = isSelected ? 26 : 20;
  const innerSize = isSelected ? 10 : 8;

  const html = `
    <div style="position:relative;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
      ${pulse}
      <div style="
        position:relative;
        width:${size}px;
        height:${size}px;
        border-radius:9999px;
        background:${color};
        border:2px solid rgba(255,255,255,0.9);
        box-shadow:0 0 14px ${color}80, 0 4px 10px rgba(0,0,0,0.6);
        display:flex;
        align-items:center;
        justify-content:center;
        transition:all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform:${isSelected ? "scale(1.25) translateY(-2px)" : "scale(1)"};
      ">
        <div style="width:${innerSize}px;height:${innerSize}px;border-radius:9999px;background:rgba(255,255,255,0.95);"></div>
      </div>
    </div>`;

  return L.divIcon({
    html,
    className: "leaflet-minimal-pin",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
}

// Controller component to smoothly fly/pan the map when filters or selections change
function MapController({ hotspots, selectedId }: { hotspots: Hotspot[]; selectedId: string | null }) {
  const map = useMap();

  useEffect(() => {
    // If a specific hotspot is selected, fly to it
    if (selectedId) {
      const selectedHotspot = hotspots.find((h) => h.id === selectedId);
      if (selectedHotspot) {
        map.flyTo([selectedHotspot.lat, selectedHotspot.lng], 14, {
          duration: 1.2,
          easeLinearity: 0.25,
        });
        return;
      }
    }

    // Otherwise, smoothly fly to fit all currently filtered hotspots
    if (hotspots.length > 0) {
      const bounds = L.latLngBounds(hotspots.map((h) => [h.lat, h.lng]));
      map.flyToBounds(bounds, {
        padding: [80, 80],
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [hotspots, selectedId, map]);

  return null;
}

interface MapCanvasProps {
  hotspots: Hotspot[];
  onSelect: (hotspot: Hotspot) => void;
  selectedId: string | null;
}

export default function MapCanvas({ hotspots, onSelect, selectedId }: MapCanvasProps) {
  const icons = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    hotspots.forEach((h) => map.set(h.id, createPinIcon(h, h.id === selectedId)));
    return map;
  }, [hotspots, selectedId]);

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={12}
      scrollWheelZoom
      zoomControl={false}
      className="h-full w-full bg-black"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {/* Dynamic Map panning/flying controller */}
      <MapController hotspots={hotspots} selectedId={selectedId} />

      {hotspots.map((h) => (
        <Marker
          key={h.id}
          position={[h.lat, h.lng]}
          icon={icons.get(h.id)}
          eventHandlers={{ click: () => onSelect(h) }}
          zIndexOffset={h.id === selectedId ? 1000 : 0}
        />
      ))}
    </MapContainer>
  );
}
