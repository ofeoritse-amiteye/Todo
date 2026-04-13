import type { TimeVariant } from "../types";

export const timeVariantClass: Record<TimeVariant, string> = {
  overdue:"border-[0.5px] border-[#F09595] bg-[#FCEBEB] text-[#791F1F]",
  soon: "border-[0.5px] border-[#FAC775] bg-[#FAEEDA] text-[#633806]",
  ok: "border-[0.5px] border-[#5DCAA5] bg-[#E1F5EE] text-[#085041]",
};
