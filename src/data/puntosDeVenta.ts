// PLACEHOLDER — reemplazar por data real del cliente.
// Ekoglass manda el Excel verificado (nombre, teléfono, mail, WhatsApp, dirección)
// después del de Blindex (mail de Manuel, 04/09/2026). Mientras tanto la página
// muestra un aviso: poner `listadoProvisorio` en false cuando se cargue la data real.
export const listadoProvisorio = true;

export type PuntoDeVenta = {
  id: string;
  nombre: string;
  direccion: string;
  localidad: string;
  provincia: string;
  lat: number;
  lng: number;
  whatsapp: string; // formato wa.me, sin +, sin espacios
  telefono?: string;
  recomendado?: boolean;
};

export const puntosDeVenta: PuntoDeVenta[] = [
  { id: "1",  nombre: "Ekoglass Centro",       direccion: "Av. Corrientes 1234",  localidad: "CABA",                  provincia: "CABA",         lat: -34.6037, lng: -58.3816, whatsapp: "5491100000000", telefono: "+54 11 4000-1234", recomendado: true },
  { id: "2",  nombre: "Cristalería Palermo",   direccion: "Av. Santa Fe 3800",    localidad: "Palermo, CABA",         provincia: "CABA",         lat: -34.5780, lng: -58.4300, whatsapp: "5491100000000", telefono: "+54 11 4000-2222" },
  { id: "3",  nombre: "Vidrios del Norte",     direccion: "Av. Maipú 500",        localidad: "Vicente López",         provincia: "Buenos Aires", lat: -34.5266, lng: -58.4784, whatsapp: "5491100000000", telefono: "+54 11 4700-1111", recomendado: true },
  { id: "4",  nombre: "DVH La Plata",          direccion: "Calle 7 nº 850",       localidad: "La Plata",              provincia: "Buenos Aires", lat: -34.9215, lng: -57.9545, whatsapp: "5491100000000", telefono: "+54 221 400-9999" },
  { id: "5",  nombre: "Aberturas del Mar",     direccion: "Av. Colón 2200",       localidad: "Mar del Plata",         provincia: "Buenos Aires", lat: -38.0055, lng: -57.5426, whatsapp: "5491100000000", telefono: "+54 223 400-3333" },
  { id: "6",  nombre: "Ekoglass Córdoba",      direccion: "Av. Colón 1500",       localidad: "Córdoba",               provincia: "Córdoba",      lat: -31.4201, lng: -64.1888, whatsapp: "5491100000000", telefono: "+54 351 400-4444", recomendado: true },
  { id: "7",  nombre: "Cristales Rosario",     direccion: "Bv. Oroño 900",        localidad: "Rosario",               provincia: "Santa Fe",     lat: -32.9442, lng: -60.6505, whatsapp: "5491100000000", telefono: "+54 341 400-5555" },
  { id: "8",  nombre: "Vidriería Cuyo",        direccion: "Av. San Martín 1200",  localidad: "Mendoza",               provincia: "Mendoza",      lat: -32.8895, lng: -68.8458, whatsapp: "5491100000000", telefono: "+54 261 400-6666" },
  { id: "9",  nombre: "DVH Tucumán",           direccion: "24 de Septiembre 700", localidad: "San Miguel de Tucumán", provincia: "Tucumán",      lat: -26.8083, lng: -65.2176, whatsapp: "5491100000000", telefono: "+54 381 400-7777" },
  { id: "10", nombre: "Aberturas Patagonia",   direccion: "Av. Argentina 300",    localidad: "Neuquén",               provincia: "Neuquén",      lat: -38.9516, lng: -68.0591, whatsapp: "5491100000000", telefono: "+54 299 400-8888" },
];
