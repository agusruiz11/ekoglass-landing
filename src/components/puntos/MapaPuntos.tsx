"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { PuntoDeVenta } from "@/data/puntosDeVenta";

// Fix bug clásico de íconos de marker en bundlers modernos (Next.js).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Pin custom en color de marca (SVG inline)
const brandPin = (active: boolean) =>
  L.divIcon({
    className: "ekoglass-pin",
    html: `
      <div style="
        transform: translate(-50%, -100%);
        position: relative;
        filter: drop-shadow(0 6px 10px rgba(10,20,32,0.35));
      ">
        <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 45c9-12 15-19 15-27a15 15 0 1 0-30 0c0 8 6 15 15 27z"
                fill="${active ? "#0A1420" : "#ED3425"}"
                stroke="white" stroke-width="2"/>
          <circle cx="18" cy="18" r="6.5" fill="white"/>
          <circle cx="18" cy="18" r="3" fill="${active ? "#ED3425" : "#0A1420"}"/>
        </svg>
      </div>
    `,
    iconSize: [36, 46],
    iconAnchor: [0, 0],
    popupAnchor: [0, -42],
  });

type Props = {
  puntos: PuntoDeVenta[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function FlyToSelected({
  puntos,
  selectedId,
}: {
  puntos: PuntoDeVenta[];
  selectedId: string | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const p = puntos.find((x) => x.id === selectedId);
    if (!p || !Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;
    // Si el mapa está oculto (0×0, p. ej. al togglear Lista/Mapa en mobile),
    // flyTo genera coordenadas NaN y rompe. Esperamos a que tenga tamaño.
    const size = map.getSize();
    if (size.x === 0 || size.y === 0) return;
    map.flyTo([p.lat, p.lng], 13, { duration: 1.1 });
  }, [selectedId, puntos, map]);
  return null;
}

// Recalcula el tamaño del mapa cuando cambia el contenedor (mostrar/ocultar en
// el toggle mobile, rotación de pantalla, resize). Evita tiles grises / mapa roto.
function InvalidateOnResize() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(container);
    const t = window.setTimeout(() => map.invalidateSize(), 250);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [map]);
  return null;
}

export default function MapaPuntos({ puntos, selectedId, onSelect }: Props) {
  // AMBA como centro inicial + zoom que muestra los puntos principales
  const initialCenter: [number, number] = [-36.5, -63.5];
  const initialZoom = 5;

  const markerRefs = useRef<Record<string, L.Marker>>({});

  // Cuando cambia selección: abrir popup del seleccionado
  useEffect(() => {
    if (!selectedId) return;
    const m = markerRefs.current[selectedId];
    if (m) {
      // pequeño delay para dejar que flyTo termine
      setTimeout(() => m.openPopup(), 800);
    }
  }, [selectedId]);

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      scrollWheelZoom
      className="h-full w-full rounded-2xl"
      style={{ minHeight: 400 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> · Ekoglass'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToSelected puntos={puntos} selectedId={selectedId} />
      <InvalidateOnResize />

      {puntos
        .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
        .map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={brandPin(p.id === selectedId)}
          ref={(ref) => {
            if (ref) markerRefs.current[p.id] = ref;
          }}
          eventHandlers={{
            click: () => onSelect(p.id),
          }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <div className="font-semibold text-[15px] text-[#0A1420]">
                {p.nombre}
              </div>
              <div className="mt-1 text-[13px] text-[#0A1420]/70">
                {p.direccion}
                <br />
                {p.localidad} · {p.provincia}
              </div>
              <a
                href={`https://wa.me/${p.whatsapp}?text=${encodeURIComponent(
                  "Hola, los contacto desde la web de Ekoglass"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
