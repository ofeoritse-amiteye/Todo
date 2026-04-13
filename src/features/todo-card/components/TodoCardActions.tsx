
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
        onClick={() => (window.alert("Edit task clicked"))}
        className="inline-flex items-center gap-1.5 rounded-lg border-[0.5px] border-zinc-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9E75]"
      >
        <EditIcon />
        Edit
      </button>
      
      <button
        type="button"
        data-testid="test-todo-delete-button"
        aria-label="Delete task"
        onClick={() => (window.alert("Delete task clicked"))}
        className="inline-flex items-center gap-1.5 rounded-lg border-[0.5px] border-zinc-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:border-[#F09595] hover:bg-[#FCEBEB] hover:text-[#791F1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9E75]"
      >
        <TrashIcon />
        Delete
      </button>
    </div>
  );
}
