"use client";

import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Search, Map as MapIcon, List, Star } from "lucide-react";
import { puntosDeVenta, listadoProvisorio } from "@/data/puntosDeVenta";
import CardPunto from "./CardPunto";

// Leaflet no soporta SSR — se carga solo en cliente.
const MapaPuntos = dynamic(() => import("./MapaPuntos"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[400px] place-items-center rounded-2xl bg-brand-50 text-sm text-brand-700">
      Cargando mapa…
    </div>
  ),
});

export default function PuntosClient() {
  const [query, setQuery] = useState("");
  const [provincia, setProvincia] = useState<string>("todas");
  const [soloRecomendados, setSoloRecomendados] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(puntosDeVenta[0]?.id ?? null);
  const [mobileView, setMobileView] = useState<"lista" | "mapa">("lista");

  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);

  const provincias = useMemo(
    () => Array.from(new Set(puntosDeVenta.map((p) => p.provincia))).sort(),
    []
  );

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return puntosDeVenta.filter((p) => {
      const okProv = provincia === "todas" ? true : p.provincia === provincia;
      const okRec = soloRecomendados ? !!p.recomendado : true;
      const okQ =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.localidad.toLowerCase().includes(q) ||
        p.direccion.toLowerCase().includes(q);
      return okProv && okQ && okRec;
    });
  }, [query, provincia, soloRecomendados]);

  const handleSelect = (id: string, scroll = true) => {
    setSelectedId(id);
    if (scroll) {
      const el = cardRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="chip">Red de distribuidores</span>
          <h1 className="h-display mt-4 text-4xl sm:text-5xl leading-tight">
            Encontrá tu punto de venta Ekoglass.
          </h1>
          <p className="mt-3 text-ink/70 text-lg">
            Más de 100 vidrierías y distribuidores autorizados en todo el país,
            listos para asesorarte.
          </p>
          {listadoProvisorio && (
            <p
              role="status"
              className="mt-5 inline-flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              <span aria-hidden className="mt-0.5">⚠</span>
              <span>
                <strong>Listado de ejemplo.</strong> Los puntos de venta, direcciones y
                teléfonos que se muestran son ilustrativos hasta que se cargue el
                listado verificado por Ekoglass.
              </span>
            </p>
          )}
        </div>

        {/* Toggle mobile */}
        <div className="mt-8 flex lg:hidden">
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-sm">
            <button
              onClick={() => setMobileView("lista")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition ${
                mobileView === "lista" ? "bg-brand-500 text-white" : "text-ink/70"
              }`}
            >
              <List className="h-4 w-4" /> Lista
            </button>
            <button
              onClick={() => setMobileView("mapa")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition ${
                mobileView === "mapa" ? "bg-brand-500 text-white" : "text-ink/70"
              }`}
            >
              <MapIcon className="h-4 w-4" /> Mapa
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Columna lista */}
          <div className={`${mobileView === "mapa" ? "hidden" : "block"} lg:block`}>
            {/* Filtros */}
            <div className="sticky top-24 z-10 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-3 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/50" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, localidad o dirección…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    aria-label="Buscar punto de venta"
                  />
                </div>
                <select
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  aria-label="Filtrar por provincia"
                >
                  <option value="todas">Todas las provincias</option>
                  {provincias.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 px-1">
                <button
                  type="button"
                  onClick={() => setSoloRecomendados((v) => !v)}
                  aria-pressed={soloRecomendados}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide transition ${
                    soloRecomendados
                      ? "border-brand-500/40 bg-brand-500 text-white shadow-sm shadow-brand-500/20"
                      : "border-brand-500/30 bg-brand-50 text-brand-700 hover:bg-brand-100"
                  }`}
                >
                  <Star
                    className={`h-3 w-3 ${
                      soloRecomendados
                        ? "fill-white text-white"
                        : "fill-brand-500 text-brand-500"
                    }`}
                  />
                  Red recomendada
                </button>
                <span className="text-xs text-ink/55">
                  {filtrados.length} resultado{filtrados.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            {/* Lista scrolleable */}
            <div
              ref={listRef}
              className="mt-4 max-h-[calc(100vh-16rem)] overflow-y-auto px-1 pt-2 pr-2 space-y-3 lg:space-y-4"
            >
              {filtrados.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-ink/60">
                  No encontramos puntos con esos filtros. Probá con otros
                  términos.
                </div>
              ) : (
                filtrados.map((p) => (
                  <CardPunto
                    key={p.id}
                    punto={p}
                    active={selectedId === p.id}
                    onSelect={() => handleSelect(p.id, false)}
                    ref={(el) => {
                      cardRefs.current[p.id] = el;
                    }}
                  />
                ))
              )}
            </div>
          </div>

          {/* Columna mapa */}
          <div className={`${mobileView === "lista" ? "hidden" : "block"} lg:block`}>
            <div className="lg:sticky lg:top-24">
              <div className="h-[60vh] lg:h-[calc(100vh-8rem)] overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-sm">
                <MapaPuntos
                  puntos={filtrados.length > 0 ? filtrados : puntosDeVenta}
                  selectedId={selectedId}
                  onSelect={(id) => handleSelect(id, true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
