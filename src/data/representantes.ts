// Representantes de la Red Ekoglass.
// Cada logo vive en `public/representantes/` (ver LEEME.txt) y enlaza a su web.
export type Representante = {
  name: string; // texto alternativo (accesibilidad) + title del enlace
  src: string; // ruta dentro de /public
  web: string; // sitio web del representante
};

export const representantes: Representante[] = [
  { name: "Brocanelli S.A.", src: "/representantes/Brocanelli-logo.png", web: "http://www.brocanellisa.com.ar/" },
  { name: "Cadivi", src: "/representantes/Cadivi-logo.png", web: "https://www.cadivi.com.ar/" },
  { name: "Crystalcord", src: "/representantes/Cristalcord-logo.png", web: "https://www.crystalcord.com.ar/" },
  { name: "Cristales Ebenor", src: "/representantes/Ebenor-logo.png", web: "https://www.ebenor.com/" },
  { name: "Fontela Cristales", src: "/representantes/Fontela-logo-270x71.png", web: "https://www.fontela.com.ar/" },
  { name: "Kalciyan", src: "/representantes/Kalciyan-logo.png", web: "https://www.kalciyan.com.ar/" },
  { name: "La Fábrica de Aberturas", src: "/representantes/lfda_logo.jpg", web: "https://lafabricadeaberturas.com/" },
  { name: "Marcelo Trento", src: "/representantes/Marcelo-Trento-Logo-250x81.png", web: "https://www.marcelotrento.com.ar/" },
  { name: "Mendoglass", src: "/representantes/Mendoglass-logo.png", web: "https://mendoglass.com/" },
  { name: "Pahud", src: "/representantes/Pahud-logo.png", web: "http://pahud.com.ar/pahud/" },
  // NOTA: logo "Piazza" enlazado a vidpia.com (VIDPIA = Vidrios Piazza). Revisar si no corresponde.
  { name: "Piazza (Vidpia)", src: "/representantes/Piazza-logo-270x71.png", web: "https://www.vidpia.com/" },
  { name: "RB DVH", src: "/representantes/Rb-logo.png", web: "http://www.rb-dvh.com.ar/" },
  { name: "Trento Vidrios", src: "/representantes/Trento-logo-270x71.png", web: "https://www.trentovidrios.com.ar/" },
  { name: "Vidrial", src: "/representantes/Vidrial-logo.png", web: "https://www.vidrial.com.ar/" },
  { name: "Vidrios Castelar S.A.", src: "/representantes/Vidrios-Castelar-Logo.png", web: "https://www.vidrioscastelarsa.com.ar/" },
  { name: "Vitrex S.A.", src: "/representantes/Vitrex_logo1.png", web: "https://vitrexsa.com.ar/" },
  // Vidrios Bravi (Coppari Gabriel y Coppari Martín) entra en la red el 04/09/2026
  // en reemplazo de Bianchi, que ya no pertenece. No tienen sitio web: enlaza a su Instagram.
  { name: "Vidrios Bravi", src: "/representantes/Bravi-logo.png", web: "https://www.instagram.com/vidrios_bravi/" },
];
