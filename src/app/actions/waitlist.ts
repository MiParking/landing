"use server";

import { headers } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { sendWaitlistConfirmation } from "@/lib/email/send-waitlist-confirmation";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { waitlistSchema } from "@/lib/waitlist-validation";

export type WaitlistActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitWaitlist(
  _prevState: WaitlistActionState,
  formData: FormData,
): Promise<WaitlistActionState> {
  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "").trim();

  if (!turnstileToken) {
    return {
      status: "error",
      message: "Completa la verificacion de seguridad.",
    };
  }

  const requestHeaders = await headers();
  const remoteIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const isTurnstileValid = await verifyTurnstileToken({ token: turnstileToken, remoteIp });

  if (!isTurnstileValid) {
    return {
      status: "error",
      message: "No pudimos validar el captcha. Intenta nuevamente.",
    };
  }

  const parsedInput = waitlistSchema.safeParse({
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? "").trim(),
    role: formData.get("role"),
    lastSource: String(formData.get("lastSource") ?? "").trim() || null,
  });

  if (!parsedInput.success) {
    const roleError = parsedInput.error.issues.find((issue) => issue.path[0] === "role");
    if (roleError) {
      return { status: "error", message: "Selecciona como usaras MiParking." };
    }

    return {
      status: "error",
      message: parsedInput.error.issues[0]?.message ?? "Revisa los datos ingresados.",
    };
  }

  const { fullName, email, role, lastSource } = parsedInput.data;

  const supabase = await createClient();

  const { data: existingRow, error: lookupError } = await supabase
    .from("waitlist_entries")
    .select("role")
    .ilike("email", email)
    .limit(1)
    .maybeSingle();

  if (lookupError) {
    return { status: "error", message: "No pudimos validar tu registro. Intenta nuevamente." };
  }

  const { error: upsertError } = await supabase.from("waitlist_entries").upsert(
    {
      full_name: fullName,
      email,
      role,
      last_source: lastSource,
    },
    {
      onConflict: "email",
    },
  );

  if (upsertError) {
    return {
      status: "error",
      message: "No pudimos guardarte en la lista. Intenta nuevamente.",
    };
  }

  if (!existingRow) {
    try {
      await sendWaitlistConfirmation({
        fullName,
        email,
        role,
      });
    } catch (error) {
      console.error("No se pudo enviar el correo de confirmacion de waitlist.", error);
    }

    return { status: "success", message: "Te uniste a la lista de espera." };
  }

  if (existingRow.role === role) {
    return {
      status: "success",
      message: "Ya estabas registrado con ese perfil.",
    };
  }

  return {
    status: "success",
    message: "Actualizamos tu perfil en la lista de espera.",
  };
}
