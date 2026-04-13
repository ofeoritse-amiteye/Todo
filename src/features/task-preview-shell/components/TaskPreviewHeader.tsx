type TaskPreviewHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function TaskPreviewHeader({ eyebrow, title, subtitle }: TaskPreviewHeaderProps) {
  return (
    <header className="mb-8 text-center sm:mb-10 sm:text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/90">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600">{subtitle}</p>
    </header>
  );
}
