import { FolderOpen } from "lucide-react";
import { PROJECTS_DATA } from "../../data/projects";
import ProjectCard from "../projects/ProjectCard";

export default function FeaturedProjects() {
  // We can show all 4 projects as featured
  const featured = PROJECTS_DATA;

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-border-subtle/50 pb-2 select-none">
        <div className="flex items-center gap-2">
          <FolderOpen className="text-accent-primary" size={18} />
          <h3 className="text-lg font-bold text-text-primary">Featured Projects</h3>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
