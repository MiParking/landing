import "server-only";

import { z } from "zod";

const serverEnvsSchema = z.object({
  RESEND_API_KEY: z.string().trim().min(1, "RESEND_API_KEY es requerida."),
  TURNSTILE_SECRET_KEY: z.string().trim().min(1, "TURNSTILE_SECRET_KEY es requerida."),
});

const parsedServerEnvs = serverEnvsSchema.safeParse(process.env);

if (!parsedServerEnvs.success) {
  throw new Error(
    `Variables de entorno de servidor invalidas:\n${parsedServerEnvs.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n")}`,
  );
}

export const serverEnvs = parsedServerEnvs.data;
