"use client";

import { useEffect, useState } from "react";
import type { TimeVariant } from "../types";

const TICK_MS = 30_000;

/** Demo-only: cycles through fixed copy + pill variant (no real clock math). */
export const DUMMY_TIME_STEPS: readonly { label: string; variant: TimeVariant }[] = [
  { label: "Due in 3 days", variant: "ok" },
  { label: "Due tomorrow", variant: "soon" },
  { label: "Overdue by 2 hours", variant: "overdue" },
  { label: "Due now!", variant: "overdue" },
] as const;

export function useUpdateStatus() {
  const [index, setIndex] = useState(0);

  const step = DUMMY_TIME_STEPS[index];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % DUMMY_TIME_STEPS.length);
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, []);

  return { label: step.label, variant: step.variant };
}
