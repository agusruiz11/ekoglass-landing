"use client";

import { Snowflake, VolumeX, Wallet } from "lucide-react";
import Reveal, { RevealStagger } from "@/components/Reveal";
import DVHSVG from "./DVHSVG";
import { motion, useReducedMotion } from "framer-motion";

const beneficios = [
  {
    icon: Snowflake,
    title: "Mantené la temperatura ideal",
    desc: "La cámara estanca reduce la transferencia térmica: fresco en verano, cálido en invierno.",
  },
  {
    icon: VolumeX,
    title: "Olvidate del ruido exterior",
    desc: "La combinación de espesores atenúa el sonido, incluso en zonas de alto tránsito.",
  },
  {
    icon: Wallet,
    title: "Ahorrá en climatización",
    desc: "Menor consumo de calefacción y aire acondicionado, mes a mes.",
  },
];

export default function QueEsEkoglass() {
  const reduce = useReducedMotion();

  return (
    <section id="donde-comprar" className="section relative bg-gradient-to-b from-white to-brand-50/40">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <DVHSVG />
          </motion.div>

          <div>
            <Reveal>
              <span className="chip">¿Qué es Ekoglass?</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-4xl sm:text-5xl leading-tight">
                Doble Vidriado Hermético,{" "}
                <span className="text-brand-600">explicado en un corte.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-ink/75 text-lg leading-relaxed">
                Es una unidad prefabricada de dos o más vidrios float paralelos,
                sellada herméticamente en todo su perímetro, con una cámara
                estanca deshidratada — con aire o gas inerte — que mejora
                sensiblemente el comportamiento térmico y acústico del
                cerramiento. Cumple con la <strong>Norma IRAM 12598-1</strong>.
              </p>
            </Reveal>

            <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-1">
              {beneficios.map((b) => (
                <motion.div
                  key={b.title}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-200 hover:shadow-md transition"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-ink">{b.title}</div>
                    <div className="mt-1 text-sm text-ink/70">{b.desc}</div>
                  </div>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
