import { useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { useAppStore } from "../../lib/store";
import { NAV_ITEMS } from "./Sidebar";

export default function TopBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { toggleSidebar, toggleCommandPalette } = useAppStore();

  // Find the active page label for breadcrumbs
  const activeItem = NAV_ITEMS.find(
    (item) =>
      pathname === item.route ||
      (item.route !== "/assistant" && pathname.startsWith(item.route))
  );
  
  const pageLabel = activeItem ? activeItem.label : "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle">
      {/* Left side: Mobile Menu Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-bg-hover text-text-secondary hover:text-text-primary md:hidden transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span className="text-text-muted">ronit-os</span>
          <span className="text-text-muted font-mono">/</span>
          <span className="text-text-primary capitalize tracking-wide">{pageLabel.toLowerCase()}</span>
        </div>
      </div>

      {/* Right side: Global Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-surface border border-border-subtle hover:border-border-active hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-all duration-300 shadow-sm text-xs cursor-pointer"
        >
          <Search size={14} className="text-text-muted" />
          <span className="hidden sm:inline">Search console</span>
          <span className="flex items-center gap-0.5 text-[10px] text-text-muted font-mono border border-border-subtle/50 px-1 rounded bg-bg-primary">
            <kbd>Ctrl</kbd>+<kbd>K</kbd>
          </span>
        </button>
      </div>
    </header>
  );
}
