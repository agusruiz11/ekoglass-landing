"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Home, Building2 } from "lucide-react";

export default function Hero() {
  const reduce = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: reduce ? 0 : 0.15 + i * 0.12,
      },
    }),
  };

  return (
    <section className="relative isolate overflow-hidden min-h-[92vh] pt-16 sm:pt-20 flex items-end">
      {/* Foto arquitectónica de fondo */}
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
        alt="Ventanal arquitectónico con luz natural"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />

      {/* Capa esmerilada + degradado */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/75 via-ink/50 to-ink/90" />
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

      {/* Paneles de vidrio sutiles (parallax visual estático + floaty) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 0.35 : 0.55 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -right-24 h-[70vh] w-[70vh] rounded-[42%] bg-gradient-to-br from-brand-500/30 to-transparent blur-3xl animate-floaty" />
        <div className="absolute -bottom-24 -left-24 h-[60vh] w-[60vh] rounded-[42%] bg-gradient-to-br from-brand-400/20 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:120px_100%]" />
      </motion.div>

      <div className="container-x relative pb-20 sm:pb-28">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
          Norma IRAM 12598-1 · Argentina
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={item}
          className="h-display text-white text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02] max-w-5xl"
        >
          La marca líder de{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-white to-brand-200 bg-clip-text text-transparent">
              doble vidrio aislante
            </span>
            <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-brand-500 via-brand-400 to-transparent rounded-full" />
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={item}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85"
        >
          Soluciones en aislación térmica, acústica y seguridad para el hogar y
          para grandes proyectos arquitectónicos.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={item}
          className="mt-9 flex flex-col sm:flex-row gap-3"
        >
          <Link href="#aplicaciones" className="btn-primary">
            <Home className="h-4 w-4" />
            Ekoglass para el hogar
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#donde-comprar" className="btn-ghost">
            <Building2 className="h-4 w-4" />
            Ekoglass para profesionales
          </Link>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={item}
          className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6"
        >
          {[
            { k: "40 años", v: "de trayectoria" },
            { k: "+100", v: "puntos de venta" },
            { k: "IRAM", v: "12598-1" },
          ].map((s) => (
            <div key={s.k} className="text-white/90">
              <div className="h-display text-2xl">{s.k}</div>
              <div className="text-xs text-white/60">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
