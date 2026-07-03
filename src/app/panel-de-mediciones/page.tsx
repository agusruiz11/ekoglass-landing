"use client";

import { useState } from "react";
import {
  MessageCircle,
  Navigation,
  Phone,
  Star,
  Home,
  Building2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Info,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 *  DATOS DEMO — valores de ejemplo con fines de demostración.
 *  Para pasar a datos reales se reemplaza este bloque por la respuesta
 *  de GA4 / Microsoft Clarity / la base de eventos propia. El diseño
 *  de abajo no se toca: sólo cambian los números.
 * ------------------------------------------------------------------ */

const KPIS = [
  { label: "Visitas", value: "8.420", delta: "+18%", foot: "vs. mes anterior" },
  { label: "Visitantes únicos", value: "6.180", delta: "+12%", foot: "vs. mes anterior" },
  { label: "Contactos generados", value: "342", delta: "+26%", foot: "WhatsApp + llamadas", accent: true },
  { label: "Tasa de contacto", value: "4,1%", delta: "+0,6 pts", foot: "de las visitas" },
  { label: "Tiempo medio", value: "2m 38s", delta: "+14s", foot: "por visita" },
];

const VISITS = [188, 205, 231, 214, 176, 150, 171, 236, 255, 268, 249, 242, 182, 201, 281, 299, 318, 293, 270, 214, 236, 332, 351, 372, 338, 321, 247, 268, 372, 410];
const CONTACTS_DAILY = [6, 8, 9, 8, 6, 4, 6, 9, 10, 11, 10, 10, 7, 8, 11, 12, 14, 13, 11, 8, 9, 13, 15, 16, 14, 13, 10, 11, 16, 18];

const CHANNELS = [
  { name: "WhatsApp", pct: 71, icon: MessageCircle, color: "#25D366" },
  { name: "Cómo llegar", pct: 18, icon: Navigation, color: "#0891B2" },
  { name: "Llamada", pct: 11, icon: Phone, color: "#64748B" },
];

const PUNTOS = [
  { n: "Ekoglass Centro", loc: "CABA", v: 78, top: true },
  { n: "Ekoglass Córdoba", loc: "Córdoba", v: 64, top: true },
  { n: "Vidrios del Norte", loc: "Vicente López, BA", v: 51, top: true },
  { n: "Cristalería Palermo", loc: "Palermo, CABA", v: 43 },
  { n: "Cristales Rosario", loc: "Rosario, SF", v: 32 },
  { n: "DVH La Plata", loc: "La Plata, BA", v: 24 },
  { n: "Vidriería Cuyo", loc: "Mendoza", v: 18 },
  { n: "Aberturas del Mar", loc: "Mar del Plata, BA", v: 14 },
  { n: "DVH Tucumán", loc: "S. M. de Tucumán", v: 10 },
  { n: "Aberturas Patagonia", loc: "Neuquén", v: 8 },
];

const GEO: [string, number][] = [
  ["Buenos Aires", 41], ["CABA", 22], ["Córdoba", 13], ["Santa Fe", 9],
  ["Mendoza", 6], ["Neuquén", 4], ["Tucumán", 3], ["Otras", 2],
];

const SECTIONS: [string, number][] = [
  ["Inicio (Hero)", 100], ["Qué es Ekoglass", 86], ["Aplicaciones", 71],
  ["Soluciones", 58], ["Proyectos", 44], ["Puntos de venta", 39],
  ["Preguntas frecuentes", 27], ["Contacto", 21],
];

// NUEVO — qué CTA del hero convierte más
const CTA = {
  hogar: { label: "Ekoglass para el hogar", clicks: "1.180", pct: 63 },
  prof: { label: "Ekoglass para profesionales", clicks: "690", pct: 37 },
};

// NUEVO — qué preguntas del FAQ se abren más
const FAQ_OPENS: [string, number][] = [
  ["Aislación acústica del DVH", 100],
  ["Diferencia entre argón y aire", 82],
  ["¿El DVH resuelve toda la aislación?", 71],
  ["Condensación del lado interior", 54],
  ["Tamaño máximo de un DVH", 43],
  ["Condensación dentro de la cámara", 38],
];

const DEVICE: [string, number][] = [["Móvil", 63], ["Escritorio", 32], ["Tablet", 5]];
const SOURCE: [string, number][] = [
  ["Google (búsqueda)", 48], ["Directo", 24], ["Instagram", 16], ["Otros (Facebook, etc.)", 12],
];

// NUEVO — demanda geográfica cruzada con cobertura de puntos de venta
const COVERAGE: { zona: string; demanda: number; puntos: number }[] = [
  { zona: "Buenos Aires", demanda: 41, puntos: 3 },
  { zona: "CABA", demanda: 22, puntos: 2 },
  { zona: "Córdoba", demanda: 13, puntos: 1 },
  { zona: "Santa Fe", demanda: 9, puntos: 1 },
  { zona: "Salta", demanda: 4, puntos: 0 },
  { zona: "Entre Ríos", demanda: 3, puntos: 0 },
  { zona: "San Juan", demanda: 2, puntos: 0 },
];

/* ------------------------------------------------------------------ *
 *  Piezas reutilizables
 * ------------------------------------------------------------------ */

function Card({
  title,
  subtitle,
  tag,
  star,
  className = "",
  children,
}: {
  title: string;
  subtitle?: string;
  tag?: string;
  star?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="h-display flex items-center gap-2 text-sm font-bold text-ink">
            {star && <Star className="h-4 w-4 fill-brand-500 text-brand-500" />}
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-xs text-ink/45">{subtitle}</p>}
        </div>
        {tag && (
          <span className="shrink-0 rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-ink/55">
            {tag}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function HBars({ data, suffix = "%" }: { data: [string, number][]; suffix?: string }) {
  const max = Math.max(...data.map((d) => d[1]));
  return (
    <div className="flex flex-col gap-3">
      {data.map(([label, v]) => (
        <div key={label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="truncate text-[13px] font-medium text-ink">{label}</span>
            <span className="tabular-nums text-[13px] font-bold text-ink">
              {String(v).replace(".", ",")}
              {suffix}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-brand-600"
              style={{ width: `${(v / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* Gráfico de visitas por día — una sola serie (eje único) con hover. */
function VisitsChart() {
  const [hi, setHi] = useState<number | null>(null);
  const W = 800, H = 240, padL = 6, padR = 6, padT = 14, padB = 26;
  const n = VISITS.length;
  const maxV = Math.max(...VISITS) * 1.08;
  const X = (i: number) => padL + (W - padL - padR) * (i / (n - 1));
  const Y = (v: number) => H - padB - (H - padT - padB) * (v / maxV);
  const line = VISITS.map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${X(n - 1).toFixed(1)} ${H - padB} L${X(0).toFixed(1)} ${H - padB} Z`;

  const locate = (clientX: number, el: SVGSVGElement) => {
    const r = el.getBoundingClientRect();
    const x = clientX - r.left;
    let i = Math.round(((x / r.width) * W - padL) / ((W - padL - padR) / (n - 1)));
    i = Math.max(0, Math.min(n - 1, i));
    setHi(i);
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none"
        role="img"
        aria-label="Visitas por día del último mes"
        onMouseMove={(e) => locate(e.clientX, e.currentTarget)}
        onMouseLeave={() => setHi(null)}
        onTouchMove={(e) => locate(e.touches[0].clientX, e.currentTarget)}
        onTouchStart={(e) => locate(e.touches[0].clientX, e.currentTarget)}
      >
        <defs>
          <linearGradient id="ekArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C7220F" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#C7220F" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((g) => {
          const y = padT + ((H - padT - padB) * g) / 3;
          return <line key={g} x1={padL} x2={W - padR} y1={y} y2={y} stroke="#EEF2F6" strokeWidth={1} />;
        })}

        <path d={area} fill="url(#ekArea)" />
        <path d={line} fill="none" stroke="#C7220F" strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={X(n - 1)} cy={Y(VISITS[n - 1])} r={4} fill="#C7220F" stroke="#fff" strokeWidth={2} />

        {hi !== null && (
          <>
            <line x1={X(hi)} x2={X(hi)} y1={padT} y2={H - padB} stroke="#94A3B8" strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={X(hi)} cy={Y(VISITS[hi])} r={5} fill="#C7220F" stroke="#fff" strokeWidth={2} />
          </>
        )}

        {[0, 6, 13, 20, 29].map((i) => (
          <text
            key={i}
            x={X(i)}
            y={H - 8}
            fill="#8697A8"
            fontSize={11}
            textAnchor={i === 0 ? "start" : i === 29 ? "end" : "middle"}
          >
            Día {i + 1}
          </text>
        ))}
      </svg>

      {hi !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg"
          style={{ left: `${(X(hi) / W) * 100}%`, top: `${(Y(VISITS[hi]) / H) * 100}%` }}
        >
          <b className="text-white">Día {hi + 1}</b> · {VISITS[hi]} visitas · {CONTACTS_DAILY[hi]} contactos
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Página
 * ------------------------------------------------------------------ */

export default function PanelDeMediciones() {
  const totalContactos = PUNTOS.reduce((a, p) => a + p.v, 0);
  const maxPunto = Math.max(...PUNTOS.map((p) => p.v));
  const oportunidades = COVERAGE.filter((c) => c.puntos === 0).length;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24 pt-24 sm:pt-28">
      <div className="container-x">
        {/* Encabezado */}
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-ink/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Últimos 30 días
              </span>
              <span className="rounded-full border border-brand-500/30 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                DEMO · datos de ejemplo
              </span>
            </div>
            <h1 className="h-display text-3xl leading-tight text-ink sm:text-4xl">
              Panel de mediciones
            </h1>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/60">
              Todo lo que pasa dentro del sitio en una sola pantalla: cuánta gente
              entra, qué mira y por cuánto tiempo, desde dónde llega y cuántos
              contactos genera cada punto de venta.
            </p>
          </div>
        </header>

        {/* KPIs */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className={`rounded-xl border border-slate-200 p-4 shadow-sm ${
                k.accent ? "bg-gradient-to-br from-brand-50 to-white" : "bg-white"
              }`}
            >
              <div className="text-xs font-semibold text-ink/55">{k.label}</div>
              <div
                className={`tabular-nums mt-2 text-2xl font-extrabold tracking-tight ${
                  k.accent ? "text-brand-600" : "text-ink"
                }`}
              >
                {k.value}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-ink/55">
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-600">
                  ▲ {k.delta}
                </span>
                {k.foot}
              </div>
            </div>
          ))}
        </div>

        {/* Grid principal */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Visitas por día */}
          <div className="lg:col-span-8">
            <Card title="Visitas por día" subtitle="Tráfico diario del último mes" tag="Tendencia">
              <VisitsChart />
              <p className="mt-2 text-xs text-ink/40">
                Pasá el cursor sobre el gráfico para ver el detalle de cada día.
              </p>
            </Card>
          </div>

          {/* Contactos por canal */}
          <div className="lg:col-span-4">
            <Card title="Contactos por canal" subtitle="Cómo eligen escribir">
              <div className="flex flex-col gap-3">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.name} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                          <span
                            className="grid h-6 w-6 place-items-center rounded-md text-white"
                            style={{ background: c.color }}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          {c.name}
                        </span>
                        <span className="tabular-nums text-sm font-extrabold text-ink">{c.pct}%</span>
                      </div>
                      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-brand-600" style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Contactos por punto de venta — CARD PROTAGONISTA */}
          <div className="lg:col-span-7">
            <Card
              star
              title="Contactos por punto de venta"
              subtitle="Qué representante recibe más consultas desde la web"
              tag={`${totalContactos} en total`}
            >
              <div className="flex flex-col gap-2.5">
                {PUNTOS.map((p, i) => (
                  <div
                    key={p.n}
                    className="grid grid-cols-[26px_1fr_auto] items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-50"
                  >
                    <div
                      className={`grid h-6 w-6 place-items-center rounded-lg text-xs font-extrabold ${
                        i === 0
                          ? "bg-gradient-to-br from-brand-500 to-brand-700 text-white"
                          : "bg-slate-100 text-ink/50"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 text-[13.5px] font-semibold text-ink">
                        {p.n}
                        {p.top && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                            ▲ recomendado
                          </span>
                        )}
                      </div>
                      <div className="text-[11.5px] text-ink/45">{p.loc}</div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-brand-600" style={{ width: `${(p.v / maxPunto) * 100}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="tabular-nums text-base font-extrabold tracking-tight text-ink">{p.v}</div>
                      <div className="text-[11px] text-ink/50">contactos</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Desde dónde nos visitan */}
          <div className="lg:col-span-5">
            <Card title="Desde dónde nos visitan" subtitle="Participación por provincia">
              <HBars data={GEO} />
            </Card>
          </div>

          {/* NUEVO — Oportunidades de cobertura */}
          <div className="lg:col-span-7">
            <Card
              title="Oportunidades de cobertura"
              subtitle="Demanda web cruzada con puntos de venta"
              tag={`${oportunidades} zonas sin cobertura`}
            >
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[13px] text-amber-800">
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <b>{oportunidades} zonas con demanda y sin punto de venta cerca.</b>{" "}
                  Candidatas ideales para sumar un representante.
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {[...COVERAGE]
                  .sort((a, b) => b.demanda - a.demanda)
                  .map((c) => {
                    const gap = c.puntos === 0;
                    const max = Math.max(...COVERAGE.map((x) => x.demanda));
                    return (
                      <div
                        key={c.zona}
                        className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                          gap ? "border-amber-200 bg-amber-50/50" : "border-slate-200 bg-white"
                        }`}
                      >
                        <MapPin className={`h-4 w-4 shrink-0 ${gap ? "text-amber-500" : "text-brand-500"}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-[13px] font-semibold text-ink">{c.zona}</span>
                            <span className="tabular-nums text-[12px] text-ink/55">{c.demanda}% de las visitas</span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${gap ? "bg-amber-400" : "bg-brand-600"}`}
                              style={{ width: `${(c.demanda / max) * 100}%` }}
                            />
                          </div>
                        </div>
                        {gap ? (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[10.5px] font-bold text-amber-700">
                            <AlertTriangle className="h-3 w-3" />
                            Sin cobertura
                          </span>
                        ) : (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10.5px] font-bold text-emerald-600">
                            <CheckCircle2 className="h-3 w-3" />
                            {c.puntos} {c.puntos === 1 ? "punto" : "puntos"}
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </Card>
          </div>

          {/* NUEVO — CTA: hogar vs profesionales */}
          <div className="lg:col-span-5">
            <Card title="Qué CTA convierte más" subtitle="Botones del hero: hogar vs. profesionales">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                      <Home className="h-4 w-4 text-brand-600" />
                      {CTA.hogar.label}
                    </span>
                    <span className="tabular-nums text-[13px] font-bold text-ink">
                      {CTA.hogar.pct}% <span className="font-normal text-ink/45">· {CTA.hogar.clicks}</span>
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${CTA.hogar.pct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                      <Building2 className="h-4 w-4 text-aqua-600" />
                      {CTA.prof.label}
                    </span>
                    <span className="tabular-nums text-[13px] font-bold text-ink">
                      {CTA.prof.pct}% <span className="font-normal text-ink/45">· {CTA.prof.clicks}</span>
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-aqua-600" style={{ width: `${CTA.prof.pct}%` }} />
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-[12.5px] text-ink/60">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" />
                  El público hogareño lidera: conviene reforzar ese mensaje arriba
                  y darle más aire a la sección profesional.
                </div>
              </div>
            </Card>
          </div>

          {/* Qué partes del sitio se ven más */}
          <div className="lg:col-span-6">
            <Card title="Qué partes del sitio se ven más" subtitle="% de visitas que llega a cada sección (scroll)">
              <HBars data={SECTIONS} />
            </Card>
          </div>

          {/* NUEVO — FAQ más abiertas */}
          <div className="lg:col-span-6">
            <Card title="Preguntas frecuentes más abiertas" subtitle="Qué dudas consultan más (índice sobre la #1)">
              <HBars data={FAQ_OPENS} />
            </Card>
          </div>

          {/* Dispositivo */}
          <div className="lg:col-span-6">
            <Card title="Dispositivo" subtitle="Con qué entran al sitio">
              <HBars data={DEVICE} />
            </Card>
          </div>

          {/* Fuente de tráfico */}
          <div className="lg:col-span-6">
            <Card title="Fuente de tráfico" subtitle="Cómo llegan al sitio">
              <HBars data={SOURCE} />
            </Card>
          </div>
        </div>

        {/* Nota al pie */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 text-[13px] leading-relaxed text-ink/60 shadow-sm">
          <b className="text-ink">¿Cómo se arma?</b> Visitas y audiencia con{" "}
          <b className="text-ink">GA4</b>; mapas de calor y grabaciones anónimas de
          sesión con <b className="text-ink">Microsoft Clarity</b>; contactos por
          punto de venta con <b className="text-ink">eventos a medida</b> en los
          botones de WhatsApp, llamada y &ldquo;cómo llegar&rdquo;.
          <p className="mt-2 text-xs text-ink/40">
            Datos de ejemplo con fines de demostración. Los valores reales empiezan
            a registrarse desde el día que se activa la medición.
          </p>
        </div>
      </div>
    </div>
  );
}
