import nodemailer from "nodemailer";

// Envío de mails desde el formulario de contacto de la home. Mismo esquema
// que en el sitio de Blindex (src/lib/mail.ts), para mantener los dos iguales.
//
// 21/10/2026: pasa de Resend al SMTP del servidor donde se aloja el sitio
// (RH Studio). Las credenciales las cargan ellos como variables de entorno
// en el cPanel; no viajan por el repo ni por nosotros.
//
// Variables (ver .env.example):
//   SMTP_HOST      servidor SMTP (obligatoria)
//   SMTP_PORT      465 (SSL) o 587 (STARTTLS). Por defecto 465.
//   SMTP_USER      usuario de la casilla (obligatoria)
//   SMTP_PASS      clave de la casilla (obligatoria)
//   CONTACT_TO     casilla que recibe las consultas. Definida
//                  por el cliente el 04/09/2026: estefania.cruz@ar.nsg.com
//   CONTACT_FROM   remitente, p. ej. "Ekoglass Web <web@ekoglass.com.ar>".
//                  Si falta, se usa SMTP_USER.
//
// Sin configuración SMTP el envío falla con error explícito y el formulario
// lo muestra: preferible a un "enviado" que no envía nada.

export const MAIL_TO = process.env.CONTACT_TO ?? "estefania.cruz@ar.nsg.com";

/** Recorta y limpia un valor que vino del cliente. */
export const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export const emailValido = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type Envio = {
  subject: string;
  text: string;
  replyTo?: string;
};

let transporte: nodemailer.Transporter | null = null;

function getTransporte() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transporte) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporte = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      // 465 es SSL directo; 587 arranca en claro y sube a TLS (STARTTLS).
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporte;
}

/**
 * Envía un mail a la casilla de la marca. Devuelve `{ ok: true }` o
 * `{ ok: false, error, status }` listo para responder desde el route handler.
 */
export async function enviarMail({ subject, text, replyTo }: Envio) {
  const t = getTransporte();
  if (!t) {
    console.error("[mail] Falta configuración SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS)");
    return { ok: false as const, error: "El envío no está configurado.", status: 500 };
  }

  try {
    await t.sendMail({
      from: process.env.CONTACT_FROM ?? process.env.SMTP_USER,
      to: MAIL_TO,
      replyTo,
      subject,
      text,
    });
    return { ok: true as const };
  } catch (err) {
    console.error("[mail] SMTP:", err);
    return {
      ok: false as const,
      error: "No pudimos enviar el mensaje. Probá de nuevo en unos minutos.",
      status: 502,
    };
  }
}
