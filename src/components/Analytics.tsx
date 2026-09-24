"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

// Carga GA4 y Microsoft Clarity cuando hay ID. Sin ID no renderiza nada, así
// la preview y el entorno local no ensucian las métricas.
//
// Variables (públicas, viajan al navegador): NEXT_PUBLIC_GA_ID=G-XXXXXXX y
// NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx. Se cargan en .env local y en Vercel.
//
// GA4 dispara page_view solo en la carga inicial; en las navegaciones del App
// Router (que no recargan la página) lo mandamos a mano.

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

function PageViews() {
  const pathname = usePathname();
  const search = useSearchParams();
  const primera = useRef(true);

  useEffect(() => {
    if (primera.current) {
      primera.current = false; // la inicial la manda el propio gtag('config')
      return;
    }
    if (!GA_ID || !window.gtag) return;
    const q = search?.toString();
    window.gtag("event", "page_view", {
      page_path: q ? `${pathname}?${q}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}

export default function Analytics() {
  if (!GA_ID && !CLARITY_ID) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
          {/* useSearchParams exige Suspense en páginas estáticas (Next 14). */}
          <Suspense fallback={null}>
            <PageViews />
          </Suspense>
        </>
      )}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
