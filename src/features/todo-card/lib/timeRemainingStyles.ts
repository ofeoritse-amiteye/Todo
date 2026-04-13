import type { TimeVariant } from "../types";

/** Pills tuned for contrast on #1e293b card (light fill + dark text) */
export const timeVariantClass: Record<TimeVariant, string> = {
  overdue: "border border-red-200/80 bg-[#fecaca] text-[#9f1239]",
  soon: "border border-amber-200/80 bg-[#fde68a] text-[#92400e]",
  ok: "border border-emerald-200/80 bg-[#bbf7d0] text-[#166534]",
};
