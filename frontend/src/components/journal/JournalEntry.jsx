import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb } from "lucide-react";

export default function JournalEntry({ entry }) {
  return (
    <article className="relative bg-bg-card border border-border-subtle rounded-xl p-6 space-y-5 shadow-sm hover:border-border-active transition-all duration-300 select-text">
      {/* Header details */}
      <div className="flex items-center justify-between gap-4 select-none">
        <span className="text-xs text-text-muted font-mono">{entry.date}</span>
        
        {entry.projectSlug ? (
          <Link
            to={`/projects/${entry.projectSlug}`}
            className="flex items-center gap-1 text-[10px] font-bold text-accent-primary bg-accent-primary/5 hover:bg-accent-primary/10 border border-accent-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider transition-all"
          >
            <span>{entry.project}</span>
            <ArrowRight size={10} />
          </Link>
        ) : (
          <span className="text-[10px] font-bold text-text-secondary bg-bg-primary border border-border-subtle px-2 py-0.5 rounded-full uppercase tracking-wider">
            {entry.project}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* 🔴 Problem block */}
        <div className="border-l-2 border-danger pl-4 space-y-1">
          <h4 className="text-xs font-bold text-danger uppercase tracking-wider select-none">
            🔴 Problem
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {entry.problem}
          </p>
        </div>

        {/* ❌ Failed Solution block */}
        <div className="border-l-2 border-warning pl-4 space-y-1">
          <h4 className="text-xs font-bold text-warning uppercase tracking-wider select-none">
            ❌ Failed Solution
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {entry.failedSolution}
          </p>
          <div className="text-[11px] text-text-muted pt-0.5 flex items-start gap-1">
            <span className="shrink-0 mt-0.5 select-none">↳ Why:</span>
            <span>{entry.whyItFailed}</span>
          </div>
        </div>

        {/* ✅ New Approach block */}
        <div className="border-l-2 border-success pl-4 space-y-1">
          <h4 className="text-xs font-bold text-success uppercase tracking-wider select-none">
            ✅ New Approach
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {entry.newApproach}
          </p>
        </div>

        {/* 📊 Outcome metrics badge */}
        <div className="bg-bg-primary/50 border border-border-subtle rounded-lg p-3.5 flex items-center gap-3">
          <span className="text-[10px] font-bold text-success bg-success/5 border border-success/15 px-2 py-0.5 rounded uppercase tracking-wider select-none shrink-0">
            📊 Outcome
          </span>
          <p className="text-xs text-text-primary leading-relaxed">
            {entry.outcome}
          </p>
        </div>

        {/* 💡 What I Learned bullet blocks */}
        <div className="bg-accent-primary/5 border border-accent-primary/10 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-accent-primary font-semibold text-xs select-none">
            <Lightbulb size={14} />
            <span>Key Learnings</span>
          </div>
          <ul className="space-y-1.5 pl-1.5">
            {entry.whatILearned.map((insight, idx) => (
              <li
                key={idx}
                className="text-xs text-text-secondary leading-relaxed italic flex items-start gap-2"
              >
                <span className="text-accent-primary shrink-0 mt-1 select-none">✦</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
