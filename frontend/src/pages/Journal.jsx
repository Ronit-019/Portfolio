import JournalEntry from "../components/journal/JournalEntry";
import { JOURNAL_DATA } from "../data/journal";
import { BookOpen } from "lucide-react";

export default function Journal() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto py-2">
      {/* Header title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4 select-none animate-in fade-in duration-200">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Engineering Journal
          </h1>
          <p className="text-sm text-text-secondary">
            A chronological retrospective log of architectural challenges, failed approaches, and operational outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold self-start sm:self-center">
          <BookOpen size={14} />
          <span>{JOURNAL_DATA.length} Retrospective Entries</span>
        </div>
      </div>

      {/* Journal list stack */}
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {JOURNAL_DATA.map((entry) => (
          <JournalEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
