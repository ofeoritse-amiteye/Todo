import type { TodoPriority } from "../types";
import { priorityBadgeClass } from "../lib/priorityStyles";

type TodoCardHeaderProps = {
  title: string;
  priority: TodoPriority;
  complete: boolean;
  onCompleteChange: (next: boolean) => void;
};

const priorityAria: Record<TodoPriority, string> = {
  high: "Priority: High",
  medium: "Priority: Medium",
  low: "Priority: Low",
};

export function TodoCardHeader({
  title,
  priority,
  complete,
  onCompleteChange,
}: TodoCardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-1 items-start gap-2.5">
        <label className="mt-0.5 flex shrink-0 cursor-pointer items-center">
          <input
            type="checkbox"
            data-testid="test-todo-complete-toggle"
            aria-label="Mark task as complete"
            checked={complete}
            onChange={(e) => onCompleteChange(e.target.checked)}
            className="size-[18px] cursor-pointer rounded border-slate-500 bg-[#0f172a] accent-[#0f6e56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6e56]"
          />
        </label>
        <h2
          data-testid="test-todo-title"
          className={`text-[17px] font-semibold leading-snug transition-all duration-200 ${
            complete ? "text-[#94a3b8] line-through decoration-slate-500" : "text-[#f1f5f9]"
          }`}
        >
          {title}
        </h2>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span
          className={`whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[11px] font-medium ${priorityBadgeClass[priority]}`}
          data-testid="test-todo-priority"
          aria-label={priorityAria[priority]}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>
    </div>
  );
}
