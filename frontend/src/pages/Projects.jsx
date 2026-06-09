import ProjectCard from "../components/projects/ProjectCard";
import { PROJECTS_DATA } from "../data/projects";
import { Code2 } from "lucide-react";

export default function Projects() {
  const personalProjects = PROJECTS_DATA.filter((p) => p.type === "personal");
  const internshipProjects = PROJECTS_DATA.filter((p) => p.type === "internship");

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto py-2">
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
          <span>{PROJECTS_DATA.length} Active Projects</span>
        </div>
      </div>

      {/* Personal Projects Section */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex items-center gap-2 pb-2 border-b border-border-subtle select-none">
          <h2 className="text-lg font-bold text-text-primary">Personal Projects</h2>
          <span className="text-[10px] uppercase tracking-wider text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full font-bold">
            Open Source
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {personalProjects.map((proj) => (
            <ProjectCard key={proj.slug} project={proj} />
          ))}
        </div>
      </div>

      {/* Internship Projects Section */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex items-center gap-2 pb-2 border-b border-border-subtle select-none">
          <h2 className="text-lg font-bold text-text-primary">Professional Internship Projects</h2>
          <span className="text-[10px] uppercase tracking-wider text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-2 py-0.5 rounded-full font-bold">
            Proprietary / NDA Protected
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {internshipProjects.map((proj) => (
            <ProjectCard key={proj.slug} project={proj} />
          ))}
        </div>
      </div>
    </div>
  );
}
