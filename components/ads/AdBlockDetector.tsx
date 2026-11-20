"use client";

import { useEffect, useState } from "react";
import { detectAdBlock, type AdBlockStatus } from "@/lib/ads/adblock";
import AdBlockNotice from "./AdBlockNotice";

interface Props {
  /** Interval re-check dalam ms. Default 3000 agar overlay hilang otomatis. */
  recheckInterval?: number;
}

export default function AdBlockDetector({ recheckInterval = 3000 }: Props) {
  const [status, setStatus] = useState<AdBlockStatus>("unknown");

  useEffect(() => {
    let active = true;
    let running = false;

    const run = async () => {
      if (running) return;
      running = true;
      try {
        const result = await detectAdBlock();
        if (active) setStatus(result);
      } finally {
        running = false;
      }
    };

    run();

    let timer: ReturnType<typeof setInterval> | null = null;
    if (recheckInterval > 0) {
      timer = setInterval(run, recheckInterval);
    }

    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, [recheckInterval]);

  if (status !== "detected") return null;
  return <AdBlockNotice />;
}
