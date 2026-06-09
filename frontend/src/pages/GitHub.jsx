import { useEffect, useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "../config";

export default function GitHub() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/github`);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const json = await res.json();
        if (!json || !json.stats || !json.languages) {
          throw new Error("Invalid schema from GitHub endpoint");
        }
        setData(json);
      } catch (err) {
        console.error("Failed to fetch GitHub details, using local fallback:", err);
        setData({
          stats: {
            totalRepos: 8,
            estimatedCommits: 150,
            topLanguage: "Python",
          },
          languages: [
            { name: "Python", percentage: 63 },
            { name: "Jupyter Notebook", percentage: 13 },
            { name: "JavaScript", percentage: 12 },
            { name: "Other", percentage: 12 },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubData();
  }, []);

  // Color mapping for languages
  const getLanguageColorClass = (lang) => {
    switch (lang.toLowerCase()) {
      case "python":
        return "bg-[#3572A5]";
      case "typescript":
        return "bg-[#3178C6]";
      case "javascript":
        return "bg-[#F1E05A]";
      case "jupyter notebook":
        return "bg-[#DA5B0B]";
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 select-none">
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
    </div>
  );
}
