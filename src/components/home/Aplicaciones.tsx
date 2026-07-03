"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Home, Building2, Leaf } from "lucide-react";
import Reveal from "@/components/Reveal";

const casos = [
  {
    icon: Home,
    tag: "Hogares",
    title: "Confort en cada ambiente",
    desc: "La aislación térmica de Ekoglass hace que en tu casa no pases frío en invierno ni calor en verano.",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Building2,
    tag: "Grandes estructuras",
    title: "Edificios más eficientes",
    desc: "En obras de gran escala, los sistemas de calefacción y refrigeración se optimizan con DVH Ekoglass.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Leaf,
    tag: "Proyectos eficientes",
    title: "Camino a la certificación LEED",
    desc: "Para eficiencia energética y certificaciones LEED, el DVH es clave en el ahorro de climatización.",
    img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Aplicaciones() {
  const reduce = useReducedMotion();

  return (
    <section id="aplicaciones" className="section relative">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="chip">Aplicaciones</span>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl leading-tight">
              ¿En qué proyectos usar DVH Ekoglass?
            </h2>
            <p className="mt-4 text-ink/70 text-lg">
              Del living de tu casa a las grandes fachadas vidriadas: el mismo
              estándar de confort y eficiencia.
            </p>
          </div>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
          }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {casos.map((c) => (
            <motion.article
              key={c.tag}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200"
            >
              <Image
                src={c.img}
                alt={c.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/25 backdrop-blur">
                  <c.icon className="h-3.5 w-3.5" />
                  {c.tag}
                </span>
                <h3 className="h-display mt-3 text-2xl leading-snug text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-white/80">{c.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
