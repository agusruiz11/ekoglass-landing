"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";

/** Preguntas reales del sitio de Ekoglass (ekoglass.com.ar/preguntas-frecuentes). */
const faqs = [
  {
    q: "¿Colocar un DVH ayuda a la aislación acústica?",
    a: "Sí. La atenuación depende del tipo de vidrio: se sugieren vidrios laminados (con PVB 0,76 o más, o PVB acústico), ya que la lámina de PVB reduce el paso del sonido. La masa del vidrio también suma —a mayor espesor, mayor aislación— y ayuda combinar distintos espesores entre ambos vidrios.",
  },
  {
    q: "¿Cuál es la diferencia entre un DVH con argón y con aire?",
    a: "Al reemplazar el aire por un gas de menor conductividad térmica (argón), se reduce el coeficiente de transmitancia térmica (K), y aún más si se lo combina con un mayor espesor de cámara.",
  },
  {
    q: "Si uso DVH, ¿resuelvo todos los problemas de aislación térmica?",
    a: "El DVH mejora la aislación, pero no es la solución completa: existen vidrios con distintas características (tonalidad, reflectividad, baja emisividad low-e) que combinados en un DVH mejoran mucho más la aislación térmica y el factor solar. Los vidrios reflectivos y tonalizados reducen la ganancia de calor solar según la época del año y la región.",
  },
  {
    q: "Mi DVH condensa del lado interior del ambiente, ¿cómo lo soluciono?",
    a: "Lo más probable es que el ambiente tenga una humedad relativa elevada. El vapor del aire, al tocar la superficie más fría del vidrio, llega al punto de rocío y condensa. Se atenúa ventilando los ambientes para reducir la humedad interior.",
  },
  {
    q: "Mi DVH condensa dentro de la cámara, ¿está funcionando mal?",
    a: "Sí: si condensa dentro de la cámara es porque se pinchó y el punto de rocío cae dentro de ella. Suele deberse a un espesor de cámara insuficiente (por ejemplo, se usó 6 mm cuando debía ir 15 mm). Contactá a un procesador Ekoglass para repararlo.",
  },
  {
    q: "¿Cuál es el tamaño máximo permitido para un DVH?",
    a: "No hay un tamaño fijo: depende de la cantidad de lados de fijación (4 o 3 lados) y de la presión de viento de la zona. El DVH debe resistir las condiciones a las que esté expuesto.",
  },
  {
    q: "¿Cómo se determina el espesor de los vidrios de un DVH?",
    a: "Según el tamaño del paño, la cantidad de lados de fijación (4 o 3 lados) y la presión de viento predominante de la zona donde se coloca.",
  },
  {
    q: "¿Cuál es la colocación correcta de los vidrios en un DVH?",
    a: "Depende de las condiciones de seguridad a cumplir (se usan vidrios templados o laminados). Si se usan vidrios de control solar, deben ir en la cara exterior para que funcionen correctamente.",
  },
  {
    q: "Quiero unir DVH “a tope”, ¿cómo materializo la unión?",
    a: "No se recomienda unir a tope con silicona: la aislación térmica que gana el DVH se perdería por las juntas. Conviene usar una carpintería que mantenga las condiciones de estanqueidad.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="section relative bg-gradient-to-b from-white to-brand-50/30">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="chip">Preguntas frecuentes</span>
          <h2 className="h-display mt-4 text-4xl sm:text-5xl leading-tight">
            Resolvé tus dudas sobre DVH.
          </h2>
          <p className="mt-4 text-ink/70 text-lg">
            Las consultas más comunes sobre el doble vidriado hermético,
            respondidas por el equipo técnico de Ekoglass.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-brand-50/40 sm:px-6"
                >
                  <span className="font-medium text-ink">{f.q}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70 sm:px-6">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
