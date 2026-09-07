import { NextResponse } from "next/server";
import { Resend } from "resend";

// Envío del formulario de contacto de la home.
//
// Variables de entorno (Vercel → Settings → Environment Variables, y .env local):
//   RESEND_API_KEY   clave de Resend (obligatoria)
//   CONTACT_TO       casilla que recibe las consultas. Definida por el cliente el
//                    04/09/2026: estefania.cruz@ar.nsg.com
//   CONTACT_FROM     remitente. Tiene que ser de un dominio verificado en Resend,
//                    p. ej. "Ekoglass Web <web@posicionarte.online>" hasta que se
//                    verifique ekoglass.com.ar.
//
// Sin RESEND_API_KEY el endpoint responde 500 y el formulario muestra el error:
// preferible a un "enviado" que no envía nada.

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO ?? "estefania.cruz@ar.nsg.com";
const FROM = process.env.CONTACT_FROM ?? "Ekoglass Web <onboarding@resend.dev>";

type Payload = {
  nombre?: string;
  email?: string;
  empresa?: string;
  telefono?: string;
  provincia?: string;
  localidad?: string;
  motivo?: string;
  consulta?: string;
  website?: string; // honeypot: los humanos no lo ven, los bots lo completan
};

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: si viene completo, respondemos ok sin enviar nada.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const nombre = clean(body.nombre, 120);
  const email = clean(body.email, 160);
  const empresa = clean(body.empresa, 120);
  const telefono = clean(body.telefono, 60);
  const provincia = clean(body.provincia, 60);
  const localidad = clean(body.localidad, 120);
  const motivo = clean(body.motivo, 60);
  const consulta = clean(body.consulta, 3000);

  if (!nombre || !email || !provincia || !localidad || !motivo || !consulta) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "El email no es válido." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contacto] Falta RESEND_API_KEY");
    return NextResponse.json(
      { ok: false, error: "El envío no está configurado." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const lineas: string[] = [`Nombre: ${nombre}`, `Email: ${email}`];
  if (empresa) lineas.push(`Empresa / Estudio: ${empresa}`);
  if (telefono) lineas.push(`Teléfono: ${telefono}`);
  lineas.push(
    `Provincia: ${provincia}`,
    `Localidad: ${localidad}`,
    `Motivo: ${motivo}`,
    "",
    "Consulta:",
    consulta,
    "",
    "Enviado desde el formulario de contacto de ekoglass.com.ar"
  );

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: email,
    subject: `[Web Ekoglass] ${motivo} — ${nombre}`,
    text: lineas.join("\n"),
  });

  if (error) {
    console.error("[contacto] Resend:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos enviar tu consulta. Probá de nuevo en unos minutos." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
