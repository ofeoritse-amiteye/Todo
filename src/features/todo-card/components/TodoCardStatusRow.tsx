import { StatusDotIcon } from "./icons";

type TodoCardStatusRowProps = {
  statusLabel: string;
  statusAria: string;
  complete: boolean;
};

export function TodoCardStatusRow({ statusLabel, statusAria, complete }: TodoCardStatusRowProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <StatusDotIcon className="size-3.5 shrink-0 text-[#94a3b8] opacity-80" />
      <span
        data-testid="test-todo-status"
        aria-label={statusAria}
        className={
          complete
            ? "rounded-full border border-green-700/30 bg-[#bbf7d0] px-2 py-0.5 font-mono text-[11px] font-medium text-[#14532d]"
            : "rounded-full border border-indigo-200/80 bg-indigo-100 px-2 py-0.5 font-mono text-[11px] font-medium text-[#3730a3]"
        }
      >
        {statusLabel}
      </span>
    </div>
  );
}
