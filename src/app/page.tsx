"use client";
import { TaskPreviewShell } from "@/src/features/task-preview-shell";
import { DEMO_TASK, TodoCard } from "@/src/features/todo-card";
export default function Home() {
  return (
    <TaskPreviewShell>
      <TodoCard task={DEMO_TASK} />
    </TaskPreviewShell>
  );
}
