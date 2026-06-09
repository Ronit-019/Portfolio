import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import {
  MessageSquare,
  FolderOpen,
  GitBranch,
  BookOpen,
  Clock,
  Github,
  FileText,
  Search,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { useAppStore } from "../../lib/store";

export default function CommandPalette() {
  const navigate = useNavigate();
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setChatPreFill,
  } = useAppStore();

  // Listen for Ctrl+K / Cmd+K global shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const runCommand = (action) => {
    action();
    setCommandPaletteOpen(false);
  };

  if (!commandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-[550px] bg-bg-card border border-border-active rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Global Command Menu" className="flex flex-col h-full">
          {/* Search Input bar */}
          <div className="flex items-center gap-3 px-4 border-b border-border-subtle">
            <Search size={18} className="text-text-muted shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search sections or ask a quick question..."
              className="w-full h-12 bg-transparent text-sm text-text-primary outline-none placeholder-text-muted"
            />
          </div>

          <Command.List className="max-h-[330px] overflow-y-auto p-2 space-y-1 scrollbar-thin">
            <Command.Empty className="px-4 py-6 text-center text-sm text-text-muted">
              No results found for that command.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group
              heading="Sections & Navigation"
              className="px-2 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider"
            >
              <Command.Item
                onSelect={() => runCommand(() => navigate("/assistant"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <MessageSquare size={16} />
                  AI Assistant
                </span>
                <span className="text-xs text-text-muted">/assistant</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/projects"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <FolderOpen size={16} />
                  Projects Command Center
                </span>
                <span className="text-xs text-text-muted">/projects</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/architecture"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <GitBranch size={16} />
                  Architecture Gallery
                </span>
                <span className="text-xs text-text-muted">/architecture</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/journal"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <BookOpen size={16} />
                  Engineering Journal
                </span>
                <span className="text-xs text-text-muted">/journal</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/timeline"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <Clock size={16} />
                  Timeline of Growth
                </span>
                <span className="text-xs text-text-muted">/timeline</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/github"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <Github size={16} />
                  GitHub Intelligence
                </span>
                <span className="text-xs text-text-muted">/github</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/resume"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <FileText size={16} />
                  Resume Hub
                </span>
                <span className="text-xs text-text-muted">/resume</span>
              </Command.Item>
            </Command.Group>

            {/* Quick Actions Group */}
            <Command.Group
              heading="Quick Actions"
              className="px-2 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider mt-2"
            >
              <Command.Item
                onSelect={() =>
                  runCommand(() => {
                    setChatPreFill("What did Ronit do during his internship?");
                    navigate("/assistant");
                  })
                }
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-accent-secondary" />
                  Ask about Ronit's Internship
                </span>
                <span className="text-xs text-text-muted">AI Ask</span>
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  runCommand(() => {
                    setChatPreFill("Why should I hire Ronit?");
                    navigate("/assistant");
                  })
                }
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-accent-secondary" />
                  Why should I hire Ronit?
                </span>
                <span className="text-xs text-text-muted">AI Ask</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/projects/ga4-anomaly-intelligence"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <FolderOpen size={16} className="text-accent-primary" />
                  Show GA4 Anomaly Project Details
                </span>
                <span className="text-xs text-text-muted">View GA4 Anomaly</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/architecture/ga4-anomaly"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <GitBranch size={16} className="text-accent-primary" />
                  Show GA4 Anomaly Architecture Flow
                </span>
                <span className="text-xs text-text-muted">View Diagram</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/projects/statistical-analysis-assistant"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <FolderOpen size={16} className="text-accent-primary" />
                  Show Assistant Project Details
                </span>
                <span className="text-xs text-text-muted">View Assistant</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/architecture/statistical-analysis-assistant"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <GitBranch size={16} className="text-accent-primary" />
                  Show Assistant Architecture Flow
                </span>
                <span className="text-xs text-text-muted">View Diagram</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/projects/ipl-web-analysis"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <FolderOpen size={16} className="text-accent-primary" />
                  Show IPL Analysis Project Details
                </span>
                <span className="text-xs text-text-muted">View IPL Analysis</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => navigate("/architecture/ipl-web-analysis"))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <GitBranch size={16} className="text-accent-primary" />
                  Show IPL Analysis Architecture Flow
                </span>
                <span className="text-xs text-text-muted">View Diagram</span>
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  runCommand(() => {
                    window.open("/resume.pdf", "_blank");
                  })
                }
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary cursor-pointer hover:bg-bg-hover hover:text-text-primary aria-selected:bg-bg-hover aria-selected:text-text-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <Download size={16} className="text-success" />
                  Download Resume (PDF)
                </span>
                <ArrowUpRight size={14} className="text-text-muted" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Navigation Hints */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border-subtle bg-bg-surface text-[10px] text-text-muted select-none">
            <span className="flex items-center gap-1">
              Use <kbd className="px-1 py-0.5 rounded bg-bg-primary border border-border-subtle">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-bg-primary border border-border-subtle">↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-bg-primary border border-border-subtle">Enter</kbd> to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-bg-primary border border-border-subtle">Esc</kbd> to close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
