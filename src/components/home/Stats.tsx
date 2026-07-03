"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Datos de comunicación de Ekoglass (ekoglass.com.ar).
 * Ajustables en un solo lugar (array `stats`).
 */
const stats = [
  { value: 70, suffix: "%", label: "adicional de protección contra el frío y el calor" },
  { value: 40, suffix: "%", label: "menos ruido del exterior con DVH instalado" },
  { value: 40, suffix: "%", label: "de ahorro en tus facturas de luz o gas" },
  { value: 100, prefix: "+", label: "puntos de venta en todo el país" },
];

function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${prefix}${to}${suffix}`;
      return;
    }
    const controls = animate(count, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, reduce, count]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function Stats() {
  const reduce = useReducedMotion();
  return (
    <section className="section relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-brand-900 to-brand-800" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(237,52,37,0.45),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.12),transparent_40%)]"
      />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduce ? 0 : 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium text-white/85">
            En números
          </span>
          <h2 className="h-display mt-4 text-4xl sm:text-5xl leading-tight text-white">
            El impacto medible de un DVH bien pensado.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <div className="h-display text-5xl sm:text-6xl text-white leading-none">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-sm text-white/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/50">
          * Valores de referencia según Ekoglass para instalaciones con DVH.
        </p>
      </div>
    </section>
  );
}
