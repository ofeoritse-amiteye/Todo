import type { TodoPriority } from "../types";

export const priorityBadgeClass: Record<TodoPriority, string> = {
  high: "border-[0.5px] border-[#F09595] bg-[#FCEBEB] text-[#791F1F]",
  medium: "border-[0.5px] border-[#FAC775] bg-[#FAEEDA] text-[#633806]",
  low: "border-[0.5px] border-[#C0DD97] bg-[#EAF3DE] text-[#27500A]",
};
