import type { TodoCardTask } from "./types";

export const DEMO_TASK: TodoCardTask = {
  id: "demo-1",
  title: "Redesign the onboarding flow for mobile users",
  description:"Review current onboarding screens, identify friction points, and deliver updated wireframes with improved copy and CTA placement.",
  dueDate: new Date("2026-04-16T23:59:00"),
  dueDisplay: "Due Apr 16, 2026",
  dueDateTime: "2026-04-16T23:59:00",
  priority: "high",
  tags: [
    { label: "work", testId: "test-todo-tag-work" },
    { label: "urgent", testId: "test-todo-tag-urgent" },
    { label: "design" },
  ],
};
