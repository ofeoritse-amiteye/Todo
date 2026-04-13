import type { TodoTag } from "../types";

type TodoCardTagsProps = {
  tags: TodoTag[];
};

export function TodoCardTags({ tags }: TodoCardTagsProps) {
  return (
    <ul
      data-testid="test-todo-tags"
      role="list"
      aria-label="Tags"
      className="mb-5 flex flex-wrap gap-1.5"
    >
      {tags.map((tag, index) => (
        <li
          key={`${tag.label}-${index}`}
          data-testid={tag.testId}
          role="listitem"
          className="rounded-full border border-slate-600/80 bg-[#0f172a] px-2.5 py-0.5 font-mono text-xs font-medium text-[#94a3b8] shadow-lg"
        >
          {tag.label}
        </li>
      ))}
    </ul>
  );
}
