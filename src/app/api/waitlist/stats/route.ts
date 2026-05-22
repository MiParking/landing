import { getWaitlistStats } from "@/lib/waitlist";

export async function GET() {
  const stats = await getWaitlistStats();
  return Response.json(stats);
}
