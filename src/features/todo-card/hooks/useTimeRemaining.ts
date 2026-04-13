"use client";

import { useCallback, useEffect, useState } from "react";
import { getTimeRemaining } from "../lib/getTimeRemaining";
import type { TimeVariant } from "../types";

const TICK_MS = 60_000;

export function useTimeRemaining(dueDate: Date) {
  const [label, setLabel] = useState("calculating...");
  const [variant, setVariant] = useState<TimeVariant>("soon");

  const tick = useCallback(() => {
    const next = getTimeRemaining(new Date(), dueDate);
    setLabel(next.text);
    setVariant(next.variant);
  }, [dueDate]);

  useEffect(() => {
    tick();
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [tick]);

  return { label, variant };
}
