// ─────────────────────────────────────────────────────────────────────────
// TRACKING — punto único de eventos para GA4 y Microsoft Clarity.
//
// Los tags se cargan en components/Analytics.tsx (desde layout.tsx) con los
// IDs por variable de entorno: NEXT_PUBLIC_GA_ID (G-XXXX) y
// NEXT_PUBLIC_CLARITY_ID. Sin IDs, nada se carga y estas funciones no hacen
// nada (en desarrollo, loguean a consola para poder verificar los eventos).
//
// Convención de eventos (igual en Blindex y Ekoglass, para que el panel de
// mediciones lea las dos propiedades con el mismo código):
//   contacto_whatsapp / contacto_llamada / contacto_como_llegar /
//   contacto_web / contacto_instagram   → punto_id, punto_nombre, provincia,
//                                         origen (card, mapa u home)
//   whatsapp_flotante                   → (botón fijo de todas las páginas)
//   cta_click                           → cta
//   seccion_vista                       → seccion (una vez por sección y carga)
//   faq_abierta                         → pregunta
//   form_enviado                        → formulario, motivo
//
// En GA4 hay que registrar como dimensiones personalizadas de evento:
// punto_id, punto_nombre, provincia, origen, canal, cta, seccion, pregunta,
// formulario, motivo. Y marcar como conversiones:
// contacto_whatsapp, contacto_llamada, contacto_como_llegar, whatsapp_flotante
// y form_enviado. Ver docs/medicion.md.
// ─────────────────────────────────────────────────────────────────────────

type Valor = string | number | boolean | undefined;
export type Params = Record<string, Valor>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(evento: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const limpios: Params = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined) limpios[k] = v;

  if (window.gtag) window.gtag("event", evento, limpios);
  // Clarity sólo acepta el nombre: sirve para filtrar grabaciones por evento.
  if (window.clarity) window.clarity("event", evento);

  if (process.env.NODE_ENV !== "production" && !window.gtag) {
    console.log(`[tracking] ${evento}`, limpios);
  }
}

// ── Puntos de venta ──────────────────────────────────────────────────────

export type CanalContacto = "whatsapp" | "llamada" | "como_llegar" | "web" | "instagram";
type PuntoMin = { id: string; nombre: string; provincia: string };

/** Click en un botón de contacto de un punto de venta (card o popup del mapa). */
export function trackContacto(
  canal: CanalContacto,
  punto: PuntoMin,
  origen: "card" | "mapa" | "home" = "card"
) {
  track(`contacto_${canal}`, {
    canal,
    punto_id: punto.id,
    punto_nombre: punto.nombre,
    provincia: punto.provincia,
    origen,
  });
}

/** Botón flotante de WhatsApp de la marca (no es un punto de venta). */
export function trackWhatsAppFlotante() {
  track("whatsapp_flotante");
}

// ── Home y contenido ─────────────────────────────────────────────────────

export function trackCta(cta: string) {
  track("cta_click", { cta });
}

export function trackSeccionVista(seccion: string) {
  track("seccion_vista", { seccion });
}

export function trackFaqAbierta(pregunta: string) {
  track("faq_abierta", { pregunta: pregunta.slice(0, 100) });
}

export function trackFormEnviado(formulario: string, motivo?: string) {
  track("form_enviado", { formulario, motivo });
}
