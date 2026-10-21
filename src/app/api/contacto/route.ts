import { NextResponse } from "next/server";
import { clean, emailValido, enviarMail } from "@/lib/mail";

// Envío del formulario de contacto de la home. Configuración SMTP y
// variables de entorno en src/lib/mail.ts (desde el 21/10/2026, antes Resend).

export const runtime = "nodejs";

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
  if (!emailValido(email)) {
    return NextResponse.json({ ok: false, error: "El email no es válido." }, { status: 400 });
  }

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

  const r = await enviarMail({
    subject: `[Web Ekoglass] ${motivo}: ${nombre}`,
    text: lineas.join("\n"),
    replyTo: email,
  });

  if (!r.ok) return NextResponse.json({ ok: false, error: r.error }, { status: r.status });
  return NextResponse.json({ ok: true });
}
