import "server-only";

import { render } from "@react-email/render";
import { Resend } from "resend";

import { WaitlistConfirmationEmail } from "@/emails/waitlist-confirmation";
import { serverEnvs } from "@/lib/envs.server";

type WaitlistRole = "host" | "driver" | "both";

type SendWaitlistConfirmationParams = {
  fullName: string;
  email: string;
  role: WaitlistRole;
};

const ROLE_LABELS: Record<WaitlistRole, string> = {
  host: "Anfitrion",
  driver: "Conductor",
  both: "Anfitrion y Conductor",
};

const resend = new Resend(serverEnvs.RESEND_API_KEY);

export async function sendWaitlistConfirmation({
  fullName,
  email,
  role,
}: SendWaitlistConfirmationParams): Promise<void> {
  const roleLabel = ROLE_LABELS[role];
  const html = await render(WaitlistConfirmationEmail({ fullName, role }));

  const { error } = await resend.emails.send({
    from: "MiParking <noreply@miparking.cl>",
    to: [email],
    subject: "Confirmacion de tu registro en MiParking",
    html,
    text: [
      `Hola ${fullName},`,
      "",
      "Tu registro en la waitlist de MiParking fue confirmado.",
      `Rol seleccionado: ${roleLabel}.`,
      "",
      "Te enviaremos noticias por correo cuando hayan novedades.",
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Error enviando correo de waitlist: ${error.message}`);
  }
}
