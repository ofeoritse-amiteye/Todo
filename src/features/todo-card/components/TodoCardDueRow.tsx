import type { TimeVariant } from "../types";
import { timeVariantClass } from "../lib/timeRemainingStyles";
import { CalendarIcon } from "./icons";

type TodoCardDueRowProps = {
  dueDisplay: string;
  dueDateTime: string;
  timeLabel: string;
  timeVariant: TimeVariant;
};

export function TodoCardDueRow({
  dueDisplay,
  dueDateTime,
  timeLabel,
  timeVariant,
}: TodoCardDueRowProps) {
  return (
    <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-[13px] text-[#94a3b8]">
      <CalendarIcon className="size-3.5 shrink-0 text-[#94a3b8] opacity-80" />
      <time
        data-testid="test-todo-due-date"
        dateTime={dueDateTime}
        className="font-medium text-[#e2e8f0]"
      >
        {dueDisplay}
      </time>
      <span
        data-testid="test-todo-time-remaining"
        aria-live="polite"
        className={`rounded-full px-1.5 py-0.5 font-mono text-[12px] font-medium ${timeVariantClass[timeVariant]}`}
      >
        {timeLabel}
      </span>
    </div>
  );
}
