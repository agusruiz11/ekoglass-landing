"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { MapPin, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { socials } from "@/data/socials";

const provincias = [
  "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones",
  "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
  "Santiago del Estero", "Tierra del Fuego", "Tucumán",
];

const motivos = [
  "Consulta general",
  "Pedir presupuesto",
  "Soporte técnico",
  "Quiero ser distribuidor",
  "Otro",
];

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function Contacto() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Envía el formulario a /api/contacto (Resend). Los campos se leen por su
  // atributo `name`, así el formulario sigue siendo HTML plano y accesible.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "No pudimos enviar tu consulta. Probá de nuevo en unos minutos.");
        return;
      }
      form.reset();
      setSent(true);
    } catch {
      setError("No pudimos enviar tu consulta. Revisá tu conexión e intentá de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacto" className="section relative bg-white">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Información */}
          <Reveal>
            <div>
              <span className="chip">Contacto</span>
              <h2 className="h-display mt-4 text-4xl sm:text-5xl leading-tight">
                Contactate con nosotros.
              </h2>
              <p className="mt-4 max-w-md text-ink/70 text-lg">
                Dejanos cualquier duda sobre el uso o las especificaciones de
                nuestros productos. Te respondemos a la brevedad.
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="text-ink/80">
                    Av. Antártida Argentina, vías del F.F.C.C. Gral. Roca
                    <br />
                    Llavallol, Provincia de Buenos Aires
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Phone className="h-5 w-5" />
                  </span>
                  <a href="tel:+541142395000" className="text-ink/80 transition hover:text-brand-600">
                    011 4239-5000
                  </a>
                </li>
              </ul>

              <div className="mt-8">
                <div className="text-sm font-medium text-ink">Seguinos en redes</div>
                <div className="mt-3 flex items-center gap-3">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-700 shadow ring-1 ring-slate-200 transition hover:text-brand-500 hover:ring-brand-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="h-14 w-14 text-brand-500" />
                  <h3 className="h-display mt-4 text-2xl text-ink">¡Mensaje enviado!</h3>
                  <p className="mt-2 max-w-xs text-sm text-ink/70">
                    Gracias por escribirnos. Nuestro equipo te va a contactar a la
                    brevedad.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-outline mt-6">
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot anti-spam: oculto para personas, los bots lo completan. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <Field label="Nombre y Apellido" required>
                    <input required name="nombre" type="text" autoComplete="name" className={inputCls} />
                  </Field>
                  <Field label="Correo electrónico" required>
                    <input required name="email" type="email" autoComplete="email" className={inputCls} />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Empresa / Estudio">
                      <input name="empresa" type="text" className={inputCls} />
                    </Field>
                    <Field label="Teléfono / Celular">
                      <input name="telefono" type="tel" autoComplete="tel" className={inputCls} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Provincia" required>
                      <select required name="provincia" defaultValue="" className={inputCls}>
                        <option value="" disabled>
                          Elegí una provincia
                        </option>
                        {provincias.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Localidad / Barrio" required>
                      <input required name="localidad" type="text" className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Motivo de la consulta" required>
                    <select required name="motivo" defaultValue="" className={inputCls}>
                      <option value="" disabled>
                        Elegí un motivo
                      </option>
                      {motivos.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Consulta" required>
                    <textarea required name="consulta" rows={4} className={inputCls} />
                  </Field>

                  {error && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full justify-center disabled:opacity-60"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {sending ? "Enviando…" : "Enviar consulta"}
                  </button>
                  <p className="text-center text-xs text-ink/50">
                    Los campos con * son obligatorios.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
