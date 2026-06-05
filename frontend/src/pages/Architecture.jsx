import { Link } from "react-router-dom";
import { ARCHITECTURE_DATA } from "../data/architecture";
import { GitBranch, Eye } from "lucide-react";

export default function Architecture() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto py-2">
      {/* Page Header title and info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 select-none animate-in fade-in duration-200">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Architecture Gallery
          </h1>
          <p className="text-sm text-text-secondary">
            Interactive system designs and flow charts showcasing modular, production-ready layouts.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold self-start sm:self-center">
          <GitBranch size={14} />
          <span>{ARCHITECTURE_DATA.length} Interactive Diagrams</span>
        </div>
      </div>

      {/* Gallery List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {ARCHITECTURE_DATA.map((arch) => (
          <Link
            key={arch.slug}
            to={`/architecture/${arch.slug}`}
            className="group relative flex flex-col justify-between p-5 bg-bg-card border border-border-subtle hover:border-accent-primary/50 rounded-xl hover:-translate-y-0.5 transition-all duration-300 shadow-sm select-none"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors tracking-tight">
                  {arch.title}
                </h3>
                <Eye
                  size={14}
                  className="text-text-muted group-hover:text-accent-primary transition-colors"
                />
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {arch.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-border-subtle/50 pt-3 mt-4 text-[10px] text-text-muted font-mono font-medium">
              <span>{arch.nodes.length} Components</span>
              <span>{arch.edges.length} Connectors</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
