import type { ReactNode } from "react";
import { TaskPreviewBackground } from "./TaskPreviewBackground";
import { TaskPreviewHeader } from "./TaskPreviewHeader";

type TaskPreviewShellProps = {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export function TaskPreviewShell({
  children,
  eyebrow = "Task card",
  title = "Today's focus",
  subtitle = "A single highlighted task with due date, tags, and quick actions—styled with Tailwind.",
}: TaskPreviewShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f172a] font-sans text-[#f8fafc]">
      <TaskPreviewBackground />
      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
        <TaskPreviewHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </main>
  );
}
