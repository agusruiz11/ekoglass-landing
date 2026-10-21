import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ArrowRight } from "lucide-react";

// Panel de mediciones: oculto hasta conectarlo a Google Analytics.
//
// 21/10/2026: la página (page.tsx) sigue siendo la maqueta con datos de
// ejemplo, y era pública. Mientras no exista la propiedad de GA4 de Ekoglass,
// este layout muestra "Próximamente" en lugar del panel. El diseño queda
// intacto en page.tsx para cuando se conecte.
//
// Para activarlo: compilar con PANEL_HABILITADO=true. Antes de hacerlo, el
// panel tiene que leer datos reales de GA4 y estar protegido con contraseña
// (ver medicion-dia-1.md en el proyecto). La variable se lee al compilar.
const PANEL_HABILITADO = process.env.PANEL_HABILITADO === "true";

export const metadata: Metadata = {
  title: "Panel de mediciones",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  if (PANEL_HABILITADO) return <>{children}</>;

  return (
    <div className="pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white">
          <BarChart3 className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Panel de mediciones
        </h1>
        <p className="mt-4 text-lg text-ink/70">
          Estamos preparando el panel con las visitas y los contactos del
          sitio. Muy pronto vas a poder consultarlo desde acá.
        </p>
        <div className="mt-6 inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-ink/75">
          Próximamente
        </div>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Volver al inicio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
