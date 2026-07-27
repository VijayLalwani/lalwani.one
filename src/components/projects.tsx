"use client";

import { useCallback } from "react";

// Placeholder until real project entries replace these - same card/hover-glow
// treatment as the old hosted-services section, just no real links yet.
const PROJECTS = [
  { name: "Project one", description: "Details coming soon.", color: "#895CE3" },
  { name: "Project two", description: "Details coming soon.", color: "#0b94fd" },
] as const;

export function Projects() {
  const updateGradient = useCallback((element: HTMLDivElement, x: number, y: number, opacity: string) => {
    const gradientDiv = element.querySelector<HTMLDivElement>(".gradient");
    if (gradientDiv) {
      gradientDiv.style.setProperty("--x", `${x}px`);
      gradientDiv.style.setProperty("--y", `${y}px`);
      gradientDiv.style.opacity = opacity;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateGradient(e.currentTarget, e.clientX - rect.left, e.clientY - rect.top, "1");
  }, [updateGradient]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    updateGradient(e.currentTarget, 0, 0, "0");
  }, [updateGradient]);

  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">projects</h3>
      <div className="-ml-1 grid grid-flow-row gap-2 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="relative z-10 mx-auto w-[80vw] cursor-default overflow-hidden rounded-lg border border-dashed border-gray-300 px-4 py-4 transition-shadow dark:border-gray-700 md:w-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="gradient absolute inset-[-0.5px] z-auto rounded-lg transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), ${project.color}2a, transparent 40%)`,
                opacity: 0,
              }}
            />
            <h4 className="z-auto text-lg font-medium text-gray-500 dark:text-gray-400">{project.name}</h4>
            <p className="z-auto text-gray-400 dark:text-gray-500">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
