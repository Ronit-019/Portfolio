import { Link, useLocation } from "react-router-dom";
import {
  MessageSquare,
  BarChart3,
  FolderOpen,
  GitBranch,
  BookOpen,
  Clock,
  Github,
  FileText,
  X,
  Command,
} from "lucide-react";
import { useAppStore } from "../../lib/store";
import clsx from "clsx";

export const NAV_ITEMS = [
  { label: "Assistant", icon: MessageSquare, route: "/assistant" },
  { label: "Analytics", icon: BarChart3, route: "/analytics" },
  { label: "Projects", icon: FolderOpen, route: "/projects" },
  { label: "Architecture", icon: GitBranch, route: "/architecture" },
  { label: "Journal", icon: BookOpen, route: "/journal" },
  { label: "Timeline", icon: Clock, route: "/timeline" },
  { label: "GitHub", icon: Github, route: "/github" },
  { label: "Resume", icon: FileText, route: "/resume" },
];

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { sidebarOpen, setSidebarOpen, toggleCommandPalette } = useAppStore();

  const handleLinkClick = () => {
    setSidebarOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={clsx(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col w-[240px] bg-bg-surface border-r border-border-subtle transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header Block */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border-subtle">
          <Link href="/assistant" onClick={handleLinkClick} className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/20 group-hover:border-accent-primary/50 transition-all duration-300">
              <span className="text-sm font-bold text-accent-primary tracking-wider">RO</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-primary tracking-tight">RONIT OS</span>
              <span className="flex items-center gap-1.5 text-[10px] text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Online
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-md hover:bg-bg-hover md:hidden text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            // Match subroutes as well (e.g. /projects/[slug] matches /projects)
            const isActive =
              pathname === item.route ||
              (item.route !== "/assistant" && pathname.startsWith(item.route));
            
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.route}
                onClick={handleLinkClick}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border-l-[3px]",
                  isActive
                    ? "bg-bg-hover text-accent-primary border-accent-primary"
                    : "text-text-secondary border-transparent hover:bg-bg-hover hover:text-text-primary"
                )}
              >
                <Icon size={18} className={clsx("transition-transform duration-200", isActive ? "scale-110" : "opacity-80 group-hover:opacity-100")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Palette Hint */}
        <div className="p-4 border-t border-border-subtle">
          <button
            onClick={() => {
              setSidebarOpen(false);
              toggleCommandPalette();
            }}
            className="flex items-center justify-between w-full px-3 py-2 text-xs rounded-md bg-bg-primary border border-border-subtle text-text-muted hover:text-text-secondary hover:border-border-active transition-all duration-300"
          >
            <span className="flex items-center gap-1.5">
              <Command size={12} />
              Search or command
            </span>
            <kbd className="px-1.5 py-0.5 rounded text-[9px] bg-bg-surface border border-border-subtle font-mono">
              Ctrl+K
            </kbd>
          </button>
        </div>
      </aside>
    </>
  );
}
