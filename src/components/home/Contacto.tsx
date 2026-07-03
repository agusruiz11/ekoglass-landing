"use client";

import { useState, type ReactNode } from "react";
import { MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-4"
                >
                  <Field label="Nombre y Apellido" required>
                    <input required type="text" autoComplete="name" className={inputCls} />
                  </Field>
                  <Field label="Correo electrónico" required>
                    <input required type="email" autoComplete="email" className={inputCls} />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Empresa / Estudio">
                      <input type="text" className={inputCls} />
                    </Field>
                    <Field label="Teléfono / Celular">
                      <input type="tel" autoComplete="tel" className={inputCls} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Provincia" required>
                      <select required defaultValue="" className={inputCls}>
                        <option value="" disabled>
                          Elegí una provincia
                        </option>
                        {provincias.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Localidad / Barrio" required>
                      <input required type="text" className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Motivo de la consulta" required>
                    <select required defaultValue="" className={inputCls}>
                      <option value="" disabled>
                        Elegí un motivo
                      </option>
                      {motivos.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Consulta" required>
                    <textarea required rows={4} className={inputCls} />
                  </Field>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send className="h-4 w-4" />
                    Enviar consulta
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
