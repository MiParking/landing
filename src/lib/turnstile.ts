import "server-only";

import { serverEnvs } from "@/lib/envs.server";

type VerifyTurnstileParams = {
  token: string;
  remoteIp?: string;
};

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken({ token, remoteIp }: VerifyTurnstileParams): Promise<boolean> {
  const body = new URLSearchParams({
    secret: serverEnvs.TURNSTILE_SECRET_KEY,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as TurnstileVerifyResponse;
  return data.success;
}
