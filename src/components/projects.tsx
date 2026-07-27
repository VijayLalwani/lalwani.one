// Placeholder until real project entries replace these.
const PROJECTS = [
  { name: "Project one", description: "Details coming soon." },
  { name: "Project two", description: "Details coming soon." },
] as const;

export function Projects() {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">projects</h3>
      <div className="-ml-1 grid grid-flow-row gap-2 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="mx-auto w-[80vw] cursor-default overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-4 shadow-doing md:w-full"
          >
            <h4 className="text-lg font-medium text-gray-500 dark:text-gray-400">{project.name}</h4>
            <p className="text-gray-400 dark:text-gray-500">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
