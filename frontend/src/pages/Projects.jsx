import ProjectCard from "../components/projects/ProjectCard";
import { PROJECTS_DATA } from "../data/projects";
import { Code2 } from "lucide-react";

export default function Projects() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto py-2">
      {/* Header and Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 select-none animate-in fade-in duration-200">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Project Command Center
          </h1>
          <p className="text-sm text-text-secondary">
            A comprehensive catalog of Ronit's software engineering, data systems, and AI models.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold self-start sm:self-center">
          <Code2 size={14} />
          <span>{PROJECTS_DATA.length} Active Repositories</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {PROJECTS_DATA.map((proj) => (
          <ProjectCard key={proj.slug} project={proj} />
        ))}
      </div>
    </div>
  );
}
