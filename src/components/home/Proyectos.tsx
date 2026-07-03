"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const posts = [
  {
    tag: "Aplicaciones",
    date: "12 Jun 2025",
    title: "Un DVH para cada aplicación",
    excerpt:
      "Cómo elegir la composición correcta de vidrios y cámara según el tipo de obra, exposición y clima.",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    tag: "Caso de estudio",
    date: "02 May 2025",
    title: "Confort acústico en pleno centro de Buenos Aires",
    excerpt:
      "Un edificio residencial redujo drásticamente el ruido de la avenida gracias a un DVH a medida.",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
  },
  {
    tag: "Sustentabilidad",
    date: "18 Abr 2025",
    title: "El vidrio y la arquitectura sustentable",
    excerpt:
      "Aislación térmica de alto rendimiento como pieza clave del diseño bioclimático moderno.",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function Proyectos() {
  const reduce = useReducedMotion();
  return (
    <section id="novedades" className="section">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <Reveal>
            <div className="max-w-xl">
              <span className="chip">Novedades</span>
              <h2 className="h-display mt-4 text-4xl sm:text-5xl leading-tight">
                Proyectos que inspiran, ideas que rinden.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#"
              className="btn-outline"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
          }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {posts.map((p) => (
            <motion.article
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="glass-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="chip">{p.tag}</span>
                  <span className="text-ink/50">{p.date}</span>
                </div>
                <h3 className="h-display mt-3 text-xl text-ink leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{p.excerpt}</p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Leer nota <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
