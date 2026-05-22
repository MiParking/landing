import { createBrowserClient } from "@supabase/ssr";

import { envs } from "@/lib/envs";

export function createClient() {
  return createBrowserClient(
    envs.NEXT_PUBLIC_SUPABASE_URL,
    envs.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
