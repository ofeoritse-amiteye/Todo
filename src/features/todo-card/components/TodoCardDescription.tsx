type TodoCardDescriptionProps = {
  text: string;
};

export function TodoCardDescription({ text }: TodoCardDescriptionProps) {
  return (
    <p data-testid="test-todo-description" className="mb-4 text-sm leading-relaxed text-zinc-600">
      {text}
    </p>
  );
}
