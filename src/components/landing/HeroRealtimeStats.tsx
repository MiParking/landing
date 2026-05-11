"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { WaitlistStats } from "@/lib/waitlist";

type HeroRealtimeStatsProps = {
  initialStats: WaitlistStats;
};

async function fetchStats(): Promise<WaitlistStats | null> {
  const response = await fetch("/api/waitlist/stats", { cache: "no-store" });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as WaitlistStats;
}

export function HeroRealtimeStats({ initialStats }: HeroRealtimeStatsProps) {
  const [targetStats, setTargetStats] = useState(initialStats);
  const [displayStats, setDisplayStats] = useState(initialStats);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const displayStatsRef = useRef(displayStats);

  useEffect(() => {
    displayStatsRef.current = displayStats;
  }, [displayStats]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const reducedMotionFrame = window.requestAnimationFrame(() => {
        setDisplayStats(targetStats);
      });

      return () => {
        window.cancelAnimationFrame(reducedMotionFrame);
      };
    }

    const start = performance.now();
    const duration = 800;
    const from = displayStatsRef.current;

    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    let animationFrameId = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);

      setDisplayStats({
        total: from.total + (targetStats.total - from.total) * eased,
        drivers: from.drivers + (targetStats.drivers - from.drivers) * eased,
        hosts: from.hosts + (targetStats.hosts - from.hosts) * eased,
      });

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [targetStats, prefersReducedMotion]);

  useEffect(() => {
    const supabase = createClient();

    const refreshStats = async () => {
      const nextStats = await fetchStats();

      if (nextStats) {
        setTargetStats(nextStats);
      }
    };

    const channel = supabase
      .channel("waitlist-live-stats")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "waitlist_entries",
        },
        () => {
          void refreshStats();
        },
      )
      .subscribe();

    const intervalId = window.setInterval(() => {
      void refreshStats();
    }, 30000);

    return () => {
      window.clearInterval(intervalId);
      void supabase.removeChannel(channel);
    };
  }, []);

  const interestStats = useMemo(
    () => [
      {
        label: "Total interesados",
        value: Math.round(displayStats.total).toLocaleString("es-CL"),
        tone: "total",
      },
      {
        label: "Conductores",
        value: Math.round(displayStats.drivers).toLocaleString("es-CL"),
        tone: "driver",
      },
      {
        label: "Anfitriones",
        value: Math.round(displayStats.hosts).toLocaleString("es-CL"),
        tone: "tertiary",
      },
    ],
    [displayStats],
  );

  const roleTotal = displayStats.drivers + displayStats.hosts;
  const driverPercent = roleTotal > 0 ? Math.round((displayStats.drivers / roleTotal) * 100) : 0;
  const hostPercent = roleTotal > 0 ? 100 - driverPercent : 0;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="ambient-shadow relative rounded-[2rem] bg-[rgba(9,18,34,0.22)] p-6 backdrop-blur-xl md:p-7">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-base leading-tight font-extrabold uppercase tracking-[0.08em] text-white md:text-lg">
            Interesados hasta hoy
          </p>
          <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold text-white">
            En tiempo real
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-2">
          {interestStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/8 p-4 text-center backdrop-blur-sm sm:text-left">
              <p
                className={`text-3xl font-extrabold tracking-tight ${
                  stat.tone === "driver"
                    ? "text-[#8b7dff]"
                    : stat.tone === "tertiary"
                      ? "text-[var(--tertiary)]"
                      : "text-white"
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl bg-white/8 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.08em]">
            <span className="text-[var(--primary)]">Conductores {driverPercent}%</span>
            <span className="text-[var(--tertiary)]">Anfitriones {hostPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div className="flex h-full w-full">
              <div
                className="h-full bg-[#8b7dff] transition-[width] duration-[800ms] ease-out"
                style={{ width: `${driverPercent}%` }}
              />
              <div
                className="h-full bg-[var(--tertiary)] transition-[width] duration-[800ms] ease-out"
                style={{ width: `${hostPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
