import { Sparkles } from "lucide-react";

const QUESTIONS = [
  "What did Ronit do during his internship?",
  "Show GA4 Anomaly architecture",
  "Show Statistical Assistant architecture",
  "Show IPL Analysis architecture",
  "Why should I hire Ronit?",
  "Show his GitHub projects",
];

export default function SuggestedQuestions({ onSelectQuestion }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 px-1 text-xs font-semibold text-text-muted select-none">
        <Sparkles size={12} className="text-accent-primary" />
        <span>Suggested Questions</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelectQuestion(q)}
            className="px-3.5 py-2 text-xs text-left rounded-lg bg-bg-surface border border-border-subtle hover:border-border-active hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-all duration-300 shadow-sm cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
