"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function CTABand() {
  const reduce = useReducedMotion();
  return (
    <section id="distribuidor" className="section">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 p-10 sm:p-14"
        >
          <div
            aria-hidden
            className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-24 -bottom-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                <MapPin className="h-3.5 w-3.5" />
                Red nacional
              </div>
              <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight text-white max-w-2xl">
                Encontranos en nuestros puntos de venta.
              </h2>
              <p className="mt-3 text-white/70 max-w-xl">
                Más de 100 vidrierías y distribuidores en toda Argentina te
                asesoran para elegir el DVH ideal.
              </p>
            </div>

            <Link
              href="/puntos-de-venta"
              className="btn bg-white text-brand-700 hover:bg-ink hover:text-white shadow-lg hover:-translate-y-0.5 transition"
            >
              Ver puntos de venta
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
