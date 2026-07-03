"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Thermometer, Volume2, Leaf, Sun, Droplets, ThermometerSnowflake } from "lucide-react";
import Reveal from "@/components/Reveal";

const items = [
  {
    icon: Thermometer,
    title: "Aislación térmica",
    desc: "Mantenés la temperatura ideal en cada ambiente durante todo el año.",
  },
  {
    icon: Volume2,
    title: "Aislación acústica",
    desc: "Reducí de manera significativa el ruido exterior en tu hogar u oficina.",
  },
  {
    icon: Leaf,
    title: "Eficiencia energética",
    desc: "Menos consumo en calefacción y aire acondicionado, más ahorro real.",
  },
  {
    icon: Sun,
    title: "Control solar",
    desc: "Gestioná el ingreso de calor y luz sin resignar transparencia.",
  },
  {
    icon: Droplets,
    title: "Menos condensación",
    desc: "Reduce la humedad sobre el vidrio y evita que tus ventanas se empañen.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Sin efecto “muro frío”",
    desc: "Anula la sensación de pared fría junto a la ventana y suma confort.",
  },
];

export default function Soluciones() {
  const reduce = useReducedMotion();

  return (
    <section id="sobre" className="section relative">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="chip">Soluciones</span>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl leading-tight">
              Beneficios que redefinen el vidrio.
            </h2>
            <p className="mt-4 text-ink/70 text-lg">
              Diseñamos DVH pensados para el clima y la arquitectura argentina.
              Confort, eficiencia y seguridad, en una sola pieza.
            </p>
          </div>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
          }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((it) => (
            <motion.article
              key={it.title}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="glass-card p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="h-display mt-5 text-xl text-ink">{it.title}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{it.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
