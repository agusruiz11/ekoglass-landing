# Medición: GA4, Clarity y eventos

Instrumentado el 24/09/2026, con el mismo esquema en Ekoglass y Blindex para
que el panel de mediciones pueda leer las dos propiedades con un solo código.
Plan original en el proyecto de Cowork (`medicion-dia-1.md`).

## Cómo se activa

Nada se carga hasta que existan las variables. En `.env` local y en Vercel
(Settings → Environment Variables), para Production y Preview si se quiere
medir la preview:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

Son públicas (`NEXT_PUBLIC_`) porque viajan al navegador; un ID de GA4 no es
un secreto. Después de cargarlas hay que redesplegar: Next las incrusta en el
build.

**Blindex, además:** "Elegí tu vidrio" es una app estática que no pasa por
Next, así que el ID se completa a mano en
`public/elegituvidrio/js/analytics.js` (constantes `GA_ID` y `CLARITY_ID`).
Tiene que ser el mismo G-XXXX, para que mida en la misma propiedad.

## Qué hay en el código

- `src/components/Analytics.tsx`: carga gtag y Clarity con `next/script`
  (sin dependencias nuevas) y manda `page_view` en las navegaciones internas
  del App Router, que GA4 no ve solo. Montado en `layout.tsx`.
- `src/lib/tracking.ts`: punto único de eventos. Todo el sitio llama a estas
  funciones; ningún componente habla con gtag directo. Sin tag cargado, en
  desarrollo loguea a consola para poder verificar.
- `src/components/TrackSecciones.tsx`: `seccion_vista` la primera vez que
  cada `<section id>` de la home entra a la mitad de la pantalla. Montado en
  `app/page.tsx`. Cada sección de la home tiene id.

## Eventos

| Evento | Dónde | Parámetros |
|---|---|---|
| `contacto_whatsapp` | card y popup del mapa de puntos de venta | `punto_id`, `punto_nombre`, `provincia`, `origen` (card / mapa), `canal` |
| `contacto_llamada` | ídem | ídem |
| `contacto_como_llegar` | card | ídem |
| `contacto_web`, `contacto_instagram` | card (Blindex) | ídem |
| `whatsapp_flotante` | botón fijo de todas las páginas | |
| `cta_click` | botones principales de la home | `cta` |
| `seccion_vista` | home | `seccion` |
| `faq_abierta` | FAQ (Ekoglass) | `pregunta` |
| `form_enviado` | formularios, sólo cuando el envío fue exitoso | `formulario`, `motivo` |
| `elegi_vidrio_resultado` | páginas de resultado de Elegí tu vidrio (Blindex) | `resultado`, `necesidades` |

Valores de `cta` en Blindex: `hero_puntos_de_venta`, `hero_elegi_tu_vidrio`,
`elegi_tu_vidrio`, `cta_puntos_de_venta`. En Ekoglass: `hogar`,
`profesionales`, `cta_puntos_de_venta`.

## Qué configurar en GA4 (paid media)

1. Registrar como **dimensiones personalizadas de evento**: `punto_id`,
   `punto_nombre`, `provincia`, `origen`, `canal`, `cta`, `seccion`,
   `pregunta`, `formulario`, `motivo`, `resultado`, `necesidades`. Sin esto,
   GA4 recibe los parámetros pero no los muestra en informes.
2. Marcar como **conversiones** (eventos clave): `contacto_whatsapp`,
   `contacto_llamada`, `contacto_como_llegar`, `whatsapp_flotante`,
   `form_enviado`.
3. Convención de UTMs para campañas, así "Fuente de tráfico" distingue Google
   Ads, Meta e Instagram orgánico.

## Cómo verificar

Con los IDs cargados, abrir el sitio con la extensión "Google Analytics
Debugger" o el informe **Tiempo real** de GA4 y recorrer: home hasta el pie
(`seccion_vista` por sección), un click en WhatsApp de un punto de venta
(`contacto_whatsapp` con el nombre del punto), un envío del formulario
(`form_enviado`). Sin IDs, los mismos eventos aparecen en la consola del
navegador como `[tracking] nombre_del_evento`.

## Pendiente

- IDs de GA4 y Clarity de cada marca (paid media crea las propiedades; el
  cliente aporta la cuenta de Google o se transfieren después).
- Panel de mediciones de Ekoglass: hoy es una maqueta con datos demo y ruta
  pública. Falta leer GA4 desde el servidor (Data API, cuenta de servicio,
  caché diario) y proteger la ruta con contraseña. Requiere la propiedad
  creada y dos o tres semanas de datos para que diga algo.
