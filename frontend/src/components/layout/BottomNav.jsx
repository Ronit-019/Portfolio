import { Link, useLocation } from "react-router-dom";
import { MessageSquare, FolderOpen, GitBranch, Clock, FileText } from "lucide-react";
import clsx from "clsx";

const BOTTOM_NAV_ITEMS = [
  { label: "Assistant", icon: MessageSquare, route: "/assistant" },
  { label: "Projects", icon: FolderOpen, route: "/projects" },
  { label: "Architecture", icon: GitBranch, route: "/architecture" },
  { label: "Timeline", icon: Clock, route: "/timeline" },
  { label: "Resume", icon: FileText, route: "/resume" },
];

export default function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="flex md:hidden items-center justify-around h-16 bg-bg-surface border-t border-border-subtle px-4 select-none shrink-0 z-30">
      {BOTTOM_NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.route ||
          (item.route !== "/assistant" && pathname.startsWith(item.route));

        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            to={item.route}
            className={clsx(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full text-center transition-all duration-200",
              isActive ? "text-accent-primary" : "text-text-secondary hover:text-text-primary"
            )}
          >
            <Icon
              size={18}
              className={clsx("transition-transform duration-200", isActive && "scale-110")}
            />
            <span className="text-[9px] font-bold tracking-tight uppercase">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
