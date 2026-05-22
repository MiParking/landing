import { z } from "zod";

export const WAITLIST_FULL_NAME_MAX = 120;
export const WAITLIST_EMAIL_MAX = 120;

const waitlistRoleSchema = z.enum(["host", "driver", "both"]);

export const waitlistSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Ingresa tu nombre completo.")
    .max(
      WAITLIST_FULL_NAME_MAX,
      `El nombre no puede superar ${WAITLIST_FULL_NAME_MAX} caracteres.`,
    ),
  email: z
    .email("Ingresa un email valido.")
    .max(
      WAITLIST_EMAIL_MAX,
      `El email no puede superar ${WAITLIST_EMAIL_MAX} caracteres.`,
    )
    .transform((value) => value.toLowerCase()),
  role: waitlistRoleSchema,
  lastSource: z
    .string()
    .trim()
    .max(80)
    .nullable(),
});

export type WaitlistRole = z.infer<typeof waitlistRoleSchema>;
