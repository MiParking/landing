import { z } from "zod";

const publicEnvsSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .url("NEXT_PUBLIC_SUPABASE_URL debe ser una URL valida."),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
    .string()
    .trim()
    .min(1, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY es requerida."),
});

const publicEnvs = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
};

const parsedPublicEnvs = publicEnvsSchema.safeParse(publicEnvs);

if (!parsedPublicEnvs.success) {
  throw new Error(
    `Variables de entorno publicas invalidas:\n${parsedPublicEnvs.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n")}`,
  );
}

export const envs = parsedPublicEnvs.data;
