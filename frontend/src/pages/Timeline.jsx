import { useState } from "react";
import { TIMELINE_DATA } from "../data/timeline";
import { Calendar, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

export default function Timeline() {
  const [expandedId, setExpandedId] = useState("time-05"); // Default expand latest

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto py-2">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 select-none animate-in fade-in duration-200">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Timeline of Growth
          </h1>
          <p className="text-sm text-text-secondary">
            Visualizing Ronit's software engineering and AI systems development trajectory.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold self-start sm:self-center">
          <Calendar size={14} />
          <span>Years Covered: 2023 - 2026</span>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 md:pl-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Centered line on desktop, left line on mobile */}
        <div className="absolute top-0 bottom-0 left-2 md:left-1/2 w-0.5 bg-border-active/60 -translate-x-1/2 select-none" />

        <div className="space-y-8 relative">
          {TIMELINE_DATA.map((event, index) => {
            const isLatest = event.id === "time-05";
            const isExpanded = expandedId === event.id;
            
            // Alternate left/right side alignments on desktop
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={clsx(
                  "relative flex flex-col md:flex-row md:items-center w-full",
                  isLeft ? "md:justify-start" : "md:justify-end"
                )}
              >
                {/* Timeline Circle node */}
                <div
                  onClick={() => toggleExpand(event.id)}
                  className={clsx(
                    "absolute left-2 md:left-1/2 w-5 h-5 rounded-full border-2 -translate-x-1/2 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 select-none",
                    isLatest
                      ? "bg-accent-primary border-accent-primary shadow-[0_0_10px_var(--accent-primary)]"
                      : isExpanded
                      ? "bg-bg-card border-accent-primary"
                      : "bg-bg-primary border-border-active hover:border-text-secondary"
                  )}
                >
                  <div
                    className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      isLatest ? "bg-white" : isExpanded ? "bg-accent-primary" : "bg-transparent"
                    )}
                  />
                </div>

                {/* Event Card Container */}
                <div
                  className={clsx(
                    "w-full md:w-[45%] bg-bg-card border rounded-xl overflow-hidden shadow-sm hover:border-border-active transition-all duration-300 select-text",
                    isExpanded ? "border-accent-primary/45" : "border-border-subtle"
                  )}
                >
                  {/* Collapsed Header Summary */}
                  <div
                    onClick={() => toggleExpand(event.id)}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-bg-hover/30 transition-all select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-accent-primary font-mono bg-accent-primary/5 px-2 py-0.5 rounded">
                          {event.year}
                        </span>
                        {isLatest && (
                          <span className="text-[9px] font-bold text-success bg-success/5 border border-success/15 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Latest
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-text-primary tracking-tight">
                        {event.title}
                      </h4>
                    </div>

                    <div className="text-text-muted hover:text-text-secondary transition-colors">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded detail panel */}
                  {isExpanded && (
                    <div className="p-4 border-t border-border-subtle/50 bg-bg-surface/50 space-y-4 text-xs text-text-secondary leading-relaxed animate-in slide-in-from-top-2 duration-200">
                      {/* Context sentence */}
                      <p>{event.context}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border-subtle/30 pt-3">
                        {/* Challenge */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-danger/80 uppercase tracking-wider select-none">
                            Challenge Faced
                          </span>
                          <p>{event.challenge}</p>
                        </div>

                        {/* Skill gained */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-accent-primary uppercase tracking-wider select-none">
                            Skills Gained
                          </span>
                          <p>{event.skillGained}</p>
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="border-t border-border-subtle/30 pt-3 flex items-start gap-2 bg-bg-card p-3 rounded-lg border border-border-subtle">
                        <CheckCircle2 size={14} className="text-success shrink-0 mt-0.5 select-none" />
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-bold text-success uppercase tracking-wider select-none">
                            Impact
                          </span>
                          <p className="text-text-primary">{event.impact}</p>
                        </div>
                      </div>

                      {/* Tags */}
                      {event.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-2 select-none">
                          {event.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[9px] font-semibold rounded bg-bg-primary border border-border-subtle text-text-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
