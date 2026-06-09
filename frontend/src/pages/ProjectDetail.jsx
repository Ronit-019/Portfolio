import { useParams, Link } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projects";
import {
  ArrowLeft,
  Github,
  AlertTriangle,
  GitBranch,
} from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Project Not Found</h2>
        <p className="text-sm text-text-secondary">The requested project details could not be located.</p>
        <Link to="/projects" className="text-sm text-accent-primary hover:underline">
          Return to Projects Command Center
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-2 space-y-8 animate-in fade-in duration-200 select-text">
      {/* Back button and breadcrumbs */}
      <div className="flex items-center gap-2 select-none">
        <Link
          to="/projects"
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
      </div>

      {/* Project Header block */}
      <div className="space-y-3 pb-6 border-b border-border-subtle">
        <div className="flex flex-wrap items-center gap-3 select-none">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            {project.title}
          </h1>
          <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
            project.type === 'personal' 
              ? 'bg-success/10 border-success/20 text-success' 
              : 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary'
          }`}>
            {project.type === 'personal' ? 'Personal Project' : 'Internship Project'}
          </span>
        </div>
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-3 select-none">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-bg-surface hover:bg-bg-hover border border-border-subtle hover:border-border-active text-text-secondary hover:text-text-primary transition-all duration-300 shadow-sm cursor-pointer"
            >
              <Github size={14} />
              <span>Repository on GitHub</span>
            </a>
          ) : (
            <span className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-bg-surface/50 border border-border-subtle/70 text-text-muted cursor-not-allowed">
              🔒 Proprietary Code (NDA Protected)
            </span>
          )}

          <Link
            to={`/architecture/${project.architectureSlug}`}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-accent-primary/10 hover:bg-accent-primary hover:text-white border border-accent-primary/20 text-accent-primary transition-all duration-300 shadow-sm cursor-pointer"
          >
            <GitBranch size={14} />
            <span>Interactive Architecture</span>
          </Link>
        </div>
      </div>

      {/* Grid: Problem vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Card */}
        <div className="bg-bg-card border border-border-subtle rounded-xl p-6 space-y-3">
          <h4 className="text-xs font-bold text-danger uppercase tracking-wider select-none">
            🔴 The Problem
          </h4>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Solution Card */}
        <div className="bg-bg-card border border-border-subtle rounded-xl p-6 space-y-3">
          <h4 className="text-xs font-bold text-success uppercase tracking-wider select-none">
            ✅ The Solution
          </h4>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Tech Stack pills */}
      <div className="space-y-3 bg-bg-surface border border-border-subtle rounded-xl p-6">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide select-none">
          Technologies Deployed
        </h3>
        <div className="flex flex-wrap gap-2 select-none">
          {project.techStack.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-bg-card border border-border-active text-text-secondary"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* Challenges faced & solutions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text-primary select-none">
          Engineering Challenges
        </h3>
        
        <div className="space-y-3">
          {project.challenges.map((challenge, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-bg-card border border-border-subtle rounded-xl"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-danger/10 border border-danger/20 text-danger shrink-0 mt-0.5 select-none">
                <AlertTriangle size={14} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-semibold text-text-primary">
                  Challenge #{index + 1}
                </h5>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {challenge}
                </p>
                {project.learnings[index] && (
                  <div className="text-xs text-accent-primary italic pt-1.5 flex items-start gap-1.5">
                    <span className="shrink-0 mt-0.5">💡 Resolved:</span>
                    <span>{project.learnings[index]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap timeline list */}
      <div className="space-y-4 border-t border-border-subtle pt-6">
        <h3 className="text-lg font-bold text-text-primary select-none">
          Product Roadmap
        </h3>

        <div className="space-y-3">
          {project.futureRoadmap.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-bg-surface border border-border-subtle text-text-muted shrink-0 text-xs font-mono select-none">
                {index + 1}
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
