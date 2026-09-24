"use client";

import { useEffect } from "react";
import { trackSeccionVista } from "@/lib/tracking";

// Manda `seccion_vista` la primera vez que cada <section id="..."> de la
// página entra a la mitad del viewport. Se monta una vez en la home
// (page.tsx); las secciones se detectan solas por su id, así que agregar o
// reordenar secciones no requiere tocar nada acá.
export default function TrackSecciones() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const secciones = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (secciones.length === 0) return;

    const vistas = new Set<string>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting && !vistas.has(id)) {
            vistas.add(id);
            trackSeccionVista(id);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.5 }
    );
    secciones.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return null;
}
