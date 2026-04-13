"use client";

import type { TodoCardTask } from "../types";
import { useTimeRemaining } from "../hooks/useTimeRemaining";
import { useTodoCompletion } from "../hooks/useTodoCompletion";
import { TodoCardActions } from "./TodoCardActions";
import { TodoCardDescription } from "./TodoCardDescription";
import { TodoCardDueRow } from "./TodoCardDueRow";
import { TodoCardHeader } from "./TodoCardHeader";
import { TodoCardStatusRow } from "./TodoCardStatusRow";
import { TodoCardTags } from "./TodoCardTags";

type TodoCardProps = {
  task: TodoCardTask;
};

export function TodoCard({ task }: TodoCardProps) {
  const { label: timeLabel, variant: timeVariant } = useTimeRemaining(task.dueDate);
  const { complete, setComplete, statusLabel, statusAria } = useTodoCompletion();

  return (
    <article
      data-testid="test-todo-card"
      role="region"
      aria-label="Todo task card"
      className="w-full rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-[box-shadow] duration-300 hover:shadow-[0_1px_0_rgb(0_0_0_/0.05),0_20px_50px_-16px_rgb(15_23_42_/0.22)] sm:p-7"
    >
      <TodoCardHeader
        title={task.title}
        priority={task.priority}
        complete={complete}
        onCompleteChange={setComplete}
      />
      <TodoCardDescription text={task.description} />
      <TodoCardDueRow
        dueDisplay={task.dueDisplay}
        dueDateTime={task.dueDateTime}
        timeLabel={timeLabel}
        timeVariant={timeVariant}
      />
      <TodoCardStatusRow
        statusLabel={statusLabel}
        statusAria={statusAria}
        complete={complete}
      />
      <div className="my-4 h-px bg-zinc-200/90" />
      <TodoCardTags tags={task.tags} />
      <TodoCardActions taskId={task.id} />
    </article>
  );
}
