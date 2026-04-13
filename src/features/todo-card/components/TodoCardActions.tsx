import { EditIcon, TrashIcon } from "./icons";

type TodoCardActionsProps = {
  taskId: string;
};

export function TodoCardActions({ taskId }: TodoCardActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        data-testid="test-todo-edit-button"
        aria-label="Edit task"
        onClick={() => {
          window.alert(`Edit button clicked`);
        }}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 bg-[#0f172a] px-3.5 py-1.5 text-[13px] cursor-pointer font-medium text-[#e2e8f0] transition-colors hover:border-slate-500 hover:bg-slate-800/90 hover:text-[#f8fafc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6e56]"
      >
        <EditIcon />
        Edit
      </button>

      <button
        type="button"
        data-testid="test-todo-delete-button"
        aria-label="Delete task"
        onClick={() => {
          window.alert(`Delete button clicked`);
        }}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500 bg-red-600/90 px-3.5 py-1.5 text-[13px] cursor-pointer font-medium text-[#e2e8f0] transition-colors hover:border-rose-900/60 hover:bg-red-500 hover:text-[#fecaca] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6e56]"
      >
        <TrashIcon />
        Delete
      </button>
    </div>
  );
}
