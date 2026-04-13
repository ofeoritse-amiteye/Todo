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
          className="rounded-full border-[0.5px] border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-xs font-medium text-zinc-600"
        >
          {tag.label}
        </li>
      ))}
    </ul>
  );
}
