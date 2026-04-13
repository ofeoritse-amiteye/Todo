import { StatusDotIcon } from "./icons";

type TodoCardStatusRowProps = {
  statusLabel: string;
  statusAria: string;
  complete: boolean;
};

export function TodoCardStatusRow({ statusLabel, statusAria, complete }: TodoCardStatusRowProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <StatusDotIcon className="size-3.5 shrink-0 opacity-50" />
      <span
        data-testid="test-todo-status"
        aria-label={statusAria}
        className={
          complete
            ? "rounded-full border-[0.5px] border-[#C0DD97] bg-[#EAF3DE] px-2 py-0.5 font-mono text-[11px] font-medium text-[#27500A]"
            : "rounded-full border-[0.5px] border-[#AFA9EC] bg-[#EEEDFE] px-2 py-0.5 font-mono text-[11px] font-medium text-[#3C3489]"
        }
      >
        {statusLabel}
      </span>
    </div>
  );
}
