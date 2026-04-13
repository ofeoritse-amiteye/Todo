import type { TodoPriority } from "../types";

/** WCAG AA–friendly pairs on dark card surfaces */
export const priorityBadgeClass: Record<TodoPriority, string> = {
  high: "border border-red-200/80 bg-[#fecaca] text-[#7f1d1d]",
  medium: "border border-amber-200/80 bg-[#fde68a] text-[#78350f]",
  low: "border border-green-200/80 bg-[#bbf7d0] text-[#14532d]",
};
