import { Link } from "react-router-dom";
import { ArrowRight, Cpu } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative flex flex-col justify-between h-[220px] bg-bg-card border border-border-subtle hover:border-accent-primary/50 rounded-xl p-5 shadow-sm hover:shadow-accent-glow hover:-translate-y-1 transition-all duration-300 select-none overflow-hidden"
    >
      {/* Decorative gradient blur background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/0 to-accent-secondary/0 group-hover:from-accent-primary/5 group-hover:to-accent-secondary/5 transition-all duration-500" />

      <div className="space-y-2 relative z-10">
        {/* Project Header Title & Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-primary border border-border-subtle group-hover:border-accent-primary/30 group-hover:text-accent-primary text-text-secondary transition-all">
            <Cpu size={16} />
          </div>
          
          <span className="text-[10px] font-bold text-accent-primary/80 group-hover:text-accent-primary bg-accent-primary/5 border border-accent-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
            View Project
          </span>
        </div>

        {/* Project Name and Tagline */}
        <h3 className="text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors tracking-tight mt-1">
          {project.title}
        </h3>
        <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Footer tags and bottom action */}
      <div className="flex items-center justify-between border-t border-border-subtle/50 pt-3 mt-4 relative z-10 select-none">
        {/* Stack tags (max 3 visible) */}
        <div className="flex gap-1.5 overflow-hidden">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech.name}
              className="text-[9px] font-medium text-text-muted bg-bg-primary px-2 py-0.5 rounded border border-border-subtle/70"
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Dynamic CTA Arrow */}
        <ArrowRight
          size={14}
          className="text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all duration-300"
        />
      </div>
    </Link>
  );
}
