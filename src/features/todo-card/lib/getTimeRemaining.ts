import type { TimeVariant } from "../types";

export type TimeRemainingResult = {
  text: string;
  variant: TimeVariant;
};

export function getTimeRemaining(now: Date, due: Date): TimeRemainingResult {
  const diff = due.getTime() - now.getTime();
  const abs = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days = Math.floor(abs / 86400000);

  if (diff < 0) {
    if (mins < 60) {
      return { text: `Overdue by ${mins} min${mins !== 1 ? "s" : ""}`, variant: "overdue" };
    }
    if (hours < 24) {
      return { text: `Overdue by ${hours} hour${hours !== 1 ? "s" : ""}`, variant: "overdue" };
    }
    return { text: `Overdue by ${days} day${days !== 1 ? "s" : ""}`, variant: "overdue" };
  }
  if (mins < 60) return { text: "Due now!", variant: "overdue" };
  if (hours < 24) return { text: `Due in ${hours} hour${hours !== 1 ? "s" : ""}`, variant: "soon" };
  if (days === 1) return { text: "Due tomorrow", variant: "soon" };
  return { text: `Due in ${days} days`, variant: "ok" };
}
