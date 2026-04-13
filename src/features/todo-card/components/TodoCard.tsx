"use client";

import type { TodoCardTask } from "../types";
import { useUpdateStatus } from "../hooks/updateStatus";
import { useTodoCompletion } from "../hooks/useTodoCompletion";
import { TodoCardActions } from "./TodoCardActions";
import { TodoCardDescription } from "./TodoCardDescription";
import { TodoCardDueRow } from "./TodoCardDueRow";
import { TodoCardHeader } from "./TodoCardHeader";
import { TodoCardStatusRow } from "./TodoCardStatusRow";
import { TodoCardTags } from "./TodoCardTags";
import { formatDate } from "../lib/formatDate";

type TodoCardProps = {
  task: TodoCardTask;
};

export function TodoCard({ task }: TodoCardProps) {
  const { label: timeLabel, variant: timeVariant } = useUpdateStatus();
  const { complete, setComplete, statusLabel, statusAria } = useTodoCompletion();

  return (
    <article
      data-testid="test-todo-card"
      role="region"
      aria-label="Todo task card"
      className="w-full rounded-2xl border border-slate-600/70 bg-[#1e293b] p-6 shadow-[0_1px_0_rgb(255_255_255_/0.06)_inset,0_24px_48px_-20px_rgb(0_0_0_/0.55)] backdrop-blur-sm transition-[box-shadow] duration-300 hover:border-slate-500/80 hover:shadow-[0_1px_0_rgb(255_255_255_/0.08)_inset,0_28px_56px_-22px_rgb(0_0_0_/0.6)] sm:p-7"
    >
      <TodoCardHeader
        title={task.title}
        priority={task.priority}
        complete={complete}
        onCompleteChange={setComplete}
      />
      <TodoCardDescription text={task.description} />
      <TodoCardDueRow
        dueDisplay={formatDate(task.dueDate)}
        dueDateTime={task.dueDateTime}
        timeLabel={timeLabel}
        timeVariant={timeVariant}
      />
      <TodoCardStatusRow
        statusLabel={statusLabel}
        statusAria={statusAria}
        complete={complete}
      />
      <div className="my-4 h-px bg-slate-600/50" />
      <TodoCardTags tags={task.tags} />
      <TodoCardActions taskId={task.id} />
    </article>
  );
}
