import { createClient } from "@/lib/supabase/server";

export type WaitlistStats = {
  total: number;
  drivers: number;
  hosts: number;
};

export async function getWaitlistStats(): Promise<WaitlistStats> {
  const supabase = await createClient();

  const [{ count: totalCount, error: totalError }, { count: driverCount, error: driverError }, { count: hostCount, error: hostError }] =
    await Promise.all([
      supabase.from("waitlist_entries").select("id", { head: true, count: "exact" }),
      supabase
        .from("waitlist_entries")
        .select("id", { head: true, count: "exact" })
        .in("role", ["driver", "both"]),
      supabase
        .from("waitlist_entries")
        .select("id", { head: true, count: "exact" })
        .in("role", ["host", "both"]),
    ]);

  if (totalError || driverError || hostError) {
    return {
      total: 0,
      drivers: 0,
      hosts: 0,
    };
  }

  return {
    total: totalCount ?? 0,
    drivers: driverCount ?? 0,
    hosts: hostCount ?? 0,
  };
}
