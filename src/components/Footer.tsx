import Link from "next/link";
import Image from "next/image";
import { Network } from "lucide-react";
import logo from "@/public/Ekoglass-Logo-2-1.png";
import { socials } from "@/data/socials";

const nav = [
  {
    title: "Producto",
    items: [
      { label: "¿Qué es Ekoglass?", href: "/#donde-comprar" },
      { label: "Beneficios", href: "/#sobre" },
      { label: "Aplicaciones", href: "/#aplicaciones" },
      { label: "Normas IRAM", href: "/#donde-comprar" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Red Ekoglass", href: "/#red-ekoglass" },
      { label: "Vidriería Argentina S.A.", href: "#" },
      { label: "Prensa", href: "#" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
  {
    title: "Recursos",
    items: [
      { label: "Puntos de venta", href: "/puntos-de-venta" },
      { label: "Soy distribuidor", href: "/#distribuidor" },
      { label: "Novedades", href: "/#novedades" },
      { label: "Preguntas frecuentes", href: "/#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-gradient-to-b from-white to-brand-50/60">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" aria-label="Ekoglass — inicio" className="inline-flex">
              <Image src={logo} alt="Ekoglass" className="h-16 w-auto sm:h-20" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink/70">
              La marca líder argentina en Doble Vidriado Hermético. Aislación
              térmica, acústica y seguridad para tu hogar y tus proyectos.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-700 shadow ring-1 ring-slate-200 hover:text-brand-500 hover:ring-brand-200 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <Link
              href="/#red-ekoglass"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
            >
              <Network className="h-4 w-4" />
              Conocé la Red Ekoglass
            </Link>
          </div>

          {nav.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href} className="hover:text-brand-600 transition">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink/60">
            Marca registrada de Vidriería Argentina S.A. — Todos los derechos reservados.
          </p>
          <p className="text-xs text-ink/60">
            Cumple normas IRAM 12598-1. © {new Date().getFullYear()} Ekoglass.
          </p>
        </div>
      </div>
    </footer>
  );
}
