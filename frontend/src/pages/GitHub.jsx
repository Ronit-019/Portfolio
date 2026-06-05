import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Star, GitFork, ArrowRight, GitBranch, FolderOpen } from "lucide-react";
import { API_BASE_URL } from "../config";

export default function GitHub() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/github`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch GitHub details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubData();
  }, []);

  // Map repo names to architecture and project slugs
  const getRepoLinks = (repoName) => {
    const name = repoName.toLowerCase();
    let archSlug = "";
    let projSlug = "";

    if (name.includes("smartcv")) {
      archSlug = "smartcv";
      projSlug = "smartcv";
    } else if (name.includes("data-science-copilot")) {
      archSlug = "data-science-copilot";
      projSlug = "data-science-copilot";
    } else if (name.includes("portfolio")) {
      archSlug = "analytics-agent";
      projSlug = "agentic-analytics";
    } else if (name.includes("real-estate-recommender")) {
      projSlug = "real-estate-recommender";
    }

    return { archSlug, projSlug };
  };

  // Color mapping for languages
  const getLanguageColorClass = (lang) => {
    switch (lang.toLowerCase()) {
      case "python":
        return "bg-[#3572A5]";
      case "typescript":
        return "bg-[#3178C6]";
      case "javascript":
        return "bg-[#F1E05A]";
      case "html":
        return "bg-[#E34C26]";
      case "css":
        return "bg-[#563D7C]";
      default:
        return "bg-[#8b5cf6]";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto py-2 animate-pulse select-none">
        <div className="h-10 w-48 bg-bg-card rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-bg-card rounded-xl" />
          ))}
        </div>
        <div className="h-24 bg-bg-card rounded-xl" />
        <div className="h-8 w-32 bg-bg-card rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-44 bg-bg-card rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const githubUser = import.meta.env.VITE_GITHUB_USERNAME || "Ronit-019";

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto py-2 animate-in fade-in duration-200">
      {/* Header block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 select-none">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            GitHub Intelligence
          </h1>
          <p className="text-sm text-text-secondary">
            Telemetry analysis and contribution profile from Ronit's development account.
          </p>
        </div>

        <a
          href={`https://github.com/${githubUser}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-surface hover:bg-bg-hover border border-border-subtle hover:border-border-active text-text-secondary hover:text-text-primary text-xs font-semibold self-start sm:self-center transition-all cursor-pointer"
        >
          <Github size={14} />
          <span>@{githubUser} on GitHub</span>
          <ArrowRight size={12} />
        </a>
      </div>

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
        <div className="p-4 bg-bg-card border border-border-subtle rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Repositories</span>
          <p className="text-2xl font-extrabold text-text-primary">{data.stats.totalRepos}</p>
        </div>
        <div className="p-4 bg-bg-card border border-border-subtle rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Estimated Commits</span>
          <p className="text-2xl font-extrabold text-text-primary">{data.stats.estimatedCommits}</p>
        </div>
        <div className="p-4 bg-bg-card border border-border-subtle rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Top Language</span>
          <p className="text-2xl font-extrabold text-accent-primary">{data.stats.topLanguage}</p>
        </div>
        <div className="p-4 bg-bg-card border border-border-subtle rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Stars Earned</span>
          <p className="text-2xl font-extrabold text-warning">{data.stats.totalStars}</p>
        </div>
      </div>

      {/* Language breakdown bar chart */}
      <div className="p-5 bg-bg-surface border border-border-subtle rounded-xl space-y-4 select-none">
        <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          Language Distribution
        </h4>
        
        {/* Continuous horizontal bar stack */}
        <div className="h-3 w-full rounded-full bg-bg-primary overflow-hidden flex">
          {data.languages.map((lang) => (
            <div
              key={lang.name}
              style={{ width: `${lang.percentage}%` }}
              className={`${getLanguageColorClass(lang.name)} h-full`}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>

        {/* Legend grid */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {data.languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2 text-xs font-medium text-text-secondary">
              <span className={`w-2 h-2 rounded-full ${getLanguageColorClass(lang.name)}`} />
              <span>{lang.name}</span>
              <span className="text-text-muted font-mono">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Highlighted Repositories */}
      <div className="space-y-4 select-text">
        <h3 className="text-lg font-bold text-text-primary select-none">
          Highlighted Repositories
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.featuredRepos.map((repo) => {
            const { archSlug, projSlug } = getRepoLinks(repo.name);

            return (
              <div
                key={repo.name}
                className="flex flex-col justify-between p-5 bg-bg-card border border-border-subtle rounded-xl hover:border-border-active transition-all shadow-sm"
              >
                <div className="space-y-3">
                  {/* Repo title details */}
                  <div className="flex items-center justify-between">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-text-primary hover:text-accent-primary underline flex items-center gap-1.5 transition-colors"
                    >
                      <Github size={14} className="text-text-secondary" />
                      <span>{repo.name}</span>
                    </a>

                    <div className="flex items-center gap-3 text-xs text-text-secondary font-mono select-none">
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-warning fill-warning" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={12} />
                        {repo.forks}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>

                  {/* Topic badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1 select-none">
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-bg-primary text-text-muted border border-border-subtle/50"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subroute CTA Links */}
                {(archSlug || projSlug) && (
                  <div className="flex gap-2 border-t border-border-subtle/50 pt-3.5 mt-4 select-none">
                    {projSlug && (
                      <Link
                        to={`/projects/${projSlug}`}
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-accent-primary hover:text-white border border-accent-primary/20 hover:bg-accent-primary rounded transition-all cursor-pointer"
                      >
                        <FolderOpen size={10} />
                        <span>View Project</span>
                      </Link>
                    )}
                    {archSlug && (
                      <Link
                        to={`/architecture/${archSlug}`}
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-accent-secondary hover:text-white border border-accent-secondary/20 hover:bg-accent-secondary rounded transition-all cursor-pointer"
                      >
                        <GitBranch size={10} />
                        <span>Architecture</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
