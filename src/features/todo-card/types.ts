export type TimeVariant = "overdue" | "soon" | "ok";

export type TodoPriority = "high" | "medium" | "low";

export type TodoTag = {
  label: string;
  testId?: string;
};

export type TodoCardTask = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  dueDateTime: string;
  priority: TodoPriority;
  tags: TodoTag[];
};
