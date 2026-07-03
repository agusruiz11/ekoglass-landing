"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Corte transversal del DVH, estilo técnico premium:
 * vidrio exterior · cámara estanca (aire/gas inerte) · vidrio interior,
 * con espaciador de aluminio + desecante y sellado perimetral.
 * Cada parte tiene su línea guía y punto apuntando exactamente a lo que nombra.
 */

// Moléculas de aire/gas dentro de la cámara (pares tipo O₂).
const molecules = [
  { x: 182, y: 118, s: 1.0, d: 0.0 },
  { x: 220, y: 156, s: 0.85, d: 0.7 },
  { x: 196, y: 214, s: 1.0, d: 1.2 },
  { x: 172, y: 272, s: 0.8, d: 0.4 },
  { x: 224, y: 306, s: 0.9, d: 1.0 },
  { x: 200, y: 366, s: 1.0, d: 1.5 },
];

// Cuentas de desecante visibles en el espaciador.
const beadsX = [170, 182, 194, 206, 218, 230];

export default function DVHSVG() {
  const reduce = useReducedMotion();

  const paneReveal = (dir: -1 | 1) => ({
    initial: { x: reduce ? 0 : dir * 26, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative isolate w-full aspect-[4/5] max-h-[560px]">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-100" />

      <svg
        viewBox="0 0 400 500"
        className="h-full w-full"
        role="img"
        aria-label="Corte de un doble vidriado hermético (DVH): vidrio exterior, cámara estanca con aire o gas inerte, espaciador de aluminio con desecante, sellado y vidrio interior. Cumple la Norma IRAM 12598-1."
      >
        <defs>
          <linearGradient id="dvh-glass" x1="0" y1="0" x2="1" y2="0.25">
            <stop offset="0%" stopColor="#EAF3FD" />
            <stop offset="50%" stopColor="#CBE1F6" />
            <stop offset="100%" stopColor="#A7CAEC" />
          </linearGradient>
          <linearGradient id="dvh-cavity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6FBFF" />
            <stop offset="100%" stopColor="#E2F0FB" />
          </linearGradient>
          <linearGradient id="dvh-spacer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F3F5" />
            <stop offset="18%" stopColor="#D4D9DE" />
            <stop offset="55%" stopColor="#AEB6BF" />
            <stop offset="100%" stopColor="#767E87" />
          </linearGradient>
          <radialGradient id="dvh-glow" cx="50%" cy="44%" r="62%">
            <stop offset="0%" stopColor="#ED3425" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#ED3425" stopOpacity="0" />
          </radialGradient>
          <filter id="dvh-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#0A1420" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* Glow suave de fondo */}
        <ellipse cx="200" cy="250" rx="178" ry="215" fill="url(#dvh-glow)" />

        {/* Sello Norma IRAM */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.65 }}
          fontFamily="var(--font-inter), system-ui, sans-serif"
        >
          <g transform="rotate(-9 346 74)" opacity="0.9">
            <circle cx="346" cy="74" r="31" fill="#FFF" fillOpacity="0.55" stroke="#C7220F" strokeWidth="2" />
            <circle cx="346" cy="74" r="25" fill="none" stroke="#C7220F" strokeWidth="1" />
            <text x="346" y="65" textAnchor="middle" fontSize="7" fontWeight="600" letterSpacing="1.5" fill="#C7220F">
              NORMA
            </text>
            <text x="346" y="80" textAnchor="middle" fontSize="15" fontWeight="800" letterSpacing="0.5" fill="#C7220F">
              IRAM
            </text>
            <text x="346" y="90" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#C7220F">
              12598-1
            </text>
          </g>
        </motion.g>

        {/* ── Unidad DVH ── */}
        <motion.g
          filter="url(#dvh-shadow)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduce ? 0 : 0.6 }}
        >
          {/* Base blanca que agrupa la unidad (recibe la sombra) */}
          <rect x="112" y="44" width="176" height="412" rx="10" fill="#FFFFFF" />

          {/* Sellado perimetral */}
          <rect x="154" y="46" width="92" height="12" rx="2" fill="#0B1220" />
          <rect x="154" y="442" width="92" height="12" rx="2" fill="#0B1220" />

          {/* Cámara estanca */}
          <rect x="154" y="58" width="92" height="384" fill="url(#dvh-cavity)" />

          {/* Vidrio exterior */}
          <motion.g {...paneReveal(-1)}>
            <rect x="116" y="46" width="38" height="408" rx="3" fill="url(#dvh-glass)" />
            <rect x="118.5" y="49" width="4" height="402" rx="2" fill="#FFFFFF" opacity="0.6" />
            <rect x="140" y="60" width="7" height="380" rx="3.5" fill="#FFFFFF" opacity="0.28" />
            <rect x="116.5" y="46.5" width="37" height="407" rx="3" fill="none" stroke="#67E8F9" strokeWidth="0.8" opacity="0.5" />
          </motion.g>

          {/* Vidrio interior */}
          <motion.g {...paneReveal(1)}>
            <rect x="246" y="46" width="38" height="408" rx="3" fill="url(#dvh-glass)" />
            <rect x="248.5" y="49" width="4" height="402" rx="2" fill="#FFFFFF" opacity="0.6" />
            <rect x="270" y="60" width="7" height="380" rx="3.5" fill="#FFFFFF" opacity="0.28" />
            <rect x="246.5" y="46.5" width="37" height="407" rx="3" fill="none" stroke="#67E8F9" strokeWidth="0.8" opacity="0.5" />
          </motion.g>

          {/* Moléculas de aire / gas inerte */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.4 }}
          >
            {molecules.map((m, i) => (
              <motion.g
                key={i}
                animate={reduce ? {} : { y: [0, -4, 0] }}
                transition={
                  reduce
                    ? {}
                    : { duration: 4 + m.d, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: m.d }
                }
              >
                <g transform={`translate(${m.x} ${m.y}) scale(${m.s})`} opacity="0.8">
                  <line x1="-4" y1="-2.5" x2="4" y2="2.5" stroke="#38BDF8" strokeWidth="1.2" opacity="0.6" />
                  <circle cx="-4" cy="-2.5" r="2.4" fill="#38BDF8" />
                  <circle cx="4" cy="2.5" r="2.4" fill="#0EA5E9" />
                </g>
              </motion.g>
            ))}
          </motion.g>

          {/* Espaciador de aluminio + desecante (arriba y abajo) */}
          {[58, 422].map((y) => (
            <g key={y}>
              <rect x="158" y={y} width="84" height="20" rx="2" fill="url(#dvh-spacer)" />
              <rect x="158" y={y + 1.5} width="84" height="2" rx="1" fill="#FFFFFF" opacity="0.5" />
              {beadsX.map((bx) => (
                <circle key={bx} cx={bx} cy={y === 58 ? y + 16 : y + 4} r="1.6" fill="#5B646E" />
              ))}
            </g>
          ))}
        </motion.g>

        {/* ── Rótulos con guías ── */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.5 }}
          fontFamily="var(--font-inter), system-ui, sans-serif"
        >
          {/* Líneas guía */}
          <g stroke="#B4C0CE" strokeWidth="1.2" fill="none">
            <path d="M200 44 L200 66" />
            <path d="M108 200 L133 200" />
            <path d="M294 208 L202 208" />
            <path d="M294 302 L267 302" />
            <path d="M200 470 L200 446" />
          </g>

          {/* Puntos marcadores */}
          <g fill="#ED3425" stroke="#FFFFFF" strokeWidth="1.2">
            <circle cx="200" cy="68" r="3" />
            <circle cx="135" cy="200" r="3" />
            <circle cx="200" cy="208" r="3" />
            <circle cx="265" cy="302" r="3" />
            <circle cx="200" cy="448" r="3" />
          </g>

          {/* Textos */}
          <text x="200" y="36" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0A1420">
            Espaciador + desecante
          </text>

          <text x="104" y="197" textAnchor="end" fontSize="12" fontWeight="600" fill="#0A1420">
            Vidrio float
          </text>
          <text x="104" y="210" textAnchor="end" fontSize="8.5" fill="#64748B">
            exterior
          </text>

          <text x="298" y="205" textAnchor="start" fontSize="12" fontWeight="700" fill="#9C1B0C">
            Cámara estanca
          </text>
          <text x="298" y="218" textAnchor="start" fontSize="8.5" fill="#64748B">
            aire o gas inerte
          </text>

          <text x="298" y="299" textAnchor="start" fontSize="12" fontWeight="600" fill="#0A1420">
            Vidrio float
          </text>
          <text x="298" y="312" textAnchor="start" fontSize="8.5" fill="#64748B">
            interior
          </text>

          <text x="200" y="482" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0A1420">
            Sellado hermético
          </text>
          <text x="200" y="494" textAnchor="middle" fontSize="8.5" fill="#64748B">
            en todo el perímetro
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
